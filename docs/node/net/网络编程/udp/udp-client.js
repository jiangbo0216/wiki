var dgram = require('dgram')
var client = dgram.createSocket('udp4')

client.on('message', function (msg, rinfo) {
  console.log('client got:' + msg + 'from' + 
    rinfo.address + ":" + rinfo.port)
})

// 双向通信
client.bind(41236)

// 如果调用send方法, 会自动绑定端口
var message = Buffer.alloc(13, 'Hello Node.js')
client.send(message, 0, message.length, 41234, 'localhost',
  function(err, bytes) {
    // client.close()
  }
)


