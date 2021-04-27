Babel介绍
Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。

15 年 11 月，Babel 发布了 6.0 版本。相较于前一代 Babel 5，新一代 Babel 更加模块化， 将所有的转码功能以插件的形式分离出去，默认只提供 babel-core。原本只需要装一个 babel ，现在必须按照自己的需求配置，灵活性提高的同时也提高了使用者的学习成本。

npm i babel
已经弃用，你能下载到的仅仅是一段 console.warn，告诉你 babel 6 不再以大杂烩的形式提供转码功能了。

例如，Babel 能够将新的 ES2015 箭头函数语法：

let fun = () => console.log('babel')
转译为：

"use strict";
var fun = function fun() {
  return console.log('babel');
};
不过 Babel 的用途并不止于此，它支持语法扩展，能支持像 React 所用的 JSX 语法，更重要的是，Babel 的一切都是简单的插件，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。
再进一步，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。

使用 Babel
babel-cli
Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

让我们先全局安装它来学习基础知识。

$ npm install --global babel-cli
我们可以这样来编译我们的第一个文件：

$ babel my-file.js
这将把编译后的结果直接输出至终端。使用 --out-file 或着 -o 可以将结果写入到指定的文件。

$ babel example.js --out-file compiled.js
# 或
$ babel example.js -o compiled.js
如果我们想要把一个目录整个编译成一个新的目录，可以使用 --out-dir 或者 -d。.

$ babel src --out-dir lib
# 或
$ babel src -d lib
babel-core
如果你需要以编程的方式来使用 Babel，可以使用 babel-core 这个包。

babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。
首先安装 babel-core。.

$ npm install babel-core
var babel = require("babel-core");
字符串形式的 JavaScript 代码可以直接使用 babel.transform 来编译。

babel.transform("code();", options);
// => { code, map, ast }
如果是文件的话，可以使用异步 api：

babel.transformFile("filename.js", options, function(err, result) {
  result; // => { code, map, ast }
});
或者是同步 api：

babel.transformFileSync("filename.js", options);
// => { code, map, ast }
其他用法
还可以通过babel-register和babel-node使用Babel，但由于这两种用法不适合生产环境故省略。

配置 Babel
你或许已经注意到了，目前为止通过运行 Babel 自己我们并没能“翻译”代码，而仅仅是把代码从一处拷贝到了另一处。原因就是从Babel 6以后, 默认的插件被移除, 如果没有指定一个插件，Babel将会原样输出, 不会进行编译。

你可以通过安装插件（plugins）或预设（presets，也就是一组插件）来指示 Babel 去做什么事情。

插件只是单一的功能，例如

es2015-arrow-functions

es2015-classes

es2015-for-of

es2015-spread

以下是安装箭头函数的插件方式

npm install --save-dev babel-plugin-transform-es2015-arrow-functions
如果我们一个一个引人功能单一的插件的话显得特别麻烦，通常我们用的更多的是预设。插件和预设通常写入到配置文件中。可以将配置写入package.json的‘babel’属性里，或者是一个单独的.babelrc文件。

.babelrc
在我们告诉 Babel 该做什么之前，你需要做的就是在项目的根路径下创建 .babelrc 文件。然后输入以下内容作为开始：

{
  "presets": [],
  "plugins": []
}
这个文件就是用来让 Babel 做你要它做的事情的配置文件。

babel-preset-es2015
预设 babel-preset 系列打包了一组插件，类似于餐厅的套餐。如 babel-preset-es2015 打包了 es6 的特性，babel-preset-stage-0 打包处于 strawman 阶段的语法

我们需要安装 "es2015" Babel 预设：

$ npm install --save-dev babel-preset-es2015
我们修改 .babelrc 来包含这个预设。

{
    "presets": [
+     "es2015"
    ],
    "plugins": []
  }
同样的，还有babel-preset-2016，babel-preset-2017。

babel-preset-latest
latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）。即总是包含最新的编译插件。

babel-preset-env
上面提到的各种preset的问题就是: 它们都太”重”了, 即包含了过多在某些情况下不需要的功能. 比如, 现代的浏览器大多支持ES6的generator, 但是如果你使用babel-preset-es2015, 它会将generator函数编译为复杂的ES5代码, 这是没有必要的。但使用babel-preset-env, 我们可以声明环境, 然后该preset就会只编译包含我们所声明环境缺少的特性的代码，因此也是比较推荐的方式。

安装babel-preset-env

npm install babel-preset-env --save-dev
添加配置

{
  "presets": ["env"]
}
当没有添加任何的配置选项时，babel-preset-env默认行为是和babel-preset-latest是一样的。
下面我们通过一些例子来看babel-preset-env的配置是如何使用的：

指定支持主流浏览器最新的两个版本以及IE 7+:

"presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 7"]
        }
      }
    ]
  ]
}
支持超过市场份额5%的浏览器:

"targets": {
  "browsers": "> 5%"
}
某个固定版本的浏览器:

"targets": {
  "chrome": 56
}
更多的配置请查看官方文档

babel-preset-stage-x
官方预设(preset), 有两种，一个是按年份(babel-preset-2017)，一个是按阶段(babel-preset-stage-0)。 这主要是根据TC39 委员会ECMASCRPIT 发布流程来制定的。TC39 委员会决定，从2016年开始，每年都会发布一个版本，它包括每年期限内完成的所有功能，同时ECMAScript的版本号也按年份编制，就有了ES2016, ES2017。所以也就有了babel-present-2016, babel-preset-2017， 对每一年新增的语法进行转化。babel-preset-latest 就是把所有es2015, es2016, es2017 全部包含在一起了。

最终在阶段 4 被标准正式采纳。
以下是4 个不同阶段的（打包的）预设：

babel-preset-stage-0

babel-preset-stage-1

babel-preset-stage-2

babel-preset-stage-3

注意 stage-4 预设是不存在的因为它就是上面的 es2017 预设。

以上每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。也就是说这些stage包含的特性是比latest更新的特性但还未被写入标准进行发布。

使用的时候只需要安装你想要的阶段就可以了：

$ npm install --save-dev babel-preset-stage-2
然后添加进你的 .babelrc 配置文件。但是要注意如果没有提供es2017相关的预设，preset-stage-X 这种阶段性的预设也不能用。

执行 Babel 生成的代码
Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。

为了达成使用这些新API的目的，社区又有2个实现流派：babel-polyfill和babel-runtime+babel-plugin-transform-runtime。

这两个模块功能几乎相同，就是转码新增 api，模拟 es6 环境，但实现方法完全不同。babel-polyfill 的做法是将全局对象通通污染一遍，比如想在 node 0.10 上用 Promise，调用 babel-polyfill 就会往 global 对象挂上 Promise 对象。对于普通的业务代码没有关系，但如果用在模块上就有问题了，会把模块使用者的环境污染掉。

babel-runtime 的做法是自己手动引入 helper 函数，还是上面的例子，const Promise = require('babel-runtime/core-js/promise') 就可以引入 Promise。

但 babel-runtime 也有问题，第一，很不方便，第二，在代码中中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码。所以，babel 又开发了 babel-plugin-transform-runtime，这个模块会将我们的代码重写，如将 Promise 重写成 _Promise（只是打比方），然后引入_Promise helper 函数。这样就避免了重复打包代码和手动引入模块的痛苦。

babel-polyfill
为了解决这个问题，我们使用一种叫做 Polyfill（代码填充，也可译作兼容性补丁） 的技术。 简单地说，polyfill即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。能让你提前使用还不可用的 APIs，Array.from 就是一个例子。
Babel 用了优秀的 core-js 用作 polyfill，并且还有定制化的 regenerator 来让 generators（生成器）和 async functions（异步函数）正常工作。
要使用 Babel polyfill，首先用 npm 安装它：

$ npm install --save babel-polyfill
然后只需要在文件顶部导入 polyfill 就可以了：

import "babel-polyfill";
babel-runtime
与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。只不过，babel-polyfill 是针对全局环境的，引入它，我们的浏览器就好像具备了规范里定义的完整的特性 – 虽然原生并未实现。
babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 require(‘babel-runtime/core-js/promise’) ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。
通过安装 babel-plugin-transform-runtime 和 babel-runtime 来开始。

$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime
然后更新 .babelrc：

    {
    "plugins": [
      "transform-runtime",
      "transform-es2015-classes"
    ]
  }
现在，Babel 会把这样的代码：

class Foo {
  method() {}
}
编译成：

import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

let Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);

  return Foo;
}();
这样就不需要把 _classCallCheck 和 _createClass 这两个助手方法放进每一个需要的文件里去了。

那什么时候用 babel-polyfill 什么时候用 babel-runtime 呢？如果你不介意污染全局变量（如上面提到的业务代码），放心大胆地用 babel-polyfill ；而如果你在写模块，为了避免污染使用者的环境，没的选，只能用 babel-runtime + babel-plugin-transform-runtime。

options
很多预设和插件都有选项用于配置他们自身的行为。 例如，很多转换器都有“宽松”模式，通过放弃一些标准中的行为来生成更简化且性能更好的代码。

要为插件添加选项，只需要做出以下更改：

{
    "plugins": [
      "transform-runtime",
-     "transform-es2015-classes",
+     ["transform-es2015-classes", { "loose": true }]
    ]
}
plugins/presets排序:

具体而言，plugins优先于presets进行编译。

plugins按照数组的index增序(从数组第一个到最后一个)进行编译。

presets按照数组的index倒序(从数组最后一个到第一个)进行编译。因为作者认为大部分会把presets写成["es2015", "stage-0"]。具体细节可以看这个。

webpack 中定义 babel-loader
很少有大型项目仅仅需要 babel，一般都是 babel 配合着 webpack 或 glup 等编译工具一起上的。
为了显出 babel 的能耐，我们分别配个用 babel-polyfill 和 babel-runtime 、支持 react 的webpack.config.js
先来配使用 babel-runtime 的：
首先安装：

npm install babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime webpack --save-dev
npm install babel-runtime --save
然后配置

module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      plugins: ['transform-runtime'],
      presets: [
        ["env", {
          "targets": {
            "chrome": 52
          },
          "modules": false,
          "loose": true
        }],
        'stage-2',
        'react'
      ],
    }
  }]
}
需要注意的是，babel-runtime 虽然没有出现在配置里，但仍然需要安装，因为 transform-runtime 依赖它。
再来个 babel-polyfill 的：

entry: [
  'babel-polyfill',
  'src/index.jsx',
],

module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      presets: [
        ["env", {
          "targets": {
            "chrome": 52
          },
          "modules": false,
          "loose": true
        }],
        'stage-2',
        'react',
      ],
    }
  }]
}
参考文档：
http://babeljs.io/
https://github.com/thejamesky...
https://excaliburhan.com/post...
https://icyfish.me/2017/05/18...


## 为什么有时require一个nodejs模块需要加上.default而有时不需要？
babel可以把 import/export 转成node 的 module.exports/ require 。
但是Babel@6不再export default 的module.exports了。
如果使用了babel-plugin-add-module-exports插件，那么它会自动帮你做这件事情。

This plugin follows the babel@5 behavior - add the module.exports if only the export default declaration exists.

如果一个模块中仅仅export default， 那么就不用加.default了。如果除此之外还有别的对象被 export 出来，那不好意思，只能老老实实写default 了。
```js

'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'foo';
module.exports = exports['default'];

// 调用时
require('./bundle.js') // foo
```
详见[babel-plugin-add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports#readme)的readme首页。
