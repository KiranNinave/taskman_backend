const express = require("express");
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const validator = require("../../validators");
const userController = require("../../controllers/userController");
const userChecker = require("../../middlewares/userChecker");

const router = express.Router();

router.route("/").post(
    validator.validateBody(validator.schemas.userValidator),
    passport.authenticate(passportConfig.passport.methods.jwt, {
        session: false
    }),
    userChecker.checkUser(userChecker.users.types.admin),
    userController.addUser
);

module.exports = router;
