const User = require("../Models/userSchema")

exports.followingUser = async(req,res)=>{
    try{
        const {followingUserId} = req.body;
        if(!followingUserId){
            return res.status(401).json({
                success:false,
                message:"User not fount which you have to follow"
            })
        }

        const userId = req.user.userId;
        const checkAlreadyFollow = await User.findOne({_id:userId,following:followingUserId})
        if(checkAlreadyFollow){
            const updateFollowingUser = await User.findByIdAndUpdate({_id:followingUserId},{$pull:{followers:userId}},{new:true})
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$pull:{following:followingUserId}},{new:true})
            return res.status(200).json({
                success:true,
                message:"Unfollow successful",
                updateFollowingUser,
                updateUser
            })
        }
        else{
            const updateFollowingUser = await User.findByIdAndUpdate({_id:followingUserId},{$push:{followers:userId}},{new:true})
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{following:followingUserId}},{new:true})
            return res.status(200).json({
                success:true,
                message:"Follow successful",
                updateFollowingUser,
                updateUser
            })

        }

        

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in following the user",
            errorMessage:error.message
        })
    }
}
