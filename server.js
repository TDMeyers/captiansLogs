// Require dotenv to setup environment variables in our server
require('dotenv').config()

const cors = require('cors')

app.use(cors())

// Load express
const express = require('express')

// Setup our Express app
const app = express()

const PORT = 3000 

// Load the connectDB function
const connectDB = require('./config')

// Connect to database
connectDB()

// Load the create engine -> (npm install jsx-view-engine react react-dom)
const jsxEngine = require('jsx-view-engine')

// Load the method-override middleware
const methodOverride = require('method-override')

const logRoutes = require('./routes/logRoutes')

// Configure the view engine and look for files ending in jsx
app.set('view engine', 'jsx')

// Create the engine and accept files ending in jsx
app.engine('jsx', jsxEngine())

// a middleware that formats the form data (currently a string that looks like query params) into a object we can use
app.use(express.urlencoded({ extended: true }))

// hack into our form and give it more HTTP methods (like DELETE and PUT)
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use('/logs', logRoutes)

// Setup an "index" route for vegetables
app.get('/', (req, res) => {
    res.redirect('/logs')
})

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})