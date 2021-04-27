标准的PWA程序，必须包含3个部分：
* https服务器
* manifest.json
* service worker  主要用来做持久化 HTML5 API

* 常用的前端性能优化CDN, CSS Sprite, 文件合并压缩, 异步加载, 资源缓存, 缺点, 断网GG
* service worker允许web引用在网络环境比较差或者是离线的环境依旧可以使用
* service worker 是一个独立的worker线程, 独立于当前页面的进程, 是一种特殊的web worker

## service worker
### 了解web worker
* 浏览器中的javascript 单线程, 耗资源, 时间的复杂运算过程, 如果使用主线程, 会造成性能问题
* w3c提供了 web worker 的 api, 脱离主线程, 可以执行复杂耗时的任务
* 通过postMessage 与主进程通信
* web worker是个独立的运行环境, 不能操作DOM 和BOM

### web worker 使用
* 创建web worker new Worker('worker.js')
* 在 web worker 中进行复杂计算
* self.postMessage(msg) 给主进程发消息
* 主进程通过 worker.onmessage = function(msg) {}
* 主进程也可以用同样的方式给web worker进行通讯


### service worker 基本介绍
* web worker 是临时的, 做的事情不能持久化
* service worker 一旦install, 就会永远存在, 除非手动 unregister
* 使用的时候直接唤醒, 不用的时候可以休眠
* 可编程拦截代理请求和返回, 缓存文件, 缓存的文件可以被网页进程取到(包括网络离线状态)
* 理想内容开发者可控
* 必须使用https
* 异步实现, Promise
  
![20200409173252](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200409173252.png)

### service worker 使用步骤
* window.onload 中注册了service worker, 防止与其他资源竞争
* navigator 对象中内置了 serviceWorker 属性
* 兼容性问题, if ('serviceWorker' in navigator) {}
* 注册 Service Worker navigator.serviceWorker.register('./sw.js'), 返回一个promise 对象
* 作用, 操作缓存, 网络请求
  
![20200409173640](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200409173640.png)


###  service worker 生命周期
* install 注册成功时触发, 用于缓存资源
* active  激活时触发, 用于删除旧的资源
* fetch 用于操作缓存或者读取网络资源
* 如果sw.js 文件发生了改变, install事件就会重新触发
* activate事件会在install事件后触发, 但是如果现在已经存在service worker, 那么就处理等待状态, 直到当前service worker停止
* self.skipWaiting() 跳过等待, 直接激活
* event.waitUntil(self.skipWating())
* self.clients.claim() 立即获取控制权 event.waitUntil(self.clients.claim())

![20200409174630](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200409174630.png)


### fetch api



### cache storage
1. caches api
类似数据库的操作
* caches.open(cacheName).then((cache)=>{}), 打开缓存, 返回一个匹配cacheName的cache对象的Promise
* caches.keys(), 返回一个Promise对象, 包括所有缓存的key
* caches.delete(key) 根据key删除对应的缓存

2. cache 对象
cache接口为缓存的Request/Response 对象提供了存储机制
* cache.put(req, res), 把请求当作key, 并且把对应的响应存储起来
* cache.add(url), 根据url发起请求, 并且把响应存储起来
* cache.addAll(urls)
* cache.match(req), 获取req对应的response

## notification
离线和在线事件

offline/online
```js
function onlineListener() {}
window.addEventListener('online', onlineListener)
```

* Notification API 配置和显示桌面通知
* Notification.permission 可以获取当前用户的授权情况
  * Default: 默认的, 未授权
  * Denied: 拒绝, 无法再次请求
  * Granted: 已授权
* Notification.requestPermission() 请求用户授权
* new Notification('title', {body: '', icon: ''}) 显示通知
* 已授权的情况下可以在 service worker 中显示通知 self.registration.showNotification('title', {body: ''})




