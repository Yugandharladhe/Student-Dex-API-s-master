const express=require("express");
const router=new express.Router();
require("../connection/conn");
const Student=require("../modelsdb/schemastudent");
const Course=require("../modelsdb/registeredcourse");




router.post("/createstudent",async (req,res)=>{
    try{
        const data=await Student.findOne({RollNo:req.body.RollNo});
        if(data==null)
        {
            const user=new Student(req.body);
            const createuser=await user.save();

        
            const schema=new Course({
                RollNo:req.body.RollNo,
                cs3001:["false","cs3001"],
                cs3002:["false","cs3002"],
                cs3003:["false","cs3003"],
                cs3004:["false","cs3004"],
                cs3005:["false","cs3005"],
                cs3006:["false","cs3006"],
                cs3007:["false","cs3007"],
                cs3008:["false","cs3008"],
                cs3009:["false","cs3009"],
                flag:"false"
            })
            const falsecourse=await schema.save();
            res.status(201).send("true");
            console.log("data saved sucessfully...");
        }
        else
        {
            res.send("false");
        }
    }catch(e)
    {
        res.status(400).send(e);
    }
})

module.exports=router;