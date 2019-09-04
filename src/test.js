'use strict'
const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('./test/statement.pdf');
 
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
        //console.log(data.text);

        //const pattern = "(\d{2}\/\d{2}\/\d{2})";

        //const matches = data.text.match(/(\d{2}\/\d{2}\/\d{2})/ig);
        //const matches = data.text.match(/(.*)([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?/igm);

        //const matches = data.text.match(/((\d+\/){2}\d+).*(\d+\,)?(\d*)(\.\d{2})?/ig);

        //const matches = data.text.match(/^((\d+\/){2}\d+)(?:\w*\s\w*).*$/img);        
        // console.log(matches);
        //console.log(matches.length);
        //console.log(typeof data.text);
        // const file = data.text.join();
        // console.log("file: ",file);


        const strArr = data.text.split("\n");
        console.log(strArr.length);

        for(const x in strArr){
            //console.log(strArr[x])


            const mLine = strArr[x].match(/((\d+\/){2}\d+)(.*)(\d+\,)?(\d*)(\.\d{2})?/ig)
            if ( mLine ) {
                console.log("Line: ",...mLine);
                const { date } = mLine;

                /* const mCur = mLine.match(/(\d+\,)?(\d*)(\.\d{2})/ig);
                if ( !mCur ) {
                    console.log(mCur);
                } */
            }
        }
        






        /* let newLines = 0;
        for(const x in data.text) {
            //console.log("Line: ",line);
            if ( data.text[x] === "\n" ) {
                //console.log("new line");
                //const [data.text[x+1], data.text[x+2], data.text[x+3], data.text[x+4], data.text[x+5]] = data.text[x];
                //console.log( data.text );

                // const s = data.text[x+1];
                // const m = s.match(/\d/);

                // if ( m ) {
                //     console.log("Match:",m);
                // }


                newLines++;
            }
        }
        console.log("NewLines:",newLines); */



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
});


let strLine = [];
function atTo(str) {
    if ( str !== "\n" ) atTo()
}







/*

^\$
(\d{1,3}   (\,\d{3})*|(\d+)  )  (\.\d{2})   ?$


// captures the date
((\d+\/){2}\d+)


// captures the money
(\d+\,)?(\d*)(\.\d{2})




*/






// const PDF = require('./');
// const fs = require('fs');

// let PDF_FILE = './test/statement.pdf';
// let dataBuffer = fs.readFileSync('./test/statement.pdf');
// PDF(dataBuffer).then(function(data) {
//     fs.writeFileSync(`${PDF_FILE}.txt`, data.text, {
//         encoding: 'utf8',
//         flag: 'w'
//     });
//     debugger;
// }).catch(function(err) {
//     debugger;
// });
