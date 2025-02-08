const product = require('../models/product')
const Product = require('../models/product')
const mongoose = require('mongoose')
const ErrorHandler = require('../utils/errorHandling')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// asyncError middleware implementation
// Display all products => /api/v1/products [GET]
exports.getProducts = catchAsyncErrors(
    async (req, res, next) => {
        // find() - finds all the data from database
        const getAllProducts = await Product.find()

        res.status(200).json({
            success: true,
            count: (await getAllProducts).length,
            getAllProducts
        })
    }
)

// Get single product detail => /api/v1/product/:id [GET]
exports.getSingleProduct = catchAsyncErrors(
    async (req, res, next) => {
        try {

            if (!mongoose.isValidObjectId(req.params.id)) {
                return next(new ErrorHandler("Product not found", 404))

            }


            const product = await Product.findById(req.params.id)
            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
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
)

// create new product => api/v1/admin/product/new [POST]
exports.newProduct = catchAsyncErrors(

    async (req, res, next) => {
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product
        })
    }
)

// update existing product => /api/v1/admin/product/:id [PUT]
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
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
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id)
    // const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))

    }

    // product.remove()

    res.status(200).json({
        success: true,
        message: "Product Deleted"
    })


}