const request = require('request');
const cheerio = require('cheerio');

const issuesObj = require('./issues');

function extractIndCardHTML(url ,folderPath) {
    // console.log(url);
    request(url, cb);
    function cb(err ,response ,  data) {
        if(err) console.log(err);
        else{
            // console.log(data);
            extractHTMLPage(data , folderPath)
        }
    }
}

function extractHTMLPage(body , folderPath) {
    const $ = cheerio.load(body)
    const repositories = $('.tabnav.px-3.mb-0')
    console.log(repositories.length);
    for (let index = 0; index < 6; index++) {
        const element = $(repositories[index]).find('a[class="tabnav-tab f6 px-2 py-1"]');
        //console.log(element.length);
        const issuesLink = $(element[1]).attr('href');
        // console.log(issuesLink);
        const fullLink = 'https://github.com' + issuesLink
        // console.log(fullLink);
        issuesObj.funceextractIssuesHTML(fullLink , folderPath);
    }
}
module.exports ={
    funcextractIndCardHTML :extractIndCardHTML
}

