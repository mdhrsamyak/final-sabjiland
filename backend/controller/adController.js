const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Ad = require("../Model/Ad")

exports.postAd = catchAsyncErrors(async (req, res, next) => {
    if (req.files == undefined){
        res.status(401).json({ status: false, message: "Invalid Image"});
    }
    const Ad = await new Ad({
        adBannerImage: req.file.filename,
        url: req.body.url
    }).save();
    res.status(200).json({
        success: true,
        message: "Ad has been added successfully!",
        data: Ad
    });
});

exports.getAllAd = catchAsyncErrors(async (req, res, next) => {
    const ad = await Ad.find();
    res.status(200).json({
        success: true,
        message: "All Ads fetched successfully!",
        data: ad
    });
}); 

exports.deleteAd = catchAsyncErrors(async (req, res, next) => {
    const ad = await Ad.findByIdAndDelete(req.params.id)
    if (!ad) {
        return next(new ErrorHandler("Ad not found.", 404))
    }
    res.status(200).json({
        success: true,
        message: "Ad deleted successfully!",
        data: ad
    });
});