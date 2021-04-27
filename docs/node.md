一种编程语言是否易用，很大程度上，取决于开发命令行程序的能力。

## 阿里镜像使用
npm install  --registry=https://registry.npm.taobao.org

## npm scripts
1. npm run 命令执行时，会把 ./node_modules/.bin/ 目录添加到执行环境的 PATH 变量中，因此如果某个命令行包未全局安装，而只安装在了当前项目的 node_modules 中，通过 npm run 一样可以调用该命令。
2. 执行 npm 脚本时要传入参数，需要在命令后加 -- 标明, 如 npm run test -- --grep="pattern" 可以将 --grep="pattern" 参数传给 test 命令
3. npm 提供了 pre 和 post 两种钩子机制，可以定义某个脚本前后的执行脚本
4. 运行时变量：在 npm run 的脚本执行环境内，可以通过环境变量的方式获取许多运行时相关信息，以下都可以通过 process.env 对象访问获得：

```
npm_lifecycle_event - 正在运行的脚本名称
npm_package_<key> - 获取当前包 package.json 中某个字段的配置值：如 npm_package_name 获取包名
npm_package_<key>_<sub-key> - package.json 中嵌套字段属性：如 npm_pacakge_dependencies_webpack 可以获取到 package.json 中的 dependencies.webpack 字段的值，即 webpack 的版本号

```

## .bin 目录
```
上面所说的 node_modules/.bin 目录，保存了依赖目录中所安装的可供调用的命令行包。
何谓命令行包？例如 webpack 就属于一个命令行包。如果我们在安装 webpack 时添加 --global 参数，就可以在终端直接输入 webpack 进行调用。但如果不加 --global 参数，我们会在 node_modules/.bin 目录里看到名为 webpack 的文件，如果在终端直接输入 ./node_modules/.bin/webpack 命令，一样可以执行。
这是因为 webpack 在 package.json 文件中定义了 bin 字段为:
{
    "bin": {
        "webpack": "./bin/webpack.js"
    }
}
复制代码bin 字段的配置格式为: <command>: <file>, 即 命令名: 可执行文件. npm 执行 install 时，会分析每个依赖包的 package.json 中的 bin 字段，并将其包含的条目安装到 ./node_modules/.bin 目录中，文件名为 <command>。而如果是全局模式安装，则会在 npm 全局安装路径的 bin 目录下创建指向 <file> 名为 <command> 的软链。因此，./node_modules/.bin/webpack 文件在通过命令行调用时，实际上就是在执行 node ./node_modules/.bin/webpack.js 命令。
正如上一节所说，npm run 命令在执行时会把 ./node_modules/.bin 加入到 PATH 中，使我们可直接调用所有提供了命令行调用接口的依赖包。所以这里就引出了一个最佳实践：

将项目依赖的命令行工具安装到项目依赖文件夹中，然后通过 npm scripts 调用；而非全局安装

举例而言 webpack 作为前端工程标配的构建工具，虽然我们都习惯了全局安装并直接使用命令行调用，但不同的项目依赖的 webpack 版本可能不同，相应的 webpack.config.js 配置文件也可能只兼容了特定版本的 webpack. 如果我们仅全局安装了最新的 webpack 4.x 并使用 webpack 命令调用，在一个依赖 webpack 3.x 的工程中就会无法成功执行构建。
但如果这类工具总是本地安装，我们要调用一个命令，要手动添加 ./node_modules/.bin 这个长长的前缀，未免也太麻烦了，我们 nodejs 开发者都很懒的。于是 npm 从5.2 开始自带了一个新的工具 npx.
```

## require
js json local file cache latest

## consola

## defineProperty value writable
参考链接： https://stackoverflow.com/questions/10105824/when-do-you-use-object-defineproperty
Object.defineProperty is mainly used to set properties with specific property descriptors (e.g. read-only (constants), enumerability (to not show a property in a for (.. in ..) loop, getters, setters).
```
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```
Example
This method extends the Object prototype with a property. Only the getter is defined, and the enumerability is set to false.

```
Object.defineProperty(Object.prototype, '__CLASS__', {
    get: function() {
        return Object.prototype.toString.call(this);
    },
    enumerable: false // = Default
});
Object.keys({});           // []
console.log([].__CLASS__); // "[object Array]"
```

## node核心模块
### [http](https://nodejs.org/dist/latest-v12.x/docs/api/http.html)
To use the HTTP server and client one must require('http').
 The interface is careful to never buffer entire requests or responses — the user is able to stream data.

```javascript
var server = http.createServer([options][, requestlistener]) // 传入一个输入和输出
server.listen()


```
### fs
The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX（（计算机）简便操作系统） functions.

```
fs.existsSync()
fs.mkdirSync()
```

### os
```
os.tmpdir()
```
### path
```
path.join

```
正斜杠(/)和反斜杠(\)的区别
正斜杠，符号是"/"; 反斜杠，符号是"\"。

正斜杠/表示除法，分割。

在unix系统中，正斜杠/表示目录。由于web遵循unix命名，所以在网址(URL)中，/表示目录。

在windows系统中，正斜杠/通常用来分割命令行参数，用\表示目录。

windows本地路径用\，如C:\windows\system32。

网络一般用/，如http://www.xxx.com/

UNIX操作系统设计了这种路径分割法，它使用斜杠: /。由于网络是首先应用在UNIX计算机之间的，至今为止，一半以上的网络服务器仍是使用UNIX操作系统的，所以网址也沿用了斜杠作路径分隔符。

微软在开发DOS2.0的时候，从UNIX中借鉴了这种目录结构，但由于DOS中，斜杠已经用了作为命令行参数的标志了(UNIX中用的是"-"符)，所以只得使用反斜杠：\。

由此也可以看出windows或者说DOS在设计初期考虑不够周全，为了和UNIX一些特征区别开来，将UNIX中的正斜杠/分割符路径方式改成了反斜杠\。这样改变导致的一个问题是在早期DOS命令中，正常的文件是不能包含空格的，如果包含了空格，会导致输入这样的文件名时，命令解析无法将其和参数区分开。例如，想要进入"hutaow yuan"这个目录，直接输入"cd hutaow yuan"，命令行将会将其解析为进入"hutaow"目录，而后面的"yuan"做参数，这显然不是所期望的。
参考： https://blog.csdn.net/xiaodanjava/article/details/32131151

使用
```
path.posix.basename('/tmp/myfile.html');
```


## child_process


## 内存查看
单位字节 byte

```js
> process.memoryUsage()
{
  rss: 23322624,
  heapTotal: 5685248,
  heapUsed: 3203920,
  external: 1450146  
}
```

