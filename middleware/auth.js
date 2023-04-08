
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const Student=require("../modelsdb/schemastudent");

module.exports=async(req,res,next)=>{
    try{
        const token=req.cookies.auth;
        const verify1=await jwt.verify(token,"thisismystudentmanagementapplicationbasedonexpress");
        console.log(verify1);
        const stud=await Student.findOne({_id:verify1._id});
        // const verify2=await jwt.verify(token,"thisismystudentmanagementapplicationbasedonexpress");
        res.json({
            status:"failed"
        })
    
    
    }catch(err)
    {
        console.log(err);
    }
    next();
}




