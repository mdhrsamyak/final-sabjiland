const mongoose = require ('mongoose')

const guestSchema = new mongoose.Schema({
    guestName: {
        type: String,
        required: true,
        minLength:3,
        maxLength: 255
    },
    contactNo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

module.exports = mongoose.model("Guest", guestSchema);