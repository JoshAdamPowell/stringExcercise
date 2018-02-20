var https = require('https');
var fs = require('fs');
var options = {
    protocol: 'https:',
    host: 'en.wikipedia.org',
    path: '/wiki/Unicode'
};
var request = https.request(options, function (responseStream) {
    var htmlText = '';
    responseStream.on('data', function (chunk) {
        htmlText += chunk;
    });
    responseStream.on('end', function () {
        writeToFile('./Unicode.1.html', '\uFEFF' + htmlText, 'utf16le');
        var fileText = readFromFile('./Unicode.1.html', 'utf16le');
        writeToFile('./Unicode.2.html', fileText.slice(1), 'utf16le');
        var finalText = readFromFile('./Unicode.2.html', 'utf8');
        writeToFile('./Unicode.3.html', '\uFEFF' + finalText, 'utf16le');
    });
});
request.on('error', function (e) {
    console.error(e.message);
});
request.end();
function writeToFile(filePath, text, encoding) {
    fs.writeFileSync(filePath, text, { encoding: encoding });
}
function readFromFile(filePath, encoding) {
    return fs.readFileSync(filePath, { encoding: encoding });
}
