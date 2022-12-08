const express=require("express");
const app=express();
const router=new express.Router();
require("../connection/conn");
const Student=require("../modelsdb/schemastudent");

app.use(express.json());

router.post("/getAuthenticateStudent",async(req,res)=>{
    try{
        const data=await Student.findOne({RollNo:req.body.RollNo}).select({__v:0,_id:0});
        console.log(data);
        if(data==null)
        {
            res.json({
                message:"false"
            });
            console.log(data);
        }
        else if(data.Password==req.body.Password)
        {
            res.send(data);
        }
        else{
            res.send("false");
        }
    }
    catch(e)
    {
        console.log(e);
    }
    
})

module.exports=router;