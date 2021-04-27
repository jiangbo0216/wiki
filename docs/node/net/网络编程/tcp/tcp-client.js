var net = require('net')
var client = net.connect({path: '/tmp/echo.sock'},function ()  { // mac or linux

var client = net.connect({path: '\\\\.\\pipe\\C:\\echo.sock'},function ()  { // windows
// var client = net.connect({ port: 8124 }, function() {
  //'connect' listener
  console.log('client connected')
  client.write('world!\r\n')
})
client.on('data', function(data) {
  console.log(data.toString())
  client.end()
})
client.on('end', function() {
  console.log('client disconnected')
})