var net = require('net')
var server = net.createServer(function (socket) {
  // 新的连接
  socket.on('data', function () {
    socket.write('Hello')
  })
  // 断开连接
  socket.on('end', function () {
    console.log('Socket end')
  })
  socket.write('Welcome')
})
// server.listen(8124, function () {
//   console.log('server bound')
// })

// server.listen('/tmp/echo.sock') // mac or linux

server.listen('\\\\.\\pipe\\C:\\echo.sock') // windows
