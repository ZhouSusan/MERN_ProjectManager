const mongoose=require('mongoose');

const TaskSchema= new mongoose.Schema({
    taskName:{
        type:String,
        required:[true,"{PATH} is required"],
        minlength:[3,"{PATH} must be at least 3 characters long"]
    },
    description:{
        type:String,
        required:[true,"{PATH} is required"],
        minlength:[3,"{PATH} must be at least 3 characters long"]
    },
    isComplete : {
        type: Boolean,
        default: false
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }
}, 
{ timestamps: true });

module.exports.Task = mongoose.model('Task', TaskSchema);