# 探究 PWA 的实现与应用

> PWA（Progressive web apps，渐进式 Web 应用）

### 概念

`PWA` 是现代 `web` 开发的一个新的理念，他不依赖于某个特定的 `API`，而是使用各种技术和模式来开发的 `web` 应用，并且同时具备 `web` 应用和原生应用的特性，以此来达到最佳 `web` 体验的目标；

一个应用可以称为 `PWA`，应该具备以下特点：

**Discoverable** 内容可以通过搜索引擎发现。

**Installable** 可以出现在设备的主屏幕。

**Linkable** 你可以简单地通过一个URL来分享它。

**Network independent** 它可以在离线状态或者是在网速很差的情况下运行。

**Progressive** 它在老版本的浏览器仍旧可以使用，在新版本的浏览器上可以使用全部功能。

**Re-engageable** 无论何时有新的内容它都可以发送通知。

**Responsive** 它在任何具有屏幕和浏览器的设备上可以正常使用——包括手机，平板电脑，笔记本，电视，冰箱，等。

**Safe** 在你和应用之间的连接是安全的，可以阻止第三方访问你的敏感数据。

所以，判断一个 `web` 应用是否是 `PWA` 需要看它是否同时具备原生应用的特性，比如：桌面图标，离线缓存，消息推送等；当然，他的好处也是很多的，比如：快！真的非常快，并且离线可访问；用户可以同意添加图标到主屏方便下次访问；还可以实现系统级的消息推送；总之，就是不断的接近原生应用的体验！



### 技术实现

实现一个 `PWA` 需要的核心技术包括：`Service Worker` + `Manifest.json` + `HTTPS`

#### Service Worker

`Service Worker` 是一个注册在指定资源和路径下的事件驱动 `worker`，因此它同其他类型 `worker` 一样不能访问 `DOM`，不允许使用同步的 `API`，比如 `localStorage`，但是他能拦截并修改访问的资源请求，通过多种缓存策略来对资源进行缓存和更新；

- 注册一个 `worker`：

```
if ('serviceWorker' in navigator) {
  navigator
  .serviceWorker
  .register('/sw-test/sw.js', { 
    scope: '/sw-test/' 
  })
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

```

- 安装和激活：填充缓存

`sw` 注册之后，浏览器会尝试安装并激活它，安装完成之后会触发 `install` 事件，为了达到离线缓存的目的，需要使用一个新的存储 `API` - `caches`，这个 `API` 是 `sw` 上的一个全局对象，他可以用来存储网络请求过来的资源，与浏览器标准存储不一样的是，他是特定你的域的持久化缓存；

```
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/app.js'
      ]);
    })
  );
});
复制代码
```

- 控制请求的响应

任何被 `sw` 控制的的被请求时，都会触发 `fetch` 事件，通过监听该事件可以控制请求的具体响应内容；

如上，安装成功后可以将一批指定的资源缓存起来，那么现在就可以拦截请求，然后将匹配到的缓存结果作为响应，或者重新请求新版的资源，甚至可以响应指定的内容，你拦截了，那么你说了算！

```
// 响应已缓存的请求

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});

// 响应自定义内容

const res = new Response('<p>Hello, service worker!</p>', {
  headers: { 'Content-Type': 'text/html' }
});
event.respondWith(res);

// 缓存获取失败重新请求最新的

event.respondWith(
  caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  })
);

复制代码
```

- 更新 `Service Worker`

如果刷新页面后有新版的 `sw`，新版的会在后台安装，安装后并不会立即生效，当没有页面在使用旧的版本的 `sw` 时，新版的就会激活并响应请求；

```
// 更新到 v2 版本

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        '/sw-test/app.js'
      ]);
    })
  );
});
复制代码
```

- 删除旧缓存

当有了新版本，旧版本还在运行的时候，为了避免缓存数据太多占满磁盘空间，需要对旧的缓存进行清理；通过监听 `activate` 事件，来对旧的缓存进行清理；

```
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
```

