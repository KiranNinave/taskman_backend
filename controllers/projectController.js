const Project = require("../models/project");
const Workspace = require("../models/workspace");
const User = require("../models/user");

exports.getProject = async (req, res) => {
    try {
        const projects = await Project.find({})
            .populate("workspace")
            .populate("team")
            .populate("user");
        res.json(projects);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.addProject = async (req, res) => {
    try {
        const { name, description, workspace, method, worker } = req.body;
        const isWorkspace = await Workspace.findOne({ _id: workspace });
        if (!isWorkspace)
            return res.sendNotFoundWithMessage({
                message: "Workspace not found"
            });
        const newProject = new Project({
            name,
            description: description || "",
            workspace,
            method,
            [method]: worker
        });
        await newProject.save();
        const savedProjectWithWorkspace = await Project.populate(newProject, [
            { path: "workspace" },
            { path: "team" },
            { path: "user" }
        ]);
        res.json(savedProjectWithWorkspace);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({ _id: projectId })
            .populate("workspace")
            .populate("team")
            .populate("user");
        if (!project) return res.sendNotFound();
        res.json(project);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.updateProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { name, description, workspace } = req.body;
        const isWorkspace = await Workspace.findOne({ _id: workspace });
        if (!isWorkspace)
            return res.sendNotFoundWithMessage({
                message: "Workspace not found"
            });
        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            name,
            description: description || "",
            workspace
        });
        if (!updatedProject)
            return res.sendNotFoundWithMessage({
                message: "Project not found"
            });
        const updatedProjectWithWorkspace = await Project.findOne({
            _id: updatedProject._id
        }).populate("workspace");
        res.json(updatedProjectWithWorkspace);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.deleteProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(
            projectId
        ).populate("workspace");
        if (!deletedProject) return res.sendNotFound();
        res.json(deletedProject);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getProjectUser = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({ _id: projectId });
        if (!project)
            return res.sendNotFoundWithMessage({
                message: "project not found"
            });
        let users = [];
        if (project.method === "team")
            users = await User.find({ team: project.team });
        else if (project.method === "user")
            users = await User.find({ _id: project.user });
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
