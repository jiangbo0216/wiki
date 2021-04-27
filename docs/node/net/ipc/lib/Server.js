// 创建一个 net server
// 监听某个文件
// 接收新连接上的客户端
// 根据接收到的数据按协议规则解析出消息实体，处理客户端请求

'use strict'

const path = require('path')
const fs = require('fs')
const net = require('net')
const Client = require('./Client')
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


class Server extends EventEmitter {
  constructor () {
    super()
    this.server = net.createServer((socket) => {
      this.handleConnection(socket)
    })
  }

  listen (callback) {
    if (fs.existsSync(sockPath)) {
      fs.unlinkSync(sockPath)
    }
    this.server.listen(sockPath, callback)
  }
  
  handleConnection (socket) {
    // 保存连接的客户端
    const client = new Client({socket})
    // 因为client监听了message事件, 所以会一直保存在内存中, 不会释放
    client.on('message', (message) => this.handleRequest(message, client))
    this.emit('connect', client)
  }

  handleRequest (message, client) {
    // server会使用这里的client,发送回应方法
    this.emit('message', message, client)
  }


}

module.exports = Server