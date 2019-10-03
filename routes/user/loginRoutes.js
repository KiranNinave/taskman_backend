const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const validator = require("../../validators");
const userController = require("../../controllers/userController");

router
    .route("/")
    .post(
        validator.validateBody(validator.schemas.loginValidator),
        passport.authenticate(passportConfig.passport.methods.local, {
            session: false
        }),
        userController.loginUser
    );

module.exports = router;
