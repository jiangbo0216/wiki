#### 103. 什么是 CSP？

```
CSP 指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

通常有两种方式来开启 CSP，一种是设置 HTTP 首部中的 Content-Security-Policy，一种是设置 meta 标签的方式 <meta
http-equiv="Content-Security-Policy">
```

详细资料可以参考： [《内容安全策略（CSP）》](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) [《前端面试之道》](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bdc721851882516c33430a2)