'use strict'
const fs = require('fs');
const pdf = require('pdf-parse');
 

parseFile('./test/eStmt_2017-01-27.pdf')
//parseFile('./test/eStmt_2017-02-24.pdf')
//parseFile('./test/eStmt_2017-03-29.pdf')

function parseFile(pdfFile) {
    let dataBuffer = fs.readFileSync(pdfFile);

    let arr = [];
 
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

                // skip the interest earned lines
                if ( strArr[x].match(/^(?:\d+\/\d+\/\d+)(Interest\sEarned)(.*)/g) ) {
                    //console.log("Interest Earned : ", strArr[x]);
                    continue;
                }

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
    }).then( arrayOfItems => {
        // arrayOfItems.forEach( a => console.log(a));
        console.log("Length: ", arrayOfItems.length);

        for(const item of arrayOfItems) {
            console.log( parseBofA(item) );
        }

    }).catch( error => {
        console.log("Error: ", error);
    });

}

// this needs to be a recursive function but
// for now this will work
function finishLine(strArr, currentLine){
    return strArr[currentLine] + strArr[Number(currentLine) + 1] + strArr[Number(currentLine) + 2];
}

function parseBofA(line){
    console.log("Line:",line);

    // first check to make sure its a debit
    // the pattern below finds currency on the end
    // prefixed with a minus sign
    const purchase = line.match(/\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
    if ( purchase && purchase[0] !== "-0.00" ) {
        console.log("purchase:",purchase[0]);

        // withdrawls
        //const withdrawl = line.match(/^(\d+\/\d+\/\d+)(Customer\s\w+(?:\s\w+))\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
        const withdrawl = line.match(/^(\d+\/\d+\/\d+)(.*(w|W)ithdrawal.*)\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
        if ( withdrawl ) {
            let debt = {
                date: withdrawl[1],
                type: withdrawl[2],
                amount: withdrawl[4]
            }
            return debt;
        }

        // checks
        const check = line.match(/^(\d+\/\d+\/\d+)(\d{4})\-((\d{1,2}\,)?\d{1,3}\.\d{2})$/);
        if ( check ) {
            let debt = {
                date: check[1],
                type: check[2],
                amount: check[3]
            }
            return debt;
        }

        // Debit, checkcard, payments
        const match = line.match(/^(\d+\/\d+\/\d+)(.*)(\s\d{4}\s|\d+\/\d+\s|DES\:\w+|Bill)/);
        let debt = {
            date: match[1],
            type: match[2],
            amount: purchase[0]
        }
        //console.log(debt);
        return debt;
    }
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