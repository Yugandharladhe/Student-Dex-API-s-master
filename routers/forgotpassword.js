const express=require("express");
const Student = require("../modelsdb/schemastudent");
const app = express();
const router = new express.Router();
const bcrypt=require("bcryptjs");

router.post("/forgotpassword",async(req,res)=>{
    const stud=await Student.findOne({RollNo:req.body.RollNo});
    if(stud)
    {
        //$2a$12$6ZSJ3fOlGZEF1bxbD2fBzutns38S7VZ2opiGiANc0UJCJHFx75GI2
        //$2a$12$6ZSJ3fOlGZEF1bxbD2fBzutns38S7VZ2opiGiANc0UJCJHFx75GI2
        const pass=await bcrypt.hash(req.body.Password,12);
        //console.log(data);
        const upd=await Student.updateOne({RollNo:req.body.RollNo},{$set:{Password:pass}});
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