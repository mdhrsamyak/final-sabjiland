const express = require("express");
const { postGuest, getAllGuest } = require("../controller/guestController");
const router = express.Router();
const guestValidation = require("../validation/guestValidation");

//router.route('/postGuest').post(guestValidation, postGuest);
//router.route('/getAllGuest').get(getAllGuest);

//module.exports = router;