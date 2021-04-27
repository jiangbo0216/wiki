'use strict';

var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('./writable.js', { highWaterMark: 10});

rs.on('data', function (chunk) {
    console.log('DATA:', chunk.length)
    console.log('DATA:', chunk)
    console.log('===========')
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});