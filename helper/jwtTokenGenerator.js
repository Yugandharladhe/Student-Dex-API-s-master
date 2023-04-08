const jwt=require("jsonwebtoken");

module.exports=async (val)=>{
    const token=await jwt.sign("jwt",{_id:val},"mynameisyugandharandiamacoderinbackendgoodenough",{
        expires:Date.now()+50000
    });
    return token;
}