const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Order = require("../Model/Order");

exports.postOrder = catchAsyncErrors(async (req, res, next) => {
    const newOrder = req.body;
    const order = await Order(newOrder).save();
    res.status(200).json({
      success: true,
      message: "Order added successfully!",
      data: order,
    });
});

exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 50;
  const orderCount = await Order.countDocuments();

  const apiFeatures = new APIFeatures(Order.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const orders = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: orderCount,
    data: orders,
    message: "All user orders successfully!",
    resultPerPage,
  });
});

exports.getOneOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Order found successfully!",
      data: order,
    });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    const patchOrder = req.body;
    if(req.body.paymentStatus = "Paid"){
      req.body.paymentDate = Date.now()
    };
    await Order.findByIdAndUpdate({ _id: req.params.id }, { $set: patchOrder });
    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
    });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order deleted successfully!",
    });
});

