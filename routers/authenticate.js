const express = require("express");
const app = express();
const router = new express.Router();
require("../connection/conn");
const Student = require("../modelsdb/schemastudent");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cookiePraser=require("cookie-parser");

app.use(express.json());

router.post("/getAuthenticateStudent", async (req, res) => {
  try {
    const data = await Student.findOne({ RollNo: req.body.RollNo });
    //console.log(data);
    if (data == null) {
      res.status(400).json({
        status: "Unavailable",
      });
    } else if (await bcrypt.compare(req.body.Password,data.Password)) {
      //res.status(200).cookie("jwt",await jwt.sign(data._id.toString(),"mynameisyugandharladheandiamacoderinbackend")).json({status:"success"});
      const token=await data.generateAuthToken();
      //console.log(token);
      res.cookie("auth",token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true
      }).json({
        status:"Success"
      });
    } else {
      res.status(500).json({ status: "Invalid" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
