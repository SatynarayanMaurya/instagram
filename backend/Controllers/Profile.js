

const User = require("../Models/userSchema");
const { uploadFileToCloudinary } = require("../Utils/uploadToCloudinary");
require("dotenv").config();

exports.profileDetails = async (req,res)=>{
    try{
        const userId = req.user.userId;

        const userDetails = await User.findById({_id:userId})

        return res.status(200).json({
            success:true,
            message:"Profiles details are fetched successfully",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching profile",
            errorMessage:error.message
        })
    }
}

exports.getAnotherProfileDetails = async(req,res)=>{
    try{
        const userId = req.header("userId")
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }
        const userDetails = await User.findById({_id:userId})

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting another profile details ",
            errorMessage:error.message
        })
    }
}


exports.editProfile = async (req,res)=>{
    try{
        const {bio, phoneNumber, gender} = req.body;
        const profileImage = req.files.image
        const userId = req.user.userId

        if(profileImage){
            const uploadProfileImage = await uploadFileToCloudinary(profileImage,process.env.ALL_USER_PROFILE_IMAGE)
            const updateUser = await User.findByIdAndUpdate({_id:userId},{bio:bio?bio:"null",phoneNumber:phoneNumber?phoneNumber:"null",profilePicture:profileImage?uploadProfileImage.secure_url:"null",gender},{new:true})
            return res.status(200).json({
                success:true,
                message:"Profile Updated successfully",
                updateUser
            })
        }
        else{
            const updateUser = await User.findByIdAndUpdate({_id:userId},{bio:bio?bio:"null",phoneNumber:phoneNumber?phoneNumber:"null",gender},{new:true})
            return res.staus(200).json({
                success:true,
                message:"Profile Updated successfully",
                updateUser
            })
        }

        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in edit the profile",
            errorMessage:error.message
        })
    }
}


exports.suggestedAccount = async (req,res)=>{
    try{
        const suggestedAccounts = await User.find({})
        return res.status(200).json({
            success:true,
            message:"Fetching suggested account successfully",
            suggestedAccounts
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in suggested account fetching",
            errorMesssage:error.message
        })
    }
}