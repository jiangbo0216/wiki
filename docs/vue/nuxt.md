## 需要安装 esm 模块

node -r esm 可以直接执行es6模块

webppack-dev-middlerware 套在webpack的compiler上面, 提供了 memory-fs 的支持

webpack node api
定制build或者开发流程，webpack仅负责编译部分，[stats](https://webpack.js.org/configuration/stats/)的配置无效

stats: 'errors-only'

webpack 调用方式

```js
const webpack = require('webpack');

webpack({
  // Configuration Object
}, (err, stats) => { // Stats Object
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
});
```

如果没有传入一个函数作为callback， 将会返回一个Compiler实例，用于手动触发，提供了以下的方法

* .run(callback)
* .watch(watchOptions, handler)

通常，只创建一个主编译器实例，尽管可以创建子编译器来委托特定的任务。编译器最终只是一个函数，它只执行最基本的功能来保持生命周期的运行。它将所有的加载、绑定和编写工作委托给已注册的插件。

Typically, only one master Compiler instance is created, although child compilers can be created in order to delegate specific tasks. The Compiler is ultimately just a function which performs bare minimum functionality to keep a lifecycle running. It delegates all the loading, bundling, and writing work to registered plugins.

该API每次只支持一个并发编译。当使用run时，等待它完成后再调用run或watch。在使用watch时，调用close并等待它结束后再调用run或watch。并发编译会破坏输出文件。

The API only supports a single concurrent compilation at a time. When using run, wait for it to finish before calling run or watch again. When using watch, call close and wait for it to finish before calling run or watch again. Concurrent compilations will corrupt the output files.
