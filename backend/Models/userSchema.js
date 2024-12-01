const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        required:true,
        unique: true,
        validate: {
        validator: function(v) {
            return /^[a-z0-9z_]+$/.test(v); // Regular expression to match lowercase letters and underscores only
        },
        message: props => `${props.value} is not a valid username! Only lowercase letters and underscores are allowed.`,
        },
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    bio:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },

    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],

    createdAt:{
        type:Date,
        default:Date.now()
    },

    profilePicture:{
        type:String
    },
    gender:{
        type:String
    },
    liked:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)