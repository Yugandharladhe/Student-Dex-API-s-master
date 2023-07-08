const express = require("express");
const app = express();
const router = new express.Router();
const notes = require("../modelsdb/notes");
const drive=require("../GoogleAPIs/config")
const multer=require("multer")
const fs=require("fs")
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload=multer({storage:storage})
app.use(express.json());

router.post("/putNotes",upload.single("notes"), async (req, res) => {
  try {
    console.log(req.file)
    const filePath=path.join(__dirname,"../uploads/"+req.file.filename)
    console.log(filePath)
    const resp=await drive.files.create({
        requestBody:{
            name:req.file.filename,
            mimetype:req.file.mimetype
        },
        media:{
            mimeType:req.file.mimetype,
            body:fs.createReadStream(filePath)
        }
    })
    console.log(resp.data)
    const dataSave=await notes.create({
        courseId:req.body.courseId,
        notes:resp.data.id
    })
    if(dataSave)
    {
        await drive.permissions.create({
            fileId:resp.data.id,
            requestBody:{
                role:"reader",
                type:"anyone"
            }
        })
        const remove=fs.unlinkSync(filePath)
        res.json({data:"uploaded",id:resp.data.id})
    }
    else{
        res.json({data:"not uploaded"})
    }
    
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
