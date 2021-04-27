# [electron 简单](https://blog.csdn.net/itas109/article/details/100127225)
前言
跨平台打包可以使用QT，但是QT的依赖比较多，并且对于Linux系统gcc依赖是个很头疼的问题。如果我们只是想使用web相关的内容，那么可以尝试一下electron，可以很方便的进行跨平台打包安装。

## 1.nodejs安装
略过

## 2.electron的安装
2.1 安装cnpm加快下载速度
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

2.2 cnpm安装electron
cnpm install -g electron

2.3 检查是否安装成功
electron -v

## 3.electron快速开始
```
# 1.下载
git clone https://github.com/electron/electron-quick-start

# 2.进入目录
cd electron-quick-start

# 3.！！！查看注意事项

# 4.安装依赖
npm install

# 5.运行测试程序
npm start
```


## 4.打包程序
electron-packager .

可能遇到的错误：

    WARNING: Make sure that .NET Framework 4.5 or later and Powershell 3 or later ar
    e installed, otherwise extracting the Electron zip file will hang.

解决：
安装Microsoft .NET Framework 4.5和Powershell 3(需要Windows Management Framework 4.0)

## 检查页面环境是不是支持electron 


```js
import electron from 'electron'
const b = electron.remote.getCurrentWindow()

console.log(b.id)
```