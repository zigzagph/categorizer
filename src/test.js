'use strict'
const fs = require('fs');
const pdf = require('pdf-parse');
 

//parseFile('./test/eStmt_2017-01-27.pdf')
//parseFile('./test/eStmt_2017-02-24.pdf')
parseFile('./test/eStmt_2017-03-29.pdf')

function parseFile(pdfFile) {
    // read the uploaded pdf file
    let dataBuffer = fs.readFileSync(pdfFile);

    // parse the pdf data
    pdf(dataBuffer).then(data => {

        let arrayOfLines = [];
        let pdfObj = {};

        // set some of the return obj properties
        pdfObj.author = data.info.Author;
        pdfObj.pages = data.numpages;
        pdfObj.skippedLines = 0;

        if ( data.info.Author === "CapitalOne" ) {
            console.log("Capital One Detected");
        } else if ( data.info.Author === "Bank of America" ) {
            console.log("Bank of America");
   
            // split the large string into individual lines
            const strArr = data.text.split("\n");
            pdfObj.totalLines = strArr.length;

            // loop over each line and construct complete lines
            // from the string array
            for(const x in strArr){

                // skip the interest earned lines. dont need that data
                if ( strArr[x].match(/^(?:\d+\/\d+\/\d+)(Interest\sEarned)(.*)/g) ) {
                    pdfObj.skippedLines += 1;
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
                const dateMatch = strArr[x].match(/((\d+\/){2}\d+)(.*)/ig)
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
            pdfObj.completeLines = arrayOfLines.length;

            // construct the return obj
            let rtnObj = {
                ...pdfObj,
                ...parseBofA(arrayOfLines)
            }

            // next then
            return rtnObj;

        } else if ( data.info.Author === "AmEx" ) {
            console.log("AmEx");
        }
    }).then( obj => {
        console.log(obj);
    }).catch( error => {
        console.log("Error: ", error);
    });

}

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
            //const withdrawl = line.match(/^(\d+\/\d+\/\d+)(Customer\s\w+(?:\s\w+))\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            const withdrawl = line.match(/^(\d+\/\d+\/\d+)(.*(w|W)ithdrawal.*)\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            if ( withdrawl ) {
                let debt = {
                    type: "withdrawl",
                    date: withdrawl[1],
                    desc: withdrawl[2],
                    amount: withdrawl[4]
                }
                
                // increment the withdrawl count
                parsedObj.withdrawls += 1;

                // add the debt to the debt array
                parsedObj.debts.push(debt);
                
                // continue the for loop
                continue;
            }

            // checks
            const check = line.match(/^(\d+\/\d+\/\d+)(\d{4})\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            if ( check ) {
                let debt = {
                    type: "check",
                    date: check[1],
                    desc: check[2],
                    amount: check[3]
                }

                // increment the checks count
                parsedObj.checks += 1;

                // add the debt to the debt array
                parsedObj.debts.push(debt);
                
                // continue the for loop
                continue;
            }

            // Debit, checkcard, payments
            //const match = line.match(/^(\d+\/\d+\/\d+)(.*)(\s\d{4}\s|\d+\/\d+\s|DES\:\w+|Bill)/);
            const match = line.match(/^(\d+\/\d+\/\d+)(.*)\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
            let debt = {
                type: "debit",
                date: match[1],
                desc: match[2],
                amount: purchase[0]
            }

            // increment the debit count
            parsedObj.debits += 1;

            // add the debt to the debt array
            parsedObj.debts.push(debt);
        }
    }

    // calculate the number of deposit lines
    parsedObj.deposits = lineArray.length - parsedObj.debts.length;

    return parsedObj;
}








/*
(\s\d{4}\s|\d+\/\d+\s|DES\:\w+)



// captures the date
((\d+\/){2}\d+)

^(\d+\/\d+\/\d+)


// captures the purchase date
((\s\d{4}\s)|(\d+\/\d+\s))

(\d{4}|\d+\/\d+)

((?:\s\d{4}\s)|(?:\d+\/\d+\s))



// captures the money
(\d+\,)?(\d*)(\.\d{2})

// captures curr at the end of the line
(\d+\,)?(\d*)(\.\d{2})$

// my curr capture 
(\-(\d{1,2}\,)?\d{1,3}\.\d{2})$


\-((\d{1,2}\,)?\d{1,3}\.\d{2})$





^(\d+\/\d+\/\d+)(.*)(\s\d{4}\s|\d+\/\d+\s|DES\:\w+|Bill)


// gets the start
^(\d+\/\d+\/\d+)

// captures the type
(.*)

// captures the purchase date
(\s\d{4}\s|\d+\/\d+\s|DES\:\w+|Bill)


*/