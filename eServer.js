var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
const fs = require('fs');
const pdf = require('pdf-parse');

app.use(cors())

// Location to store the file(s)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
})
  
var upload = multer({ storage: storage }).array('file')
  
// ============================ Routes ============================

// Root
app.get('/',function(req,res){
    return res.send('Hello Server')
})

// API : /upload
app.post('/upload',function(req, res) {
    
    upload(req, res, function(err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 

        // iterate over each pdf file
        for (const file of req.files) {
            let dataBuffer = fs.readFileSync(file.destination + file.filename);
            pdf(dataBuffer).then(data => {
                // number of pages
                // console.log(data.numpages);
                // number of rendered pages
                // console.log(data.numrender);
                // // PDF info
                //console.log(data.info);
                //console.log(data.info.Author);

                if ( data.info.Author === "CapitalOne" ) {
                    console.log("Capital One Detected");
                } else if ( data.info.Author === "Bank of America" ) {
                    console.log("Bank of America");
                    console.log(data.text);
                } else if ( data.info.Author === "AmEx" ) {
                    console.log("AmEx");
                }

                // // PDF metadata
                //console.log(data.metadata); 
                // // PDF.js version
                // // check https://mozilla.github.io/pdf.js/getting_started/
                //console.log(data.version);
                // // PDF text
                //console.log(data.text); 
            }).then(() => {
                // delete the file
                fs.unlinkSync(file.destination + file.filename);
            })

        }
        
        return res.status(200).send(req.file);
        // Everything went fine.
      })
});

app.listen(4000, function() {
    console.log('App running on port 4000');
});