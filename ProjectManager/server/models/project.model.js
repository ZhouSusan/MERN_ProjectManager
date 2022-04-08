const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:[true,"{PATH} is required"],
        minlength:[3,"{PATH} must be at least 3 characters long"]
    },
    description:{
        type:String,
        required:[true,"{PATH} is required"],
        minlength:[3,"{PATH} must be at least 3 characters long"]
    },
    priority:{
        type:String,
        required:[true,"{PATH} is required"]
    },
    status:{
        // if ture: it means project is completed
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }],
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    teammates : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
}, 
{ timestamps: true });

module.exports.Project = mongoose.model('Project', ProjectSchema);