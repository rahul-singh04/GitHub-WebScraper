const request = require('request');
const cheerio = require('cheerio');
const PDFGenerator = require('pdfkit')
const fs = require('fs');
const path = require('path');
// const mainObj = require('./main')

// const fullLink ='https://github.com/bitcoin/bitcoin/issues';
// extractIssuesHTML(fullLink)

function extractIssuesHTML(url , folderPath) {
    request(url, cb);
    function cb(err ,response ,  data) {
        if(err) console.log(err);
        else{
            // console.log(data);
            extractHTMLPage(data , folderPath)
            
            
        }
    }
}
const issueArray = [];

function extractHTMLPage(body , folderPath) {
    const $ = cheerio.load(body)
    const issues = $('.Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row');
    // console.log(issues.length);
    
    for(let i =0; i < issues.length ; i++ ){
        const line = $(issues[i]).find('a[class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]');
        const lineToAdd = $(line).text();
       // const string = String(lineToAdd)
        issueArray.push(lineToAdd);
    }
    const fileName = $('.author.flex-self-stretch').text().trim();
    const folderPathOG = generateFolderPath(folderPath)
    // console.log(folderPathOG + 'folderPath');
    createPDF(fileName ,issueArray , folderPathOG);
}



function createPDF(fileName ,issueArray , folderPathOG) {
    let theOutput = new PDFGenerator ;
    const pdfName =  fileName + '.pdf';
    const pdfPath = path.join(folderPathOG,pdfName)
    // console.log(pdfPath);
    theOutput.pipe(fs.createWriteStream(pdfPath));
    
    for(let i =0 ; i < issueArray.length ; i++){
       const stringified = String(issueArray[i])
        theOutput.text(stringified);
    }
    theOutput.end()
}


function generateFolderPath(folderPath) {
    return folderPath;
}


module.exports ={
    funceextractIssuesHTML :extractIssuesHTML,
    expFolderPath :generateFolderPath
}