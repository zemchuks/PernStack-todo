const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

// Protecting routes with Auth middleware
module.exports = async (req, res, next) => {
    //Get the token from the header
    const token = req.header('token')

    // Check if token doesn't exist
    if(!token) {
        return res.status(403).json({ msg: 'No token, Authorisation denied' })
    }
    // If there is a user with a token, then verify it
    try {
        const payload = jwt.verify(token, process.env.jwtSecret)

        req.user = payload.user
        next()
    } catch (err) {
        res.status(403).json({ msg: 'Token is not valid' })
    }
}