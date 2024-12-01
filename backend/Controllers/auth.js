const User = require("../Models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async (req,res)=>{
    try{
        const {userName , email, password, fullName, bio} = req.body;

        if(!userName || !email || !password ){
            return res.status(401).json({
                success:false,
                message:"All fields are required!"
            })
        }

        // Check the email is already exist or not 
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(401).json({
                success:false,
                message:"User already exist !"
            })
        }

        // check the userName is exist with the same name or not 
        const existingUserName = await User.findOne({userName})
        if(existingUserName){
            return res.status(401).json({
                success:false,
                message:"Choose another userName !"
            })
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password , 10);
        // console.log("Your hashed password is : ", hashedPassword)

        // Create the data base entry of the new user 
        const userDetails = await User.create({email,userName,password:hashedPassword, bio : bio ? bio :"null",profilePicture:"null"})

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user:userDetails
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while sign up !",
            errorMessage:error.message
        })
    }
}



exports.login = async (req,res)=>{
    try{
        const {userName, password } = req.body;

        if(!userName || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required !"
            })
        }

        // Check the user is present or not
        const existingUser = await User.findOne({userName})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered !"
            })
        }

        // check the password is correct or not
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(matchPassword){
            const token = await jwt.sign({
                email:existingUser.email,
                userId:existingUser._id,
                userName:existingUser.userName
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
            )

            const options = {
                expires: new Date(Date.now() + 2*3600),
                Credential:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"user Logged in successfully",
                user:existingUser,
                token:token
            })


        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect !"
            })
        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while login to the user",
            errorMessage:error.message
        })
    }
}