const { default: mongoose } = require("mongoose");
const { Task} = require("../models/task.model")
const { Project } = require("../models/project.model")

module.exports.allTasks = (req, res) => {
    Task.find()
        .then(tasks=>res.json(tasks))
        .catch(err=>res.status(400).json(err))
}


// get all comments of a job
module.exports.tasksOfOneProject = (req, res) => {
    Task.find({project: req.params.projectId})
        .then(tasks=>res.json(tasks))
        .catch(err=>res.status(400).json(err))
}


// add a task
module.exports.addTask = (req, res) => {
    const projectId = req.params.projectId
    const newTask = new Task(req.body)
    newTask.project = projectId
    newTask.save()
        .then(task=>{
            const project = Project.findOne({_id: projectId})
                .then(foundProject=>{
                    foundProject.tasks.push(newTask)
                    foundProject.save()
                        .then(response=>res.json(response))
                })
        })
        .catch(err=>res.status(400).json(err))
}

// add a task
module.exports.addTask2 = async(req, res) => {
    try{
        const newTask = new Task(req.body)
        newTask.project = req.params.projectId
        await newTask.save()
    
        const project = await Project.findOne({_id:req.params.projectId})
        project.tasks.push(newTask)
        await project.save()
        
        res.json(newTask)
    }catch(err){
        res.status(400).json(err)
    }

}

// edit a task
module.exports.editTask = (req, res) => {
    Task.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}

module.exports.oneTask = (req, res) => {
    console.log(req.params.id)
    Task.findById(mongoose.Types.ObjectId(req.params.id))
        .then(oneTask => res.json(oneTask))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}
