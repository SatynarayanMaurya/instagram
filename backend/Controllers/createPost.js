const Post = require("../Models/postSchema");
const User = require("../Models/userSchema")
const Reel = require("../Models/reelSchema")
const Comment = require("../Models/commentSchema")
const { uploadFileToCloudinary } = require("../Utils/uploadToCloudinary");
require("dotenv").config()

exports.createPost = async (req,res)=>{
    try{
        const {caption}  = req.body;
        const userName = req.user.userName
        if(!caption){
            return res.status(401).json({
                success:false,
                message:"Please give a caption !"
            })
        }

        

        const imageFile = req.files.imageFile;
        if(imageFile.name.split(".")[1] === "jpg" || imageFile.name.split(".")[1] === "jpeg"){
            
            
            const uploadImage = await uploadFileToCloudinary(imageFile,process.env.ALL_POST )

            const userId = req.user.userId;

            const postDetails = await Post.create({caption,userId:userId , media:uploadImage.secure_url,userName:userName})
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{posts:postDetails._id}},{new:true})

            return res.status(200).json({
                success:true,
                message:"Post created successfully",
                post:postDetails,
                updateUser
            })
        }
        else{

            const uploadImage = await uploadFileToCloudinary(imageFile,process.env.ALL_REEL )

            const userId = req.user.userId;
            const reelDetails = await Reel.create({caption,userId:userId , media:uploadImage.secure_url,userName:userName})
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{posts:reelDetails._id}},{new:true})
    
            return res.status(200).json({
                success:true,
                message:"Post created successfully",
                reelDetails,
                
                updateUser
            })
        }

        // const uploadImage = await uploadFileToCloudinary(imageFile,process.env.ALL_POST )

        // const userId = req.user.userId;

        // const postDetails = await Post.create({caption,userId:userId , media:uploadImage.secure_url,userName:userName})
        // const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{posts:postDetails._id}},{new:true})

        // return res.status(200).json({
        //     success:true,
        //     message:"Post created successfully",
        //     post:postDetails,
        //     updateUser
        // })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in creating the post ",
            errorMessage:error.message
        })
    }
}


exports.getAllPost = async(req,res)=>{
    try{
        const allPost = await Post.find({}).populate("userId")
        return res.status(200).json({
            success:true,
            message:"All post are fetched",
            allPost
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting all the post ",
            errorMessage:error.message
        })
    }
}

exports.getSingleUserPost = async(req,res)=>{
    try{
        const userId = req.user.userId;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }
        const allPosts = await Post.find({userId:userId})
        return res.status(200).json({
            success:true,
            message:"All post are fetched successfully",
            allPosts
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting single user Posts",
            errorMessage:error.message
        })
    }
}

exports.getAnotherSingleUserPost = async (req,res)=>{
    try{
        const userId = req.header("userId")
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }
        const allPosts = await Post.find({userId:userId})
        return res.status(200).json({
            success:true,
            message:"All post are fetched successfully",
            allPosts
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting another single user Post",
            errorMessage:error.message
        })
    }
}

exports.getSingleUserReel = async(req,res)=>{
    try{
        const userId = req.user.userId;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }
        const allReels = await Reel.find({userId:userId})
        return res.status(200).json({
            success:true,
            message:"All reel fetched successfully",
            allReels
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting all the reel",
            errorMessage:error.message
        })
    }
}

exports.getAnotherSingleUserReel = async(req,res)=>{
    try{
        const userId = req.header("userId")
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }
        const allReels = await Reel.find({userId:userId})
        return res.status(200).json({
            success:true,
            message:"All reel fetched successfully",
            allReels
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting reel of another account",
            errorMessage:error.message
        })
    }
}

exports.likePost = async (req,res)=>{
    try{
        const {postId} = req.body;
        const userId = req.user.userId;

        if(!postId || !userId){
            return res.status(401).json({
                success:false,
                message:"Required Data is not available"
            })
        }
        const unlike = await User.findById({_id:userId})
        if(unlike.liked.includes(postId)){
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$pull:{liked:postId}},{new:true})
            const updatePost = await Post.findByIdAndUpdate({_id:postId},{$pull:{likes:userId}},{new:true})
            return res.status(200).json({
                success:true,
                message:"Post unlike successFully",
                updatePost,
                updateUser
            })
        }
        else{
            const updatePost = await Post.findByIdAndUpdate({_id:postId},{$push:{likes:userId}},{new:true})
            const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{liked:postId}},{new:true})
            return res.status(200).json({
                success:true,
                message:"Post liked successFully",
                updatePost,
                updateUser
            })
        }

       
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in like the post ",
            errorMessage:error.message
        })
    }
}

exports.likeReel = async (req,res)=>{
    try{
        const {reelId} = req.body;
        const userId = req.user.userId;
        if(!reelId){
            return res.staus(401).json({
                success:false,
                message:"Reel Id not found "
            })
        }
        const unlike = await User.findById({_id:userId})
        if(unlike?.liked?.includes(reelId)){
            await User.findByIdAndUpdate({_id:userId},{$pull:{liked:reelId}})
            await Reel.findByIdAndUpdate({_id:reelId},{$pull:{likes:userId}})
            return res.status(200).json({
                success:true,
                message:"Reel Unliked",
            })
        }
        else{
            await User.findByIdAndUpdate({_id:userId},{$push:{liked:reelId}})
            await Reel.findByIdAndUpdate({_id:reelId},{$push:{likes:userId}})
            return res.status(200).json({
                success:true,
                message:"Reel Liked",
            })
        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in liking the reel",
            errorMessage:error.message
        })
    }
}

// create comment on the post only 
exports.createComment = async(req,res)=>{
    try{
        const {postId, commentBody} = req.body;
        if(!postId || !commentBody){
            return res.status(401).json({
                success:false,
                message:"Post id or comment body are not found"
            })
        }
        const userId = req.user.userId;
        const updateCommentSchema = await Comment.create({userId,postId,comment:commentBody})
        const updatePost = await Post.findByIdAndUpdate({_id:postId},{$push:{comments:updateCommentSchema._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Comment created successfully",
            updatePost,
            updateCommentSchema
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in creating the comment",
            errorMessage:error.message
        })
    }
}

// create comment on the reel only 
exports.createCommentOnReel = async(req,res)=>{
    try{
        const {reelId, commentBody} = req.body;
        if(!reelId){
            return res.status(401).json({
                success:false,
                message:"Reel Id not found"
            })
        }
        if(!commentBody){
            return res.status(401).json({
                success:false,
                message:"Comment body not found"
            })
        }

        const userId = req.user.userId;

        const createComment = await Comment.create({postId:reelId,userId,comment:commentBody})
        const reelDetails = await Reel.findByIdAndUpdate({_id:reelId},{$push:{comments:createComment._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Comment created successFully",
            reelDetails

        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in creating comment ",
            errorMessage:error.message
        })
    }
}


exports.getSinglePostDetails = async(req,res)=>{
    try{
        const postId = req.header("postId")
        if(!postId){
            return res.status(401).json({
                success:false,
                message:"Post id not found"
            })
        }
        const postDetails = await Post.findById({_id:postId}).populate("userId").populate({
            path: "comments", // Populate posts array from User schema
            populate: {
              path: "userId", 
              model: "User",
            }})
        return res.status(200).json({
            success:true,
            message:"Post Details are fetched successfully",
            postDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in finding the single post details",
            errorMessage:error.message
        })
    }
}

exports.getSingleReelDetails = async (req,res)=>{
    try{
        const reelId = req.header("reelId")
        if(!reelId){
            return res.status(401).json({
                success:false,
                message:"Reel Id not found"
            })
        }

        const reelDetails = await Reel.findById({_id:reelId}).populate({path: 'comments', populate: { path: 'userId', },})
        return res.status(200).json({
            success:true,
            message:"Reel detailed fetched successfully",
            reelDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting single reel details",
            errorMessage:error.message
        })
    }
}


exports.getAllReels = async (req,res)=>{
    try{
        const allReels = await Reel.find({}).populate("userId")
        return res.status(200).json({
            success:true,
            message:"All reel fetched",
            allReels
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting all the reels",
            errorMessage:error.message
        })
    }
}