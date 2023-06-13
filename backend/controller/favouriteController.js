const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Favourite = require("../Model/Favourite");

exports.postFavourite = catchAsyncErrors(async (req, res, next) => {
    const newFavourite = req.body;
    const favourite = await new Favourite(newFavourite).save();
    res.status(200).json({
      success: true,
      message: "Favourite created successfully!",
      data: favourite,
    });
});

exports.getMyFavourite = catchAsyncErrors(async (req, res, next) => {
  const favourite = await Favourite.find({userId: req.user.id});
  if (!favourite) {
    return next(new ErrorHandler("Favourite not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Favourite found successfully!",
    data: favourite,
  });
});

exports.getOneFavourite = catchAsyncErrors(async (req, res, next) => {
    const favourite = await Favourite.findById(req.params.id);
    if (!favourite) {
      return next(new ErrorHandler("Favourite not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Favourite found successfully!",
      data: favourite,
    });
});

exports.updateFavourite = catchAsyncErrors(async (req, res, next) => {
    const favourite = await Favourite.findById(req.params.id);
    if (!favourite) {
      return next(new ErrorHandler("Favourite not found", 404));
    }
    const patchFavourite = req.body;
    await Favourite.findByIdAndUpdate({ _id: req.params.id }, { $set: patchFavourite });
    res.status(200).json({
      success: true,
      message: "Favourite updated successfully!",
    });
});

