const express = require('express')
const app = express()

app.use(express.json())

// import all Products routes 
const products = require("./routes/product")
const errors = require('./middleware/errors')

app.use("/api/v1", products)

app.use(errors)


module.exports = app