const express = require("express");
const roleController = require("../../controllers/roleController");
const validator = require("../../validators");

const router = express.Router();

if (process.env.NODE_ENV === "development") {
    router
        .route("/")
        .post(
            validator.validateBody(validator.schemas.roleValidator),
            roleController.addRole
        );
}

module.exports = router;
