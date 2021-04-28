# 说说JS中的沙箱

![img](sandbox-imgs/161fef1d143d33a5)[腾讯IVWEB团队![lv-6](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0YzNjI2MiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTggN2gydjRoLTJ6TTE3IDNoMnYyaC0yek0xNSA1aDJ2NmgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTcgNmgzdjJoLTN6TTE2LjMzMyAzLjY2N0wxNyAzdjJoLTJ6TTE3IDloMnYyaC0yeiIvPgogICAgPC9nPgo8L3N2Zz4K)](https://juejin.cn/user/3104676535869518)腾讯科技(深圳)有限公司

作者：曾培森

| 导语 其实在前端编码中，或多或少都会接触到沙箱，可能天真善良的你没有留意到，又可能，你还并不知道它的真正用途，学会使用沙箱，可以避免潜在的代码注入以及未知的安全问题。

## 前言

沙箱，即sandbox，顾名思义，就是让你的程序跑在一个隔离的环境下，不对外界的其他程序造成影响，通过创建类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。

举个简单的栗子，其实我们的浏览器，Chrome 中的每一个标签页都是一个沙箱（sandbox）。渲染进程被沙箱（Sandbox）隔离，网页 web 代码内容必须通过 IPC 通道才能与浏览器内核进程通信，通信过程会进行安全的检查。沙箱设计的目的是为了让不可信的代码运行在一定的环境中，从而限制这些代码访问隔离区之外的资源。

## JS中沙箱的使用场景

前端JS中也会有应用到沙箱的时候，毕竟有时候你要获取到的是第三方的JS文件或数据？而这数据又是不一定可信的时候，创建沙箱，做好保险工作尤为重要。

1、jsonp：解析服务器所返回的jsonp请求时，如果不信任jsonp中的数据，可以通过创建沙箱的方式来解析获取数据；（TSW中处理jsonp请求时，创建沙箱来处理和解析数据）；

2、执行第三方js：当你有必要执行第三方js的时候，而这份js文件又不一定可信的时候；

3、在线代码编辑器：相信大家都有使用过一些在线代码编辑器，而这些代码的执行，基本都会放置在沙箱中，防止对页面本身造成影响；（例如：https://codesandbox.io/s/new）

4、vue的服务端渲染：vue的服务端渲染实现中，通过创建沙箱执行前端的bundle文件；在调用createBundleRenderer方法时候，允许配置runInNewContext为true或false的形式，判断是否传入一个新创建的sandbox对象以供vm使用；

5、vue模板中表达式计算：vue模板中表达式的计算被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不能够在模板表达式中试图访问用户定义的全局变量。

总而言之：当你要解析或执行不可信的JS的时候，当你要隔离被执行代码的执行环境的时候，当你要对执行代码中可访问对象进行限制的时候，沙箱就派上用场了。

## 沙箱实现一：with + new Function

首先从最简陋的方法说起，假如你想要通过eval和function直接执行一段代码，这是不现实的，因为代码内部可以沿着作用域链往上找，篡改全局变量，这是我们不希望的，所以你需要让沙箱内的变量访问都在你的监控范围内；不过，你可以使用with API，在with的块级作用域下，变量访问会优先查找你传入的参数对象，之后再往上找，所以相当于你变相监控到了代码中的“变量访问”：

![img](sandbox-imgs/16d70994f686bee1)

接下里你要做的是，就是暴露可以被访问的变量`exposeObj`，以及阻断沙箱内的对外访问。通过es6提供的proxy特性，可以获取到对对象上的所有改写：

![img](sandbox-imgs/16d70994fc72ebaf)

通过设置has函数，可以监听到变量的访问，在上述代码中，仅暴露个别外部变量供代码访问，其余不存在的属性，都会直接抛出error。其实还存在get、set函数，但是如果get和set函数只能拦截到当前对象属性的操作，对外部变量属性的读写操作无法监听到，所以只能使用has函数了。接下来我们测试一下：

![img](sandbox-imgs/16d70994fc9ca8b8)

看起来一切似乎没有什么问题，但是问题出在了传入的对象，当调用的是console.log(a.b)的时候，has方法是无法监听到对b属性的访问的，假设所执行的代码是不可信的，这时候，它只需要通过a.b.__proto__就可以访问到Object构造函数的原型对象，再对原型对象进行一些篡改，例如将toString就能影响到外部的代码逻辑的。

![img](sandbox-imgs/16d70994fce960b7)



例如上面所展示的代码，通过访问原型链的方式，实现了沙箱逃逸，并且篡改了原型链上的toString方法，一旦外部的代码执行了toString方法，就可以实现xss攻击，注入第三方代码；由于在内部定义执行的函数代码逻辑，仍然会沿着作用于链查找，为了绕开作用域链的查找，笔者通过访问箭头函数的constructor的方式拿到了构造函数Function，这个时候，Funtion内所执行的xss代码，在执行的时候，便不会再沿着作用域链往上找，而是直接在全局作用域下执行，通过这样的方式，实现了沙箱逃逸以及xss攻击。

你可能会想，如果我切断原型链的访问，是否就杜绝了呢？的确，你可以通过Object.create(null)的方式，传入一个不含有原型链的对象，并且让暴露的对象只有一层，不传入嵌套的对象，但是，即使是基本类型值，数字或字符串，同样也可以通过__proto__查找到原型链，而且，即使不传入对象，你还可以通过下面这种方式绕过：

![img](sandbox-imgs/16d70994fcddb7a7)

可见，new Function + with的这种沙箱方式，防君子不防小人，当然，你也可以通过对传入的code代码做代码分析或过滤？假如传入的代码不是按照的规定的数据格式（例如json），就直接抛出错误，阻止恶意代码注入，但这始终不是一种安全的做法。

## 沙箱实现二：借助iframe实现沙箱

前面介绍一种劣质的、不怎么安全的方法构造了一个简单的沙箱，但是在前端最常见的方法，还是利用iframe来构造一个沙箱，such as 在线代码编辑器中：https://codesandbox.io/s/news。

这种方式更为方便、简单、安全，也是目前比较通用的前端实现沙箱的方案，假如你要执行的代码不是自己写的代码，不是可信的数据源，那么务必要使用iframe沙箱。sandbox是h5的提出的一个新属性， 启用方式就是在iframe标签中使用sandbox属性:

![img](sandbox-imgs/16d70994fcc8932a)

但是这也会带来一些限制：

\1. script脚本不能执行
\2. 不能发送ajax请求
\3. 不能使用本地存储，即localStorage,cookie等
\4. 不能创建新的弹窗和window
\5. 不能发送表单
\6. 不能加载额外插件比如flash等

不过别方，你可以对这个iframe标签进行一些配置：

![img](sandbox-imgs/16d70995215db9f1)

接下里你只需要结合postMessage API，将你需要执行的代码，和需要暴露的数据传递过去，然后和你的iframe页面通信就行了。

1）不过你需要注意的是，在子页面中，要注意不要让执行代码访问到contentWindow对象，因为你需要调用contentWindow的postMessageAPI给父页面传递信息，假如恶意代码也获取到了contentWindow对象，相当于就拿到了父页面的控制权了，这个时候可大事不妙。

2）当你使用postMessageAPI的时候，由于sandbox的origin默认为null，需要设置allow-same-origin允许两个页面进行通信，意味着子页面内可以发起请求，这时候你需要防范好CSRF，允许了同域请求，不过好在，并没有携带上cookie。

3）当你调用postMessageAPI传递数据给子页面的时候，传输的数据对象本身已经通过结构化克隆算法复制，如果你还不了解结构化克隆算法可以查看这个。

简单的说，通过postMessageAPI传递的对象，已经由浏览器处理过了，原型链已经被切断，同时，传过去的对象也是复制好了的，占用的是不同的内存空间，两者互不影响，所以你不需要担心出现第一种沙箱做法中出现的问题。

## nodejs中的沙箱使用

nodejs中使用沙箱很简单，只需要利用原生的vm模块，便可以快速创建沙箱，同时指定上下文。

![img](sandbox-imgs/16d7099521d94ce6)

vm中提供了runInNewContext、runInThisContext、runInContext三个方法，三者的用法有个别出入，比较常用的是runInNewContext和runInContext，可以传入参数指定好上下文对象。

但是vm是绝对安全的吗？不一定。

![img](sandbox-imgs/16d70995254ad3b7)

通过上面这段代码，我们可以通过vm，停止掉主进程nodejs，导致程序不能继续往下执行，这是我们不希望的，解决方案是绑定好context上下文对象，同时，为了避免通过原型链逃逸（nodejs中的对象并没有像浏览器端一样进行结构化复制，导致原型链依然保留），所以我们需要切断原型链，同时对于传入的暴露对象，只提供基本类型值。

![img](sandbox-imgs/16d7099529816785)

让我们来看一下TSW中是怎么使用的：

![img](sandbox-imgs/16d709952c7d3d84)

通过runInNewContext返回沙箱中的构造函数Function，同时传入切断原型链的空对象防止逃逸，之后再外部使用的时候，只需要调用返回的这个函数，和普通的new Function一样调用即可。

即使这样，我们也不能保证这是绝对的安全，毕竟可能还有潜在的沙箱漏洞呢？

## 总结

即使我们知道了如何在开发过程中使用沙箱来让我们的执行环境不受影响，但是沙箱也不一定是绝对安全的，毕竟每年都有那么多黑客绞尽脑汁钻研出如何逃出浏览器沙箱和nodejs沙箱，因此笔者个人建议：

1、业务代码上不执行不可信任的第三方JS，如有必要执行第三方JS，可通过设置CSP维护白名单的方式；

2、不要信任任何用户数据源，防止恶意用户注入代码。

出于好奇整理了这篇文章，如有错误还望斧正。