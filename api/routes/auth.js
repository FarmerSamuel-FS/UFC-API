const express = require("express");
const passport = require("passport");
const authenticationController = require("../controllers/authentication_controller");
const passportService = require("../services/passport");

// Initialize passport strategies
const requireSignin = passport.authenticate("local", { session: false });

const router = express.Router();

// Routes for authentication
router.post("/signup", authenticationController.signup);
router.post("/signin", requireSignin, authenticationController.signin);

module.exports = router;
