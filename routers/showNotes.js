const express = require("express");
const app = express();
const router = new express.Router();
const notes = require("../modelsdb/notes");
const { google } = require("googleapis")
const fs = require("fs")
const path = require("path")
const drive = require("../GoogleAPIs/config")


app.use(express.json());

router.post("/showNotes", async(req, res) => {
    try {
        const { courseId } = req.body
        const fileIds = await notes.find({ courseId })

        fileIds.map(async(ele) => {

            })
            // console.log(fileIds)
        const links = []
        await Promise.all(fileIds.map(async(ele) => {
            const result = await drive.files.get({
                    fileId: ele.notes,
                    fields: "webViewLink, webContentLink"
                })
                // console.log(result.data)
            links.push(result.data)
        }))
        res.json({ links })

    } catch (e) {
        console.log(e);
    }
});

module.exports = router;