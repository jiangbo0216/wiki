## taro h5与微信小程序通信
* [开放能力 web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。
### 场景
网页登录授权

### Prerequisite　先决条件
* h5页面引入微信sdk //res.wx.qq.com/open/js/jweixin-1.5.0.js



### 原生开发：
* src 指向网页链接
* bindmessage 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。


### taro
* [WebView](https://nervjs.github.io/taro/docs/components/open/web-view.html#docsNav)，参考　https://github.com/NervJS/taro/issues/2097
  * `<WebView src='https://mp.weixin.qq.com/'　onMessage={this.onMessage} />`
  

## 一种实现
1. taro新建一个pageB, 在微信入口文件配置　pages, app.tsx --> config --> pages
   ```js
   // app.tsx
   config: Config = {
    pages: [
      'pages/index/index',
      'pages/pageB/index',
    ],
   }
   // pageB/index
   class Index extends Component {

      onMessage(e) {
        console.log('收到消息')
        console.log(e.detail)
        //todo 你的操作
      }

      render( ){
        return (
          <View>
            <WebView src="指向的地址" onMessage={this.onMessage}></WebView>
          </View>
        )
      }
    }
   ```
2. 跳转页
   ```js
   import {
    navigateTo
   } from  "@tarojs/taro";

    navigateTo({
      url:'../pageB/index'
    })
   ```
3. 在指向的页面获取数据返回数据　参考：　https://segmentfault.com/a/1190000016717727
```js
      window.wx.miniProgram.navigateBack({ delta: 1 })
      window.wx.miniProgram.postMessage({ data: 'nihao' })

```   

## 页面配置　[Component.config](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)
```json
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  }
}
```

## 工程配置　project.config.json


## [原生小程序代码构成](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html#JSON-%E9%85%8D%E7%BD%AE)
* json配置
* [wxml](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)
* [wxss](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)
* js



## 原生全局变量
```
// app.js
App({
  globalData: 'I am global data' // 全局共享数据
})
```

## 微信登录

小程序 | 微信服务器 | 第三方服务器
---------|----------|---------
 wx.login()获取微信登录的凭证code | 1 | 
 wx.request()把code带到三方服务器 | 2 | 
  | 3 | 通过code和其他信息换取用户ID
  |  | 绑定微信用户ID和自己业务用户ID 4
  |  | 生成自己业务登录凭证SessionID 5
 6 |  | 返回业务登录凭证SessionID
 下一次wx.request带上SessionID |  | 7

 code机制隐藏了直接获取用户信息的接口，
 假设黑客A通过分析自己的login接口，假扮成请求Login接口，但是黑客不知道用户ID，这个时候无法获得用户信息


4.5.4 绑定微信用户身份id和业务用户身份
在4.5.2节提到，业务侧用户还没绑定微信侧身份时，会让用户填写业务侧的用户名密码，这两个值会和微信登录凭证一起请求开发者服务器的登录接口，此时开发者后台通过校验用户名密码就拿到了业务侧的用户身份id，通过code到微信服务器获取微信侧的用户身份openid。微信会建议开发者把这两个信息的对应关系存起来，我们把这个对应关系称之为“绑定”。

有了这个绑定信息，小程序在下次需要用户登录的时候就可以不需要输入账号密码，因为通过wx.login()获取到code之后，可以拿到用户的微信身份openid，通过绑定信息就可以查出业务侧的用户身份id，这样静默授权的登录方式显得非常便捷。