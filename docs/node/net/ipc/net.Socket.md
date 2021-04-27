## [net.Socket 类](http://nodejs.cn/api/net.html#net_class_net_socket)

新增于: v0.3.4
继承自: <stream.Duplex>
此类是 TCP socket 或流式 IPC 端点的抽象（在 Windows 上使用命名管道，否则使用 Unix 域 socket）。 它也是一个 EventEmitter。

net.Socket 可以由用户创建并且被直接用于与服务器进行交互。 例如，它可由 net.createConnection() 返回，因此用户可以使用它与服务器进行通信。

它也可以由 Node.js 创建，并在接收到连接时传给用户。 例如，它会被传给 net.Server 上触发的 'connection' 事件的监听器，因此用户可以使用它与客户端进行交互。


