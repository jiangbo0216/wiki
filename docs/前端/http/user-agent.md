### 浏览器的常见User Agent 各字段的解释

浏览器的User Agent字段令人迷惑，例如：某一版本的Chrome访问网络时，User Agent字段如下：

> Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.29 Safari/537.36

其中既包含多个公司的浏览器标识，如：Mozilla、Chrome、Safari，也包含多个渲染引擎标识，如：AppleWebKit、KHTML、Gecko。下面我们对这些字段逐个进行解释。

- Mozilla/5.0： 网景公司浏览器的标识，由于互联网初期浏览器市场主要被网景公司占领，很多服务器被设置成仅响应含有标志为Mozilla的浏览器的请求，因此，新款的浏览器为了打入市场，不得不加上这个字段。
- Windows NT 6.3 : Windows 8.1的标识符
- WOW64： 32位的Windows系统运行在64位的处理器上
- AppleWebKit/537.36：苹果公司开发的呈现引擎
- KHTML：是Linux平台中Konqueror浏览器的呈现引擎KHTML
- Geckeo：呈现引擎
- like Gecko：表示其行为与Gecko浏览器引擎类似

### 问题

1. 请求中为什么既含有Chrome/33.0.1750.29又含有Safari/537.36字段？

   > 答：因为AppleWebKit渲染引擎是苹果公司开发的，而Google公司要采用它，为了获得服务器端的正确响应，仅在Safari浏览器UA字段中增加了Chrome字段。 
   > 例如：
   >
   > - Safari浏览器的UA：Mozilla/5.0 (平台;加密类型;操作系统或CPU;语言）AppleWebKit/AppleWebKit版本号(KHTML, like Gecko) Safari/Safari 版本号
   > - Chrome浏览器的UA：Mozilla/5.0 (平台;加密类型;操作系统或CPU;语言)AppleWebKit/AppleWebKit版本号 (KHTML, like Gecko) Chrome/ Chrome 版本号 Safari/Safari 版本号

2. 为什么UA中包含多个浏览器的标识，如：Mozilla/5.0、Chrome/33.0.1750.29、Safari/537.36，以及渲染引擎标识？

   > 答：多增加一些字段都是为了让服务器检测到它支持的浏览器标识，以便获得服务器的响应，从而提升用户体验。