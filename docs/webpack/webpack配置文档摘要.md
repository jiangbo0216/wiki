## 配置

### 选项

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./app/entry", // string | object | array  entry: ["./app/entry1", "./app/entry2"],
  entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  // 默认为 './src'
  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "bundle.js", // string    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
    filename: "[chunkhash].js", // 用于长效缓存
    // 「入口分块(entry chunk)」的文件名模板
    publicPath: "/assets/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
    library: "MyLibrary", // string,
    // 导出库(exported library)的名称
    libraryTarget: "umd", // 通用模块定义    // 导出库(exported library)的类型
    /* 高级输出配置（点击显示） */  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include
        issuer: { test, include, exclude },
        // issuer 条件（导入源）
        enforce: "pre",
        enforce: "post",
        // 标识应用这些规则，即使规则覆盖（高级选项）
        loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。
        options: {
          presets: ["es2015"]
        },
        // loader 的可选项
      },
      {
        test: /\.html$/,
        use: [
          // 应用多个 loader 和选项
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },
      { oneOf: [ /* rules */ ] },
      // 只使用这些嵌套规则之一
      { rules: [ /* rules */ ] },
      // 使用所有这些嵌套规则（合并可用条件）
      { resource: { and: [ /* 条件 */ ] } },
      // 仅当所有条件都匹配时才匹配
      { resource: { or: [ /* 条件 */ ] } },
      { resource: [ /* 条件 */ ] },
      // 任意条件匹配时匹配（默认为数组）
      { resource: { not: /* 条件 */ } }
      // 条件不匹配时匹配
    ],
    /* 高级模块配置（点击展示） */  },
  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录
    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名
    alias: {
      // 模块别名列表
      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */    /* 高级解析选项（点击展示） */  },
  performance: {
    hints: "warning", // 枚举    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "source-map", // enum  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。
  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析
  target: "web", // 枚举  // bundle 应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
  externals: ["react", /^@angular\//],  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
  serve: { //object
    port: 1337,
    content: './dist',
    // ...
  },
  // 为 webpack-serve 提供选项
  stats: "errors-only",  // 精确控制要显示的 bundle 信息
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  plugins: [
    // ...
  ],
  // 附加插件列表
  /* 高级配置（点击展示） */}
```



### 使用自定义配置文件

**package.json**

```json
"scripts": {
  "build": "webpack --config prod.config.js"
}
```



### Configuration file generators  配置文件生成器

Want to rapidly generate webpack configuration file for your project requirements with just a few clicks away?

[Generate Custom Webpack Configuration](https://generatewebpackconfig.netlify.com/) is an interactive portal you can play around by selecting custom webpack configuration options tailored for your frontend project. It automatically generates a minimal webpack configuration based on your selection of loaders/plugins, etc.

[Visual tool for creating webpack configs](https://webpack.jakoblind.no/) is an online configuration tool for creating webpack configuration file where you can select any combination of features you need. It also generates a full example project based on your webpack configs.



## 使用不同语言进行配置



## 多种配置类型

### 导出为一个函数 

最终，你会发现需要在[开发](https://webpack.docschina.org/guides/development)和[生产构建](https://webpack.docschina.org/guides/production)之间，消除 `webpack.config.js` 的差异。（至少）有两种选项：

作为导出一个配置对象的替代，还有一种可选的导出方式是，从 webpack 配置文件中导出一个函数。该函数在调用时，可传入两个参数：

 

- 环境对象(environment)作为第一个参数。有关语法示例，请查看[CLI 文档的环境选项](https://webpack.docschina.org/api/cli#environment-options)。
- 一个选项 map 对象（`argv`）作为第二个参数。这个对象描述了传递给 webpack 的选项，并且具有 [`output-filename`](https://webpack.docschina.org/api/cli/#output-options) 和 [`optimize-minimize`](https://webpack.docschina.org/api/cli/#optimize-options) 等 key。

```diff
-module.exports = {
+module.exports = function(env, argv) {
+  return {
+    mode: env.production ? 'production' : 'development',
+    devtool: env.production ? 'source-maps' : 'eval',
     plugins: [
       new TerserPlugin({
         terserOptions: {
+          compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
         }
       })
     ]
+  };
};
```

### 导出一个 Promise 

webpack 将运行由配置文件导出的函数，并且等待 Promise 返回。便于需要异步地加载所需的配置变量。

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      });
    }, 5000);
  });
};
```

### 导出多个配置对象 

作为导出一个配置对象/配置函数的替代，你可能需要导出多个配置对象（从 webpack 3.1.0 开始支持导出多个函数）。当运行 webpack 时，所有的配置对象都会构建。例如，导出多个配置对象，对于针对多个[构建目标](https://webpack.docschina.org/configuration/output#output-librarytarget)（例如 AMD 和 CommonJS）[打包一个 library](https://webpack.docschina.org/guides/author-libraries) 非常有用。

```js
module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  name: 'amd',
  entry: './app.js',
  mode: 'production',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  name: 'commonjs',
  entry: './app.js',
  mode: 'production',
}];
```



## 入口和上下文

### `context` 

```
string
```

基础目录，**绝对路径**，用于从配置中解析入口起点(entry point)和 loader

```js
module.exports = {
  //...
  context: path.resolve(__dirname, 'app')
};
```

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

### `entry` 

```
string | [string] | object { : string | [string] } | (function: () => string | [string] | object { : string | [string] })
```

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

动态加载的模块**不是**入口起点。

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js'
  }
};
```

### 命名 

如果传入一个字符串或字符串数组，chunk 会被命名为 `main`。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。

### 动态入口 

If a function is passed then it will be invoked on every [make](https://webpack.docschina.org/api/compiler-hooks/#make) event.

> Note that the make event triggers when webpack starts and for every invalidation when [watching for file changes](https://webpack.docschina.org/configuration/watch/).

```js
module.exports = {
  //...
  entry: () => './demo'
};
```

或

```js
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
};
```

For example: you can use dynamic entries to get the actual entries from an external source (remote server, file system content or database):

**webpack.config.js**

```js
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  }
};
```

当结合 [`output.library`](https://webpack.docschina.org/configuration/output#output-library) 选项时：如果传入数组，则只导出最后一项。



## 输出

`output` 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。

