const express = require("express");
const auth=require("./middleware/auth");
var cors = require("cors");
const app = express();

require("./connection/conn");
const Student = require("./modelsdb/schemastudent");
const courseregister = require("./routers/registerstudent");
const updatestudent = require("./routers/updatedetails");
const deletestudent = require("./routers/deletestudent");
const getstudent = require("./routers/getdetail");
const authenticate = require("./routers/authenticate");
const registercourse = require("./routers/registeredcourse");
const getcourse = require("./routers/getCourse");
const teachregi = require("./routers/registerteacher");
const attendence = require("./routers/attendence");
const teacherdetails = require("./routers/getteacherdetails");
const showcoursestudent = require("./routers/showcoursestudent");
const authteach = require("./routers/authenticateteach");
const countuser = require("./routers/countusers");
const forgotpassword=require("./routers/forgotpassword");
//const user = require("./routers/getunregicourse");
const getAllStudent=require("./routers/getAllStudent");
app.use(cors());
app.use(express.json());
app.use("/user",courseregister);
app.use(updatestudent);
app.use(deletestudent);
app.use(getstudent);
app.use(authenticate);
app.use(registercourse);
app.use(getcourse);
app.use(teachregi);
app.use(attendence);
app.use(teacherdetails);
app.use(showcoursestudent);
app.use(authteach);
app.use(countuser);
app.use(forgotpassword);
app.use(getAllStudent);
//app.use(user);

const middleware=async (req,res,next)=>{
  if(parseInt(req.body.age)<18)
  {
    req.body.age=false;
    next();
  }
  else{
    req.body.age=true;
    next();
  }
}

// app.get("/home",auth,async(req,res)=>{
//   res.send("hot");
// })

// const jwt=require("jsonwebtoken");
// var token;
// const createToken=async()=>{
//   var token=await jwt.sign({_id:"1234567890yugandhar"},"mynameisyugandharladheandiamcoder",{
//     expiresIn:"3 minutes"
//   });
//   console.log(token);
//   console.log("---------------------------------------------------------------");
//   const status=await jwt.verify(token,"mynameisyugandharladheandiamcoder");
//   console.log(status);
// }

// createToken();



app.listen(1000, () => {
  console.log("Connection is at 1000 port");
});
