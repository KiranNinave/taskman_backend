const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const userChecker = require("../../middlewares/userChecker");
const validator = require("../../validators/");
const taskController = require("../../controllers/taskController");

router
    .route("/")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        taskController.getTask
    )
    .post(
        validator.validateBody(validator.schemas.taskValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        taskController.addTask
    );

router
    .route("/:id")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        taskController.getTaskById
    )
    .put(
        validator.validateBody(validator.schemas.taskValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        taskController.updateTaskById
    )
    .delete(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        taskController.deleteTaskById
    );

module.exports = router;
