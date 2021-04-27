# fetch

## API

### fetch(url[, options])

- `url` A string representing the URL for fetching
- `options` [Options](https://github.com/node-fetch/node-fetch#fetch-options) for the HTTP(S) request
- Returns: `Promise<Response>`

Perform an HTTP(S) fetch.

`url` should be an absolute url, such as `https://example.com/`. A path-relative URL (`/file/under/root`) or protocol-relative URL (`//can-be-http-or-https.com/`) will result in a rejected `Promise`.

### Options

The default values are shown after each option key.

```
{
 // These properties are part of the Fetch Standard
 method: 'GET',
 headers: {},            // Request headers. format is the identical to that accepted by the Headers constructor (see below)
 body: null,             // Request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
 redirect: 'follow',     // Set to `manual` to extract redirect headers, `error` to reject redirect
 signal: null,           // Pass an instance of AbortSignal to optionally abort requests

 // The following properties are node-fetch extensions
 follow: 20,             // maximum redirect count. 0 to not follow redirect
 compress: true,         // support gzip/deflate content encoding. false to disable
 size: 0,                // maximum response body size in bytes. 0 to disable
 agent: null,            // http(s).Agent instance or function that returns an instance (see below)
 highWaterMark: 16384,   // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
 insecureHTTPParser: false // Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
}
```

#### Default Headers

If no values are set, the following request headers will be sent automatically:

| Header              | Value                                                  |
| ------------------- | ------------------------------------------------------ |
| `Accept-Encoding`   | `gzip,deflate,br` *(when `options.compress === true`)* |
| `Accept`            | `*/*`                                                  |
| `Connection`        | `close` *(when no `options.agent` is present)*         |
| `Content-Length`    | *(automatically calculated, if possible)*              |
| `Transfer-Encoding` | `chunked` *(when `req.body` is a stream)*              |
| `User-Agent`        | `node-fetch`                                           |

Note: when `body` is a `Stream`, `Content-Length` is not set automatically.

#### Custom Agent

The `agent` option allows you to specify networking related options which are out of the scope of Fetch, including and not limited to the following:

- Support self-signed certificate
- Use only IPv4 or IPv6
- Custom DNS Lookup

See [`http.Agent`](https://nodejs.org/api/http.html#http_new_agent_options) for more information.

In addition, the `agent` option accepts a function that returns `http`(s)`.Agent` instance given current [URL](https://nodejs.org/api/url.html), this is useful during a redirection chain across HTTP and HTTPS protocol.

```
const http = require('http');
const https = require('https');

const httpAgent = new http.Agent({
 keepAlive: true
});
const httpsAgent = new https.Agent({
 keepAlive: true
});

const options = {
 agent: function(_parsedURL) {
  if (_parsedURL.protocol == 'http:') {
   return httpAgent;
  } else {
   return httpsAgent;
  }
 }
};
```

#### Custom highWaterMark

Stream on Node.js have a smaller internal buffer size (16kB, aka `highWaterMark`) from client-side browsers (>1MB, not consistent across browsers). Because of that, when you are writing an isomorphic app and using `res.clone()`, it will hang with large response in Node.

The recommended way to fix this problem is to resolve cloned response in parallel:

```
const fetch = require('node-fetch');

const response = await fetch('https://example.com');
const r1 = await response.clone();

const results = await Promise.all([response.json(), r1.text()]);

console.log(results[0]);
console.log(results[1]);
```

If for some reason you don't like the solution above, since `3.x` you are able to modify the `highWaterMark` option:

```
const fetch = require('node-fetch');

const response = await fetch('https://example.com', {
 // About 1MB
 highWaterMark: 1024 * 1024
});

const result = await res.clone().buffer();
console.dir(result);
```

#### Insecure HTTP Parser

Passed through to the `insecureHTTPParser` option on http(s).request. See [`http.request`](https://nodejs.org/api/http.html#http_http_request_url_options_callback) for more information.

# [axios](./axios.md)

# 对比

## get

fetch 不支持 axios 的 params 参数

## post

fetch 参数body, 必须JSON.stringify  对应 axios 的data参数, 可以直接传json
