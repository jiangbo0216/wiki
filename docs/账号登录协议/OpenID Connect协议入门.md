如果要谈单点登录和身份认证，就不得不谈OpenID Connect (OIDC)。最典型的使用实例就是使用Google账户登录其他应用，这一经典的协议模式，为其他厂商的第三方登录起到了标杆的作用，被广泛参考和使用。

参考: https://www.jianshu.com/p/be7cc032a4e9
## OpenID Connect简介
OpenID Connect是基于OAuth 2.0规范族的可互操作的身份验证协议。它使用简单的REST / JSON消息流来实现，和之前任何一种身份认证协议相比，开发者可以轻松集成。

OpenID Connect允许开发者验证跨网站和应用的用户，而无需拥有和管理密码文件。OpenID Connect允许所有类型的客户,包括基于浏览器的JavaScript和本机移动应用程序,启动登录流动和接收可验证断言对登录用户的身份。

## OIDC基础
简要而言，OIDC是一种安全机制，用于应用连接到身份认证服务器（Identity Service）获取用户信息，并将这些信息以安全可靠的方法返回给应用。

在最初，因为OpenID1/2经常和OAuth协议（一种授权协议）一起提及，所以二者经常被搞混。

> OpenID是`Authentication`，即认证，对用户的身份进行认证，判断其身份是否有效，也就是让网站知道“你是你所声称的那个用户”；

> OAuth是Authorization，即授权，在已知用户身份合法的情况下，经用户授权来允许某些操作，也就是让网站知道“你能被允许做那些事情”。
由此可知，授权要在认证之后进行，只有确定用户身份只有才能授权。

> OAuth > OpenID

* 从权限上来说OAuth > OpenID
![20191115221926.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191115221926.png) 


OpenID Connect是“认证”和“授权”的结合，因为其基于OAuth协议，所以OpenID-Connect协议中也包含了client_id、client_secret还有redirect_uri等字段标识。这些信息被保存在“身份认证服务器”，以确保特定的客户端收到的信息只来自于合法的应用平台。这样做是目的是为了防止client_id泄露而造成的恶意网站发起的OIDC流程。

参考: https://www.zhihu.com/question/19628327
举个简单的栗子：收某快递需要提供身份证（好比 OpenID ），而你却顺便带上了自己家的钥匙并交给他（好比 OAuth ）……后果不解释。再举个具体的栗子：现在很多网站都提供了「使用新浪微博快速连接」（也就是 OAuth ）作为登录方式。但当你不确定这个网站是否可信时，这样做是危险的（虽然事后可以到新浪微博的设置页面移除）。因为 OAuth 之后，就相当于把你微博的数据（比如看私信）和权利（比如发私信）交给了这个网站，至于网站要做什么你根本不知道。而 OpenID 只是告诉网站或别人，这个帐号是你而已，并不会也无法提供其它数据。


