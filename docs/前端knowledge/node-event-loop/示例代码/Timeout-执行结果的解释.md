<https://juejin.cn/post/6844903904958742535#heading-2>

浏览器环境
在浏览器中，JavaScript 执行为单线程（不考虑 web worker），所有代码均在主线程调用栈完成执行。当主线程任务清空后才会去轮循任务队列中的任务。
异步任务分为 task（宏任务，也可以被称为 macrotask）和 microtask（微任务）两类。关于事件循环的权威定义可以在 HTML 规范文档中查到：html.spec.whatwg.org/multipage/w…
当满足执行条件时，task 和 microtask 会被放入各自的队列中，等待进入主线程执行，这两个队列被称为 task queue（或 macrotask queue）和 microtask queue。

task：包括 script 中的代码、setTimeout、setInterval、I/O、UI render
microtask：包括 promise、Object.observe、MutationObserver

不过，正如规范强调的，这里的 task queue 并非是队列，而是集合（sets），因为事件循环的执行规则是执行第一个可执行的任务，而不是将第一个任务出队并执行。
详细的执行规则可以在 html.spec.whatwg.org/multipage/w… 查询，一共有 15 个步骤。
可以将执行步骤不严谨的归纳为：

执行完主线程中的任务
清空 microtask queue 中的任务并执行完毕
取出 macrotask queue 中的一个任务执行
清空 microtask queue 中的任务并执行完毕
重复 3、4

进一步归纳，就是：一个宏任务，所有微任务；一个宏任务，所有微任务...

以下的解释与实际结果不符
来自<<深入浅出nodejs>>
在具体实现上, process.nextTick 的回调函数保存在一个数组中, setImmediate 回调函数是保存在链表中, 每一轮事件循环中执行链表的第一个回调函数
