const express = require("express");
const app = express();
const router = new express.Router();
require("../connection/conn");
const Student = require("../modelsdb/schemastudent");
const bcrypt=require("bcryptjs");

app.use(express.json());

router.post("/getAuthenticateStudent", async (req, res) => {
  try {
    const data = await Student.findOne({ RollNo: req.body.RollNo }).select({
      __v: 0,
      _id: 0,
    });
    if (data == null) {
      res.status(400).json({
        status: "Unavailable",
      });
    } else if (await bcrypt.compare(req.body.Password,data.Password)) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ status: "Invalid" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
