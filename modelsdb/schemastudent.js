const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const studentSchema = new mongoose.Schema({
  FirstName: {
    type: String,

    minlength: 3,
  },
  LastName: {
    type: String,

    minlength: 3,
  },
  Gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  YearOfAddmission: {
    type: String,
  },
  Mobile: {
    type: Number,

    min: 10,
  },
  Branch: {
    type: String,
  },
  RollNo: {
    type: String,
  },
  Password: {
    type: String,
    required:true
  },
  Nationality: {
    type: String,
    default: "",
  },
  Mail: {
    type: String,
    default: "",
  },
  City: {
    type: String,
    default: "",
  },
  Attendence: {
    type: String,
    default: "",
  },
  PhysicallyHandicap: {
    type: String,
    default: "",
  },
  Religion: {
    type: String,
    default: "",
  },
  Address: {
    type: String,
    default: "",
  },
  CGPA: {
    type: String,
    default: "",
  },
  CSEM: {
    type: String,
    default: "",
  },
  Category: {
    type: String,
    default: "",
  },
});

studentSchema.pre('save',async function(next){
  if(this.isModified("Password"))
  {
      console.log("hii form middleware");
      this.Password=await bcrypt.hash(this.Password,12);
  }
  next();
});


//$2a$12$Pzwpno440ZqfDQpuVTi/zeX0jKVowRauMOIsz4Zy8nuPgXxfxx6zS

const userdetails = new mongoose.model("userdetails", studentSchema);

module.exports = userdetails;



