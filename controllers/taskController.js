const Task = require("../models/task");
const Project = require("../models/project");
const User = require("../models/user");

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
            .populate("project")
            .populate("user");

        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.addTask = async (req, res) => {
    try {
        const {
            name,
            description,
            project,
            startDate,
            endDate,
            user
        } = req.body;

        // check for valid project
        const isProject = await Project.findOne({ _id: project });
        if (!isProject)
            return res.sendNotFoundWithMessage({
                message: "Project not found"
            });

        // check for user exists
        const isUser = await User.findOne({ _id: user });
        if (!isUser)
            return res.sendNotFoundWithMessage({
                message: "User not found"
            });

        const newTask = new Task({
            name,
            description: description || "",
            project,
            status: "white",
            startDate,
            endDate,
            user
        });

        await newTask.save();

        const newTaskWithProjectAndWorker = await Task.populate(newTask, [
            { path: "project" },
            { path: "user" }
        ]);
        res.json(newTaskWithProjectAndWorker);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId })
            .populate("project")
            .populate("user");
        if (!task) return res.sendNotFound();
        res.json(task);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.updateTaskById = async (req, res) => {
    const {
        name,
        description,
        project,
        startDate,
        endDate,
        method,
        worker
    } = req.body;
    const taskId = req.params.id;

    // check for valid project
    const isProject = await Project.findOne({ _id: project });
    if (!isProject)
        return res.sendNotFoundWithMessage({
            message: "Project not found"
        });

    // check for user and team
    let isUserOrTeam = null;
    if (method === "user") isUserOrTeam = await User.findOne({ _id: worker });
    if (method === "team") isUserOrTeam = null;
    if (!isUserOrTeam)
        return res.sendNotFoundWithMessage({
            message: "User or Team not found"
        });

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
        name,
        description,
        project,
        startDate,
        endDate,
        method,
        worker
    });

    if (!updatedTask) return res.sendNotFound();

    const updatedTaskWithProjectAndWorker = await Task.findOne({
        _id: updatedTask._id
    })
        .populate("project")
        .populate("user");

    res.json(updatedTaskWithProjectAndWorker);

    try {
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId)
            .populate("project")
            .populate("user");
        if (!deletedTask) return res.sendNotFound();

        res.json(deletedTask);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
