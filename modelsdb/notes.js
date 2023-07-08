const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  courseId:{
    type:String,
    required:true
  },
  notes:{
    type:String,
    required:true
  }
});

const notesModel = new mongoose.model("notes", notesSchema);
module.exports = notesModel;
