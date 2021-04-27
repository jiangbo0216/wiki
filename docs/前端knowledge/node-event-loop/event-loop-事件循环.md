# [The Node.js Event Loop](https://nodejs.dev/learn/the-nodejs-event-loop)

<details class="toc" open="" style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; cursor: pointer; margin-bottom: var(--space-24); color: rgb(44, 52, 55); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s;"><h6 style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; display: inline-block; margin: 0px;">TABLE OF CONTENTS</h6></summary><div style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s;"><ul style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-24);"><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#introduction" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">Introduction</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#blocking-the-event-loop" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">Blocking the event loop</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#the-call-stack" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">The call stack</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#a-simple-event-loop-explanation" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">A simple event loop explanation</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#queuing-function-execution" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">Queuing function execution</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#the-message-queue" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">The Message Queue</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="https://nodejs.dev/learn/the-nodejs-event-loop#es6-job-queue" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); cursor: pointer; font-family: var(--sans-serif);">ES6 Job Queue</a></li></ul></div></details>

## Introduction

The **Event Loop** is one of the most important aspects to understand about Node.js.

事件循环是理解Node.js最重要的方面之一。

Why is this so important? Because it explains how Node.js can be asynchronous and have non-blocking I/O, and so it explains basically the "killer app" of Node.js, the thing that made it this successful.

为什么这一点如此重要?因为它解释了Node.js如何可以是异步的并具有非阻塞I/O，所以它基本上解释了Node.js的“杀手级应用”，是什么让它如此成功。

The Node.js JavaScript code runs on a single thread. There is just one thing happening at a time.

Node.js JavaScript代码在单个线程上运行。每次只有一件事发生。

This is a limitation that's actually very helpful, as it simplifies a lot how you program without worrying about concurrency issues.

这是一个非常有帮助的限制，因为它大大简化了您的编程方式，而不必担心并发性问题。

You just need to pay attention to how you write your code and avoid anything that could block the thread, like synchronous network calls or infinite loops.

您只需要注意如何编写代码，并避免任何可能阻塞线程的内容，如同步网络调用或无限循环。

In general, in most browsers there is an event loop for every browser tab, to make every process isolated and avoid a web page with infinite loops or heavy processing to block your entire browser.

一般来说，在大多数浏览器中，每个浏览器选项卡都有一个事件循环，以使每个进程隔离，避免使用无限循环或繁重的处理来阻塞整个浏览器。

The environment manages multiple concurrent event loops, to handle API calls for example. Web Workers run in their own event loop as well.

该环境管理多个并发事件循环，例如处理API调用。Web工作者也在自己的事件循环中运行。

You mainly need to be concerned that *your code* will run on a single event loop, and write code with this thing in mind to avoid blocking it.

您主要需要关注的是*您的代码*将运行在单个事件循环上，并在编写代码时记住这一点，以避免阻塞它。

## Blocking the event loop

Any JavaScript code that takes too long to return back control to the event loop will block the execution of any JavaScript code in the page, even block the UI thread, and the user cannot click around, scroll the page, and so on.

任何JavaScript代码如果太长时间无法将控制权返回到事件循环，就会阻塞页面中的任何JavaScript代码的执行，甚至阻塞UI线程，用户也无法点击、滚动页面，等等。

Almost all the I/O primitives in JavaScript are non-blocking. Network requests, filesystem operations, and so on. Being blocking is the exception, and this is why JavaScript is based so much on callbacks, and more recently on promises and async/await.

JavaScript中几乎所有的I/O原语都是非阻塞的。网络请求、文件系统操作等等。阻塞是一个异常，这就是为什么JavaScript如此多地基于回调，最近更多地基于promise和async/await

## The call stack

The call stack is a LIFO (Last In, First Out) stack.

调用堆栈是LIFO(后进先出)堆栈。

The event loop continuously checks the **call stack** to see if there's any function that needs to run.

事件循环不断地检查**调用堆栈**，看是否有任何函数需要运行。

While doing so, it adds any function call it finds to the call stack and executes each one in order.

在此过程中，它将找到的任何函数调用添加到调用堆栈中，并按顺序执行每个函数调用

You know the error stack trace you might be familiar with, in the debugger or in the browser console? The browser looks up the function names in the call stack to inform you which function originates (起源于) the current call:

您知道调试器或浏览器控制台中您可能很熟悉的错误堆栈跟踪吗?浏览器查找调用堆栈中的函数名告诉你哪个函数产生当前的调用:

[![Exception call stack](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/exception-call-stack.png)](https://nodejs.dev/static/e4594b6135efd353b44770f748fdccd5/1b853/exception-call-stack.png)

## A simple event loop explanation

Let's pick an example:

```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  bar()
  baz()
}

foo()
```

When this code runs, first `foo()` is called. Inside `foo()` we first call `bar()`, then we call `baz()`.

当这段代码运行时，首先调用' foo() '。在' foo() '中，我们首先调用' bar() '，然后调用' baz() '。

At this point the call stack looks like this:

此时，调用堆栈看起来是这样的:

[![Call stack first example](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/call-stack-first-example.png)](https://nodejs.dev/static/270ebeb6dbfa7d613152b71257c72a9e/11a8f/call-stack-first-example.png)

The event loop on every iteration (迭代) looks if there's something in the call stack, and executes it:

[![Execution order first example](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/execution-order-first-example.png)](https://nodejs.dev/static/ca404c319c6fc595497d5dc097d469ff/fc1a1/execution-order-first-example.png)

until the call stack is empty.

## Queuing function execution

The above example looks normal, there's nothing special about it: JavaScript finds things to execute, runs them in order.

上面的例子看起来很普通，没有什么特别的:JavaScript找到要执行的东西，并按顺序运行它们。

Let's see how to defer a function until the stack is clear.

让我们看看如何推迟一个函数，直到堆栈被清除。

The use case of `setTimeout(() => {}, 0)` is to call a function, but execute it once every other function in the code has executed.

Take this example:

```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  baz()
}

foo()
```

This code prints, maybe surprisingly:

```bash
foo
baz
bar
```

When this code runs, first foo() is called. Inside foo() we first call setTimeout, passing `bar` as an argument, and we instruct it to run immediately as fast as it can, passing 0 as the timer. Then we call baz().

当这段代码运行时，首先调用foo()。在foo()中，我们首先调用setTimeout，传递' bar '作为参数，然后指示它尽快运行，传递0作为计时器。然后我们调用baz()。

At this point the call stack looks like this:

此时，调用堆栈看起来是这样的:

[![Call stack second example](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/call-stack-second-example.png)](https://nodejs.dev/static/be55515b9343074d00b43de88c495331/966a0/call-stack-second-example.png)

Here is the execution order for all the functions in our program:

[![Execution order second example](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/execution-order-second-example.png)](https://nodejs.dev/static/585ff3207d814911a7e44d55fbde483b/f96db/execution-order-second-example.png)

Why is this happening?

## The Message Queue

When setTimeout() is called, the Browser or Node.js starts the timer. Once the timer expires, in this case immediately as we put 0 as the timeout, the callback function is put in the **Message Queue**.

当setTimeout()被调用时，浏览器或Node.js启动计时器。一旦计时器过期，在本例中，当我们将0作为超时时间时，回调函数将被放入**消息队列**。

The Message Queue is also where user-initiated events like click or keyboard events, or fetch responses are queued before your code has the opportunity to react to them. Or also DOM events like `onLoad`.

消息队列也是在您的代码有机会对用户发起的事件(如单击或键盘事件)或获取响应进行响应之前排队的地方。或者像' onLoad '这样的DOM事件。

**The loop gives priority to the call stack, and it first processes everything it finds in the call stack, and once there's nothing in there, it goes to pick up things in the message queue.**

**循环优先处理调用堆栈，它首先处理在调用堆栈中找到的所有东西，一旦那里没有任何东西，它就去捡消息队列中的东西**

We don't have to wait for functions like `setTimeout`, fetch or other things to do their own work, because they are provided by the browser, and they live on their own threads. For example, if you set the `setTimeout` timeout to 2 seconds, you don't have to wait 2 seconds - the wait happens elsewhere.

我们不需要等待像' setTimeout '、fetch或其他函数来完成它们自己的工作，因为它们是由浏览器提供的，并且它们生活在自己的线程中。例如，如果你设置' setTimeout '超时为2秒，你不必等待2秒-等待发生在其他地方。

## ES6 Job Queue

ECMAScript 2015 introduced the concept of the Job Queue, which is used by Promises (also introduced in ES6/ES2015). It's a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.

ECMAScript 2015引入了作业队列的概念，它被许诺使用(也在ES6/ES2015中引入)。这是一种尽可能快地执行异步函数结果的方法，而不是将其放在调用堆栈的末尾。

Promises that resolve before the current function ends will be executed right after the current function.

Promise在当前函数结束前解析将在当前函数结束后执行。

I find nice the analogy of a rollercoaster ride at an amdusement park: the message queue puts you at the back of the queue, behind all the other people, where you will have to wait for your turn, while the job queue is the fastpass ticket that lets you take another ride right after you finished the previous one.

我觉得用坐过山车来比喻很不错:消息队列让你在队列所有其他的人的后面,你将不得不等待轮到你,作业队列是fastpass票让你完成了前一个再次乘坐一次。

Example:

```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('should be right after baz, before bar')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()
```

That's a big difference between Promises (and Async/await, which is built on promises) and plain old asynchronous functions through `setTimeout()` or other platform APIs.

这是promise(以及基于promise构建的Async/await)和通过' setTimeout() '或其他平台api构建的普通老式异步函数之间的巨大区别。

Finally, here's what the call stack looks like for the example above:

![Call stack third example](event-loop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-imgs/call-stack-third-example.svg)
