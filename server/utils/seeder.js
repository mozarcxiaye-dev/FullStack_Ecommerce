const Product = require("../models/product")
const dotenv = require('dotenv')
const connectDatabase = require("../config/database")

// importing dummy data 
const data = require("../data/product.json")

// setting env file
dotenv.config({
    path: "server/config/config.env"
})


// now connecting to the database
connectDatabase()

const seedProducts = async () => {
    try {
        // deletemany will empty the entire database
        await Product.deleteMany()
        console.log("products are deleted")

        // insertmany will enter multiple data to the database
        await Product.insertMany(data)
        console.log("All products data are inserted")

        process.exit(1) // exit the function

    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}

// calling data seeder function
seedProducts()

// error handling can be done by either try catch or making a error class 
