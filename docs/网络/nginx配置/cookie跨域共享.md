[cookie跨域共享](https://juejin.im/post/5d33349a5188254cbc32a5c8)

## 问题描述
需要解决前端pc跟服务端(java)，跨域后都能获取到同一个cookie。
使用二级域名共享cookie有一个限制条件，就是两个域名的二级域名必须相同

前端pc访问域名：a.b.com
后端接口域名：a-gateway.b.com
这两个域名同属一个二级域名：b.com

## 跨域访问
服务器nginx增加以下配置，即可解决跨域访问的问题。也可以在程序中通过代码解决跨域访问。

nginx配置文件

location / {
    #是否允许跨域发送Cookie
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Origin 'http://a.b.com';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
## 跨域携带发送cookie
如果需要允许跨域携带发送cookie的话，nignx则需要以下参数配置

nginx配置


"Access-Control-Allow-Credentials"：可选字段。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为'*'。这是因为请求的首部中携带了Cookie信息，如果 Access-Control-Allow-Origin 的值为'*'，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为 a.b.com，则请求将成功执行。也就是说Access-Control-Allow-Credentials设置为true的情况下
Access-Control-Allow-Origin不能设置为*。


前端配置
以vue请求为例：

import axios from 'axios';
axios.defaults.withCredentials=true //允许携带cookie
复制代码
java设置cookie

public static void  addCookie(HttpServletResponse response,String cookieName,String cookieValue,int maxAge){
    Cookie cookie  =new Cookie(cookieName,cookieValue);
    cookie.setDomain("b.com");//指定域名
    cookie.setPath("/");//设置cookie的生命周期
    cookie.setHttpOnly(false);
    if(maxAge>0){
        cookie.setMaxAge(maxAge);
    }
    response.addCookie(cookie);
}
