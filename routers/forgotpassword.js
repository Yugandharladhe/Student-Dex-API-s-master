const express=require("express");
const Student = require("../modelsdb/schemastudent");
const app = express();
const router = new express.Router();

router.post("/forgotpassword",async(req,res)=>{
    const stud=await Student.findOne({RollNo:req.body.RollNo});
    if(stud)
    {
        const upd=await Student.updateOne({RollNo:req.body.RollNo},{$set:{Password:req.body.Password}});
        res.json({
            status:"success"
        })
    }
    else{
        res.json({
            status:"failed"
        })
    }
})

module.exports=router;