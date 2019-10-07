const router = require("express").Router();
const passport = require("passport");
const passportContfig = require("../../passport/passportConfig");
const userChecker = require("../../middlewares/userChecker");
const taskController = require("../../controllers/user/taskController");

router.route("/").get(
    passport.authenticate(passportContfig.passport.methods.jwt, {
        session: false
    }),
    userChecker.checkUser(userChecker.users.types.user),
    taskController.getTask
);

router.route("/:id").patch(
    passport.authenticate(passportContfig.passport.methods.jwt, {
        session: false
    }),
    userChecker.checkUser(userChecker.users.types.user),
    taskController.patchStatus
);

module.exports = router;
