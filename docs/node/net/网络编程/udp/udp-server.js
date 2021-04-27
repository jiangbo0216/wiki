const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('message', function (msg, rinfo) {
  console.log('server got:' + msg + 'from' + 
    rinfo.address + ":" + rinfo.port)
    var message = Buffer.alloc(13, 'Hello Node.js')
    server.send(message, 0, message.length, 41236, 'localhost',
      function(err, bytes) {
      }
    )
  
})
server.on('listening', function () {
  const address = server.address()
  console.log('server listening:'  + 
  address.address + ":" + address.port)
})

server.bind(41234)

