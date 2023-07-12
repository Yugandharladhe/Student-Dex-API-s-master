const mongoose = require("mongoose");

const innerSchema=new mongoose.Schema({
    attendence:{
        type:Boolean,
        required:true
    },
    studentId:{
        type:String,
        required:true
    }
});

const attendenceSchema = new mongoose.Schema({
  courseId:{
    type:String,
    required:true
  },
  attendence:{
    type:[innerSchema],
    required:true
  },
  time:{
    type:Date,
    required:true
  }
});

const attendenceModel = new mongoose.model("attendence", attendenceSchema);
module.exports = attendenceModel;
