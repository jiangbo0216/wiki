/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

// 采用自签名证书
const https = require('https');
// const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({noServer: true});

const clients = new Set();

function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      // can be Connection: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./index.html').pipe(res);
  } else { // page not found
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on('message', function(message) {
    log(`message received: ${message}`);

    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    log(`connection closed`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  // 采用自签名证书
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  },accept).listen(8080);
  // http.createServer(accept).listen(8080);
} else {
  // to embed into javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}