# Differences between Node.js and the Browser

Both the browser and Node.js use JavaScript as their programming language.

浏览器和Node.js都使用JavaScript作为它们的编程语言。

Building apps that run in the browser is a completely different thing than building a Node.js application.

构建在浏览器中运行的应用程序与构建Node.js应用程序是完全不同的事情

Despite the fact that it's always JavaScript, there are some key differences that make the experience radically different.

尽管它总是使用JavaScript，但还是有一些关键的不同之处使体验截然不同。

From the perspective of a frontend developer who extensively (广大地) uses JavaScript, Node.js apps bring with them a huge advantage: the comfort of programming everything - the frontend and the backend - in a single language.

从一个广泛使用JavaScript的前端开发人员的角度来看，Node.js应用程序带来了一个巨大的优势:用一种语言编程的舒适性——前端和后端。

You have a huge opportunity because we know how hard it is to fully, deeply learn a programming language, and by using the same language to perform all your work on the web - both on the client and on the server, you're in a unique position of advantage.

你有一个巨大的机会，因为我们知道完全地、深入地学习一种编程语言是多么困难，通过使用同一种语言在web上执行所有的工作——无论是在客户端还是在服务器上，你处于一个独特的优势地位。

What changes is the ecosystem.

改变的是生态系统。

In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies. Those do not exist in Node.js, of course. You don't have the `document`, `window` and all the other objects that are provided by the browser.

在浏览器中，您所做的大部分时间都是与DOM或其他Web平台api(如cookie)交互。当然，这些在Node.js中并不存在。你没有“文档”、“窗口”和浏览器提供的所有其他对象。

And in the browser, we don't have all the nice APIs that Node.js provides through its modules, like the filesystem access functionality.

在浏览器中，我们没有Node.js通过模块提供的所有api，比如文件系统访问功能。

Another big difference is that in Node.js you control the environment. Unless you are building an open source application that anyone can deploy anywhere, you know which version of Node.js you will run the application on. Compared to the browser environment, where you don't get the luxury to choose what browser your visitors will use, this is very convenient.

另一个很大的区别是，在Node.js中，您可以控制环境。除非您正在构建一个任何人都可以部署到任何地方的开源应用程序，否则您应该知道将在哪个版本的Node.js上运行应用程序。与浏览器环境相比，在浏览器环境中，您无法奢侈地选择访问者将使用的浏览器，这是非常方便的。

This means that you can write all the modern ES6-7-8-9 JavaScript that your Node.js version supports.

这意味着你可以编写Node.js版本支持的所有现代ES6-7-8-9 JavaScript。

Since JavaScript moves so fast, but browsers can be a bit slow to upgrade, sometimes on the web you are stuck with using older JavaScript / ECMAScript releases.

由于JavaScript的发展速度非常快，但浏览器的升级速度可能有点慢，所以有时在web上，您不得不使用旧版本的JavaScript / ECMAScript。

You can use Babel to transform your code to be ES5-compatible before shipping it to the browser, but in Node.js, you won't need that.

在将代码发布到浏览器之前，您可以使用Babel将代码转换为与es5兼容的，但在Node.js中，您不需要这样做。

Another difference is that Node.js uses the CommonJS module system, while in the browser we are starting to see the ES Modules standard being implemented.

另一个区别是Node.js使用的是CommonJS模块系统，而在浏览器中我们开始看到ES模块标准的实现。

In practice, this means that for the time being you use `require()` in Node.js and `import` in the browser.

在实践中，这意味着你暂时在Node.js中使用' require() '，在浏览器中使用' import '。