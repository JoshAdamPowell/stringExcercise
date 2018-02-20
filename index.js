"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Sugar = require('sugar/date');
Sugar.Date.getLocale('en').addFormat('{dd}/{mm}/{yyyy}');
var bookInfo = /** @class */ (function () {
    function bookInfo() {
    }
    return bookInfo;
}());
makeHeader();
var csvLines = getAllBooksInfo('bookcsv.csv');
for (var i = 1; i < csvLines.length; i++) {
    var book = getBookInfoFromLine(csvLines[i]);
    formatAndPrintBook(book);
}
function formatAndPrintBook(book) {
    book.title = truncateString(book.title, 29);
    book.authors = truncateString(book.authors, 21);
    console.log("| " + book.date + " | " + book.title + " | " + book.authors + " |");
}
function truncateString(input, endLength) {
    if (input.length > endLength) {
        var inputSubstring = input.substring(0, endLength - 3);
        input = inputSubstring + '...';
    }
    else {
        for (var j = input.length; j < endLength; j++) {
            input = " " + input;
        }
    }
    return input;
}
function getAllBooksInfo(filePath) {
    var csvFile = fs.readFileSync(filePath, 'utf8');
    return csvLines = csvFile.split(/\r?\n/);
}
function makeHeader() {
    var initialString = "| Pub Date    |                         Title | Authors               |";
    var secondString = "|=====================================================================|";
    console.log(initialString);
    console.log(secondString);
}
function getBookInfoFromLine(line) {
    var params = line.split(',');
    var book = new bookInfo;
    book.date = formatDate(params[0]);
    book.title = params[1];
    book.authors = params[2];
    return book;
}
function formatDate(unformattedDate) {
    var newSugarDate = Sugar.Date.create(unformattedDate);
    return Sugar.Date.format(newSugarDate, '{dd} {Mon} {yyyy}');
}
