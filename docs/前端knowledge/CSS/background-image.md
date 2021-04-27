#### 96.隐藏元素的 background-image 到底加不加载？

相关知识点：

```
根据测试，一个元素如果display计算值为none，在IE浏览器下（IE8～IE11，更高版本不确定）依然会发送图片请求，Fire
fox浏览器不会，至于Chrome和Safari浏览器则似乎更加智能一点：如果隐藏元素同时又设置了background-image，则图片
依然会去加载；如果是父元素的display计算值为none，则背景图不会请求，此时浏览器或许放心地认为这个背景图暂时是不会使
用的。

如果不是background-image，而是<img>元素，则设置display:none在所有浏览器下依旧都会请求图片资源。

还需要注意的是如果设置的样式没有对应的元素，则background-image也不会加载。hover情况下的background-image，在触
发时加载。
```

回答：

-（1）元素的背景图片

-元素本身设置 display:none，会请求图片 -父级元素设置 display:none，不会请求图片 -样式没有元素使用，不会请求 -:hover 样式下，触发时请求

-（2）img 标签图片任何情况下都会请求图片

详细资料可以参考： [《CSS 控制前端图片 HTTP 请求的各种情况示例》](https://www.jb51.net/css/469033.html)