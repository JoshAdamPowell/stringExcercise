import * as fs from 'fs';
var Sugar = require('sugar/date');

let csvFile = fs.readFileSync('bookcsv.csv', 'utf8');
let csvLines = csvFile.split(/\r?\n/);
let initialString = "| Pub Date    |                         Title | Authors               |";
let secondString = "|=====================================================================|";
console.log(initialString);
console.log(secondString);

for (let i = 1; i < csvLines.length; i++){
    let params = csvLines[i].split(',');
    let date = params[0];
    let title = params[1];
    let authors = params[2];

    Sugar.Date.getLocale('en').addFormat('{dd}/{mm}/{yyyy}');
    let newSugarDate = Sugar.Date.create(date);
    let formattedDate = Sugar.Date.format(newSugarDate,'{dd} {Mon} {yyyy}');
    if (title.length > 29) {
        let shortTitle = title.substring(0, 26);
        title = shortTitle + '...';
    } else {
        for (let j = title.length; j < 29; j++){
            title = " " + title
        }
    }

    if (authors.length > 21) {
        let shortAuthors = authors.substring(0, 18);
        authors = shortAuthors + '...';
    } else {
        for (let j = authors.length; j < 21; j++){
            authors = " " + authors;
        }
    }

    console.log(`| ${formattedDate} | ${title} | ${authors} |`);

}