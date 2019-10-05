const app = require("express");
const loginRoutes = require("./loginRoutes");
const roleRoutes = require("./roleRoutes");
const userRouters = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const workspaceRoutes = require("./workspaceRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");
const teamRoutes = require("./teamRoutes");

const router = app.Router();

router.use("/login", loginRoutes);
router.use("/role", roleRoutes);
router.use("/user", userRouters);
router.use("/admin", adminRoutes);
router.use("/workspace", workspaceRoutes);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);
router.use("/team", teamRoutes);

module.exports = router;
