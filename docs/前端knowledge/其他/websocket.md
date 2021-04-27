# [WebSocket](https://javascript.info/websocket)

## 总结一下: 

提供了一种在浏览器和服务器之间建立持久连接来交换数据的方法.

### 事件

- open
- message
- error
- close

### 方法

- WebSocket 方法：
  - `socket.send(data)`，
  - `socket.close([code], [reason])`。

### 建立连接

new websocket(url) 创建之后立即开始连接, 先发送http请求询问服务端是否支持websocket, 如果服务端回复支持, 后续的通信九一websocket协议继续进行

#### 客户端请求

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
扩展和子协议
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
```

- `Origin` —— 客户端页面的源，例如 `https://javascript.info`。WebSocket 对象是原生支持跨源的。没有特殊的 header 或其他限制。旧的服务器无法处理 WebSocket，因此不存在兼容性问题。但是 `Origin` header 很重要，因为它允许服务器决定是否使用 WebSocket 与该网站通信。
- `Connection: Upgrade` —— 表示客户端想要更改协议。
- `Upgrade: websocket` —— 请求的协议是 “websocket”。
- `Sec-WebSocket-Key` —— 浏览器随机生成的安全密钥。
- `Sec-WebSocket-Version` —— WebSocket 协议版本，当前为 13。

无法使用XMLHttpRequest和fetch来进行这种请求



#### 服务器响应

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
```



### 数据传输

交换的数据由frames 组成

- text frames
- binary frames
- ping/pong frames
- 其他frames

### 限速

socket.bufferedAmount 存储目前以缓存的字节数

### [连接状态](https://zh.javascript.info/websocket#lian-jie-zhuang-tai)

要获取连接状态，可以通过带有值的 `socket.readyState` 属性：

- **`0`** —— “CONNECTING”：连接还未建立，
- **`1`** —— “OPEN”：通信中，
- **`2`** —— “CLOSING”：连接关闭中，
- **`3`** —— “CLOSED”：连接已关闭。



The `WebSocket` protocol, described in the specification [RFC 6455](http://tools.ietf.org/html/rfc6455) provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as “packets”, without breaking the connection and additional HTTP-requests.

WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.

## [A simple example](https://javascript.info/websocket#a-simple-example)

To open a websocket connection, we need to create `new WebSocket` using the special protocol `ws` in the url:

```javascript
let socket = new WebSocket("ws://javascript.info");
```

There’s also encrypted `wss://` protocol. It’s like HTTPS for websockets.

**Always prefer `wss://`**

The `wss://` protocol is not only encrypted, but also more reliable.

That’s because `ws://` data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see “strange” headers and abort the connection.

On the other hand, `wss://` is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at sender and decrypts at the receiver. So data packets are passed encrypted through proxies. They can’t see what’s inside and let them through.

Once the socket is created, we should listen to events on it. There are totally 4 events:

- **`open`** – connection established,
- **`message`** – data received,
- **`error`** – websocket error,
- **`close`** – connection closed.

…And if we’d like to send something, then `socket.send(data)` will do that.

Here’s an example:

```javascript
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```

For demo purposes, there’s a small server [server.js](https://javascript.info/article/websocket/demo/server.js) written in Node.js, for the example above, running. It responds with “Hello from server, John”, then waits 5 seconds and closes the connection.

So you’ll see events `open` → `message` → `close`.

That’s actually it, we can talk WebSocket already. Quite simple, isn’t it?

Now let’s talk more in-depth.

## [Opening a websocket](https://javascript.info/websocket#opening-a-websocket)

When `new WebSocket(url)` is created, it starts connecting immediately.

During the connection the browser (using headers) asks the server: “Do you support Websocket?” And if the server replies “yes”, then the talk continues in WebSocket protocol, which is not HTTP at all.

Here’s an example of browser headers for request made by `new WebSocket("wss://javascript.info/chat")`.

```none
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` – the origin of the client page, e.g. `https://javascript.info`. WebSocket objects are cross-origin by nature. There are no special headers or other limitations. Old servers are unable to handle WebSocket anyway, so there are no compabitility issues. But `Origin` header is important, as it allows the server to decide whether or not to talk WebSocket with this website.
- `Connection: Upgrade` – signals that the client would like to change the protocol.
- `Upgrade: websocket` – the requested protocol is “websocket”.
- `Sec-WebSocket-Key` – a random browser-generated key for security.
- `Sec-WebSocket-Version` – WebSocket protocol version, 13 is the current one.

**WebSocket handshake can’t be emulated**

We can’t use `XMLHttpRequest` or `fetch` to make this kind of HTTP-request, because JavaScript is not allowed to set these headers.

If the server agrees to switch to WebSocket, it should send code 101 response:

```none
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Here `Sec-WebSocket-Accept` is `Sec-WebSocket-Key`, recoded using a special algorithm. The browser uses it to make sure that the response corresponds to the request.

Afterwards, the data is transfered using WebSocket protocol, we’ll see its structure (“frames”) soon. And that’s not HTTP at all.

### [Extensions and subprotocols](https://javascript.info/websocket#extensions-and-subprotocols)

There may be additional headers `Sec-WebSocket-Extensions` and `Sec-WebSocket-Protocol` that describe extensions and subprotocols.

For instance:

- `Sec-WebSocket-Extensions: deflate-frame` means that the browser supports data compression. An extension is something related to transferring the data, functionality that extends WebSocket protocol. The header `Sec-WebSocket-Extensions` is sent automatically by the browser, with the list of all extensions it supports.

- `Sec-WebSocket-Protocol: soap, wamp` means that we’d like to transfer not just any data, but the data in [SOAP](http://en.wikipedia.org/wiki/SOAP) or WAMP (“The WebSocket Application Messaging Protocol”) protocols. WebSocket subprotocols are registered in the [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml). So, this header describes data formats that we’re going to use.

  This optional header is set using the second parameter of `new WebSocket`. That’s the array of subprotocols, e.g. if we’d like to use SOAP or WAMP:

  ```javascript
  let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
  ```

The server should respond with a list of protocols and extensions that it agrees to use.

For example, the request:

```none
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
```

Response:

```none
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
```

Here the server responds that it supports the extension “deflate-frame”, and only SOAP of the requested subprotocols.

## [Data transfer](https://javascript.info/websocket#data-transfer)

WebSocket communication consists of “frames” – data fragments, that can be sent from either side, and can be of several kinds:

- “text frames” – contain text data that parties send to each other.
- “binary data frames” – contain binary data that parties send to each other.
- “ping/pong frames” are used to check the connection, sent from the server, the browser responds to these automatically.
- there’s also “connection close frame” and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings required: just send it out in any format.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

That’s set by `socket.binaryType` property, it’s `"blob"` by default, so binary data comes as `Blob` objects.

[Blob](https://javascript.info/blob) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that’s a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

```javascript
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## [Rate limiting](https://javascript.info/websocket#rate-limiting)

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes remain buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

```javascript
// every 100ms examine the socket and send more data
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```

## [Connection close](https://javascript.info/websocket#connection-close)

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a “connection close frame” with a numeric code and a textual reason.

The method for that is:

```javascript
socket.close([code], [reason]);
```

- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in `close` event handler gets the code and the reason, e.g.:

```javascript
// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

Most common code values:

- `1000` – the default, normal closure (used if no `code` supplied),
- `1006` – no way to set such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` – the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` – the message is too big to process,
- `1011` – unexpected error on server,
- …and so on.

The full list can be found in [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

WebSocket codes are somewhat like HTTP codes, but different. In particular, any codes less than `1000` are reserved, there’ll be an error if we try to set such a code.

```javascript
// in case connection is broken
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```

## [Connection state](https://javascript.info/websocket#connection-state)

To get connection state, additionally there’s `socket.readyState` property with values:

- **`0`** – “CONNECTING”: the connection has not yet been established,
- **`1`** – “OPEN”: communicating,
- **`2`** – “CLOSING”: the connection is closing,
- **`3`** – “CLOSED”: the connection is closed.

## [Chat example](https://javascript.info/websocket#chat-example)

Let’s review a chat example using browser WebSocket API and Node.js WebSocket module https://github.com/websockets/ws. We’ll pay the main attention to the client side, but the server is also simple.

HTML: we need a `<form>` to send messages and a `<div>` for incoming messages:

```markup
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

From JavaScript we want three things:

1. Open the connection.
2. On form submission – `socket.send(message)` for the message.
3. On incoming message – append it to `div#messages`.

Here’s the code:

```javascript
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// message received - show the message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

Server-side code is a little bit beyond our scope. Here we’ll use Node.js, but you don’t have to. Other platforms also have their means to work with WebSocket.

The server-side algorithm will be:

1. Create `clients = new Set()` – a set of sockets.
2. For each accepted websocket, add it to the set `clients.add(socket)` and setup `message` event listener to get its messages.
3. When a message received: iterate over clients and send it to everyone.
4. When a connection is closed: `clients.delete(socket)`.

```javascript
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```

Here’s the working example:

<iframe class="code-result__iframe" data-trusted="1" src="https://en.js.cx/article/websocket/chat/" style="display: block; border: 0px; width: 798px; height: 100px;"></iframe>

You can also download it (upper-right button in the iframe) and run locally. Just don’t forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.

## [Summary](https://javascript.info/websocket#summary)

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don’t have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:

- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:

- `open`,
- `message`,
- `error`,
- `close`.

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it’s also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing project, people run WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible.