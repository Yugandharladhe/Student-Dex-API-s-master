const express = require("express");
const app = express();
require("../connection/conn");
const Courses = require("../modelsdb/registeredcourse");
const router = new express.Router();

app.use(express.json());

router.post("/getcourses", async (req, res) => {
  const data = await Courses.findOne({ RollNo: req.body.RollNo });
  const arr=[]
  if(data==null)
  {
    res.send("false");
  }
  else if(data.flag=="true")
  {
    if(data.cs3001=="true")
    {
      arr.push("cs3001");
    }
    if(data.cs3002=="true")
    {
      arr.push("cs3002");
    }
    if(data.cs3003=="true")
    {
      arr.push("cs3003");
    }
    if(data.cs3004=="true")
    {
      arr.push("cs3004");
    }
    if(data.cs3005=="true")
    {
      arr.push("cs3005");
    }
    if(data.cs3006=="true")
    {
      arr.push("cs3006");
    }
    if(data.cs3007=="true")
    {
      arr.push("cs3007");
    }
    if(data.cs3008=="true")
    {
      arr.push("cs3008");
    }
    if(data.cs3009=="true")
    {
      arr.push("cs3009");
    }
    const d2={
      courses:arr
    }
    res.send(d2);
  }
  else
  {
    res.send("false");
  }
  
});

module.exports = router;
