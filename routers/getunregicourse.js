const express = require("express");
const app = express();
const router = new express.Router();
require("../connection/conn");
const Course = require("../modelsdb/registeredcourse");
router.get("/getunregicourse",async(req,res)=>{
    const data=await Course.findOne({RollNo:req.body.RollNo});
    res.send(data);
})