### Git常用的有两种协议 (这里关于git协议的设置无法生效)
不同的协议他的代理配置各不相同。core.gitproxy 用于 git:// 协议，http.proxy 用于 http:// 协议。

常见的git clone 协议如下：

#使用http://协议
git clone https://github.com/EasyChris/baidu.git
#使用git://协议
git clone git@github.com:EasyChris/baidu.git
http/https协议
假设程序在无状态、无工作目录的情况下运行git指令，利用-c参数可以在运行时重载git配置，包括关键的http.proxy

git clone 使用 http.proxy 克隆项目
git clone -c http.proxy=http://127.0.0.1:1080 https://github.com/madrobby/zepto.git
git目录设置目录代理模式，不太建议全部设置为全局配置。因为我有时候还使用coding.net
#通常shadowsocks的代理在本机地址是127.0.0.1 代理端口是1080
git config http.proxy 'socks5://127.0.0.1:1080'
git协议
使用git协议的配置

git config core.gitProxy  'socks5://192.168.7.1:1080'
