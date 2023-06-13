const express = require("express");
const {
  postRider,
  getAllRider,
  getOneRider,
  updateRider,
  deleteRider,
} = require("../controller/riderController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const riderValidation = require("../validation/riderValdation");

const upload = require("../middleware/fileUpload");

router
  .route("/postRider")
  .post(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    riderValidation,
    postRider
  );

router
  .route("/getAllRider")
  .get(
    getAllRider
  );

router
  .route("/getRider/:id")
  .get(
    getOneRider
  );

router
  .route("/updateRider/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    riderValidation,
    updateRider
  );

router
  .delete("/deleteRider/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    deleteRider
  );

module.exports = router;
