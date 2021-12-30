//create a server
const express = require('express');
const app = express();

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
   console.log(req.file, req.body)
});

app.listen('8000', () => {

    console.log("server is up on port 8000");

})