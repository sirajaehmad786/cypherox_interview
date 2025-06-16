const userData = require("../models/user");
const message = require("../../config/message.json")
const { hashPassword,comparePassword } = require("../../utils/hashPassword");
const { generateToken } = require("../../utils/jwt")

exports.register = async(req,res)=>{
    try {
        const {name,email,password } = req.body;
        const existingUser = await userData.findOne({ email });
        if(existingUser){
            return res.status(400).json({ status:false, message: message.USER.EMAIL_EXISTS})
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new userData({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ status:true, message:message.USER.USER_REGISTER, data:newUser})
    } catch (error) {
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
}

exports.login = async(req,res)=>{
    try {
        const { email,password } = req.body;
        const loginUser = await userData.findOne({ email })
        if(!loginUser){
            return res.status(401).json({ status:false, message:message.USER.INVALID_CREDENCIAL})
        }
        const isMatch = await comparePassword(password, loginUser.password)
        if(!isMatch){
            return res.status(401).json({ status:false, message:message.USER.INVALID_PASSWORD})
        }
        const token = generateToken(loginUser);
        res.status(200).json({
            status:true,
            message:message.USER.LOGIN_SUCCESS,
            token,
            data:{
                id:loginUser._id,
                name: loginUser.name,
                email: loginUser.email
            }
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ status:false, message:message.ERROR.SERVER})
    }
}