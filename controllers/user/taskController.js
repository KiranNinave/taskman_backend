const Task = require("../../models/task");

exports.getTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId })
            .populate("project")
            .populate("user");
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.patchStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        const patchedTask = await Task.findByIdAndUpdate(taskId, { status });
        if (!patchedTask) return res.sendNotFound();
        const patchedTaskWithProjectAndUser = await Task.findOne({
            _id: taskId
        })
            .populate("project")
            .populate("user");
        res.json(patchedTaskWithProjectAndUser);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
