const mongoose = require("mongoose")


const reelSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userName:{
        type:String
    },
    caption:{                   // small description about the post 
        type:String,
        // required:true
    },
    media:{
        type:String,
        // required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Reel", reelSchema)