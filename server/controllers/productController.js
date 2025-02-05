const product = require('../models/product')
const Product = require('../models/product')
const mongoose = require('mongoose')

// Display all products => /api/v1/products [GET]
exports.getProducts = async (req, res, next) => {
    // find() - finds all the data from database
    const getAllProducts = await Product.find()

    res.status(200).json({
        success: true,
        count: (await getAllProducts).length,
        getAllProducts
    })
}

// Get single product detail => /api/v1/product/:id [GET]
exports.getSingleProduct = async (req, res, next) => {

    try {

        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
                success: false,
                message: "Invalid product id"
            })
        }


        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }
}

// create new product => api/v1/admin/product/new [POST]
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

// update existing product => /api/v1/admin/product/:id [PUT]
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found."
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}

// Deleting product => /api/v1/admin/product/:id [DELETE]
exports.deleteProduct = async(req, res, next) => {
        
        const product = await Product.findByIdAndDelete(req.params.id)
        // const product = await Product.findById(req.params.id)
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }
    
        // product.remove()

        res.status(200).json({
            success: true,
            message: "Product Deleted"
        })

        
}