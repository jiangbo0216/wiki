## docker for windows container
### 需要解决的问题
1. 合适的开发环境镜像
2. 开箱即用的体验
3. 合适的配置vscode配置
4. 项目文件的管理

## 代码在本地
### 代码本地编写

## 远程开发
### wsl2 预览版可用

### docker container
示例代码：https://github.com/Microsoft/vscode-dev-containers
#### prerequisite
官方镜像很大
参考：
https://askubuntu.com/questions/720784/how-to-install-latest-node-inside-a-docker-container

dockerfile & shell：
1. 从ubuntu镜像build使用的node镜像，其他方法
2. 对于ubuntu更新源的管理，为什么有的时候更新源之后，dockerfile构建镜像会出现一些文件没有安装，比如python
3. 怎么跳过命令行输入
4. 如何让命令（文件）立即可用
5. 在基础镜像的基础上加入自定的设置（修改文件）

docker-compose

问题：
debconf: delaying package configuration, since apt-utils is not installed 可忽略 https://github.com/phusion/baseimage-docker/issues/319  https://www.jianshu.com/p/99fd61e6aa29




## vscode支持
### 已知bug
将插件使用volume保存：postCreateCommand配置必须要删除插件volume才能生效：https://github.com/microsoft/vscode-remote-release/issues/1153

dockerfile 能力的问题
没有办法include, nginx

## ssh原理和使用



## windows上的坑
* 偶尔的不稳定，终端显示异常，需要重新打开终端
* docker-compose -port指定的端口无法建立连接，使用 
   netstat -ano | findstr 80 //列出进程极其占用的端口，且包含 80
   taskkill -PID <进程号> -F //强制关闭某个进程
* 内存占用较大