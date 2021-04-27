参考： https://www.cnblogs.com/Wayou/p/node_debug.html

关于Node.js（书写）和node（读音）

## --inspect 参数
本地开发，无论是 web 应用还是命令行工具，使用 --inspect-brk 参数启动程序，然后结合 Chrome DevTools 调试恐怕能满足大多数场景了。

具体步骤：

通过 --inspect-brk 参数启动程序，会进入调试模式。
```
$ `node --inspect-brk index.js`
```
这里使用 --inspect-brk 而非 --inspect 可保证代码第一时间断在开程序开头。如果使用后者，有可能无法进行后续操作。

打开 Chrome 新开标签页访问 chrome://inspect。不出意外会看到刚刚创建的一个调试实例，直接点击 inspect 即可启动调试。因为是 --inspect-brk 启动的，调试界面打开后会断在程序开头。后面在哪里加断点就有很大自主权了。

需要注意的是，因为此时断在了程序开始，程序中其他文件可能没加载。所以无法看到。这种情况下，可事先在需要加断点的地方写上 debugger。

## 子进程中代码的调试
另一个需要注意的地方就是子进程。对于 子进程 中的代码，是无法断点的，这是调试大多数框架及复杂程序时的痛点。

一个简单的子进程示例：
```
index.js

var cp = require('child_process');
var child = cp.fork('./child');

child.on('message', function(m) {
  console.log('received: ' + m);
});
```

```
child.send('Please up-case this string');
child.js

process.on('message', function(m) {
  debugger;
  // Do work  (in this case just up-case the string
  m = m.toUpperCase();

  // Pass results back to parent process
  process.send(m.toUpperCase(m));
});
```
这里，node --inspect-brk index.js 启动调试后，child.js 中的 debugger 并不会生效，因为它的代码在子进程中。

这也就是为什么，当你想调试 webpack 编译，恰好又用了类似 happypack 这种多进程加速编译的工具时，发现 loader 及 插件中无法断点的原因

当然不是，只是需要费劲一点。我们需要找到开启子进程的地方，在开启的时候加上调试参数。

还是上面的示例，改造主文件为如下：

var cp = require('child_process');
+var child = cp.fork('./child',[],{execArgv:['--inspect-brk']});

child.on('message', function(m) {
  console.log('received: ' + m);
});

child.send('Please up-case this string');
这样，就表示以调试模式来运行子进程中的代码，此时启动程序不要加 inspect，因为那是开启对主进程的调试，直接运行程序即可。node index.js。然后我们会在 Chrome://inspect 看到子进程已经 attach 到了调试界面。

所以，无论是通过 require('child_process' 的 exec 还是 spawn，只需要找到开启子进程的地方，加上调试参数。

但问题是，就看你能不能正确地找到所使用的框架工具他们开启子进程的地方。

## 善用 npx
调试 node 模块时，特别是 npm 包，你需要手动拼出该模块的入口文件的路径，类似 node —inspect node_modules/webpack/bin/webpack.js, 但通过 npx 则不用，因为 npx 会自动在项目的 node_modules 或系统全局中寻找模块的入口文件，甚至如果本机没有安装，它还会自动搜索 registry 自动安装后执行。

以至于你在初始化一个项目时，可使用如下命令：
```
$ npx license mit > LICENSE
$ npx gitignore node
$ npx covgen YOUR_EMAIL_ADDRESS
$ npm init -y
```
即使你本地并没有安装 mit，gitignore，covgen 等 npm 包。

使用 npx 时可通过 —node-arg 来传递参数给 node。因为本质上 npx 也是执行 js 文件，与直接使用 node 命令来启动文件没什么差异。—node-arg 指定的参数会透传给 node，所以，可以这样来启动一个 npm 包的调试：
```
$ npx —node-arg=—inspect-brk webpack
```


## node 内建的 debugger
node 自带的 v8 调试工具，是个命令行工具。操作起来是难用，但在远端服务器上这种不能使用 Chrome Devtools 进行可视化调试的场景下，就显得很有用了，比如调试路由重定向次数过多这种瞬间发生的问题，它能将代码及时在服务器上断下来，让我们慢慢分析现场。

$ node inspect index.js

进入调试模式后，代码会断在开始处。可通过以下常用命令进行 debug:

c/cont：断续执行，类似于 Chrome DevTools 中的 F8
n/next：步进，类似于 Chrome DevTools 中的 F10
step/s: 进入，类似于 Chrome DevTools 中的 F11
setBreakpoint()/sb(): 设置断点。
通过调用该函数可对代码设置断点。
直接调用则在当前所处的行设置断点。
sb(line_number) 传递一个行数，对相应行设置上断点。
sb(file_name,line_number) 传递文件名及行数，可对非当前文件进行断点的设置。
clearBreakpoint: 参数与 setBreakpoint 类似，作用是清除断点。
breakpoints，查看设置的断点。
观察变量的值。在这种调试模式下，可通过输入 repl 进入 REPL（Read-Eval-Print-Loop） 模式来查看变量的值。

## 日志加 tail -f
服务器上面更加常用的应该还是日志加 tail，配合 -f 参数，可时实将最新的 log 输出到命令行。

$ tail -f /your/logs/log

## Remote Debug
Remote Debug 这个就有点厉害了，没配置过，获取相应服务器权限设置好之后，估计没有比这个更便捷的调试服务器上代码的方式了。在有些资源或服务只在服务器环境才有的情况下，本地又不好还原场景。


## vscode debugger

### Supported Node-like runtimes
Today two wire protocols exist:

legacy: the original V8 Debugger Protocol which is currently supported by older runtimes.
inspector: the new V8 Inspector Protocol is exposed via the --inspect flag in Node.js versions >= 6.3. It addresses most of the limitations and scalability issues of the legacy protocol.
Currently these protocols are supported by specific version ranges of the following runtimes:

Runtime	'Legacy' Protocol	'Inspector' Protocol
io.js	all	no
Node.js	< 8.x	>= 6.3 (Windows: >= 6.9)
Electron	< 1.7.4	>= 1.7.4
Chakra	all	not yet

由 protocol 来定义
* auto
* inspector
* legacy

### Launch configuration attributes
lauch.json
#### lanch & attach:
protocol: 
port
address
sourceMaps
outFile
restart
autoAttachChildProcesses
timeout
stopOnEntry
localRoot
remoteRoot
smartStep
skipFiles
trace

#### lanch:
program
args
cwd: launch the program to debug in this directory. 工程目录上下文
runtimeExecutable
runtimeArgs
runtimeVersion
env
envFile
console
outputCapture


#### attach
processId


## 一个debug javascript的方法
使用rollup打包之后，所有的代码在同一个文件中，避免在不同的文件中跳转

开启vscode配置
```
  "debug.node.autoAttach": "on",
  "debug.inlineValues": true
```
使用node --inspect-brk 文件 开始调试

### rollup用法
命令
```
rollup -c [配置文件]

```

配置文件
```js
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'


export default {
  input: 'index.js',
  format: 'iife',
  output: {
    file:'./dist/index.js',
    format: 'iife'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]
}
```

rollup插件使用
* rollup-plugin-node-resolve  ---帮助 Rollup 查找外部模块，然后导入
* rollup-plugin-commonjs   ---将CommonJS模块转换为 ES2015 供 Rollup 处理
* rollup-plugin-babel   --- 让我们可以使用es6新特性来编写代码
* rollup-plugin-terser  --- 压缩js代码，包括es6代码压缩
* rollup-plugin-eslint  --- js代码检测
