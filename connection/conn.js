const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentdex").then(()=>{
    console.log("connection successfully");
}).catch((e)=>{
    console.log("failed");
});