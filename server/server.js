const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// Setting env file
dotenv.config({
    path: 'server/config/config.env'
})

    // connecting to database
connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port: ${process.env.PORT}`)
})