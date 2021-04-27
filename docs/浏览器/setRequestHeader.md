## [setRequestHeader forbidden](https://fetch.spec.whatwg.org/#forbidden-header-name)

A forbidden header name is a header name that is a byte-case-insensitive match for one of

`Accept-Charset`
`Accept-Encoding`
`Access-Control-Request-Headers`
`Access-Control-Request-Method`
`Connection`
`Content-Length`
`Cookie`
`Cookie2`
`Date`
`DNT`
`Expect`
`Host`
`Keep-Alive`
`Origin`
`Referer`
`TE`
`Trailer`
`Transfer-Encoding`
`Upgrade`
`Via`

setRequestHeader设置这些头部在浏览器中会失败, 可以用node请求

参考链接:

* <https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader>
* <https://xhr.spec.whatwg.org/#the-setrequestheader()-method>
* https://fetch.spec.whatwg.org/#forbidden-header-name
