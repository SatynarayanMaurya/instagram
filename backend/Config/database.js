const mongoose = require("mongoose")

exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Data base connected successfully "))
    .catch((error)=>{
        console.log("DB connection failed : ",error )
        process.exit(1);
    })
}