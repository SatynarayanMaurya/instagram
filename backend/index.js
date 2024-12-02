const express = require("express")
const app = express();
require("dotenv").config();
const database = require("./Config/database")
const routes = require("./Routes/routes")
const fileUpload = require("express-fileupload")
const cloudinary = require("./Config/cloudinary")
const cors = require("cors")
const port = process.env.PORT
// data base connection 
database.connect();
cloudinary.connect()


// Middlewares
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json())
const options = {
    origin:"http://localhost:3000" || "http://192.168.137.1:3000" || "instagram-umber-psi.vercel.app",
    credential:true
}
app.use(cors())


// Routes
app.use("/api/v1/",routes)



// Get request
app.get("/",(req,res)=>{
    res.send(`<h1>Hello from backend</h1>`)
})


// listen on  the port 
app.listen(port, (req,res)=>{
    console.log("App is running")
})
