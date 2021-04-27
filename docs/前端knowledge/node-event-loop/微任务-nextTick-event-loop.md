https://learnku.com/articles/38802



Node 事件循环
翻译完了之后，才发现有官方翻译 ; 但是本文更加全面。本文是从官方文档和多篇文章整合而来。

看完本文之后，你会发现这里内容与《NodeJs 深入浅出》第三章第四节 3.4 非I/O异步API 中的内容不吻合。因为书上是有些内容是错误的。
还有一点的是，NodeJS 的事件循环与 Javascript 的略有不同。因此需要把两者区分开。

1. 什么是事件循环 (What is the Event Loop)?
事件循环使 Node.js 可以通过将操作转移到系统内核中来执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的）。

由于大多数现代内核都是多线程的，因此它们可以处理在后台执行的多个操作。 当这些操作之一完成时，内核会告诉 Node.js，以便可以将适当的回调添加到轮询队列中以最终执行。 我们将在本文的后面对此进行详细说明。

2. 这就是事件循环 (Event Loop Explained)
Node.js 启动时，它将初始化事件循环，处理提供的输入脚本（或放入 REPL，本文档未涵盖），这些脚本可能会进行异步 API 调用，调度计时器或调用 process.nextTick， 然后开始处理事件循环。

下图显示了事件循环操作顺序的简化概述。

   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
每个阶段都有一个要执行的回调 FIFO 队列。 尽管每个阶段都有其自己的特殊方式，但是通常，当事件循环进入给定阶段时，它将执行该阶段特定的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或执行回调的最大数量为止。 当队列已为空或达到回调限制时，事件循环将移至下一个阶段，依此类推。

由于这些操作中的任何一个都可能调度更多操作，并且在 poll阶段处理由内核排队的新事件 (比如 I/O 事件)，因此可以在处理 poll 事件时将 poll 事件排队。 最终导致的结果是，长时间运行的回调可使 poll 阶段运行的时间比 timer 的阈值长得多。 有关更多详细信息，请参见计时器 (timer) 和轮询 (poll) 部分。

注意：Windows 和 Unix / Linux 实现之间存在细微差异，但这对于本演示并不重要。 最重要的部分在这里。 实际上有七个或八个阶段，但是我们关心的那些（Node.js 实际使用的那些）是上面的阶段。

3. 各阶段概览 Phases Overview
timers：此阶段执行由 setTimeout 和 setInterval 设置的回调。
pending callbacks：执行推迟到下一个循环迭代的 I/O 回调。
idle, prepare, ：仅在内部使用。
poll：取出新完成的 I/O 事件；执行与 I/O 相关的回调（除了关闭回调，计时器调度的回调和 setImmediate 之外，几乎所有这些回调） 适当时，node 将在此处阻塞。
check：在这里调用 setImmediate 回调。
close callbacks：一些关闭回调，例如 socket.on('close', ...)。
在每次事件循环运行之间，Node.js 会检查它是否正在等待任何异步 I/O 或 timers，如果没有，则将其干净地关闭。

4. 各阶段详细解释 Phases in Detail
4.1 timers 计时器阶段
计时器可以在回调后面指定时间阈值，但这不是我们希望其执行的确切时间。 计时器回调将在经过指定的时间后尽早运行。 但是，操作系统调度或其他回调的运行可能会延迟它们。-- 执行的实际时间不确定

注意：从技术上讲，轮询 (poll) 阶段控制计时器的执行时间。

例如，假设你计划在 100 毫秒后执行回调，然后脚本开始异步读取耗时 95 毫秒的文件：

const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
当事件循环进入 poll 阶段时，它有一个空队列（fs.readFile 尚未完成），因此它将等待直到达到最快的计时器 timer 阈值为止。 等待 95 ms 过去时，fs.readFile 完成读取文件，并将需要 10ms 完成的其回调添加到轮询 (poll) 队列并执行。 回调完成后，队列中不再有回调，此时事件循环已达到最早计时器 (timer) 的阈值 (100ms)，然后返回到计时器 (timer) 阶段以执行计时器的回调。 在此示例中，您将看到计划的计时器与执行的回调之间的总延迟为 105ms。

Note: To prevent the poll phase from starving the event loop, libuv (the C library that implements the Node.js event loop and all of the asynchronous behaviors of the platform) also has a hard maximum (system dependent) before it stops polling for more events.

注意：为防止轮询 poll 阶段使事件循环陷入饥饿状态 (一直等待 poll 事件)，libuv 还具有一个硬最大值限制来停止轮询。

4.2 pending callbacks 阶段
此阶段执行某些系统操作的回调，例如 TCP 错误。 举个例子，如果 TCP 套接字在尝试连接时收到 ECONNREFUSED，则某些 * nix 系统希望等待报告错误。 这将会在 pending callbacks 阶段排队执行。

4.3 轮询 poll 阶段
轮询阶段具有两个主要功能：

计算应该阻塞并 I/O 轮询的时间
处理轮询队列 (poll queue) 中的事件
当事件循环进入轮询 (poll) 阶段并且没有任何计时器调度 (timers scheduled) 时，将发生以下两种情况之一：

如果轮询队列 (poll queue) 不为空，则事件循环将遍历其回调队列，使其同步执行，直到队列用尽或达到与系统相关的硬限制为止 (到底是哪些硬限制？)。
如果轮询队列为空，则会发生以下两种情况之一：
如果已通过 setImmediate 调度了脚本，则事件循环将结束轮询 poll 阶段，并继续执行 check 阶段以执行那些调度的脚本。
如果脚本并没有 setImmediate 设置回调，则事件循环将等待 poll 队列中的回调，然后立即执行它们。
一旦轮询队列 (poll queue) 为空，事件循环将检查哪些计时器 timer 已经到时间。 如果一个或多个计时器 timer 准备就绪，则事件循环将返回到计时器阶段，以执行这些计时器的回调。

4.4 检查阶段 check
此阶段允许在轮询 poll 阶段完成后立即执行回调。 如果轮询 poll 阶段处于空闲，并且脚本已使用 setImmediate 进入 check 队列，则事件循环可能会进入 check 阶段，而不是在 poll 阶段等待。

setImmediate 实际上是一个特殊的计时器，它在事件循环的单独阶段运行。 它使用 libuv API，该 API 计划在轮询阶段完成后执行回调。

通常，在执行代码时，事件循环最终将到达轮询 poll 阶段，在该阶段它将等待传入的连接，请求等。但是，如果已使用 setImmediate 设置回调并且轮询阶段变为空闲，则它将将结束并进入 check 阶段，而不是等待轮询事件。

4.5 close callbacks 阶段
如果套接字或句柄突然关闭（例如 socket.destroy），则在此阶段将发出 'close' 事件。 否则它将通过 process.nextTick 发出。

5. setImmediate vs setTimeout
setImmediate 和 setTimeout 相似，但是根据调用时间的不同，它们的行为也不同。

setImmediate 设计为在当前轮询 poll 阶段完成后执行脚本。
setTimeout 计划在以毫秒为单位的最小阈值过去之后运行脚本。
计时器的执行顺序将根据调用它们的上下文而有所不同。 如果两者都是主模块 (main module) 中调用的，则时序将受到进程性能的限制（这可能会受到计算机上运行的其他应用程序的影响）。有点难懂，举个例子：

例如，如果我们运行以下不在 I/O 回调（即主模块）内的脚本，则两个计时器的执行顺序是不确定的，因为它受进程性能的约束：

// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
但是，如果这两个调用在一个 I/O 回调中，那么 immediate 总是执行第一：

// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
与 setTimeout 相比，使用 setImmediate 的主要优点是，如果在 I/O 周期内 setImmediate 总是比任何 timers 快。这个可以在下方彩色图中找到答案：poll 阶段用 setImmediate 设置下阶段 check 的回调，等到了 check 就开始执行；timers 阶段只能等到下次循环执行！

问题：那为什么在外部 (比如主代码部分 mainline) 这两者的执行顺序不确定呢？

解答：在 mainline 部分执行 setTimeout 设置定时器 (没有写入队列呦)，与 setImmediate 写入 check 队列。mainline 执行完开始事件循环，第一阶段是 timers，这时候 timers 队列可能为空，也可能有回调；如果没有那么执行 check 队列的回调，下一轮循环在检查并执行 timers 队列的回调；如果有就先执行 timers 的回调，再执行 check 阶段的回调。因此这是 timers 的不确定性导致的。

举一反三：timers 阶段写入 check 队列

setTimeout(() => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
总是会输出：

immediate
timeout
const ITERATIONS_MAX = 2;
let iteration = 0;

const timeout = setInterval(() => {
    console.log('TIME PHASE START:' + iteration);

    if (iteration >= ITERATIONS_MAX) {
        clearInterval(timeout);
        console.log('TIME PHASE exceeded!');
    }
    
    console.log('TIME PHASE END:' + iteration);
    
    ++iteration;
}, 0);

setTimeout(() => {
    console.log('TIME PHASE0');

    setTimeout(() => {
        console.log('TIME PHASE1');
    
        setTimeout(() => {
            console.log('TIME PHASE2');
        });
    });
});
输出：

TIME PHASE START:0
TIME PHASE END:0
TIME PHASE0
TIME PHASE START:1
TIME PHASE END:1
TIME PHASE1
TIME PHASE START:2
TIME PHASE exceeded!
TIME PHASE END:2
TIME PHASE2
这表明，可以理解 setInterval 是 setTimeout 的嵌套调用的语法糖。setInterval(() => {}, 0) 是在每一次事件循环中添加回调到 timers 队列。因此不会阻止事件循环的继续运行，在浏览器上也不会感到卡顿。

6. process.nextTick
6.1 理解 process.nextTick
你可能已经注意到 process.nextTick 并未显示在图中，即使它是异步 API 的一部分也是如此。 这是因为 process.nextTick 从技术上讲不是事件循环的一部分。 相反，无论事件循环的当前阶段如何，都将在当前操作完成之后处理 nextTickQueue。 在此，将操作定义为在 C/C ++ 处理程序基础下过渡并处理需要执行的 JavaScript。

回顾一下我们的图，在给定阶段里可以在任意时间调用 process.nextTick，传递给 process.nextTick 的所有回调都将在事件循环继续之前得到解决。 这可能会导致一些不良情况，因为它允许您通过进行递归 process.nextTick 调用来让 I/O 处于 "饥饿" 状态，从而防止事件循环进入轮询 poll 阶段。

注意：Microtask callbacks 微服务

6. 2 为什么允许这样操作？ Why would that be allowed?
为什么这样的东西会包含在 Node.js 中？ 它的一部分是一种设计理念，即使不是必须的情况下，API 也应始终是异步的。

举个例子：

function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}
apiCall(1, e => console.log(e));
console.log(2);
// 2
// 1
该代码段会进行参数检查，如果不正确，则会将错误传递给回调。 该 API 最近进行了更新，以允许将参数传递给 process.nextTick，从而可以将回调后传递的所有参数都传播为回调的参数，因此您不必嵌套函数。

我们正在做的是将错误传递回用户，但只有在我们允许其余用户的代码执行之后。 通过使用 process.nextTick，我们保证 apiCall 始终在用户的其余代码之后以及事件循环继续下阶段之前运行其回调。 为此，允许 JS 调用堆栈展开，然后立即执行所提供的回调，该回调可以对 process.nextTick 进行递归调用，而不会达到 RangeError：v8 超出最大调用堆栈大小。

这种理念可能会导致某些潜在的问题情况。 以下代码段为例：

let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
用户将 someAsyncApiCall 定义为具有异步签名，但实际上它是同步运行的。 调用它时，提供给 someAsyncApiCall 的回调在事件循环的同一阶段被调用，因为 someAsyncApiCall 实际上并不异步执行任何操作。 结果，即使脚本可能尚未在范围内，该回调也会尝试引用 bar，因为该脚本无法运行完毕。

通过将回调放置在 process.nextTick 中，脚本仍具有运行完成的能力，允许在调用回调之前初始化所有变量，函数等。 它还具有不允许事件循环继续下个阶段的优点。 在允许事件循环继续之前，向用户发出错误提示可能很有用。 这是使用 process.nextTick 的先前示例：

let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
这是另一个真实的例子：

const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
仅通过端口时，该端口将立即绑定。 因此，可以立即调用 “监听” 回调。 问题在于那时尚未设置.on('listening') 回调。

为了解决这个问题，"listening" 事件在 nextTick() 中排队，以允许脚本运行完成。 这允许用户设置他们想要的任何事件处理程序。

6.3 process.nextTick vs setImmediate
他们的调用方式很相似，但是名称让人困惑。

process.nextTick 在同一阶段立即触发
setImmediate fires on the following iteration or 'tick' of the event loop (在事件循环接下来的阶段迭代中执行 - check 阶段)。
本质上，名称应互换。 process.nextTick 比 setImmediate 触发得更快，但由于历史原因，不太可能改变。 进行此切换将破坏 npm 上很大一部分软件包。 每天都会添加更多的新模块，这意味着我们每天都在等待，更多潜在的损坏发生。 尽管它们令人困惑，但名称本身不会改变。

我们建议开发人员在所有情况下都使用 setImmediate，因为这样更容易推理（并且代码与各种环境兼容，例如浏览器 JS。）- 但是如果理解底层原理，就不一样。

6.4 为什么还用 process.nextTick？
这里举出两个原因：

在事件循环继续之前下个阶段允许开发者处理错误，清理所有不必要的资源，或者重新尝试请求。
有时需要让回调在事件循环继续下个阶段之前运行 (At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.)。
简单的例子：

const server = net.createServer();
server.on('connection', (conn) => { });

server.listen(8080);
server.on('listening', () => { }); // 设置监听回调
假设 listen 在事件循环的开始处运行，但是侦听回调被放置在 setImmediate 中 (实际上 listen 使用 process.nextTick,.on 在本阶段完成)。 除非传递主机名，否则将立即绑定到端口。 为了使事件循环继续进行，它必须进入轮询 poll 阶段，这意味着存在已经接收到连接可能性，从而导致在侦听事件之前触发连接事件 (漏掉一些 poll 事件)。

另一个示例正在运行一个要从 EventEmitter 继承的函数构造函数，它想在构造函数中调用一个事件：

const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
你无法立即从构造函数中发出事件，因为脚本还没运行到开发者为该事件分配回调的那里 (指 myEmitter.on)。 因此，在构造函数本身内，你可以使用 process.nextTick 设置构造函数完成后发出事件的回调，从而提供预期的结果：

const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
6.5 process.nextTick 在事件循环的位置：
来子一位外国小哥之手。链接在本文下面。

           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        |  |     idle, prepare         │
        |  └─────────────┬─────────────┘
  nextTickQueue     nextTickQueue
        |  ┌─────────────┴─────────────┐
        |  │           poll            │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        │  │           check           │
        │  └─────────────┬─────────────┘
        │           nextTickQueue
        │  ┌─────────────┴─────────────┐
        └──┤       close callbacks     │
           └───────────────────────────┘
下图补充了官方并没有提及的 Microtasks 微任务:



7. Microtasks 微任务
微任务会在主线之后和事件循环的每个阶段之后立即执行。

如果您熟悉 JavaScript 事件循环，那么应该对微任务不陌生，这些微任务在 Node 中的工作方式相同。 如果你想重新了解事件循环和微任务队列，请查看此链接（这东西非常底层，慎点）。

在 Node 领域，微任务是来自以下对象的回调：

process.nextTick()
then() handlers for resolved or rejected Promises
在主线结束后以及事件循环的每个阶段之后，立即运行微任务回调。

resolved 的 promise.then 回调像微处理一样执行，就像 process.nextTick 一样。 虽然，如果两者都在同一个微任务队列中，则将首先执行 process.nextTick 的回调。

优先级 process.nextTick > promise.then = queueMicrotask

下面例子完整演示了事件循环：

const fs = require('fs');
const logger = require('../common/logger');
const ITERATIONS_MAX = 2;
let iteration = 0;
const start = Date.now();
const msleep = (i) => {
    for (let index = 0; Date.now() - start < i; index++) {
        // do nonthing
    }
}
Promise.resolve().then(() => {
    // Microtask callback runs AFTER mainline, even though the code is here
    logger.info('Promise.resolve.then', 'MAINLINE MICROTASK');
});
logger.info('START', 'MAINLINE');
const timeout = setInterval(() => {
    logger.info('START iteration ' + iteration + ': setInterval', 'TIMERS PHASE');
    if (iteration < ITERATIONS_MAX) {
        setTimeout((iteration) => {
            logger.info('TIMER EXPIRED (from iteration ' + iteration + '): setInterval.setTimeout', 'TIMERS PHASE');
            Promise.resolve().then(() => {
                logger.info('setInterval.setTimeout.Promise.resolve.then', 'TIMERS PHASE MICROTASK');
            });
        }, 0, iteration);
        fs.readdir(__dirname, (err, files) => {
            if (err) throw err;
            logger.info('fs.readdir() callback: Directory contains: ' + files.length + ' files', 'POLL PHASE');
            queueMicrotask(() => logger.info('setInterval.fs.readdir.queueMicrotask', 'POLL PHASE MICROTASK'));
            Promise.resolve().then(() => {
                logger.info('setInterval.fs.readdir.Promise.resolve.then', 'POLL PHASE MICROTASK');
            });
        });
        setImmediate(() => {
            logger.info('setInterval.setImmediate', 'CHECK PHASE');
            Promise.resolve().then(() => {
                logger.info('setInterval.setTimeout.Promise.resolve.then', 'CHECK PHASE MICROTASK');
            });
        });
        // msleep(1000); // 等待 I/O 完成
    } else {
        logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        clearInterval(timeout);
    }
    logger.info('END iteration ' + iteration + ': setInterval', 'TIMERS PHASE');
    iteration++;
}, 0);
logger.info('END', 'MAINLINE');
输出：

1577168519233:INFO: MAINLINE: START
1577168519242:INFO: MAINLINE: END
1577168519243:INFO: MAINLINE MICROTASK: Promise.resolve.then

# 第一次
1577168519243:INFO: TIMERS PHASE: START iteration 0: setInterval
1577168519244:INFO: TIMERS PHASE: END iteration 0: setInterval
## 到这里循环已经结束了

## 这时候 timers 阶段为空, poll 阶段有新事件完成
1577168519245:INFO: POLL PHASE: fs.readdir() callback: Directory contains: 2 files
1577168519245:INFO: POLL PHASE MICROTASK: setInterval.fs.readdir.queueMicrotask
1577168519245:INFO: POLL PHASE MICROTASK: setInterval.fs.readdir.Promise.resolve.then
## 在 poll 阶段结束后马上处理微任务

## poll 转 check 阶段执行 setImmediate 设置的回调
1577168519245:INFO: CHECK PHASE: setInterval.setImmediate
1577168519245:INFO: CHECK PHASE MICROTASK: setInterval.setTimeout.Promise.resolve.then

## 开始新的循环, timers 队列不为空
1577168519246:INFO: TIMERS PHASE: TIMER EXPIRED (from iteration 0): setInterval.setTimeout
1577168519246:INFO: TIMERS PHASE MICROTASK: setInterval.setTimeout.Promise.resolve.then

# 第二次
1577168519246:INFO: TIMERS PHASE: START iteration 1: setInterval
1577168519246:INFO: TIMERS PHASE: END iteration 1: setInterval

1577168519246:INFO: CHECK PHASE: setInterval.setImmediate
1577168519246:INFO: CHECK PHASE MICROTASK: setInterval.setTimeout.Promise.resolve.then

1577168519246:INFO: POLL PHASE: fs.readdir() callback: Directory contains: 2 files
1577168519253:INFO: POLL PHASE MICROTASK: setInterval.fs.readdir.queueMicrotask
1577168519253:INFO: POLL PHASE MICROTASK: setInterval.fs.readdir.Promise.resolve.then

1577168519253:INFO: TIMERS PHASE: TIMER EXPIRED (from iteration 1): setInterval.setTimeout
1577168519253:INFO: TIMERS PHASE MICROTASK: setInterval.setTimeout.Promise.resolve.then

# 第三次退出
1577168519253:INFO: TIMERS PHASE: START iteration 2: setInterval
1577168519253:INFO: TIMERS PHASE: Max interval count exceeded. Goodbye.
1577168519253:INFO: TIMERS PHASE: END iteration 2: setInterval
运行结果的顺序不固定，因为 fs.readdir 需要 I/O 系统调用，需要等待系统的调度，因此等待事件并不固定。

但是顺序仍然是有规律的：

因为 setTimeout 和 setImmediate 在 timers 阶段 (不是 mainline 就行) 被调用，因此 setImmediate 总是比 setTimeout 快 (前面第 5 节已说明)
因为 poll 阶段等待系统调用的时间不确定。因此它会在上面两者之间插空，就是 3 种排序
poll check timers 这种可能比较少，取决于 I/O 调用速度与进程在当前 timers 阶段的处理时间 —— 也就是 I/O 的事件循环进入 poll 阶段前就已经完成，也就是 poll 队列不为空。把上面的 msleep 注释打开即可测试。
check poll timers 这种情况比较多出现。
check timers poll 这种情况也多。
因此存在 3 种顺序。

本文下方链接包含更多例子

timers 阶段和 poll 阶段，因为依赖系统的调度，所以具体在哪一次事件循环执行？这是不确定的，有可能是下次循环就可以，也许需要等待。在上面彩色图的事件循环中黄色标记的阶段中，只剩下 check 阶段是确定的 —— 必然是在本次 (还没到本次循环的 check 阶段的话) 或者下次循环调用。还有的是，微服务是能够保证，必然在本阶段结束后下阶段前执行。

timers 不确定，poll 不确定，check 确定，Microtasks 确定。

8. 题外话：Events
事件是应用程序中发生的重要事件。 诸如 Node 之类的事件驱动的运行时在某些地方发出事件，并在其他地方响应事件。

例子：

// The Node EventEmitter
const EventEmitter = require('events');
// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// The common logger
const logger = require('../common/logger');

logger.info('START', 'MAINLINE');

logger.info('Registering simpleEvent handler', 'MAINLINE');
eventEmitter.on('simpleEvent', (eventName, message, source, timestamp) => {
logger.info('Received event: ' + timestamp + ': ' + source + ':[' + eventName + ']: ' + message, 'EventEmitter.on()');
});

// Get the current time
let hrtime = process.hrtime();
eventEmitter.emit('simpleEvent', 'simpleEvent', 'Custom event says what?', 'MAINLINE', (hrtime[0] * 1e9 + hrtime[1] ) / 1e6);

logger.info('END', 'MAINLINE');
输出：

$ node example7
1530379926998:INFO: MAINLINE: START
1530379927000:INFO: MAINLINE: Registering simpleEvent handler
1530379927000:INFO: EventEmitter.on(): Received event: 553491474.966337: MAINLINE:[simpleEvent]: Custom event says what?
1530379927000:INFO: MAINLINE: END
上面结果看出，Event 是同步，什么时候 emit 就什么时候执行回调。

这些资料是通过必应国际版搜索出来，百度不给力。

原文官方解释

Phases of the Node JS Event Loop

Learn Node.js, Unit 5: The event loop 其他章节:Learn Nodejs

Node Events

————————————————
原文作者：李志成
转自链接：https://learnku.com/articles/38802
版权声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请保留以上作者信息和原文链接。