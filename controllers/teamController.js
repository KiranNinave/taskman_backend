const Team = require("../models/team");

exports.getTeam = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.json(teams);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.addTeam = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTeam = new Team({
            name,
            description: description || ""
        });
        await newTeam.save();
        res.sendCreated(newTeam);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getTeamById = async (req, res) => {
    try {
        const teamId = req.params.id;
        const team = await Team.findOne({ _id: teamId });
        if (!team) return res.sendNotFound();
        res.json(team);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.updateTeamById = async (req, res) => {
    try {
        const teamId = req.params.id;
        const { name, description } = req.body;
        const updatedTeam = await Team.findByIdAndUpdate(teamId, {
            name,
            description: description || ""
        });
        if (!updatedTeam) return res.sendNotFound();
        const updatedTeamWithNewResults = await Team.findOne({
            _id: updatedTeam._id
        });
        res.json(updatedTeamWithNewResults);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.deleteTeamById = async (req, res) => {
    try {
        const teamId = req.params.id;
        const deletedTeam = await Team.findByIdAndDelete(teamId);
        if (!deletedTeam) return res.sendNotFound();
        res.json(deletedTeam);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
