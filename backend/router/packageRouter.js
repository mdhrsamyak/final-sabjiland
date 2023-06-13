const express = require("express");
const {
  postPackage,
  getAllPackage,
  getOnePackage,
  updatePackage,
  deletePackage,
} = require("../controller/packageController");
const router = express.Router();
const upload = require("../middleware/fileupload");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const packageValidation = require("../validation/packageValidation");

router
  .route("/postPackage")
  .post(
    isAuthenticated,
    authorizeRoles("admin", "superadmin"),
    upload.single("image"),
    packageValidation,
    postPackage
  );

router
  .route("/getAllPackage")
  .get(
    getAllPackage
  );

router
  .route("/getPackage/:id")
  .get(
    getOnePackage
  );

router
  .route("/updatePackage/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("admin", "superadmin"),
    upload.single("image"),
    packageValidation,
    updatePackage
  );

router
  .route("/deletePackage/:id")
  .delete(
    isAuthenticated, 
    authorizeRoles("admin", "superadmin"), 
    deletePackage
  );

module.exports = router;
