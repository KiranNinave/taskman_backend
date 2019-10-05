const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const workspaceController = require("../../controllers/workspaceController");
const userChecker = require("../../middlewares/userChecker");
const validator = require("../../validators");

router
    .route("/")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        workspaceController.getWorkspace
    )
    .post(
        validator.validateBody(validator.schemas.workspaceValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        workspaceController.addWorkspace
    );

router
    .route("/:id")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        workspaceController.getWorkspaceById
    )
    .put(
        validator.validateBody(validator.schemas.workspaceValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        workspaceController.updateWorkspaceById
    )
    .delete(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        workspaceController.deleteWorkspaceById
    );

module.exports = router;
