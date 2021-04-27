# axios使用问题

## 问题描述

> 纯后端运行及 node.js情况下

在使用axios模拟登录时，登录后的cookies在第二次请求的时候无法带在网络请求中。

问题代码：

```
const axios = require('axios');

const instance = axios.create(
    {
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        },
        withCredentials: true,
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }]
    }
);


(
    async () => {
```



## 回答

#### 运行环境

对于浏览器环境，HTTP 响应头中存在 set-cookie 时，浏览器会保存以便下次请求时携带，非 HttpOnly 的 cookie 也可以通过 document.cookie 访问到。
对于 node.js 环境，cookie 并不会像浏览器一样自动保存。因为 cookie 的存在是用来区分不同用户的，node.js 作为一个服务器，它发起的 http 没有理由需要携带 cookie，也没必要。

#### axios 实现

axios 不会对响应头做任何处理，更不会保存响应头中的 set-cookie 值到 js 运行内存中。
换句话说 axios 实现中和 cookie 没有任何绑定！