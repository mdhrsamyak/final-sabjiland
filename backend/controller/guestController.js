const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Guest = require("../Model/Guest");

exports.postGuest = catchAsyncErrors(async (req, res, next) => {
    const newGuest = req.body;
    const guest = await new Guest(newGuest).save();
    res.status(200).json({
      success: true,
      message: "Guest created successfully!",
      data: guest,
    });
});

exports.getAllGuest = catchAsyncErrors(async (req, res, next) => {
    const guest = await Guest.find();
    res.status(200).json({
      success: true,
      message: "All guests fetched successfully!",
      data: guest,
    });
});
