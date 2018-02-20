import * as fs from 'fs';

var Sugar = require('sugar/date');
Sugar.Date.getLocale('en').addFormat('{dd}/{mm}/{yyyy}');

class bookInfo {
    date: string;
    title: string;
    authors: string;
}

makeHeader();
let csvLines = getAllBooksInfo('bookcsv.csv');

for (let i = 1; i < csvLines.length; i++) {

    let book = getBookInfoFromLine(csvLines[i]);
    formatAndPrintBook(book);
}

function formatAndPrintBook(book: bookInfo){
    book.title = truncateString(book.title, 29);
    book.authors = truncateString(book.authors, 21);

    console.log(`| ${book.date} | ${book.title} | ${book.authors} |`);
}

function truncateString(input: string, endLength: number) {
    if (input.length > endLength) {
        let inputSubstring = input.substring(0, endLength - 3);
        input = inputSubstring + '...';
    } else {
        for (let j = input.length; j < endLength; j++) {
            input = " " + input
        }
    }
    return input
}

function getAllBooksInfo(filePath: string) {
    let csvFile = fs.readFileSync(filePath, 'utf8');
    return csvLines = csvFile.split(/\r?\n/);
}

function makeHeader() {
    let initialString = "| Pub Date    |                         Title | Authors               |";
    let secondString = "|=====================================================================|";
    console.log(initialString);
    console.log(secondString);
}

function getBookInfoFromLine(line: string) {
    let params = line.split(',');
    let book = new bookInfo;
    book.date = formatDate(params[0]);
    book.title = params[1];
    book.authors = params[2];
    return book;
}

function formatDate(unformattedDate: string) {
    let newSugarDate = Sugar.Date.create(unformattedDate);
    return Sugar.Date.format(newSugarDate, '{dd} {Mon} {yyyy}');
}