## Fundamentals

### What is the Call Stack and is it part of V8?

The Call Stack is definitely part of V8. It is the data structure that V8 uses to keep track of function invocations. Every time we invoke a function, V8 places a reference to that function on the call stack and it keeps doing so for each nested invocation of other functions. This also includes functions that call themselves recursively.

When the nested invocations of functions reaches an end, V8 will **pop** one function at a time and use its returned value in its place.

**Why is this important to understand for Node?** Because you only get ONE Call Stack per Node process. If you keep that Call Stack busy, your whole Node process is busy. Keep that in mind.

### What is the Event Loop? Is it part of V8?

The event loop is provided by the **libuv** library. It is not part of V8.

The Event Loop is the entity that handles external events and converts them into callback invocations. It is a loop that picks events from the event queues and pushes their callbacks into the Call Stack. It is also a multi-phase loop.

The Event Loop is part of a bigger picture that you need to understand first in order to understand the Event Loop. You need to understand the role of V8, know about the Node APIs, and know how things get queued to be executed by V8.

The Node API hosts functions like `setTimeout` or `fs.readFile.` These are not part of JavaScript itself. They are just functions provided by Node.

The Event Loop sits in the middle between V8’s Call Stack and the different phases and callback queues and it acts like an organizer. When the V8 Call Stack is empty, the event loop can decide what to execute next.





### What will Node do when the Call Stack and the event loop queues are all empty?

It will simply exit.

When you run a Node program, Node will automatically start the event loop and when that event loop is idle and has nothing else to do, the process will exit.

To keep a Node process running, you need to place something somewhere in event queues. For example, when you start a timer or an HTTP server you are basically telling the event loop to keep running and checking on these events.

### Besides V8 and libuv, what other external dependencies does Node have?

The following are all separate libraries that a Node process can use:

- http-parser
- c-ares
- OpenSSL
- zlib

All of them are external to Node. They have their own source code. They also have their own license. Node just uses them.

You want to remember that because you want to know where your program is running. If you are doing something with data compression, you might encounter trouble deep in the zlib library stack. You might be fighting a zlib bug. Do not blame everything on Node.





### How come top-level variables are not global?

If you have `module1` that defines a top-level variable `g`:

module1.js

```
var g = 42;
```

And you have `module2` that requires `module1` and try to access the variable g, you would get `g is not defined.`

**Why??** If you do the same in a browser, you can access top-level defined variables in all scripts included after their definition.

Every Node file gets its own **IIFE** (Immediately Invoked Function Expression) behind the scenes. All variables declared in a Node file are scoped to that IIFE.





### When is it okay to use the file system `*Sync` methods (like `readFileSync`)

Every `fs` method in Node has a synchronous version. Why would you use a sync method instead of the async one?

Sometimes using the sync method is fine. For example, it can be used in any initializing step while the server is still loading. It is often the case that everything you do after the initializing step depends on the data you obtain there. Instead of introducing a callback-level, using synchronous methods is acceptable as long as what you use the synchronous methods for is a one-time thing.

However, if you are using synchronous methods inside a handler like an HTTP server on-request callback, that would simply be 100% wrong. Do not do that.