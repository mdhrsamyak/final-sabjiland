const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Package = require("../Model/Package");

exports.postPackage = catchAsyncErrors(async (req, res, next) => {
  if (req.file == undefined) {
    return next(new ErrorHandler("Invalid Image", 401));
  }
  req.body.image = req.file.filename;
  const newPackage = req.body;
  const package = await new Package(newPackage).save();
  res.status(200).json({
    success: true,
    message: "Package created successfully!",
    data: package,
  });
});

exports.getAllPackage = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 50;
  const packageCount = await Package.countDocuments();

  const apiFeatures = new APIFeatures(Package.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const packages = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: packageCount,
    data: packages,
    message: "All user packages successfully!",
    resultPerPage,
  });
});

exports.getOnePackage = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Package found successfully!",
    data: package,
  });
});

exports.updatePackage = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const patchPackage = req.body;
  await Package.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: patchPackage }
  );
  res.status(200).json({
    success: true,
    message: "Package updated successfully!",
  });
});

exports.deletePackage = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }
  await Package.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Package deleted successfully!",
  });
});
