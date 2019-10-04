const express = require("express");
const passport = require("passport");
const passportconfig = require("../../passport/passportConfig");
const userController = require("../../controllers/userController");
const validator = require("../../validators");

const router = express.Router();

router.route("/").post(
    validator.validateBody(validator.schemas.loginValidator),
    passport.authenticate(passportconfig.passport.methods.local, {
        session: false
    }),
    userController.loginAdmin
);

module.exports = router;
