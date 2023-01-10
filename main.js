const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const individualTopicObj = require('./indiviudalTopicData')
const issuesObj = require('./issues')

// Request URL
var url = 'https://github.com/topics';
 
request(url, (error, response, body)=>{
    
    // Printing the error if occurred
    if(error) console.log(error)

    extractHTMLPage(body);
});

let folderPath ="";
function extractHTMLPage(body) {
    const $ = cheerio.load(body)
    const topicCards =  $('.col-12.col-sm-6.col-md-4.mb-4');
    // console.log(topicCards.length);
    for (let index = 0; index < topicCards.length; index++) {
        const topicLink = $(topicCards[index]).find('a[class="no-underline d-flex flex-column flex-justify-center"]');
        //console.log(topicLink.attr('href'));
        const topicName = $(topicCards[index]).find('p[class="f3 lh-condensed text-center Link--primary mb-0 mt-1"]').text().trim();
        //console.log(topicName);
        const link = topicLink.attr('href');
        const fullLink = 'https://github.com' + link;
        // console.log(fullLink);
         folderPath = path.join(__dirname ,topicName )
        createTopicFolder(folderPath);
        issuesObj.expFolderPath(folderPath)
        individualTopicObj.funcextractIndCardHTML(fullLink , folderPath);
        
    }
}




function createTopicFolder(folderPath){
    if(fs.existsSync(folderPath) == false){
        // console.log('entered');
        fs.mkdirSync(folderPath)
        // console.log('foldermade');
    }
}


