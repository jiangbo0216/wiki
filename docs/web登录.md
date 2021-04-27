
## session与web登录
### 为什么会有登录这回事
因为[HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)是无状态的协议，所谓无状态就是在两次请求之间服务区并不会保存任何数据，相当于你和一个人说一句话之后他就把你忘掉了。所以，登录就是用某种方法让服务器在多次请求之间能够识别出你，而不是每次发请求都得带上用户名密码这样的识别身份的信息。
从登录成功到登出的这个过程，服务器一直维护了一个可以识别出用户信息的数据结构，广义上来说，这个过程就叫做session，也就是保持了一个会话。

### 常见的两种登录
忽然想到一点，看了网上很多问题，我觉得大家应该区分两个概念：**广义的session和狭义的session**

**广义的session**：广义的session就是从登录成功到登出的过程，在这个过程中客户端和服务器端维持了保持登录的状态，至于具体怎么维持住这种登录的状态，没有要求。

**狭义的session**：狭义的session就是登录成功后，服务器端存储了一些必须的用户信息，这部分存在服务器端的用户信息就叫做session，也就是接下来要说的第一种登录的实现方式。

### 服务器session+客户端sessionId
详细说的说一下，这里面主要是这么几个过程：

1. 客户端带着用户名和密码去访问 /login 接口，服务器端收到后校验用户名和密码，校验正确就会在服务器端存储一个sessionId和session的映射关系
2. 服务器端返回response，并且将sessionId以set-cookie的方式种在客户端，这样一来，sessionId就存在了客户端。这里要注意的是，将sessionId存在cookie并不是一种强制的方案，而是大家一般都这么做，而且发请求的时候符合domain和path的时候，会自动带上cookie，省去了手动塞的过程。

3. 客户端发起非登录请求时，服务端通过cookie中的sessionId找到对应的session来知道此次请求是谁发出的。

### token
前面说到sessionId的方式本质是把用户状态信息维护在server端，token的方式就是把用户的状态信息加密成一串token传给前端，然后每次发请求时把token带上，传回给服务器端；服务器端收到请求之后，解析token并且验证相关信息；

所以跟第一种登录方式最本质的区别是：通过解析token的计算时间换取了session的存储空间
业界通用的加密方式是jwt（[json web token](https://link.zhihu.com/?target=https%3A//jwt.io/)），jwt的具体格式如图：

简单的介绍一下jwt，它主要由3部分组成：

```
header 头部
{
  "alg": "HS256",
  "typ": "JWT"
}
payload 负载
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1555341649998
}
signature 签名

```
header里面描述加密算法和token的类型，类型一般都是JWT；

payload里面放的是用户的信息，也就是第一种登录方式中需要维护在服务器端session中的信息；

signature是对前两部分的签名，也可以理解为加密；实现需要一个密钥（secret），这个secret只有服务器才知道，然后使用header里面的算法按照如下方法来加密：

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)

```
总之，最后的 jwt = base64url(header) + "." + base64url(payload) + "." + signature

jwt可以放在response中返回，也可以放在cookie中返回，这都是具体的返回方式，并不重要。

客户端发起请求时，官方推荐放在HTTP header中：

```
Authorization: Bearer <token>

```
这样子确实也可以解决cookie跨域的问题，不过具体放在哪儿还是根据业务场景来定，并没有一定之规。

### 两种登录方案存在的问题
### session方式
session方式由于会在服务器端维护session信息，单机还好说，如果是多机的话，服务器之间需要同步session信息，服务横向扩展不方便。
session数量随着登录用户的增多而增多，存储会增加很多。
session+cookie里面存sessionId的方式可能会有csrf攻击的问题，常见的方式是使用[csrf_token](https://link.zhihu.com/?target=https%3A//www.ibm.com/developerworks/cn/web/1102_niugang_csrf/index.html)来解决
### jwt方式
jwt的过期时间需要结合业务做设置，而且jwt一旦派发出去，后端无法强行使其作废
后话
理清概念，一身轻松

## cookie
Cookie的Domain和Path属性标识了这个Cookie是哪一个网站发送给浏览器的；Cookie的Expires属性标识了Cookie的有 效时间，当Cookie的有效时间过了之后，这些数据就被自动删除了。
如果不设置过期时间，则表示这个Cookie生命周期为浏览器会话期间，只要关闭浏览器窗口，Cookie就消失了。这种生命期为浏览会话期的 Cookie被称为会话Cookie。会话Cookie一般不保存在硬盘上而是保存在内存里。如果设置了过期时间，浏览器就会把Cookie保存到硬盘 上，关闭后再次打开浏览器，这些Cookie依然有效直到超过设定的过期时间。存储在硬盘上的Cookie可以在不同的浏览器进程间共享，比如两个IE窗 口。而对于保存在内存的Cookie，不同的浏览器有不同的处理方式。（设置age为负数就是窗口cookie，设置0删除cookie，设置正数存活的时间）

### 什么是Cookie
    “cookie 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。” - w3school
　　cookie 是访问过的网站创建的文件，用于存储浏览信息，例如个人资料信息。

　　从JavaScript的角度看，cookie 就是一些字符串信息。这些信息存放在客户端的计算机中，用于客户端计算机与服务器之间传递信息。

　　在JavaScript中可以通过 document.cookie 来读取或设置这些信息。由于 cookie 多用在客户端和服务端之间进行通信，所以除了JavaScript以外，服务端的语言（如PHP）也可以存取 cookie。

### Cookie基础知识
* cookie 是有大小限制的，每个 cookie 所存放的数据不能超过4kb，如果 cookie 字符串的长度超过4kb，则该属性将返回空字符串。
* 由于 cookie 最终都是以文件形式存放在客户端计算机中，所以查看和修改 cookie 都是很方便的，这就是为什么常说 cookie 不能存放重要信息的原因。
* 每个 cookie 的格式都是这样的：<cookie名>=<值>；名称和值都必须是合法的标示符。
* cookie 是存在 有效期的。在默认情况下，一个 cookie 的生命周期就是在浏览器关闭的时候结束。如果想要 cookie 能在浏览器关掉之后还可以使用，就必须要为该 cookie 设置有效期，也就是 cookie 的失效日期。
* alert(typeof document.cookie)　　结果是 string，曾经我以为是array，还闹过笑话...囧
* cookie 有域和路径这个概念。域就是domain的概念，因为浏览器是个注意安全的环境，所以不同的域之间是不能互相访问 cookie 的(当然可以通过特殊设置的达到 cookie 跨域访问)。路径就是routing的概念，一个网页所创建的 cookie 只能被与这个网页在同一目录或子目录下得所有网页访问，而不能被其他目录下得网页访问（这句话有点绕，一会看个例子就好理解了）。
* 其实创建cookie的方式和定义变量的方式有些相似，都需要使用 cookie 名称和 cookie 值。同个网站可以创建多个 cookie ，而多个 cookie 可以存放在同一个cookie 文件中。


### Cookie常见问题
1. cookie 存在两种类型：
    你浏览的当前网站本身设置的 cookie
    来自在网页上嵌入广告或图片等其他域来源的 第三方 cookie (网站可通过使用这些 cookie 跟踪你的使用信息)
2. 刚刚基础知识里面有说到 cookie 生命周期的问题，其实 cookie 大致可分为两种状态：
    临时性质的cookie。当前使用的过程中网站会储存一些你的个人信息，当浏览器关闭后这些信息也会从计算机中删除
    设置失效时间的cookie。就算浏览器关闭了，这些信息业依然会在计算机中。如 登录名称和密码，这样无须在每次到特定站点时都进行登录。这种cookie 可在计算机中保留几天、几个月甚至几年
3. cookie 有两种清除方式：
    通过浏览器工具清除 cookie (有第三方的工具，浏览器自身也有这种功能)
    通过设置 cookie 的有效期来清除 cookie
    注：删除 cookie 有时可能导致某些网页无法正常运行
4. 浏览器可以通过设置来接受和拒绝访问 cookie。
5. 出于功能和性能的原因考虑，建议尽量降低 cookie 的使用数量，并且要尽量使用小 cookie。
6. 关于cookie编码的细节问题将会在cookie高级篇中单独介绍。
7. 假如是本地磁盘中的页面，chrome的控制台是无法用JavaScript读写操作 cookie 的，解决办法...换一个浏览器^_^。

### 如何得到cookie
有两个http头部是专门负责设置以及发送cookie的,它们分别是 Set-Cookie 以及 Cookie 。当服务器返回给客户端一个http响应信息时，其中如果包含Set-Cookie这个头部时，意思就是指示客户端建立一个cookie，并且在后续的http请求中自动发送这个cookie到服务器端，直到这个cookie过期。如果cookie的生存时间是整个会话期间的话，那么浏览器会将cookie保存在内存中，浏览器关闭时就会自动清除这个cookie。另外一种情况就是保存在客户端的硬盘中，浏览器关闭的话，该cookie也不会被清除，下次打开浏览器访问对应网站时，这个cookie就会自动再次发送到服务器端。

`Set-Cookie`　　`Cookie`

### 高级篇
1. cookie 路径概念

　　在基础知识中有提到 cookie 有域和路径的概念，现在来介绍路径在 cookie 中的作用。

　　cookie 一般都是由于用户访问页面而被创建的，可是并不是只有在创建 cookie 的页面才可以访问这个 cookie。

　　默认情况下，只有与创建 cookie 的页面在同一个目录或子目录下的网页才可以访问，这个是因为安全方面的考虑，造成不是所有页面都可以随意访问其他页面创建的 cookie。举个例子：

　　在 "http://www.cnblogs.com/Darren_code/" 这个页面创建一个cookie，那么在"/Darren_code/"这个路径下的页面如： "http://www.cnblogs.com/Darren_code/archive/2011/11/07/Cookie.html"这个页面默认就能取到cookie信息。

　　可在默认情况下， "http://www.cnblogs.com"或者 "http://www.cnblogs.com/xxxx/" 就不可以访问这个 cookie（光看没用，实践出真理^_^）。

　　那么如何让这个 cookie 能被其他目录或者父级的目录访问类，通过设置 cookie 的路径就可以实现。例子如下：

```
　　document.cookie = "name=value;path=path"
　　document.cookie = "name=value;expires=date;path=path"

``` 　　
红色字体path就是 cookie 的路径，最常用的例子就是让 cookie 在跟目录下,这样不管是哪个子页面创建的 cookie，所有的页面都可以访问到了:

　　`document.cookie = "name=Darren;path=/"`

2. cookie 域概念

　　路径能解决在同一个域下访问 cookie 的问题，咱们接着说 cookie 实现同域之间访问的问题。语法如下：

　　`document.cookie = "name=value;path=path;domain=domain"`
　　红色的domain就是设置的 cookie 域的值。

　　例如 "www.qq.com" 与 "sports.qq.com" 公用一个关联的域名"qq.com"，我们如果想让 "sports.qq.com" 下的cookie被 "www.qq.com" 访问，我们就需要用到 cookie 的domain属性，并且需要把path属性设置为 "/"。例：

　　`document.cookie = "username=Darren;path=/;domain=qq.com"`
　　注：一定的是同域之间的访问，不能把domain的值设置成非主域的域名。

3. cookie 安全性

　　通常 cookie 信息都是使用HTTP连接传递数据，这种传递方式很容易被查看，所以 cookie 存储的信息容易被窃取。假如 cookie 中所传递的内容比较重要，那么就要求使用加密的数据传输。

　　所以 cookie 的这个属性的名称是“secure”，默认的值为空。如果一个 cookie 的属性为secure，那么它与服务器之间就通过HTTPS或者其它安全协议传递数据。语法如下：

　　document.cookie = "username=Darren;secure"
　　把cookie设置为secure，只保证 cookie 与服务器之间的数据传输过程加密，而保存在本地的 cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。

　　注：就算设置了secure 属性也并不代表他人不能看到你机器本地保存的 cookie 信息，所以说到底，别把重要信息放cookie就对了，囧...

4. cookie 编码细节

　　原本来想在常见问题那段介绍cookie编码的知识，因为如果对这个不了解的话编码问题确实是一个坑，所以还是详细说说。

　　在输入cookie信息时不能包含空格，分号，逗号等特殊符号，而在一般情况下，cookie 信息的存储都是采用未编码的方式。所以，在设置 cookie 信息以前要先使用escape()函数将 cookie 值信息进行编码，在获取到 cookie 值得时候再使用unescape()函数把值进行转换回来。如设置cookie时：

　　document.cookie = name + "="+ escape (value)
　　再看看基础用法时提到过的getCookie()内的一句：

　　return unescape(document.cookie.substring(c_start,c_end))
　　这样就不用担心因为在cookie值中出现了特殊符号而导致 cookie 信息出错了。



### javascript cookie操作
```js
// set cookie
document.cookie = "cookiename=cookievalue"
document.cookie = "cookiename=cookievalue; expires= Thu, 21 Aug 2014 20:00:00 UTC"
document.cookie = "cookiename=cookievalue; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/ "
// get Cookie
var x =  document.cookie
// delete cookie
document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

```
参考：　https://javascript.info/cookie
### getCookie
```js
// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

## setCookie
```js
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires && options.expires.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Example of use:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

## delete Cookie
```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```



## Session
是存放在服务器端的类似于HashTable结构（每一种Web开发技术的实现可能不一样，下文直接称之为HashTable）来存放用户 数据，当浏览器第一次发送请求时，服务器自动生成了一个HashTable和一个Session ID用来唯一标识这个HashTable，并将其通过响应发送到浏览器。当浏览器第二次发送请求，会将前一次服务器响应中的Session ID放在请求中一并发送到服务器上，服务器从请求中提取出Session ID，并和保存的所有Session ID进行对比，找到这个用户对应的HashTable。

一般情况下，服务器会在一定时间内（默认20分钟）保存这个HashTable，过了时间限制，就会销毁这个HashTable。在销毁之前，程序员可以 将用户的一些数据以Key和Value的形式暂时存放在这个HashTable中。当然，也有使用数据库将这个HashTable序列化后保存起来的，这 样的好处是没了时间的限制，坏处是随着时间的增加，这个数据库会急速膨胀，特别是访问量增加的时候。一般还是采取前一种方式，以减轻服务器压力。

### 特点
* 由于 Session 是以文本文件形式存储在服务器端的，所以不怕客户端修改 Session 内容。（也可以用其他存储方式比如redis）
* Session对象是有生命周期的
* Session实例是轻量级的，所谓轻量级：是指他的创建和删除不需要消耗太多资源
* Session对象内部有一个缓存

### 用法
Session 对象存储特定用户会话所需的属性及配置信息，在web页跳转时，信息将不会丢失
#### 通常用于一下操作
* 存储整个会话过程中保持用户状态的信息，比如登录信息或者用户浏览时产生的其它信息
* 存储只需要在 页重新加载 过程中，或者 一组功能页 之间保持状态的对象
* 在 Web服务器上保持用户的 状态信息 供在任何时间从任何设备上的页面进行访问。
#### 限制
* 用户登录越多，session需要的内存量越大
* 每个 Session 对象的持续时间是用户访问的时间加上不活动的时间。






### 使用Cookie保存登录状态
 场景：当我们登录新浪微博之后，过了2天没有在登陆的话，第三天你打开微博发现依旧不用登录(这里说的是浏览器访问微博，不是客户端)。一般不是很了解http的新人可能以为是服务器端session的存活时间设置的足够长！！其实可以如果要是了解session跨窗口共享的原理你就会发现肯定不是把session设置足够长存活时间实现的(可以参考下面2)。而且服务器端session存活时间设置太长的话会导致大量session存于内存，会导致内存占用量过高，更不符合实际需求。

所以针对这个问题，一般解决方案就是使用cookie，在本地保存一个登录状态(可以设置cookie的存活时间，也就是设置用户免密码登录的有效时间)，每一个请求的时候携带上cookie，在后台通过判断cookie的登录状态进行处理是否登录成功。当cookie保存的用户登录状态失效之后就需要我们输入用户名和密码手动点击登录了。

## session如何实现跨窗口的？
因为每一个会话有一个sessionId。该SessionId是在浏览器本地的cookie中存储的，而每一个SessionId的过期时间是浏览会话结束时。所以只要当前浏览器窗口没有关闭，该sessionId依旧是存活的。由于cookie是被同一个浏览器多个进程共享的，所以当你新打开一个浏览器进行访问的时候(双击图标打开浏览器，也可以是新建tab)，在访问你上次访问的网站，还可以直接登录，无需手动输入密码点击登录。这其中的原理就是：由于上一个登录的窗口没有关闭导致其sessionid在cookie中依旧是存活的，然后第二个浏览器访问时候共享该cookie中的同一个sessionId，共享一个sessionId在服务器端的效果就是共享一个session会话，由于服务器端的session中保存了你的登录状态，所以你可以直接登录，无需输入密码，这就是session可以跨窗口分享的原因(cookie存储sessionid供分享)。





