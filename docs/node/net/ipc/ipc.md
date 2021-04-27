## 背景



Node.js 内置的进程间通信使用非常简单，但也有一定的局限性，只能在父子进程间通信。下面是官方文档给的一个例子。



首先是父进程的 parent.js :



```
const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });
```



接着再看看子进程 sub.js 的实现：



```
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
```



如果两个进程间没有父子这种亲缘关系又如何通信呢，本文就为大家讲解 `Midway 5.0` 中如何使用更灵活的 socket 实现任意进程间的通信。



## 协议设计



既然是通信，那么通信协议的设计是必不可少的。就像以前经常在电影里看到的两个人通话时，都会加上一句 `over` 来告知对方自己要说的已经说完了。父子进程间的通信协议也采用了这种最简单最高效的方式，双方在发送消息时都会在消息末尾加上一个回车符 `\n`，表示本次发送的消息就这么多，也就是对方就收消息时遇到 `\n` 表明本次消息接收完毕。



消息接收后需要对其进行解码，或者说是反序列化，最终便于识别和使用。父子进程间通信就采用了 JSON.encode 和  JSON.decode 来实现消息的编码和解码。



父子进程间采用的这种通信协议非常的简单，但是也非常高效，能够满足大部分使用场景。像 HSF 这类 RPC 调用通信协议就比较复杂了，我们平时遇到最多的就是 HTTP 协议，做 web 开发的同学肯定都比较清楚协议的规则了。



本次实现的利用 socket 实现进程间通信也采用这种最简单的方式。



## 实现



实现协议之前回想一下整个通信的流程，首先双方建立一条全双工的通信信道，待 2 边都 ready 后消息便可以发送消息了，2 边既是消息的接收方也是消息的发送方。我们平时会将一方称为 `server`，另一方称为 `client`，这是在功能上的划分，一般 server 会有多个client 同时连接。



### 协议解析



在双方开始通信之前，我们先来实现协议的解析 `parse.js`，非常的简单。



```
'use strict';
const StringDecoder = require('string_decoder').StringDecoder;
const EventEmitter = require('events');

class Parser extends EventEmitter {
    constructor() {
        super();
        this.decoder = new StringDecoder('utf8');
        this.jsonBuffer = '';
    }

    encode(message) {
        return JSON.stringify(message) + '\n';
    }

    feed(buf) {
        let jsonBuffer = this.jsonBuffer;
        jsonBuffer += this.decoder.write(buf);
        let i, start = 0;
        while ((i = jsonBuffer.indexOf('\n', start)) >= 0) {
            const json = jsonBuffer.slice(start, i);
            const message = JSON.parse(json);
            this.emit('message', message);
            start = i + 1;
        }
        this.jsonBuffer = jsonBuffer.slice(start);
    }
}

module.exports = Parser;
```



### socket 通信



我们平时用到的 socket 大都是 TCP 类型的，因为要涉及到两个远程进程间的通信。如果只是实现本地进程间通信，可以选择更高效的文件 socket，同时也避免额外占用一个端口的情况。



### Client



在使用上 TCP socket 和 file socket 差别不大，前者监听某个端口，后者监听某个临时文件，需要注意的是监听文件的路径在 Windows 和 Unix 上有些不一样。



> On Windows, the local domain is implemented using a named pipe. The path must refer to an entry in \?\pipe\ or \.\pipe.



开始之前，大致列出客户端需要有哪些功能



- 连接到服务器

- 监听服务器发送的数据，按照协议规则解析出消息实体

- 提供向服务器发送消息的接口



```
client.js
```



```
'use strict';
const path = require('path');
const net = require('net');
const Parser = require('./parser');
const EventEmitter = require('events');
const os = require('os');
const tmpDir = os.tmpDir();
let sockPath = path.join(tmpDir, 'midway.sock');

if (process.platform === 'win32') {
    sockPath = sockPath.replace(/^\//, '');
    sockPath = sockPath.replace(/\//g, '-');
    sockPath = '\\\\.\\pipe\\' + sockPath;
}

class Client extends EventEmitter{
    constructor(options) {
        options = options || {};
        super();
        if (options.socket) {
            this.socket = options.socket;
        } else {
            this.socket = net.connect(sockPath);
        }
        this.bind();
    }

    bind() {
        const parser = new Parser();
        const socket = this.socket;
        socket.on('data', (buf) => {
            parser.feed(buf);
        });

        parser.on('message', (message) => {
            this.emit('message', message);
        });
        this.parser = parser;
    }

    send(message) {
        this.socket.write(this.parser.encode(message));
    }
}

module.exports = Client;
```



### Server



实现之前先梳理下 server 端要有哪些基础的功能，



- 创建一个 net server

- 监听某个文件

- 接收新连接上的客户端

- 根据接收到的数据按协议规则解析出消息实体，处理客户端请求



下面就是一个简单的 server 实现



```
'use strict';
const path = require('path');
const fs = require('fs');
const net = require('net');
const Client = require('./client');
const EventEmitter = require('events');
const os = require('os');
const tmpDir = os.tmpDir();
let sockPath = path.join(tmpDir, 'midway.sock');

if (process.platform === 'win32') {
    sockPath = sockPath.replace(/^\//, '');
    sockPath = sockPath.replace(/\//g, '-');
    sockPath = '\\\\.\\pipe\\' + sockPath;
}

class Server extends EventEmitter{
    constructor() {
        super();
        this.server = net.createServer((socket)=> this.handleConnection(socket));
    }

    listen(callback) {
        if (fs.existsSync(sockPath)) {
            fs.unlinkSync(sockPath);
        }
        this.server.listen(sockPath, callback);
    }

    handleConnection(socket) {
        const client = new Client({
            socket: socket
        });
        client.on('message', (message) => {
            this.handleRequest(message, client);
        });
        this.emit('connect', client);
    }

    handleRequest(message, client) {
        this.emit('message', message, client);
    }
}

module.exports = Server;
```



### demo



至此，我们已经实现了类似父子进程间通信的功能了。还记得上篇[《多进程下的测试覆盖率》](http://taobaofed.org/blog/2015/12/15/nodejs-cluster-cov/)中使用到的那个简单的 RPC demo，现在我们使用上面提到的 socket 通信方式重新实现一个。



client.js



```
'use strict';
const Client = require('../lib/Client');

let rid = 0;
const service = {};
const queue = [];
const requestQueue = new Map();

function start(ready) {
    const client = new Client();

    function send() {
        rid++;
        let args = [].slice.call(arguments);
        const method = args.slice(0,1)[0];
        const callback = args.slice(-1)[0];

        const req = {
            rid: rid,
            method:method,
            args:args.slice(1,-1)
        };

        requestQueue.set(rid,Object.assign({
            callback: callback
        }, req));

        client.send(req);
    }

    client.on('message', function(message){
        if (message.action === 'register') {
            message.methods.forEach((method) => {
                service[method] = send.bind(null, method);
            });
            ready(service);
        } else {
            const req = requestQueue.get(message.rid);
            const callback = req.callback;
            if (message.success) {
                callback(null, message.data);
            } else {
                callback(new Error(message.error));
            }
            requestQueue.delete(message.rid);
        }
    });
}

start((service)=> {
    service.add(1,2,3,4,5, function(err, result) {
        console.log(`1+2+3+4+5 = ${result}`);
    });

    service.time(1,2,3,4,5, function(err, result) {
        console.log(`1*2*3*4*5 = ${result}`);
    });
});
```



server.js



```
'use strict';
const Server = require('../lib/server');
const server = new Server();
server.listen();

const service = {
    add() {
        const args = [].slice.call(arguments);
        return args.slice().reduce(function(a,b) {
            return a+b;
        });
    },

    time() {
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject)=> {
            setTimeout( ()=> {
                const ret = args.slice().reduce(function(a,b) {
                    return a*b;
                });
                resolve(ret);
            }, 1000);
        });
    }
}


server.on('connect', (client) => {
    client.send({
        action:'register',
        methods: Object.keys(service)
    });
});

server.on('message', function(message, client) {
    let ret = { success: false, rid: message.rid };
    const method = message.method;
    if (service[method]) {
        try {
            const result = service[method].apply(service, message.args);
            ret.success = true;
            if(result.then) {
                return result.then((data)=> {
                    ret.data = data;
                    client.send(ret);
                }).catch((err)=>{
                    ret.success = false;
                    ret.error = err.message;
                    client.send(err);
                })
            }
            ret.data = result;
        } catch (err) {
            ret.error = err.message;
        }
    }
    client.send(ret);
});
```



先启动 server，然后运行 client，控制台输出



```
1+2+3+4+5 = 15
1*2*3*4*5 = 120
```



## 小结



不论是本文讲解的简单进程间通信，还是更复杂的 RPC 调用，整个的设计实现流程相差不大。生产环境中还需要处理各种异常，网络连接错误，协议解析错误等等，有兴趣的同学可以继续在本 demo上继续完善～