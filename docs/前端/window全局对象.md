## 1. `window`对象常见的事件

1. 窗口（页面）加载事件：`window.onload`

   ```js
   // 1. 当文档内容（图像、脚本文件、CSS文件）完全加载完成会触发该事件，然后调用处理函数
   window.onload = function () {}
   
   // 或者
   window.addEventListener('load', function () {})
   // 注：把js代码写在onload事件的处理函数中，javascript标签可以放在页面的任意位置
   123456
   ```

2. DOM加载事件：`document.DOMContentLoaded`

   ```js
   document.addEventListener('DOMContentLoaded', function() {}) 
   // 1. 当DOM加载完成就会触发，不用等`图片`、`CSS`、`flash`等，加载速度比`onload`更快
   // 2. IE9 以上才支持
   // 3. 如果页面图片很多的话，等`onload`触发可能时间会较长，影响用户体验
   // 4. 此时使用`DOMContentloaded`可以让用户提前与网页交互，提高用户体验
   12345
   ```

3. 调整窗口大小事件：`window.onresize`

   ```js
   window.onresize = function() {}
   // 当窗口大小发生变化时就会触发
   12
   ```

4. 重新加载页面事件： `window.onpageshow`

   ```js
   window.onpageshow = function() {}
   // 1. 重新加载页面时触发
   // 2. onpageshow 与 onload 的区别：
   //	  onload 在执行页面的后退或前进的时候，如果网页被缓存了，就触发不了（比如火狐浏览器）
   //	  onpageshow 在执行页面的后退或前进的时候，不管网页被有没有被缓存了，都会触发
   // 3. onpageshow 事件对象中有个属性 persisted可以判断是不是缓存的页面触发了事件，返回布尔值
   123456
   ```

## 2. 定时器

1. 一次性定时器：`window.setTimeout(调用函数, [延迟的毫秒数])`

   ```js
   // 开启一次性定时器：
   const timer = setTimeout(() =>{
   
   },1000)
   //  在调用的时候可以省略`window`，延迟时间单位是毫秒，可以省略，如果省略默认的是0
   12345
   ```

   ```js
   // 停止一次性定时器
   clearTimeout(timer)
   12
   ```

2. 重复定时器：`window.setInterval(回调函数，[间隔毫秒数])`

   ```js
   // 开启定时器：
   const timer = setInterval(() =>{
   
   }，1000)
   // 每隔这个（延时）时间，就调用一次回调函数
   12345
   ```

   ```js
   // 关闭定时器：
   clearInterval(timer)
   12
   ```

3. 定时器的 `this` 指向

   ```js
   1. 一般情况下，this 在定义函数的时候，确定不了指向，只有在调用函数的的时候才能确定 
   2. 遵循谁调用，this 就指向谁的原则
   3. 全局作用域或者普通函数中的`this`指向全局对象`window`（`定时器里面的this指向window`）
   123
   ```

## 3. `location` 对象（操作`URL`的）

1. 什么是

    

   ```
   location
   ```

    

   对象?

   ```js
   1. window 对象给我们提供了一个 location 属性用于获取或设置窗体的URL，并且可以用于解析URL
   2. 因为这个属性返回的是一个对象，所以我们将这个属性也称为`location对象
   12
   ```

2. ```
   URL
   ```

    

   是什么?

   ```js
   1. 统一资源定位符（Uniform Resource Locator ，URL）是互联网上标准资源的地址
   2. 互联网上的每个文件都有一个唯一的`URL`，它包含的信息指出文件的位置以及浏览器应该怎么处理它
   3.  URL的一般语法格式为：
   	格式一：`protocol://host[:port]/path/[?query]#fragment`
   	案例：`http://www.itcast.cn/index.html?name=andy&age=18#link`
   12345
   ```

   | 序号 | 组成     | 说明                                                         |
   | ---- | -------- | ------------------------------------------------------------ |
   | 1    | protocol | 通信协议，常用的http、ftp、maito等                           |
   | 2    | host     | 主机（域名）www.itheima.com                                  |
   | 3    | post     | 端口号可选，省略时使用方案的默认端口，如http的默认端口为80   |
   | 4    | path     | 路径由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
   | 5    | query    | 参数，以键值对的形式，通过'&'符号来隔开                      |
   | 6    | fragment | 片段，#后面内容，常见于链接、锚点                            |

1. ```
   location
   ```

    

   对象的属性,重点记住：

   ```
   href
   ```

   、

   ```
   search
   ```

   | 序号 | 属性     | 返回值                                |
   | ---- | -------- | ------------------------------------- |
   | 1    | href     | 获取或者设置整个URL                   |
   | 2    | host     | 返回主机（域名）www.itheima.com       |
   | 3    | post     | 端口号可选，如果未写返回空字符串      |
   | 4    | pathname | 返回路径                              |
   | 5    | search   | 返回参数                              |
   | 6    | hash     | 返回片段，#后面内容，常见于链接、锚点 |

1. ```
   location
   ```

    

   对象的方法：

   ```js
   1. assign() 和 replace() 都是跳转页面
   2. 不同之处在于 assign() 会记录页面的历史记录
   3. 而 replace() 不会记录历史记录,所以不能后退页面
   4. reload() 是刷新页面，reload(true) 加个参数 true 为强制刷新，强制刷新会清除页面缓存
   1234
   ```

   | 序号 | 方法         | 返回值                                                       |
   | ---- | ------------ | ------------------------------------------------------------ |
   | 1    | assign(url)  | 跟href一样，可以跳转页面（也成为重定向页面）                 |
   | 2    | replace(url) | 替换当前页面，因为不记录历史，所以不能后退页面               |
   | 3    | reload()     | 重新加载页面，相当于刷新按钮或者 f5，如果参数为true 强制刷新 ctrl+f5 |

## 4. `navigator` 对象（识别客户机设备）

1. `navigator 对象`包含有关浏览器的信息，`它有很多属性`，我们常见的是`userAgent`，该属性可以返回由客户机发送至服务器的`user-agent头部的值`

2. ```
   userAgent
   ```

    

   属性可以帮我们判断客户端是手机还是电脑

   ```js
   if((navigator.userAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|Android|Mobile
   |BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian
   |Windows|Phone)/i))) {
     window.location.href = ""  // 手机
   } else {
     window.location.href = ""   // 电脑
   }
   1234567
   ```

## 5. `history`对象（浏览器前进后退功能）

1. ```
   window
   ```

   对象给我们提供了一个

   ```
   history
   ```

   对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的URL

   | 序号 | 方法      | 作用                                                    |
   | ---- | --------- | ------------------------------------------------------- |
   | 1    | back()    | 可以后退功能                                            |
   | 2    | forward() | 前进功能                                                |
   | 3    | go()      | 前进、后退功能，参数1前进一个页面，参数-1则后退一个页面 |

1. `history` 对象一般在实际开发中比较少用，但是会在一些`OA`办公系统中见到
   ![在这里插入图片描述](window%E5%85%A8%E5%B1%80%E5%AF%B9%E8%B1%A1-imgs/20200713192147260.png)