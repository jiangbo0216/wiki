#### 89. 什么是 Polyfill ？

```
Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。

比如说 querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个 Polyfill。

一个 shim 是一个库，有自己的 API，而不是单纯实现原生不支持的 API。
```

详细资料可以参考： [《Web 开发中的“黑话”》](https://segmentfault.com/a/1190000002593432) [《Polyfill 为何物》](https://juejin.im/post/5a579bc7f265da3e38496ba1)