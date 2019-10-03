const express = require("express");
const validator = require("../../validators");
const userController = require("../../controllers/userController");
const router = express.Router();

if (process.env.NODE_ENV === "development") {
    router
        .route("/")
        .post(
            validator.validateBody(validator.schemas.userValidator),
            userController.addAdmin
        );
}

module.exports = router;
