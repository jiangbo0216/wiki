<style>.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:30px;margin-bottom:5px}.markdown-body h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:15px}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}.markdown-body .contains-task-list{padding-left:0}.markdown-body .task-list-item{list-style:none}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}</style>

今天刷 github 的时候，看到 [justjavac](https://github.com/justjavac) 大佬 po 出来了这样的一段代码（[justjavac/proxy-www](https://github.com/justjavac/proxy-www)）：

```javascript
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        if (typeof o === 'function') {
            return o.bind(target)
        }
        if (typeof prop !== 'string') {
            return o;
        }
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        target = new URL(target);
        target.hostname += `.${prop}`;
        return new Proxy(target, { get });
    }
});
复制代码
```

乍一看可能有点不明所以，但使用起来让人眼前一亮！可以直接把网址作为变量进行访问：

```javascript
www.baidu.com.then(response => {
    console.log(response.status);
    // ==> 200
})
复制代码
```

用 `async` / `await` 语法则变得更为简单：

```javascript
const response = await www.baidu.com

console.log(response.ok)
// ==> true

console.log(response.status);
// ==> 200
复制代码
```

这一切都来源于 ES6 中提出的 `Proxy` 和 `Reflect` 语法，我们不妨用这段代码来简单学习一下他们吧\~

`Proxy` 也就是代理。学习过计算机网络的朋友对这个词肯定不陌生。在计算机网络中，代理是指客户端不直接连接服务器，而是通过一些中间的机器进行请求的传递，从而达到提高访问速度，提升安全性之类的需求。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/018556b8878042bdbeafa79a6c2df42c~tplv-k3u1fbpfcp-watermark.image)

javascript 中的 `Proxy` 也是类似的功能，只不过阻隔的不再是服务器和客户端，而是一般的对象和使用对象的用户。以这段代码为例，`Proxy` 就是夹在 `new URL("www")` 和要访问或修改这个 `URL` 的用户之间：

```js
const www = new Proxy(new URL('https://www'), { ... }});
复制代码
```

额外加入一层代理自然是要进行一些自定义的操作，`Proxy` 会通过传入的第二个参数去劫持对象的 `[[Get]]`，`[[Set]]` 这样的内部方法。这段代码劫持的是 `[[Get]]`：

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) { ... }
});
复制代码
```

替换的 `[[Get]]` 函数有两个参数：`target` 是指原本的对象，也就是 `URL`；`prop` 则是需要访问的对象名，对于 `www.baidu.com` 的例子来说，第一层的 `prop` 就是 `"baidu"`，第二层是 `"com"`。

继续研究这段代码，我们遇到了 `Reflect`。`Reflect` 是和 `Proxy` 一同提出的，简单理解的话就是把 `[[Get]]`、`[[Set]]` 这样的内部函数转化为函数式的调用方法。`Reflect` 常常和 `Proxy` 配合使用，来把被劫持的操作重新施加于原有的对象。在这里：

```js
let o = Reflect.get(target, prop);
复制代码
```

也可以理解为：

```js
let o = target[prop]
复制代码
```

剩下的代码就很好理解了：

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        // 当 `[[Get]]` 的属性为 `URL` 已有的函数，那么就返回这个已有的函数
        // 补：例如 www.justjavac.com.toString()
        if (typeof o === 'function') {
            return o.bind(target)
        }
        // 当 `prop` 不是字符串的时候，返回当前的属性
        // 补：object key 只能是字符串和 Symbol，所以这里是判断是否为 Symbol。
        //    使用场景是 www.justjavac.com + 'foo/bar'
        if (typeof prop !== 'string') {
            return o;
        }
        // 如果 `prop` 为 `then`，就把 `URL` 转化为 `fetch` 后的
        // `Promise`。（这样的结果就是不能调用 `www.then.com` 这样的网址了）
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        // 对于其余的情况，把新增加的字符串加进域名中，并重新包一层 `Proxy`。
        target = new URL(target);
        target.hostname += `.${prop}`;
        // 这里引用了get函数， 所以需要写成具名函数
        return new Proxy(target, { get });
    }
});
复制代码
```

注：感谢评论区作者本人的补充！

到这里，你看懂这一段代码了吗？是不是也对 `Proxy` 和 `Reflect` 的用法有了基本的了解呢？如果想要更深度的理解他们，推荐这篇万字长文：[Proxy 和 Reflect](https://juejin.cn/post/6844904090116292616) by [王小酱](https://juejin.cn/post/6844904090116292616)。

<!---->
