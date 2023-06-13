const express = require("express");
const {
  postOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const orderValidation = require("../validation/orderValidation");

router
  .route("/postOrder")
  .post(
    isAuthenticated,
    orderValidation,
    postOrder
  );

router
  .route("/getAllOrder")
  .get(
    getAllOrder
  );

router
  .route("/getOrder/:id")
  .get(
    // isAuthenticated, 
    getOneOrder
  );

router
  .route("/updateOrder/:id")
  .patch(
    // isAuthenticated,
    orderValidation,
    updateOrder
  );

router
  .route("/deleteOrder/:id")
  .delete(
    isAuthenticated,
    deleteOrder
  );

module.exports = router;
