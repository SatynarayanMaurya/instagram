const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.isAuth = async(req,res,next)=>{
    try{
        const token = req.header("Authorization").split(" ")[1];


        // decode the token 
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in isAuth middleware",
            errorMessage:error.message
        })
    }
}