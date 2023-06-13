const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../Model/Product");
const ErrorHandler = require("../utils/errorHandler");
const upload = require("../middleware/fileUpload");
const APIFeatures = require("../utils/apiFeatures");
const path = require("path");

//adding new product
exports.postProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.files == undefined) {
    return next(new ErrorHandler("Invalid Image", 401));
  }
  let images = [];
  req.files.forEach(async (f) => {
    await images.push(f.filename);
  });
  req.body.image = images;
  const product = await new Product(req.body).save();
  res.status(200).json({
    success: true,
    message: "Product posted successfully!",
    data: product,
  });
});

//get all products
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 50;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: productCount,
    data: products,
    resultPerPage,
  });
});

// get all product for search
exports.searchProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    message: "All products fetched successfully!",
    data: product,
  });
});

//get one product
exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product found successfully!",
    data: product,
  });
});

//update one product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.files == undefined) {
    return next(new ErrorHandler("Invalid Image", 401));
  }

  let images = [];

  req.files.forEach(async (f) => {
    await images.push(f.filename);
  });

  await Product.findById({ _id: req.params.id }).then((res) => {
    res.image.forEach(async (f) => {
      await images.push(f);
    });
  });

  req.body.image = images;

  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).json({
    success: true,
    message: "Product updated successfully!",
  });
});

//delete single product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  // await Product.findById({ _id: req.params.id }).then((res) => {
  //   res.image.forEach((res) => {
  //     rimraf(path.join(__dirname, `../files/image/${res}`), (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     });
  //   });
  // });
  const response = await Product.findByIdAndDelete(req.params.id);

  if (!response) {
    return res.status(401).json({
      success: false,
      message: "No such product found.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product deleted Successfully!",
  });
});
