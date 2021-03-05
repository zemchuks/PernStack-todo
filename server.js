const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const path = require('path')
const app = express()
 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('client/build'))

//Register and Login Route
app.use('/auth', require('./routes/auth'))
// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'))

// root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to PERN todo app'})
})

// Serve static assests in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => { 
        res.sendFile(path.join(__dirname, "client/build/index.html" ))
    })  
}

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'The Route you are requesting for does not exist' });
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Live @ port ${PORT}...`)
}) 