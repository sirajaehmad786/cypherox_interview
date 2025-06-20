const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        password:{
            type: String,
            required: true
        },
        isDelete:{
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

const userData = mongoose.model("userData",userSchema);
module.exports = userData;