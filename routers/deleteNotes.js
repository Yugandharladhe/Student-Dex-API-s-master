const express = require("express");
const app = express();
const router = new express.Router();
const notes = require("../modelsdb/notes");
const drive=require("../GoogleAPIs/config")
const fs=require("fs")
const path=require("path")


app.use(express.json());

router.delete("/deleteNotes",async (req, res) => {
  try {
    const{id}=req.body
    const resp=await drive.files.delete({
        fileId:id
    })
    console.log(resp.status)
    if(resp.status===204){
        await notes.deleteOne({notes:id})
        res.json({status:"succeessfull"})
    }
    else{
        res.json({status:"unsuccessfull"})
    }
  } catch (e) {
    console.log(e);
    res.json({status:"unsuccessfull"})
  }
});

module.exports = router;
