const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const jwtGenerator = (user_id) => {
    // Generate a json web token
    const payload = {
        user: {
            id: user_id
        }
    }

    //Generate a token and sign
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '3hr'})
}
module.exports = jwtGenerator