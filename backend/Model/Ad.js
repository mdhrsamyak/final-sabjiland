const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
    {
        adBannerImage: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("ad", adSchema);