const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const app = express()
 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

//Register and Login Route
app.use('/auth', require('./routes/auth'))

// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'))

// root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to PERN todo app'})
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Live @ port ${PORT}...`)
})