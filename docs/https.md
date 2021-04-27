## [Running express.js server over HTTPS](https://timonweb.com/posts/running-expressjs-server-over-https/)
HTTPS is everywhere and more often than not we need to spin an https server or two. Here's how you can do it for your local express.js dev server:
### 1. Generate a self-signed certificate
openssl req -nodes -new -x509 -keyout server.key -out server.cert

### 2. Enable HTTPS in Express
``` js
var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})
```

## 全站https
1. 搜索`http://`，依赖的接口改成`https://`
2. 搜索`.js'|"`,保证依赖的`js`文件支持`https`
3. 接口返回的资源链接支持`https`

## https 特征
[HTTPS的七个误解（译文）](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)
1. 可以缓存 Cache-Control: Public 或者 Cache-Control: max-age=600
2. 证书
   1. 免费的证书： https://www.mesince.com http://www.startssl.com/
3. 一个ip地址部署多个https服务 
   1. 如果你使用子域名通配符SSL证书（wildcard SSL certificate，价格大约是每年125美元），就能在一个IP地址上部署多个HTTPS子域名
   2. UCC（统一通信证书，Unified Communications Certificate）支持一张证书同时匹配多个站点，可以是完全不同的域名。SNI（服务器名称指示，Server Name Indication）允许一个IP地址上多个域名安装多张证书。
4. 部署https证书，通常有其他方式帮助转移https证书
   1. 在你的服务器上，生成一个CSR文件（SSL证书请求文件，SSL Certificate Signing Request）。
   2. 使用CSR文件，购买SSL证书。
   3. 安装SSL证书。
5. https太慢，确实会比http慢，需要[优化](https://zhuanlan.zhihu.com/p/25290538)
6. 使用了https,Cookie和查询字符串仍然需要不可预测的特性
7. 不止登录页，全站使用https，避免生成的session泄露
   1. 咖啡馆的免费WiFi，就是一个很理想的劫持环境，因为两个原因：
      1. 这种WiFi通常不会加密，所以很容易监控所有流量。
      2. WiFi通常使用NAT进行外网和内网的地址转换，所有内网客户端都共享一个外网地址。这意味着，被劫持的session，看上去很像来自原来的登录者。

## https 原理
HTTPS总结起来就是3次tcp握手-5次TLS握手