const mongoose = require('mongoose');
const User = require('../Model/User');
const Rider = require('../Model/Rider');
const Product = require('../Model/Product');
const Review = require('../Model/Review');
const { date } = require('joi');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    guestName: {
        type: String,
        minLength: 4,
    },
    guestContact: {
        type: String,
        minLength: [10, "Please enter a valid number"],
        maxLength: [10, "Please enter a valid number"]
    },
    riderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },  
    quantity: [{
        type: Number,
        min: 1,
    }],
    orderAddress: {
        type: String,
        required: true,
    },
    orderDate:{
        type: Date,
        default: Date.now()
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Inprocess', 'Being delivered', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date,   
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    },
    paymentMethod: {
        type: String,
        enum: ['Unpaid', 'COD', 'Esewa', 'Khalti', 'Phone pay'],
        default: 'Unpaid'
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema)