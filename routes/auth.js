const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const pool = require('../db')
const jwtGenerator = require('../utils/jwtGenerator')
const authorization = require('../middleware/authorization')


/**
 *  @route      POST auth/register
 *  @descr      Register a new User
 *  @access     Private
 */
router.post('/register', [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], async (req, res) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() })
        }
    try {
        // Destructure the req.body
        const { name, email, password } = req.body

        // check if user exists (if not exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        
        // Check if user already exist then throw error
        user.rows.length !== 0 ? res.status(401).json('User already exists') : ''
        // Hash the password 
        const saltRounds = 10

        const salt = await bcrypt.genSalt(saltRounds)
        const bcryptPassword = await bcrypt.hash(password, salt)

        // Create New user
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]
        )

        // Add jwttoken
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err})
    }
})

/**
 *  @route      POST auth/login
 *  @descr      Login a User
 *  @access     Private
 */
router.post('/login', [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    } 
    try {
        // Destrcture the req.body
        const { email, password } = req.body

        // check if user exists (if not exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if (user.rows.length === 0) {
            return res.status(401).json("Email or Password is incorrect")
        }
        
        // Check if incoming password is the same as the database pwd
        const isMatch = await bcrypt.compare(password, user.rows[0].user_password)
        // If not then,
        if(!isMatch) {
            return res.status(401).json('Password is incorrect')
        }
          // Add jwttoken
          const token = jwtGenerator(user.rows[0].user_id)
          res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err}) 
    }
})


/**
 *  @route      GET api/auth
 *  @descr      Get logged in user
 *  @access     Private
 */
 router.get('/verify', authorization, async (req, res) => {
     try {
         res.json(true)
     } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err}) 
     }
 })

module.exports = router