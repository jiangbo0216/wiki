// 连接到服务器
// 监听服务器发送的数据，按照协议规则解析出消息实体
// 提供向服务器发送消息的接口

'use strict';

const path = require('path')

const net = require('net')

const Parser = require('./Parser')

const EventEmitter = require('events')
const os = require('os')
const tempDir = os.tmpdir()

console.log(tempDir)

let sockPath = path.join(tempDir, 'midway.sock')
if (process.platform === 'win32') {
  console.log(sockPath, 'sockPath', '1')
  sockPath = sockPath.replace('/^\//', '')
  console.log(sockPath, 'sockPath', '2')

  sockPath = sockPath.replace('/\//g', '-')
  console.log(sockPath, 'sockPath', '3')

  sockPath = '\\\\.\\pipe\\' + sockPath
  console.log(sockPath, 'sockPath', '4')
}

class Client extends EventEmitter {
  constructor (options) {
    options = options || {}
    super()
    if (options.socket) {
      this.socket = options.socket
    } else {
      this.socket = net.connect(sockPath)
    }
    this.bind()
  }

  bind () {
    const parser = new Parser ()

    const socket = this.socket

    socket.on('data', (buf) => {
      parser.feed(buf)
    })

    parser.on('message', (message) => {
      this.emit('message', message)
    })
    this.parser = parser;
  }

  send (message) {
    this.socket.write(this.parser.encode(message))
  }
}

module.exports = Client