// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/studentdex")
//   .then((e) => {
//     console.log("connection successfully");
//   })
//   .catch((e) => {
//     console.log("failed");
//     console.log(e);
//   });
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost:27017/studentdex"
  )
  .then(() => {
    console.log("connection successfully");
  })
  .catch((e) => {
    mongoose.connect("mongodb://localhost:27017/studentdex").then(()=>{
      console.log("Connection to local Database");
    }).catch((e)=>{
      console.log("Connection failed to local Database");
    })
  });
