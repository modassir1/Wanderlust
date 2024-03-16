const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require("passport");
const { savRedirectUrl } = require('../middleware.js');
const userController = require("../controllers/user.js")

router.get("/signup", userController.renderSignupForm);

router.post('/signup', wrapAsync(userController.signUp));

router.get("/login", userController.renderLoginForm);

router.post("/login", savRedirectUrl, passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }), userController.login)

router.get("/logout", userController.logout);

module.exports = router;
