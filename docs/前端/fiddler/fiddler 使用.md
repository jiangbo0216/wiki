## 允许跨域
参考： https://judes.me/frontend/2017/09/02/fiddler-cors.html
### 通用情况
用 fiddler 解决跨域问题的原理是通过规则来设置响应头的相应字段。 在 fiddler 右侧的 “详情和数据统计面板” 中找到 FiddlerScript 标签页，里面是一个脚本文件，语法有点像 typeScript ，不难看懂，里面只定义了一个 Handlers 类，可以通过它来编辑 fiddler 菜单栏中的 Rules 选项以及 fiddler 处理请求的回调函数。
第一步，往菜单栏的 Rules 选项中增加一个“强制启用 CORS”的规则。在 Handlers 类的开头，找到定义规则的几行代码，其中“隐藏 304 响应条目”的代码是这样写的（下面的注释是本人添加的，原代码没有）：
```
public static RulesOption("Hide 304s") // 用户在 Rules 中看到的规则名字是 "Hide 304s"
var m_Hide304s: boolean = false; // 默认关闭
```
在这几行代码后面，如法炮制，添加以下两行代码：
```
public static RulesOption("Force CORS Response") // 用户在 Rules 中看到的规则名字是 "Force CORS Response"
var m_ForceCORS: boolean = true; // 默认开启
```
添加成功后 Rules 中会多出一条 Force CORS Response 规则

第二步，往 Handlers 类的静态方法 OnBeforeResponse 中增加以下代码，目的是在把响应返回给终端之前，往响应头塞一些字段：

> 修正：下面代码的最初版本有问题，会导致 websocket 无法建立。原因在于建立 websocket 时发送的握手请求，头部带有 “Origin” 字段，命中了匹配条件，代码重写响应的状态码为 200 ，而建立 websocket 需要 101 状态码。因此把重写响应状态码的代码去掉。

```
if(m_ForceCORS &&
        (
            oSession.oRequest.headers.HTTPMethod == "OPTIONS" ||
            oSession.oRequest.headers.Exists("Origin")
        )
)
{                                
    if(!oSession.oResponse.headers.Exists("Access-Control-Allow-Origin"))
    {
      var requestOrigin: String = "*";
      if(oSession.oRequest.headers['Origin'] != "")
      {
        requestOrigin = oSession.oRequest.headers['Origin'];
      }
      oSession.oResponse.headers.Add("Access-Control-Allow-Origin", requestOrigin);
    }
    
    if(!oSession.oResponse.headers.Exists("Access-Control-Allow-Methods"))
        oSession.oResponse.headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    
    if(oSession.oRequest.headers.Exists("Access-Control-Request-Headers"))
    {
        if(!oSession.oResponse.headers.Exists("Access-Control-Allow-Headers"))
            oSession.oResponse.headers.Add(
                "Access-Control-Allow-Headers"
                , oSession.oRequest.headers["Access-Control-Request-Headers"]
            );
    }
    
    if(!oSession.oResponse.headers.Exists("Access-Control-Max-Age"))
        oSession.oResponse.headers.Add("Access-Control-Max-Age", "1728000");
    
    if(!oSession.oResponse.headers.Exists("Access-Control-Allow-Credentials"))
        oSession.oResponse.headers.Add("Access-Control-Allow-Credentials", "true");
    
    // oSession.responseCode = 200; 见修正。
}
```

### 特殊情况
可以看到上面的代码中只处理了响应头没有设置相应 CORS 头字段的情况，如果响应头设置了相应 CORS 字段，只是字段值不符合预期，那该怎么办呢？
你当然可以修改上面的代码，强制覆盖原来的字段值，但这又会引发新问题：如果请求头带上 cookie 等等用于认证的信息，这个请求就叫作 “credentialed” requests ，对这类请求，响应头的 Access-Control-Allow-Origin 字段就不能设为 * ，否则浏览器会丢弃响应。详见[这里](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)。
这时候可以用 AutoResponder 拦截特定请求， mock 响应 。

## AutoResponder

精准匹配请求及正则匹配请求
当需要 mock 响应时，我们可以在 fiddler 左侧的 会话列表中，把目标请求按住、拖到右侧 详情和数据统计面板 中的 AutoResponder 标签页面中，这样会自动生成一条精准匹配的 rules 和与之对应的响应，如下图：

## 正则匹配的一个坑
当实际请求的路径中带有 id 时，如：http://www.test.com/product/123
假设你需要用正则 rules 匹配这个请求，并返回一个事先准备好的 json 文件（文件路径是 C:\Users\username\Desktop\product.json）
那么这个正则 rules 不能这样写： regex:http://www.test.com/product

如果写成这样，fiddler 能匹配请求：http://www.test.com/product/123，但是 json 文件的路径会不对，路径会变成：C:\Users\username\Desktop\product.json\123 ，因为没有这个文件，响应会是 404 ，如下图：

正确的写法是：regex:http://www.test.com/product/\d+ ，如下图：


## https转http
var hosts = 'm.yourdomain.com';  // 这里修改成你要代理的https的域名
FiddlerApplication.Log.LogFormat("Logger session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
if(oSession.host.indexOf(hosts) > -1){
    FiddlerApplication.Log.LogFormat("Capture session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
    if(oSession.HTTPMethodIs('CONNECT')){
      FiddlerApplication.Log.LogString('create fake tunnel response');
      oSession['x-replywithtunnel'] = 'FakeTunnel';
      return;
  }

  if (oSession.isHTTPS){
    FiddlerApplication.Log.LogString('switch https to http request');
    oSession.fullUrl = oSession.fullUrl.Replace("https://","http://");
    oSession.port = 80;
  }   

  FiddlerApplication.Log.LogFormat("Processed session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
}
FiddlerApplication.Log.LogFormat("Logger session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);    