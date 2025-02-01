const mongoose = requires('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please enter the product name."],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price."],
        maxLength: [5, "Product price exceeds 5 character."],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter the product description."],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please select category."],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Sports',
                'Home',
                'Outdoor',
                'Clothes/Shoes',
                'Beauty/Health',
                'Books'
            ],
            message: 'Please select correct product category.'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller.']

    },
    stock: {
        type: Number,
        required: [true, 'Please enter the product stock.'],
        maxLength: [5, 'Product Stock cannot exceed 5 characters.'],
        default: 0
    },
    numberOfReviews: {
        type: Number, 
        default: 0
    },
    reviews: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Product', productSchema)