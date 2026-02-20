const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        image: {
            type: String,
            required: [true, 'Please add an image'],
            default: '/images/sample.jpg', // Placeholder
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            default: 0,
        },
        countInStock: {
            type: Number,
            required: [true, 'Please add stock count'],
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
