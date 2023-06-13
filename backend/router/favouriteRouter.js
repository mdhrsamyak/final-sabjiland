const express = require("express");
const { postFavourite, getOneFavourite, updateFavourite, getMyFavourite } = require("../controller/favouriteController");
const router = express.Router();
const favouriteValidation = require("../validation/favouriteValidation");
const { isAuthenticated } = require("../middleware/auth");

router.route('/postFavourite')
    .post(
        isAuthenticated, 
        favouriteValidation, 
        postFavourite
    );
    
router.route('/getMyFavourite')
    .get(
        isAuthenticated, 
        getMyFavourite
    );

router.route('/getOneFavourite/:id')
    .get(
        isAuthenticated, 
        getOneFavourite
    );

router.route('/updateFavourite/:id')
    .patch(
        isAuthenticated, 
        favouriteValidation, 
        updateFavourite
    );

module.exports = router;
