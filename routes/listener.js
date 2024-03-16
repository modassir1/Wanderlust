const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({storage})

//all listings
router.get("/", wrapAsync(listingController.index));

//New Listings
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//show listing
router.get("/:id", wrapAsync(listingController.showListing));

//edit and update
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Delete Listings
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;