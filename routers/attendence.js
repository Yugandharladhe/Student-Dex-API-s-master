const express=require("express");
const router=new express.Router();
require("../connection/conn");
const Student=require("../modelsdb/schemastudent");
const Course=require("../modelsdb/registeredcourse");
const Teacher=require("../modelsdb/teacherregister");
const attendence=require("../modelsdb/attendence");

router.post("/putAttendence",async(req,res)=>{
    const attendence=req.body.Attendence;
    res.send(attendence);
})

module.exports=router;