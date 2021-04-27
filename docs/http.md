## 状态码
200 强缓存。 用户发送的请求，缓存时间过期之前，直接从客户端缓存中获取，不发送请求到服务器，不与服务器发生交互行为。

301 Moved Permanently　被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。
304 Not Modified　协商缓存，用户发送的请求，发送到服务器后，由服务器判定是否从缓存中获取资源，如果文件没有变化，则从缓存中获取，如果文件有变动，从服务器中获取新的资源

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status