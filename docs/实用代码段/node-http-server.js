const http = require("http")

const server = http.createServer(function(req, res) {
  console.log(req.method + ":" + req.url)
  res.writeHead(200, {'Content-Type' : 'text/html'})
  res.end('Hello world')
})

server.listen(8080)

console.log('Server is running at http://127.0.0.1:8080/')