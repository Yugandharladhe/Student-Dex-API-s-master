const express=require("express");
const app=express();
const router=new express.Router();
require("../connection/conn");
const Courses=require("../modelsdb/registeredcourse");

app.use(express.json());

router.post("/registercourse",async(req,res)=>{
    try
    {
        if(req.body.semester==5)
        {
            const reg=await Courses.findOne({RollNo:req.body.RollNo});
            if(reg.flag=="false")
            {
                const origin=await Courses.deleteOne({RollNo:req.body.RollNo});
                const data=new Courses({
                    RollNo:req.body.RollNo,
                    cs3001:[req.body.cs3001,'Design and analysis of algorithm'],
                    cs3002:[req.body.cs3002,'Operating System'],
                    cs3003:[req.body.cs3003,'Theory of computation'],
                    cs3004:[req.body.cs3004,'Software Engineering'],
                    cs3005:[req.body.cs3005,'Data Mining and Warehousing'],
                    cs3006:[req.body.cs3006,'Lab Design and analysis of algorithm'],
                    cs3007:[req.body.cs3007,'lab Operating System'],
                    cs3008:[req.body.cs3008,'Lab Data Mining and Warehousing'],
                    cs3009:[req.body.cs3009,'Mini Project'],
                    flag:"true"
                })
                
                const course=new Courses(data);
                const metadata=await course.save();
                console.log("data saved");
                
                
                res.send("true");
            }
            else
            {
                res.send("false");
            }
        }
        else{
            res.json({
                status:'unavailable'
            })
        }
        
        
    }catch(e)
    {
        console.log(e);
    }
    
})

module.exports=router;
