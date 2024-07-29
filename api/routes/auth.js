const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportService = require("../services/passport");

const requireLogin = passport.authenticate("local", { session: false });

const AuthenticationController = require("../controllers/authentication_controller");

router.post("/", AuthenticationController.signup);
router.post("/signin", requireLogin, AuthenticationController.signin);

module.exports = router;
