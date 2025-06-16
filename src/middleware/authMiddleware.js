const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config();

const authMiddleware = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if(!token){
            return res.status(401).json({
                status: false,
                message:"Access denided"
            })
        }
        const verified = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET
        );
        
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message:"Token expires"
        })
    }
}

module.exports = { authMiddleware }