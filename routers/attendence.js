const express = require("express");
const router = new express.Router();
require("../connection/conn");
const attendence=require("../modelsdb/attendence")

router.post("/putAttendence", async (req, res) => {
    try{
        const{courseId,time,attendence}=req.body
        const data = new attendence({
            courseId,
            time,
            attendence
          });
          const saveAttendence = await data.save();
          if(saveAttendence)
          {
            res.json({message:"data saved"})
          }
          else{
            res.json({message:"not saved"})
          }
    }catch(err)
    {
        console.log(err);
    }
});

module.exports = router;
