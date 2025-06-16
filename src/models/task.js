const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    status:{
        type: String,
        enum:['To-Do','In Progress','Done'],
        default:'To-Do'
    },
    assignedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userData'
    },
},{timestamps: true}
)

const taskData = mongoose.model("taskData",taskSchema);
module.exports = taskData;