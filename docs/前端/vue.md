# 如何处理浏览器的断网情况

**好的断网处理会让人很舒适：lol的断线重连，王者荣耀的断线重连 可以确保游戏的继续进行**

**坏的断网处理甚至不处理会出bug：比如我手上的项目就出了个bug 业务人员表示非常苦恼**

网络问题一直是一个很值得关注的问题。

比如在慢网情况下，增加loading避免重复发请求，使用promise顺序处理请求的返回结果，或者是增加一些友好的上传进度提示等等。

那么大家有没有想过断网情况下该怎么做呢？比如说**网络正常->断网->网络正常。**

其实我一直也没想过，直到组里的测试测出一个断网导致的bug，让我意识到**重度依赖网络请求的前端，在断网情况下可能会出现严重的bug。**

因此我将在这里记录一下自己对系统断网情况下的处理，一方面避免bug产生，一方面保证用户及时在应用内知道网络已经断开连接

- 概览
- 用于检测浏览器是否连网的navigator.onLine
- 用于检测网络状况的navigator.connection
- 断网事件"offline"和连网事件"online"
- 断网处理项目实战
  - 思路和效果
  - 断网处理组件使用
  - 断网处理组件详情
  - 发现
- 参考资料

### 概览

为了构建一个 “断网（offline）可用”的web应用，你需要知道应用在什么时候是断网（offline）的。 不仅仅要知道什么时候断网，更要知道什么时候网络恢复正常（online）。 可以分解陈本下面两种常见情况：

1. 你需要知道用户何时online，这样你可以与服务器之间re-sync（重新同步）。
2. 你需要知道用户何时offline，这样你可以将你未发出的请求过一段时间再向服务器发出。

通常可以通过online/offline事件去做这个事情。

### 用于检测浏览器是否连网的navigator.onLine

navigator.onLine

- true online
- false offline

可以通过network的online选项切换为offline，打印navigator.onLine验证。

当浏览器不能连接到网络时，这个属性会更新。规范中是这样定义的：

> The navigator.onLine attribute must return false if the user agent will not contact the network when the user follows links or when a script requests a remote page (or knows that such an attempt would fail)...

### 用于检测网络状况的navigator.connection

在youtube观看视频时，自动检测网络状况切换清晰度是如何做到的呢？

国内的视频网站也会给出一个切换网络的提醒，该如何去检测呢？

也就是说，有没有办法检测网络状况？判断当前网络是流畅，拥堵，繁忙呢？

可以通过navigator.connection，属性包括effectiveType，rtt，downlink和变更网络事件change。继承自NetworkInformation API。

#### navigator.connection

online状态下运行`console.log(navigator.connection);`

```
{
    onchange: null,
    effectiveType: "4g",
    rtt: 50,
    downlink: 2,
    saveData: false
}
复制代码
```

通过navigator.connection可以判断出online，fast 3g，slow 3g，和offline，这四种状态下的effectiveType分别为4g，3g，2g，4g（rtt，downlink均为0）。

#### rtt和downlink是什么？NetworkInformation是什么

这是两个反映网络状况的参数，比type更加具象且更能反映当前网络的真实情况。

常见网络情况rtt和downlink表

| 网络状况 | rtt(ms) | downlink(Mbit/s) |
| -------- | ------- | ---------------- |
| online   | 100     | 2.2              |
| fast 3g  | 600     | 1.55             |
| slow 3g  | 2150    | 0.4              |
| offline  | 0       | 0                |

注意：**rtt和downlink不是定值，而是实时变化的。online时，可能它现在是rtt 100ms，2.2Mb/s，下一秒就变成125ms，2.1Mb/s了。**

##### rtt

- 连接预估往返时间
- 单位为ms
- 值为四舍五入到25毫秒的最接近倍数（就是说这个值x%25===0，可以观察常见网络情况rtt和downlink表）
- 值越小网速越快。类似ping的time吧
- 在Web Worker中可用

##### downlink

- 带宽预估值
- 单位为Mbit/s（注意是Mbit，不是MByte。）
- 值也是四舍五入到最接近的25比特/秒的倍数（就是说这个值x%25===0，可以观察常见网络情况rtt和downlink表）
- 一般越宽速度越快，也就是，信道上可以传输更多数。（吐槽一句，学过的通信原理还蛮有用。）
- 值越大网速越快。类似高速一般比国道宽。
- 在Web Worker中可用

##### 草案（Draft）阶段NetworkInformation API

无论是rtt，还是downlink，都是这个草案中的内容。 除此之外还有downlinkMax，saveData，type等属性。 更多资料可以查询：[NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)

#### 如何检测网络变化去做出响应呢

NetworkInformation继承自EventTarget，可以通过监听change事件去做一些响应。

例如可以获得网络状况的变更？

```
var connection = navigator.connection；
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("网络状况从 " + type + " 切换至" + connection.effectiveType);
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
复制代码
```

监听变更之后，我们可以弹一个Modal提醒用户，也可以出一个Notice通知用户网络有变化，或者可以更高级得去自动切换清晰度（这个应该比较难）。

引出NetworkInformation的概念，只是想起一个抛砖引玉的作用。这种细粒度的网络状况检测，可以结合具体需求去具体实现。

在这篇博文中，我们只处理断网和连网两种情况，下面来看断网事件"offline"和连网事件"online"。

### 断网事件"offline"和连网事件"online"

浏览器有两个事件："online" 和 "offline". 这两个事件会在浏览器在online mode和offline mode之间切换时，由页面的`<body>`发射出去。

事件会按照以下顺序冒泡：document.body -> document -> window。

事件是不能去取消的（开发者在代码上不能手动变为online或者offline，开发时使用开发者工具可以）。

#### 注册上下线事件的几种方式

**最最建议window+addEventListener的组合。**

- 通过window或document或document.body和addEventListener(Chrome80仅window有效)
- 为document或document.body的.ononline或.onoffline属性设置一个js函数。（注意，使用window.ononline和window.onoffline会有兼容性的问题）
- 也可以通过标签注册事件`<body ononline="onlineCb" onoffline="offlineCb"></body>`

#### 例子

![20200713002614](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200713002614.png)

![20200713002626](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200713002626.png)

```
<div id="status"></div>
<div id="log"></div>
复制代码
window.addEventListener('load', function() {
  var status = document.getElementById("status");
  var log = document.getElementById("log");

  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";
    status.innerHTML = condition.toUpperCase();

    log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});
复制代码
```

其中insertAdjacentHTML是在标签节点的邻近位置插入，可以查阅：DOM进阶之insertAdjacentHTML

### 断网处理项目实战

基于vue以及iView的Spin，Notice组件封装出离线处理组件，在需要到的页面引入即可。

#### 思路和效果

只要做到断网提醒+遮罩，上线提醒-遮罩即可。

- 监听offline，断网给出提醒和遮罩：网络已断开，请检查网络连接。
- 监听online，连网给出提醒和遮罩：网络已连接。

![!](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/!%5Bimg%5D(httpsuser-gold-cdn.xitu.io20203301712a999d185e2eeimageslim).png)

#### 断网处理组件使用

```
<OfflineHandle
    :offlineTitle = "断网处理标题"
    :desc="断网处理描述"
    :onlineTitle="连网提醒"
>
</OfflineHandle>
复制代码
```

#### 断网处理组件详情

```
<!--OfflineHandle.vue-->
<template>
  <div v-if="spin" class="offline-mark">
    <Spin size="large" fix>
      <h2>{{offlineTitle}}</h2>

      <p>{{desc}}</p>
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'offline-handle',
  props: {
    offlineTitle: {
      type: String,
      default: '网络已断开，请检查网络连接。',
    },
    onlineTitle: {
      type: String,
      default: '网络已连接',
    },
    desc: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 4.5,
    },
  },
  data() {
    return {
      spin: false,
    };
  },
  mounted() {
    window.addEventListener('offline', this.eventHandle);
    window.addEventListener('online', this.eventHandle);
  },
  beforeDestroy() {
    window.removeEventListener('offline', this.eventHandle);
    window.removeEventListener('online', this.eventHandle);
  },
  methods: {
    eventHandle(event) {
      const type = event.type === 'offline' ? 'error' : 'success';
      this.$Notice[type]({
        title: type === 'error' ? this.offlineTitle : this.onlineTitle,
        desc: type === 'error' ? this.desc : '',
        duration: this.duration,
      });
      setTimeout(() => {
        this.spin = event.type === 'offline';
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.offline-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  z-index: 9999;
  transition: position 2s;
}
/deep/.ivu-spin-fix {
  text-align: left;
  font-size: 20px;
  h2 {
    color: rgba(0, 0, 0, 0.8);
  }
  p {
    margin-top: 20px;
    color: red;
    font-weight: bold;
  }
}
</style>

复制代码
```

#### 发现

- offline和online事件：window有效，document和document.body设置无效 手上的项目只运行在Chrome浏览器，只有为window设置offline和online才生效。 运行环境："Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
- 为position增加2s的transition的避免屏闪

参考资料：

- [developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events)
- [developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/rtt)
- [developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink)

## vue mixin

混入

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```
