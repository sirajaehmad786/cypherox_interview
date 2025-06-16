const taskData = require("../models/task");
const message = require("../../config/message.json")
// const redisClient = require("../../config/redisClient");

exports.create = async(req,res)=>{
    try {
        // const cacheKey = "tasks:all";
        const { title,description,status } = req.body;
        const userId = req.user.userId
        
        const existingTitle = await taskData.findOne({ title });
        if(existingTitle){
            return res.status(400).json({ status:false, message: message.TASK.TITLE_EXISTS})
        }
        const task = new taskData({
            title,
            description,
            status,
            assignedUser:userId
        })
        await task.save();
        // await redisClient.del("tasks:all");
        return res.status(201).json({ status:true, message:message.TASK.CREATE,data:task})
    } catch (error) {
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
}

exports.getAllTasks = async(req,res)=>{
    try {
        // const cachedData = await redisClient.get(cacheKey);
        // if (cachedData) {
        //     return res.status(200).json({
        //         status: true,
        //         message: message.TASK.GET_TASKS,
        //         data: JSON.parse(cachedData),
        //         cached: true
        //     });
        // }
        const tasks = await taskData.find().populate('assignedUser','name')
        // await redisClient.set(cacheKey, JSON.stringify(tasks), { EX: 60 }); 
        return res.status(200).json({ status: true, message:message.TASK.GET_TASKS,data:tasks})
    } catch (error) {
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
}

exports.update = async(req,res)=>{
    try {
        const {title,description,status,assignedUser} = req.body;
        const task = await taskData.findByIdAndUpdate(
            req.params.id,
            {title,description,status,assignedUser},
            { new: true }
        )
        if(!task){
            return res.status(404).json({ status:false, message:message.TASK.TASK_NOT_FOUND})
        }
        // await redisClient.del("tasks:all");
        return res.status(200).json({ status:true, message:message.TASK.TASK_UPDATE,data:task})
    } catch (error) {
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
}

exports.delete = async(req,res)=>{
    try {
        const task = await taskData.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).json({ status:false,message:message.TASK.TASK_NOT_FOUND})
        }
        //  await redisClient.del("tasks:all");
        return res.status(200).json({ status: true, message:message.TASK.DELETE_TASK})
    } catch (error) {
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
} 