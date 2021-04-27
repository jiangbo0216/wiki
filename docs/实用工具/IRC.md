[Internet Relay Chat](https://en.wikipedia.org/wiki/Internet_Relay_Chat)

Internet Relay Chat (IRC) is an [application layer protocol](https://en.wikipedia.org/wiki/Application_layer) that facilitates communication in the form of text. The chat process works on a client/server networking model. 

Internet中继聊天(IRC)是一种应用层协议，它以文本的形式促进通信。聊天过程在客户机/服务器网络模型上工作。

## [以hexchat为例](https://www.maoxuner.cn/2018/05/27/irc.html)
### 注册
/msg NickServ REGISTER password youremail@example.com

### 验证邮箱
邮箱里收到的内容大概如下，在irssi中执行即可

/msg NickServ VERIFY REGISTER maoxuner knpnmlyslgpd

### 登录认证
/msg NickServ IDENTIFY your_password

### 加入某个频道
/join #deepin
