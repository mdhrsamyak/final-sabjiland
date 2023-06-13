const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  logout,
  updatePassword,
} = require("../controller/authorizeController");

const { isAuthenticated } = require("../middleware/auth");

router
  .route("/register")
  .post(
    register
  );

router
  .route("/login")
  .post(
    login
  );

router
  .route("/whoami")
  .get(
    isAuthenticated, 
    getMe
  );

router
  .route("/logout")
  .get(
    logout
  );

router
  .route("/password/update")
  .put(
    isAuthenticated, 
    updatePassword
  );

module.exports = router;
