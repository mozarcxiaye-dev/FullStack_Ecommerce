const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log(`Uncaught Exception`)
     server.close(() => {
        process.exit(1)
     })
})
// Setting env file
dotenv.config({
    path: 'server/config/config.env'
})
// connecting to database

connectDatabase()



const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port: ${process.env.PORT}`)
})
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejections`)
     server.close(() => {
        process.exit(1)
     })
})