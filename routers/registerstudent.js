const express = require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const router = new express.Router();
require("../connection/conn");
const Student = require("../modelsdb/schemastudent");
const Course = require("../modelsdb/registeredcourse");

router.post("/createstudent", async (req, res) => {
  try {
    const data = await Student.findOne({ RollNo: req.body.RollNo });
    if (data==null) {
      //console.log(data);
      const user = new Student(req.body);
      //middleware to hash password
      //middleware to generate token
      const token=await user.generateAuthToken();
      // console.log(user._id.toString());
      // const token=await jwt.sign({_id:user._id.toString()},"thisismystudentmanagementapplicationbasedonexpress");
      console.log(token);
      //user.token=token;

      const createuser = await user.save();

      const schema = new Course({
        RollNo: req.body.RollNo,
        cs3001: "false",
        cs3002: "false",
        cs3003: "false",
        cs3004: "false",
        cs3005: "false",
        cs3006: "false",
        cs3007: "false",
        cs3008: "false",
        cs3009: "false"
      });
      const falsecourse = await schema.save();
      //res.status(201).cookie("jwt",token).json({ status: "Successful" });
      res.cookie("mytoken",token,{
        expires:new Date(Date.now()+10000),
        httpOnly:true
        //secure:true <---it is only for https protocol
      }).json({
        status:"Success"
      })
    } else {
      res.json({ status: "Exists" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
