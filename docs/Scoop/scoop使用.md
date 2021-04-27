| title       |
| ----------- |
| scoop的使用 |

<https://github.com/zhepama/igiven.github.io/blob/fced90359a7899c38e8b426ea114074dc88b8108/_posts/tool/2019-08-20-scoop-use.md>

# 安装scoop前提

版本大于等于3的powershell

```
> $psversiontable.psversion.major
```

确保您已允许PowerShell执行本地脚本

```
> set-executionpolicy remotesigned -scope currentuser
```

# 常用命令

```
#打开powershell,win+r,然后输入powershell
#更改策略
Set-ExecutionPolicy RemoteSigned -scope CurrentUser

#安装
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')

#安装git
scoop install git

#开启extras库
scoop bucket add extras

#开启java库
scoop bucket add java

#更新
scoop update

#查看安装软件列表
scoop list

#搜索某软件
scoop search xxx

#打开某软件官网
scoop home xxx

#查看某软件安装信息
scoop info xxx

#查看某软件执行命令位置
scoop which xxx

#查看某软件当前状态，是否有更新等信息
scoop status xxx

#更新某软件
scoop update xxx

#卸载某软件,以xxx为例
scoop uninstall xxx
```

这里是一个按照 Github score（由 Star 数量、Fork 数量和 App 数量综合决定的 Github score）排列的 bucket 列表：[Scoop buckets by Github score](https://github.com/rasa/scoop-directory/blob/master/by-score.md)。

# 安装scoop到自定义目录

如果重新安装系统.只需要将shime路径添加到环境变量path中`D:\Application\Scoop\shims`

```
set-executionpolicy remotesigned -scope currentuser

[environment]::setEnvironmentVariable('SCOOP','D:\Application\Scoop','User')

[environment]::setEnvironmentVariable('Path',[System.Environment]::GetEnvironmentVariable('Path',[System.EnvironmentVariableTarget]::User)+";D:\Application\Scoop\shims",'User')

$env:SCOOP='D:\Application\Scoop'

[environment]::setEnvironmentVariable('SCOOP_GLOBAL','D:\Application\ScoopGlobal','Machine')

[environment]::setEnvironmentVariable('Path',[System.Environment]::GetEnvironmentVariable('Path',[System.EnvironmentVariableTarget]::Machine)+";D:\Application\ScoopGlobal\shims",'Machine')

$env:SCOOP_GLOBAL='D:\Application\ScoopGlobal'


#重置应用以解决冲突,会重置环境变量,快捷方式等..
scoop reset *
#检查潜在的问题..执行下看看使用scoop会有什么问题
scoop checkup
#如果使用了aria2感觉慢的话可以关闭
scoop config aria2-enabled false  
#下面是日常更新软件命令
sudo scoop update * -g ; scoop update * ; sudo scoop cleanup * -g ; scoop cleanup *
# 查看 Scoop 还能直接识别哪些 bucket
scoop bucket known
```

### 快捷方式

```
Invoke-Item "~\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Scoop Apps"
```

**将Scoop安装到自定义目录** 假设目标目录是`D:\Application\Scoop`,在PowerShell命令控制台中运行：

```
[environment]::setEnvironmentVariable('SCOOP','D:\Application\Scoop','User')
$env:SCOOP='D:\Application\Scoop'
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

将全局应用安装到自定义目录,假设目标目录是`D:\Application\ScoopGlobal`,在PowerShell命令控制台中运行：

```
[environment]::setEnvironmentVariable('SCOOP_GLOBAL','D:\Application\ScoopGlobal','Machine')
$env:SCOOP_GLOBAL='D:\Application\ScoopGlobal'
```

### 安装应用

以我常用应用为例(可作为脚本文件,后缀ps1)

```
###安装scoop并自定义安装路径
[environment]::setEnvironmentVariable('SCOOP','D:\Application\Scoop','User')
$env:SCOOP='D:\Application\Scoop'
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
[environment]::setEnvironmentVariable('SCOOP_GLOBAL','D:\Application\ScoopGlobal','Machine')
$env:SCOOP_GLOBAL='D:\Application\ScoopGlobal'

#git,程序员必备,只有安装了git才能添加其他桶
scoop install git;
#arias2 scoop 下载会用到
scoop install aria2;
#7zip 一些app会用到
scoop install 7zip
#scoop checkup提示装的软件
scoop install wixtoolset

###添加桶
#scoop内置的桶
#scoop bucket known;

scoop bucket add extras;
scoop bucket add Java;
scoop bucket add versions;
#一个还不错的
scoop bucket add Ash258 'https://github.com/Ash258/scoop-Ash258.git'
#一个还不错的桶
scoop bucket add dodorz https://github.com/dodorz/scoop-bucket
#一个还不错的桶
scoop bucket add dorado https://github.com/h404bi/dorado

### 添加代理
scoop config proxy 127.0.0.1:1080
# 删除代理
scoop config rm proxy


###安装全局应用
scoop install apache -g;
scoop install redis -g;
# redis客户端
scoop install redis-desktop-manager
scoop install mysql -g;
scoop install nodejs -g;
# jdk最好使用8,否则android-sdk会有问题
scoop install ojdkbuild8 -g;
scoop install php -g;
#整合apache php
iex (new-object net.webclient).downloadstring('https://gist.githubusercontent.com/nilkesede/c98a275b80b6d373131df82eaba96c63/raw/apache-php-init.ps1')
# 或者手动修改apache配置
#LoadModule php7_module 'C:/Users/xxxxx/scoop/apps/php71/current/php7apache2_4.dll'
#AddHandler application/x-httpd-php .php
#PHPIniDir "C:\Users\xxxxx\scoop\apps\php71\current"

###安装APP

#效率启动神器
scoop install wox;
#文件检索
scoop install everything;
#解压
scoop install bandizip;
#远程终端
scoop install MobaXterm;
#桌面控制
scoop install teamviewer;
#markdown编写
scoop install typora;
#编辑器
scoop install vscode;
#截图软件
scoop install snipaste
#ditto 剪贴板
scoop install ditto
#postman
scoop install postman
#heidisql
scoop install heidisql
#imageglass 图片浏览器
scoop install imageglass
#quick look
scoop install quicklook
#sharex
scoop install sharex
#obs  录制视频或者直播
scoop install obs-studio
#switchhosts
scoop install switchhosts
# android-sdk
scoop install android-sdk
# 安装ndk 老版本下载https://developer.android.com/ndk/downloads/older_releases.html
# sdkmanager ndk-bundle
# shadowsocksr-csharp
scoop install shadowsocksr-csharp
# picpick
scoop install picpick
#xmind8
scoop install xmind8
# android-studio
scoop install android-studio
#记住sourcetree的git最好使用内嵌版本
scoop install sourcetree
# php的包工具
scoop intstall composer
# 反向代理
scoop install frp
# gradle
scoop install gradle
# pwsh
scoop install pwsh
#网易云音乐
scoop install neteasemusic
# ftp工具
scoop install filezilla
# pdf阅读工具
 scoop install foxit-reader
# 播放器
scoop install potplayer
# draw工程图,uml工具
scoop install draw.io
# 定时提醒休息工具
scoop install workrave
# 投屏工具
scoop install scrcpy
# 卸载工具
scoop install geekuninstaller
#浏览器
scoop install  firefox-developer-zh-cn
scoop install  googlechrome
#wechat
scoop install wechat
#steam
scoop install steam
#windows teraminal
scoop install windows-terminal
# 反编译 ilspy  https://github.com/sailro/Reflexil下载Reflexil将Reflexil.ILSpy.Plugin.dll直接扔到ilspy目录下即行
scoop install ilspy
#win+x菜单编辑
scoop install WinXMenuEditor
#发送到菜单编辑
scoop install SendToMenuEditor
# 上下文菜单
scoop install EasyContextMenu
#定时关机
scoop install kshutdown
# scriptcs
scoop install scriptcs
# 录像软件
scoop install captura
```

# apache

```
sudo httpd -k install -n apache  
start-service apache
remove-service apache
```

## 修改配置

文件路径`D:\Application\ScoopGlobal\apps\apache\current\conf\httpd.conf`

```
Define SRVROOT "D:\Application\ScoopGlobal\apps\apache\current"
ServerName localhost
```

# Redis

```
redis-server --service-install D:\Application\ScoopGlobal\apps\redis\current\redis.windows-service.conf --loglevel verbose
```

# MySQL

注册MySQL服务,(因为scoop是低污染的,所以要自己做):

```
mysqld --install MySQL --defaults-file="D:\Application\ScoopGlobal\apps\mysql\current\my.ini"
```

注意mysql8密码可能认证有错误my.ini中需要设置

```
default_authentication_plugin=mysql_native_password
```

# pwsh

将pwsh添加到terminal中

```
   {
        "acrylicOpacity": 0.5,
        "closeOnExit": true,
        "colorScheme": "Campbell",
        "commandline": "D:/Application/Scoop/apps/pwsh/current/pwsh.exe",
        "cursorColor": "#FFFFFF",
        "cursorShape": "bar",
        "fontFace": "Consolas",
        "fontSize": 10,
        "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
        "historySize": 9001,
        "icon": "ms-appx:///ProfileIcons/{574e775e-4f2a-5b96-ac1e-a2962a402336}.png",
        "name": "PowerShell Core",
        "padding": "0, 0, 0, 0",
        "snapOnInput": true,
        "startingDirectory": "%USERPROFILE%",
        "useAcrylic": false
      },
```

### 导出 Scoop 软件列表

备份 Scoop 的方式为：

```
scoop export > scoop.txt
```

可以对 Scoop 的导出列表进行额外处理，以方便后续安装。使用 VSCode 打开 `scoop.txt` 文件，以正则表达式搜索：

```
(.*?) .*
```

并全部替换成：

```
$1
```

注意正则式中包含空格，请完整复制。

## backup

```
scoop bucket add knox-scoop https://git.irs.sh/KNOXDEV/knox-scoop
scoop install scoop-backup

# Save to a different folder:
scoop-backup .\path\to\folder\

scoop-backup --compress
# >> "output-folder\backup.bat"
```
