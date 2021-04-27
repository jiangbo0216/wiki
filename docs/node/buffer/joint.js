var fs = require('fs')
// highWaterMark 为11 不ok, 12 ok
// var rs = fs.createReadStream('./test.md', { highWaterMark: 12 })
var rs = fs.createReadStream('./test.md')
var data = ''
rs.on('data', function (chunk) {
  data += chunk
})
rs.on('end', function (chunk) {
  console.log(data)
})