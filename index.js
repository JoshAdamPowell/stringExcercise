"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Sugar = require('sugar/date');
var csvFile = fs.readFileSync('bookcsv.csv', 'utf8');
var csvLines = csvFile.split(/\r?\n/);
var initialString = "| Pub Date    |                         Title | Authors               |";
var secondString = "|=====================================================================|";
console.log(initialString);
console.log(secondString);
for (var i = 1; i < csvLines.length; i++) {
    var params = csvLines[i].split(',');
    var date = params[0];
    var title = params[1];
    var authors = params[2];
    Sugar.Date.getLocale('en').addFormat('{dd}/{mm}/{yyyy}');
    var newSugarDate = Sugar.Date.create(date);
    var formattedDate = Sugar.Date.format(newSugarDate, '{dd} {Mon} {yyyy}');
    if (title.length > 29) {
        var shortTitle = title.substring(0, 26);
        title = shortTitle + '...';
    }
    else {
        for (var j = title.length; j < 29; j++) {
            title = " " + title;
        }
    }
    if (authors.length > 21) {
        var shortAuthors = authors.substring(0, 18);
        authors = shortAuthors + '...';
    }
    else {
        for (var j = authors.length; j < 21; j++) {
            authors = " " + authors;
        }
    }
    console.log("| " + formattedDate + " | " + title + " | " + authors + " |");
}
