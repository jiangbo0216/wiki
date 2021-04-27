## scoop 快速入门
### prerequisites 预备知识
$psversiontable.psversion.major
powershell 版本 >= 5 

### 允许 powersehll 执行脚本
set-executionpolicy remotesigned -scope currentuser -Forece
参考：https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-6

### 安装
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

或者

iwr -useb get.scoop.sh | iex

### 安装自定义目录
$env:SCOOP='C:\scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
iwr -useb get.scoop.sh | iex

### 全局安装（管理员权限）
$env:SCOOP_GLOBAL='c:\apps'
[environment]::setEnvironmentVariable('SCOOP_GLOBAL',$env:SCOOP_GLOBAL,'Machine')
scoop install -g <app>

### 获取帮助
scoop help

scoop help <command>

scoop help install

### 寻找软件
scoop search ssh

## 升级
scoop update

scoop update curl

scoop update *


## 概念 Concepts
### app
manifest(清单)表示 app ，声明式
### Buckets
apps 的集合 collection, 包含app manifest 的 git仓库

main bucket criteria : https://github.com/lukesampson/scoop/wiki/Criteria-for-including-apps-in-the-main-bucket

查看已知的buckets
scoop bucket known

从其他bucket安装
```shell
scoop bucket add extras

scoop bucket add extras https://github.com/lukesampson/scoop-extras.git

scoop bucket add <name-of-bucket> <location-of-git-repo>
```

#### 创建自己的bucket
1. 创建一个git仓库，命名为my-bucket
2. 向bucket中添加一个app
```shell
git clone https://github.com/<your-username>/my-bucket
cd my-bucket
'{ version: "1.0", url: "https://gist.github.com/lukesampson/6446238/raw/hello.ps1", bin: "hello.ps1" }' > hello.json
git add .
git commit -m "add hello app"
git push
```
3. 配置使用新的bucket
```
scoop bucket add my-bucket https://github.com/<your-username>/my-bucket
```
4. 检查是否工作
```
scoop bucket list # -> you should see 'my-bucket'
scoop search hello # -> you should see hello listed under, 'my-bucket bucket:'
scoop install hello
hello # -> you should see 'Hello, <windows-username>!'
```

## app manifest
manifest 描述了如何安装一个软件
例子：
```json
{
    "version": "1.0",
    "url": "https://github.com/lukesampson/cowsay-psh/archive/master.zip",
    "extract_dir": "cowsay-psh-master",
    "bin": "cowsay.ps1"
}
```
* url 下载的地址
* extract_dir 解压的目录
* bin 命令加入用户变量path配置中

### 必须属性
version


### persistent data 数据持久化
```
~/scoop/persist/<app>/
```
```json
{
    "persist": [
        "keeps_its_name",
        ["original_name", "new_name_inside_the_data_dir"]
    ]
}
```

#### 卸载并删除数据
```
scoop uninstall -p nodejs
```

scoop config aria2-enabled false
禁用aria2