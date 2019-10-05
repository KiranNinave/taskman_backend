const Workspace = require("../models/workspace");

exports.getWorkspace = async (req, res) => {
    try {
        const workspaces = await Workspace.find({});
        res.json(workspaces);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getWorkspaceById = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        const workspace = await Workspace.findOne({
            _id: workspaceId
        }).populate("user");
        if (!workspace) return res.sendNotFound();
        res.json(workspace);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.addWorkspace = async (req, res) => {
    try {
        const { name, description } = req.body;
        const user = req.user._id;
        const newWorkspace = new Workspace({
            name,
            description: description || "",
            user
        });
        await newWorkspace.save();
        const newWorkspaceWithUser = await Workspace.populate(newWorkspace, [
            { path: "user" }
        ]);
        res.sendCreated(newWorkspaceWithUser);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.updateWorkspaceById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const user = req.user._id;
        const workspaceId = req.params.id;

        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            workspaceId,
            { name, description, user }
        );
        if (!updatedWorkspace) return res.sendNotFound();
        const updatedWorkspaceWithUser = await Workspace.findOne({
            _id: workspaceId
        }).populate("user");

        res.json(updatedWorkspaceWithUser);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.deleteWorkspaceById = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        const deletedWorkspace = await Workspace.findByIdAndDelete(
            workspaceId
        ).populate("user");
        if (!deletedWorkspace) return res.sendNotFound();
        res.json(deletedWorkspace);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
