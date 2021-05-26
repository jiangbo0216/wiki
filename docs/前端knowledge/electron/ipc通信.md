1. 通知事件
2. 数据传输
3. 共享数据(用户信息等)

Ipc模块通信
1. Electron 提供了 IPC 通信模块吗，主进程的 ipcMain 和 渲染进程的 ipcRenderer
2. ipcMain，ipcRenderer 都是 EventEmitter 的子类

从渲染进程到主进程
1. Callback 写法
   * ipcRenderer.send(channel, ...args)
   * ipcMain.on(channel, handler)
2. Promise 写法 (Electron 7.0 之后, 请求 + 响应模式)
   * ipcRenderer.invoke(channel, ...args)
   * ipcMain.handle(channel, handler)

从主进程到渲染进程
* ipcRenderer.on(channel, handler)
* webContents.send(channel)

页面之间通信
1. 通知事件
   * 通过主进程转发
   * ipcRenderer.sendTo (Electron 5 以后)
2. 数据共享
   * web技术 (localStorage, sessionStorage, indexedDB)
   * remote

经验技巧
1. 不用remote
2. 不用sync
3. 请求和响应模式，需要自定义超时限制

