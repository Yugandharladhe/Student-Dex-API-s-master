const express = require("express");
const router = new express.Router();
require("../connection/conn");
const Student = require("../modelsdb/schemastudent");

router.get("/getAllStudent", async (req, res) => {
  try {
    const data = await Student.find({}).select({
      Password: 0,
      __v: 0,
      _id: 0,
    });
    console.log(data)
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
