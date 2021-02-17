const express = require('express')
const router = express.Router()
const pool = require('../db')
const authorization = require('../middleware/authorization')

/**
 *  @route      GET api/auth
 *  @descr      Get logged in user
 *  @access     Private
 */

router.get('/', authorization, async (req, res) => {
    try {
        // Get logged in user's data from the req.body in authorization
        const user = await pool.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err}) 
    }
})

module.exports = router