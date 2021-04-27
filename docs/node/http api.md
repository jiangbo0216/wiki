## createServer

```js
const http = require('http');
const shell = require('shelljs')
let a = 0
const requestListener = function (req, res) {
  if (req.url === '/') {
    res.writeHead(200);
    console.log(++a)
    Math.random() > 0.5 ? (shell.exec('pm2 delete ecosystem.config.js --only "task2"'), console.log('停止了')) : (shell.exec('pm2 restart ecosystem.config.js --only "task2"'), console.log('重启了'));
    res.end('Hello, World!');
  } else {
    res.writeHead(200);
    res.end('Hello, World!');
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
```

每个页面默认都会再发一个/favicon.ico

