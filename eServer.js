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
    
    fs.readFile('./example.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.send(data);
    })
    
    //return res.send('Hello Server')
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

        // create an array of promises
        const buffers = req.files.map(f => {
            let dataBuffer = fs.readFileSync(f.destination + f.filename);
            return pdf(dataBuffer);
        })

        // run all of the promises
        Promise.all(buffers).then(data => {
            // delete the uploaded files
            req.files.forEach(f => fs.unlinkSync(f.destination + f.filename));
            
            // array to place the data after being parsed
            let arrayOfFiles = [];

            // loop to parse the data
            for(const file of data) {
                let arrayOfLines = [];
                let pdfObj = {};

                // set some of the return obj properties
                pdfObj.author = file.info.Author;
                pdfObj.pages = file.numpages;
                pdfObj.skipped = 0;

                if ( pdfObj.author === "CapitalOne" ) {
                    console.log("Capital One Detected");
                } else if ( pdfObj.author === "Bank of America" ) {
                    console.log("Bank of America");
        
                    // split the large string into individual lines
                    const strArr = file.text.split("\n");
                    pdfObj.total = strArr.length;

                    // loop over each line and construct complete lines
                    // from the string array
                    for(const x in strArr){

                        // skip the interest earned lines. dont need that data
                        if ( strArr[x].match(/^(?:\d+\/\d+\/\d+)(Interest\sEarned)(.*)/g) ) {
                            pdfObj.skipped += 1;
                            continue;
                        }

                        // extract the statements month range
                        const encompass = strArr[x].match(/^for\s(\w+\s\d{2}\,\s\d{4})\sto\s(\w+\s\d{2}\,\s\d{4})$/);
                        if ( encompass ) {
                            //console.log("Encompass: ", encompass);
                            pdfObj.startMonth = encompass[1];
                            pdfObj.endMonth = encompass[2];
                        }

                        // ^ date match
                        const dateMatch = strArr[x].match(/^(\d{2}\/\d{2}\/\d{2})(.*)/ig);
                        // if there is a date at the beginning of the line then we can 
                        // conclude that this is a debt or dep line
                        if ( dateMatch ) {

                            // $ currency match
                            const mCur = dateMatch[0].match(/(\d+\,)?(\d*)(\.\d{2})$/ig);
                            
                            // next we check to see if the end of the line has a currency,
                            // if there is no currency then the line is not complete and will
                            // have to look ahead to complete the line

                            // if the current line is not complete
                            if ( !mCur ) {
                                // if the current line does not end with a currency match then
                                // I need to look ahead for the rest of the line data hense the
                                // finishLine method to complete the line
                                const line = finishLine(strArr, x);
                                
                                // push the complete line into the array
                                arrayOfLines.push(line);
                            } else {
                                // the line is complete push the line into the array
                                arrayOfLines.push(dateMatch[0]);
                            }
                        }
                    }

                    // the total number of complete lines
                    pdfObj.complete = arrayOfLines.length;

                    // construct the return obj
                    let rtnObj = {
                        ...pdfObj,
                        ...parseBofA(arrayOfLines)
                    }

                    // delete the uploaded file
                    //fs.unlinkSync(file.destination + file.filename);

                    // write out the file
                    // fs.writeFile('./example.txt', JSON.stringify(rtnObj), (err) => {
                    //     if (err) {
                    //         console.log(err);
                    //         return;
                    //     }
                    //     console.log("File created");
                    // })

                    // next then
                    //return rtnObj;
                    arrayOfFiles.push(rtnObj);

                } else if ( pdfObj.author === "AmEx" ) {
                    console.log("AmEx");
                }
            }

            // return the array of parsed data
            return arrayOfFiles;

        }).then( array => {
            //console.log("Array:", array);

            // return the data
            //res.send( array );

            // reduces and restructures the data array
            // to make it easier on the front end
            const rtn = array.reduce((a, c, i, ar) => {
                !a ? c : a = {
                    author: c.author,
                    checks: Number(a.checks + c.checks),
                    complete: Number(a.complete + c.complete),
                    debits:  Number(a.debits + c.debits),
                    debts: [...a.debts, ...c.debts],
                    deposits: Number(a.deposits + c.deposits),
                    endMonth: c.endMonth,
                    pages: Number(a.pages + c.pages),
                    skipped: Number(a.skipped + c.skipped),
                    startMonth: ar[0].startMonth,
                    total: Number(a.total + c.total),
                    withdrawls: Number(a.withdrawls + c.withdrawls)
                }
                return ({...a});
            });

            //console.log("RTN:",rtn);

            res.send( rtn );

        }).catch( error => {
            console.log("Error: ", error);
            // return the error
            res.send( error );
        });
    })
});

// this needs to be a recursive function but
// for now this will work
function finishLine(strArr, currentLine){
    return strArr[currentLine] + strArr[Number(currentLine) + 1] + strArr[Number(currentLine) + 2];
}

// parse the BofA pdf statements
// they are not perfect regex expressions but the 
// matches get me the data I seek
function parseBofA(lineArray){
    //console.log("Line:",line);

    // object to return
    let parsedObj = {
        withdrawls: 0,
        checks: 0,
        debits: 0,
        debts: []
    }

    // loop over each complete line
    for(const line of lineArray) {
    
        // first check to make sure its a debit
        // the pattern below finds currency on the end
        // prefixed with a minus sign
        const purchase = line.match(/\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
        if ( purchase && purchase[0] !== "-0.00" ) {
            //console.log("purchase:",purchase[0]);

            // withdrawls
            const withdrawl = line.match(/^(\d{2}\/\d{2}\/\d{2})(.*(w|W)ithdrawal.*)(\-(\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            if ( withdrawl ) {
                let debt = {
                    type: "withdrawl",
                    date: withdrawl[1],
                    desc: withdrawl[2],
                    amount: withdrawl[4],
                    filtered: true
                }
                
                // increment the withdrawl count
                parsedObj.withdrawls += 1;

                // add the debt to the debt array
                parsedObj.debts.push(debt);
                
                // continue the for loop
                continue;
            }

            // checks
            const check = line.match(/^(\d{2}\/\d{2}\/\d{2})(\d{4})(\-(\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            if ( check ) {
                let debt = {
                    type: "check",
                    date: check[1],
                    desc: check[2],
                    amount: check[3],
                    filtered: true
                }

                // increment the checks count
                parsedObj.checks += 1;

                // add the debt to the debt array
                parsedObj.debts.push(debt);
                
                // continue the for loop
                continue;
            }

            // Debit, checkcard, payments
            const match = line.match(/^(\d{2}\/\d{2}\/\d{2})(.*)\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            let debt = {
                type: "debit",
                date: match[1],
                desc: match[2],
                amount: purchase[0],
                filtered: true
            }

            // increment the debit count
            parsedObj.debits += 1;

            // add the debt to the debt array
            parsedObj.debts.push(debt);
        }
    }

    // calculate the number of deposit lines
    parsedObj.deposits = lineArray.length - (parsedObj.debts.length - 1);

    return parsedObj;
}

app.listen(4000, function() {
    console.log('API Server running on port 4000');
});