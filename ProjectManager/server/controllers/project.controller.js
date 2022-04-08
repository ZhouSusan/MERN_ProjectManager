const { default: mongoose } = require("mongoose");
const { Project } = require("../models/project.model")
const User = require("../models/user");


// get all jobs
module.exports.allProjects = (req, res) => {
    Project.find({})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json(err))
}

// get one job
module.exports.oneProject = (req, res) => {
    Project.findById(mongoose.Types.ObjectId(req.params.id))
        .then(oneProject => res.json(oneProject))
        .catch(err => res.status(400).json(err))
}

// create a Project
module.exports.createProject = async (req, res) => {
    const project = req.body;
    console.log("UserName form req", req.user.username)
    const user = await User.findOne({ username: req.user.username })
    console.log("User frmm DB", user)
    const dbProject = new Project({
        projectName: project.projectName,
        description: project.description,
        dueDate: project.dueDate,
        teammembers: project.teammembers,
        priority: project.priority,
        status:project.status,
        creator: user
    })
    dbProject.save();
    res.json({message:"Success"})
    // Project.create(req.body)
    //     .then(project => res.json(project))
    //     .catch(err => res.status(400).json(err))
}

// edit a project
module.exports.editProject = (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}

// delete a project
module.exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}


// get all tasks of a project
module.exports.getAllTasks = (req, res) => {
    Project.findOne({ _id: req.params.projectId }).populate('comments')
        .then(foundProject => res.json(foundProject))
        .catch(err => res.status(400).json(err))
}

