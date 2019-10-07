const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const userChacker = require("../../middlewares/userChecker");
const projectController = require("../../controllers/projectController");
const validator = require("../../validators");

router
    .route("/")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChacker.checkUser(userChacker.users.types.admin),
        projectController.getProject
    )
    .post(
        validator.validateBody(validator.schemas.projectValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChacker.checkUser(userChacker.users.types.admin),
        projectController.addProject
    );

router
    .route("/:id")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChacker.checkUser(userChacker.users.types.admin),
        projectController.getProjectById
    )
    .put(
        validator.validateBody(validator.schemas.projectValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChacker.checkUser(userChacker.users.types.admin),
        projectController.updateProjectById
    )
    .delete(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChacker.checkUser(userChacker.users.types.admin),
        projectController.deleteProjectById
    );

router.route("/:id/user").get(
    passport.authenticate(passportConfig.passport.methods.jwt, {
        session: false
    }),
    userChacker.checkUser(userChacker.users.types.admin),
    projectController.getProjectUser
);

module.exports = router;
