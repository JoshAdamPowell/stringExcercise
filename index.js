"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csvFile = fs.readFileSync('‪C:\\Work\\training2\\strings\\bookcsv.csv').toString();
var csvLines = csvFile.split(/\r?\n/);
var initialString = "| Pub Date    |                         Title | Authors               |";
var secondString = "|=====================================================================|";
csvLines.forEach(function (line) {
    var params = line.split(',');
    var date = params[0];
    var title = params[1];
    var authors = params[2];
});
