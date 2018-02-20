import * as fs from 'fs';

let csvFile = fs.readFileSync('‪C:\\Work\\training2\\strings\\bookcsv.csv').toString();
let csvLines = csvFile.split(/\r?\n/);
let initialString = "| Pub Date    |                         Title | Authors               |";
let secondString = "|=====================================================================|";

csvLines.forEach((line)=> {
    let params = line.split(',');
    let date = params[0];
    let title = params[1];
    let authors = params[2];



});