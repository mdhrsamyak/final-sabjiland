const mongoose = require("mongoose");
const Product = require("./Product");

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      minLength: 3,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
