# [Electron 应用架构](https://www.electronjs.org/docs/tutorial/application-architecture#electron-应用架构)

在我们深入了解Electron的API之前，我们需要探讨一下在Electron中可能遇到的两种进程类型。 它们是完全不同的，因此理解它们非常重要。

## [主进程和渲染进程](https://www.electronjs.org/docs/tutorial/application-architecture#主进程和渲染进程)

Electron 运行 `package.json` 的 `main` 脚本的进程被称为**主进程**。 在主进程中运行的脚本通过创建web页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它的叫**渲染进程**的进程中。

在普通的浏览器中，web页面通常在沙盒环境中运行，并且无法访问操作系统的原生资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。



### [主进程和渲染进程之间的区别](https://www.electronjs.org/docs/tutorial/application-architecture#主进程和渲染进程之间的区别)

主进程使用 `BrowserWindow` 实例创建页面。 每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。 当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的web页面和它们对应的渲染进程。 每个渲染进程都是独立的，它只关心它所运行的 web 页面。

在页面中调用与 GUI 相关的原生 API 是不被允许的，因为在 web 页面里操作原生的 GUI 资源是非常危险的，而且容易造成资源泄露。 如果你想在 web 页面里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

> #### [题外话：进程间通讯](https://www.electronjs.org/docs/tutorial/application-architecture#题外话：进程间通讯)
>
> Electron为主进程（ main process）和渲染器进程（renderer processes）通信提供了多种实现方式，如可以使用[`ipcRenderer`](https://www.electronjs.org/docs/api/ipc-renderer) 和 [`ipcMain`](https://www.electronjs.org/docs/api/ipc-main)模块发送消息，使用 [remote](https://www.electronjs.org/docs/api/remote)模块进行RPC方式通信。 这里也有一个常见问题解答：[web页面间如何共享数据](https://www.electronjs.org/docs/faq#how-to-share-data-between-web-pages)。