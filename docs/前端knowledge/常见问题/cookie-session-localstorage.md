https://github.com/sisterAn/JavaScript-Algorithms/issues/127

sessionStorage, localStorage, cookie这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。 区别在于前两者属于WebStorage，创建它们的目的便于客户端存储数据。 而Cookie早在网景公司的浏览器中就开始支持，最初目的是为了保持HTTP的状态。cookie是网站为了标识用户身份而存储在用户本地终端上的数据（通常经过加密）。cookie始终在同源的http请求中携带（即使不需要）都会在浏览器和服务器端间来回传递。session storage和local storage不会自动把数据发给服务器，仅在本地保存；存储大小：cookie数据大小不会超过4K，session storage和local storage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或者更多； 有期时间：local storage存储持久数据，浏览器关闭后数据不丢失，除非自动删除数据。session storage数据在当前浏览器窗口关闭后自动删除。cookie 设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭；



因为考虑到每个 HTTP 请求都会带着 Cookie 的信息，所以 Cookie 当然是能精简就精简啦，比较常用的一个应用场景就是判断用户是否登录。针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录啦。曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了~

而另一方面 localStorage 接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的。如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。