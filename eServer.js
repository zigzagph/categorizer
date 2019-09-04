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
            // buffer the contents of the pdf file
            let dataBuffer = fs.readFileSync(file.destination + file.filename);

            let arr = [];
            
            // parse the contents of the pdf file
            pdf(dataBuffer).then(data => {

                if ( data.info.Author === "CapitalOne" ) {
                    console.log("Capital One Detected");
                } else if ( data.info.Author === "Bank of America" ) {
                    console.log("Bank of America");
           
                    // split the large string into individual lines
                    const strArr = data.text.split("\n");
        
                    // loop over each line in the string array
                    for(const x in strArr){
        
                        // date match
                        const mLine = strArr[x].match(/((\d+\/){2}\d+)(.*)/ig)
                        if ( mLine ) {
        
                            // currency match
                            const mCur = mLine[0].match(/(\d+\,)?(\d*)(\.\d{2})$/ig);
                            // if the current line does not currency match the end of the string
                            if ( !mCur ) {
                                // if the current line does not end with a currency match then
                                // I need to look ahead for the rest of the line data hense the
                                // finishLine method
                                const line = finishLine(strArr, x);
                                arr.push(line);
                                //console.log(line);
                            } else {
                                arr.push(mLine[0]);
                            }
                        }
                    }
        
                    return arr;
        
                } else if ( data.info.Author === "AmEx" ) {
                    console.log("AmEx");
                }
            }).then( arr => {
                console.log("Parsed. Sent back.");
                res.send( arr );

                // delete the uploaded file
                fs.unlinkSync(file.destination + file.filename);
            }).catch( error => {
                console.log("Error: ", error);
            });
            
        }
        
        //return res.status(200).send(req.file);
        // Everything went fine.
      })
});

// this needs to be a recursive function but
// for now this will work
function finishLine(strArr, currentLine){
    return strArr[currentLine] + strArr[Number(currentLine) + 1] + strArr[Number(currentLine) + 2];
}

app.listen(4000, function() {
    console.log('App running on port 4000');
});