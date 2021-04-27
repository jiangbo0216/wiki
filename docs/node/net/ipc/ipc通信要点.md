使用StringDecoder解析buffer, 然后拼接到字符串

本地进程监听文件

连接： 
this.socket = net.connect(socketPath)

this.socket.on('data')

发送消息:

this.socket.write

服务端:

this.server = net.createServer((socket) => {
    socket.on('data', 解析消息)
})

this.server.listen(socketPath, callback)

发送消息还是需要使用 this.socket.write

本质上可以在server创建client对象处理发送和接受消息
