## 概念

现代Javascript应用程序的静态模块打包工具, 内存中构建一个依赖图

- 入口
- 输出
- loader (用来处理其他类型的文件, 转换位有效模块)
  - test属性
  - use属性
- 插件
  - 打包优化, 资源管理, 注入环境变量
- 模式
- 浏览器兼容性



## 入口

### 多页面应用程序

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

多个页面不需要共享数据



## 输出

占位符substitution

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

以下是对资源使用 CDN 和 hash 的复杂示例：

**config.js**

```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[hash]',
    publicPath: 'http://cdn.example.com/assets/[hash]/'
  }
};
```

如果在编译时，不知道最终输出文件的 `publicPath` 是什么地址，则可以将其留空，并且在运行时通过入口起点文件中的 `__webpack_public_path__` 动态设置。

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// 应用程序入口的其余部分
```

## 模式

*记住，设置* `NODE_ENV` *并不会自动地设置* `mode`*。*

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 |
| none        | 退出任何默认优化选项                                         |

### mode: development 

```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   namedModules: true,
-   namedChunks: true,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

### mode: production 

```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   namedModules: false,
-   namedChunks: false,
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   sideEffects: true,
-   usedExports: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   noEmitOnErrors: true,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new TerserPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```

### mode: none 

```diff
// webpack.custom.config.js
module.exports = {
+ mode: 'none',
- performance: {
-  hints: false
- },
- optimization: {
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: []
}
```

如果要根据 webpack.config.js 中的 **mode** 变量更改打包行为，则必须将配置导出为一个函数，而不是导出为一个对象：

```javascript
var config = {
  entry: './app.js'
  //...
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```

## loader

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！

### 示例

例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：

```bash
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

然后指示 webpack 对每个 `.css` 使用 [`css-loader`](https://webpack.docschina.org/loaders/css-loader)，以及对所有 `.ts` 文件使用 [`ts-loader`](https://github.com/TypeStrong/ts-loader)：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```



### 使用loader

在你的应用程序中，有三种使用 loader 的方式：

- [配置](https://webpack.docschina.org/concepts/loaders/#configuration)（推荐）：在 **webpack.config.js** 文件中指定 loader。
- [内联](https://webpack.docschina.org/concepts/loaders/#inline)：在每个 `import` 语句中显式指定 loader。
- [CLI](https://webpack.docschina.org/concepts/loaders/#cli)：在 shell 命令中指定它们。



### 内联inline

可以在 `import` 语句或任何 [等同于 "import" 的方法](https://webpack.docschina.org/api/module-methods) 中指定 loader。使用 `!` 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

使用 `!` 为整个规则添加前缀，可以覆盖配置中的所有 loader 定义。

选项可以传递查询参数，例如 `?key=value&foo=bar`，或者一个 JSON 对象，例如 `?{"key":"value","foo":"bar"}`。

> 尽可能使用 `module.rules`，因为这样可以减少源码中样板文件的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

### CLI 

还可以通过 CLI 使用 loader：

```sh
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 `.jade` 文件使用 `jade-loader`，以及对 `.css` 文件使用 [`style-loader`](https://webpack.docschina.org/loaders/style-loader) 和 [`css-loader`](https://webpack.docschina.org/loaders/css-loader)。

### loader 特性 

- loader 支持链式传递。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 期望 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何 Node.js 能做到的操作。
- loader 可以通过 `options` 对象配置（仍然支持使用 `query` 参数来设置选项，但是这种方式已被废弃）。
- 除了常见的通过 `package.json` 的 `main` 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 `loader` 字段直接引用一个模块。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

通过（loader）预处理函数，loader 为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和 [更多其他特性](https://webpack.docschina.org/loaders)。

### 解析 loader 

loader 遵循 [模块解析](https://webpack.docschina.org/concepts/module-resolution/) 标准。多数情况下，loader 将从 [模块路径](https://webpack.docschina.org/concepts/module-resolution/#module-paths) 加载（通常是从 `npm install`, `node_modules` 进行加载）。

通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件。按照约定，loader 通常被命名为 `xxx-loader`（例如 `json-loader`）。更多详细信息请查看 [如何编写 loader？](https://webpack.docschina.org/contribute/writing-a-loader)。



## 插件

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

在上面的示例中，`html-webpack-plugin` 为应用程序生成 HTML 一个文件，并自动注入**所有生成的** bundle。



## 模块

在 [模块化编程](https://en.wikipedia.org/wiki/Modular_programming) 中，开发者将程序分解为功能离散的 chunk(discrete chunks of functionality)，并称之为_模块_。

每个模块具有比完整程序更小的接触面，使得验证、调试、测试轻而易举。 精心编写的_模块_提供了可靠的抽象和封装界限，使得应用程序中每个模块，都具备了条理清楚的设计和明确的目的。

Node.js 从最一开始就支持模块化编程。 然而，web 的*模块化*支持正缓慢到来。 在 web 存在多种支持 JavaScript 模块化的工具，这些工具各有优势和限制。 webpack 基于从这些系统获得的经验教训，并将_模块_的概念应用于项目中的任何文件。

### 什么是 webpack 模块 

与 [Node.js 模块](https://nodejs.org/api/modules.html) 相比，webpack _模块_能够以各种方式表达它们的依赖关系。下面是一些示例：

- [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 语句
- [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` 语句
- [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` 和 `require` 语句
- css/sass/less 文件中的 [`@import` 语句](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)。
- 样式(`url(...)`)或 HTML 文件(``)中的图片链接

> webpack 1 需要特定的 loader 来转换 ES2015 `import`，然而在 webpack 2 中，这一切都是开箱即用的。

### 支持的模块类型 

通过 *loader*，webpack 可以支持以各种语言和预处理器语法编写的模块。*loader* 描述了 webpack **如何**处理 非 JavaScript _模块_，并且在 *bundle* 中引入这些_依赖_。 webpack 社区已经为各种流行语言和语言处理器创建了 *loader*，包括：

- [CoffeeScript](http://coffeescript.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESNext (Babel)](https://babel.docschina.org/)
- [Sass](http://sass-lang.com/)
- [Less](http://lesscss.org/)
- [Stylus](http://stylus-lang.com/)

其实还有很多！总的来说，webpack 提供了可定制的、强大和丰富的 API，允许在**任何技术栈**中使用 webpack，同时在开发、测试和生产环境下的工作流程中做到**无侵入性**。

有关完整列表，请参考 [**loader 列表**](https://webpack.docschina.org/loaders) 或 [**编写你自己的 loader**](https://webpack.docschina.org/api/loaders)。



## [模块热替换](https://webpack.docschina.org/concepts/hot-module-replacement/)