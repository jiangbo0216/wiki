# [Tapable](https://github.com/webpack/tapable)

参考:

* <https://juejin.cn/post/6844903895584473096#heading-12>

The tapable package expose many Hook classes, which can be used to create hooks for plugins.

```
const {
 SyncHook,
 SyncBailHook,
 SyncWaterfallHook,
 SyncLoopHook,
 AsyncParallelHook,
 AsyncParallelBailHook,
 AsyncSeriesHook,
 AsyncSeriesBailHook,
 AsyncSeriesWaterfallHook
 } = require("tapable");
```

## Installation

```
npm install --save tapable
```

## Usage

### SyncHook

All Hook constructors take one optional argument, which is a list of argument names as strings.

表示这个勾子在调用的时候可能会传递3个参数, 支持自定义参数个数

```
const hook = new SyncHook(["arg1", "arg2", "arg3"]);
```

这就是经典的事件注册和触发机制. 在实际使用的时候, 声明事件和触发事件的代码在一个类中, 注册事件的的代码在另一个类中

钩子的使用基本就是这个意思，Car中只负责声明和调用钩子，真正的执行逻辑，不再Car中，而是在注册它的index.js之中，是在Car之外。这样就做到了很好的解耦。同时还能做到控制什么时候触发这个事件, 触发的事件给了更大的自由度

The best practice is to expose all hooks of a class in a `hooks` property:

```
class Car {
 constructor() {
  this.hooks = {
   accelerate: new SyncHook(["newSpeed"]),
   brake: new SyncHook(),
   calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
  };
 }

 /* ... */
}
```

Other people can now use these hooks:

```
const myCar = new Car();

// Use the tap method to add a consument
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
```

It's required to pass a name to identify the plugin/reason.

You may receive arguments:

```
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
```

For sync hooks, `tap` is the only valid method to add a plugin. Async hooks also support async plugins:

使用 `tap` 注册事件

```
myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
 // return a promise
 return google.maps.findRoute(source, target).then(route => {
  routesList.add(route);
 });
});
myCar.hooks.calculateRoutes.tapAsync("BingMapsPlugin", (source, target, routesList, callback) => {
 bing.findRoute(source, target, (err, route) => {
  if(err) return callback(err);
  routesList.add(route);
  // call the callback
  callback();
 });
});

// You can still use sync plugins
myCar.hooks.calculateRoutes.tap("CachedRoutesPlugin", (source, target, routesList) => {
 const cachedRoute = cache.get(source, target);
 if(cachedRoute)
  routesList.add(cachedRoute);
})
```

The class declaring these hooks need to call them:

声明和触发事件

```
class Car {
 /**
   * You won't get returned value from SyncHook or AsyncParallelHook,
   * to do that, use SyncWaterfallHook and AsyncSeriesWaterfallHook respectively
  **/

 setSpeed(newSpeed) {
  // following call returns undefined even when you returned values
  this.hooks.accelerate.call(newSpeed);
 }

 useNavigationSystemPromise(source, target) {
  const routesList = new List();
  return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
   // res is undefined for AsyncParallelHook
   return routesList.getRoutes();
  });
 }

 useNavigationSystemAsync(source, target, callback) {
  const routesList = new List();
  this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
   if(err) return callback(err);
   callback(null, routesList.getRoutes());
  });
 }
}
```

The Hook will compile a method with the most efficient way of running your plugins. It generates code depending on:

* The number of registered plugins (none, one, many)
* The kind of registered plugins (sync, async, promise)
* The used call method (sync, async, promise)
* The number of arguments
* Whether interception is used

This ensures fastest possible execution.

## SyncBailHook

对于 SyncHook , 注册的事件是一个顺序执行的函数数组

我们使用 SyncBailHook 中断注册事件的执行

```js

import { SyncHook, SyncBailHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      start: new SyncHook(),
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncBailHook(), // 这里我们要使用SyncBailHook钩子啦
    };
  }

  start() {
    this.hooks.start.call();
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }
}

```

我们现在要满足这样一个需求，不管你注册多少插件，我只想被刹两次，就不通知别的插件了。这时候就SyncBailHook就可以，代码如下：

```js
import Car from './Car';

const car = new Car();
car.hooks.brake.tap('brakePlugin1', () => console.log(`刹车1`));
// 只需在不想继续往下走的插件return非undefined即可。
car.hooks.brake.tap('brakePlugin2', () => { console.log(`刹车2`); return 1; }); 
car.hooks.brake.tap('brakePlugin3', () => console.log(`刹车3`));

car.brake(); // 只会打印‘刹车1’‘刹车2’

```

SyncBailHook就是根据每一步返回的值来决定要不要继续往下走，如果return了一个非undefined的值 那就不会往下走，注意 如果什么都不return 也相当于return了一个undefined。

由此推测，tabable提供各类钩子，目的是处理这些外部插件的关系。

## SyncWaterfallHook

对比SyncHook, 我们想要希望这个顺序执行的函数数组, 每一次执行都依赖上一步的返回结果

```js
import { SyncHook, SyncBailHook, SyncWaterfallHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      start: new SyncHook(),
      accelerate: new SyncWaterfallHook(["newSpeed"]), // 重点在这里
      brake: new SyncBailHook(),
    };
  }

  start() {
    this.hooks.start.call();
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }
}

```

```js

// index.js
import Car from './Car';

const car = new Car();
car.hooks.accelerate.tap('acceleratePlugin1', (speed) => { console.log(`加速到${speed}`); return speed + 100; });
car.hooks.accelerate.tap('acceleratePlugin2', (speed) => { console.log(`加速到${speed}`); return speed + 100; });
car.hooks.accelerate.tap('acceleratePlugin3', (speed) => { console.log(`加速到${speed}`); });

car.accelerate(50); // 打印‘加速到50’‘加速到150’‘加速到250’

```

### SyncLoopHook

SyncLoopHook是同步的循环钩子，它的插件如果返回一个非undefined。就会一直执行这个插件的回调函数，直到它返回undefined。

我们把start的钩子改成SyncLoopHook。

```js
import { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      start: new SyncLoopHook(), // 重点看这里
      accelerate: new SyncWaterfallHook(["newSpeed"]),
      brake: new SyncBailHook(),
    };
  }

  start() {
    this.hooks.start.call();
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }
}

```

```js
// index.js
import Car from './Car';

let index = 0;
const car = new Car();
car.hooks.start.tap('startPlugin1', () => {
  console.log(`启动`);
  if (index < 5) {
    index++;
    return 1;
  }
}); // 这回我们得到一辆破车，启动6次才会启动成功。

car.hooks.start.tap('startPlugin2', () => {
  console.log(`启动成功`);
});

car.start(); // 打印‘启动’6次，打印‘启动成功’一次。
```

### AsyncParallelHook

支持回调和promise的写法

AsyncParallelHook处理异步并行执行的插件。
我们在Car类中添加calculateRoutes，使用AsyncParallelHook。再写一个calculateRoutes方法，调用callAsync方法时会触发钩子执行。这里可以传递一个回调，当所有插件都执行完毕的时候，被调用。

```js
// Car.js
import {
  ...
  AsyncParallelHook,
} from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      ...
      calculateRoutes: new AsyncParallelHook(),
    };
  }

  ...
  
  calculateRoutes(callback) {
    this.hooks.calculateRoutes.callAsync(callback);
  }
}

```

### AsyncParallelBailHook

回调  callback(null ,1); // 第一个参数是err, 这里传递个1，第二个参数传递result

时, 会发生Bail

```js
// index.js
import Car from './Car';

const car = new Car();
car.hooks.calculateRoutes.tapAsync('calculateRoutesPlugin1', (callback) => {
  setTimeout(() => {
    console.log('计算路线1');
    callback();
  }, 1000);
});

car.hooks.calculateRoutes.tapAsync('calculateRoutesPlugin2', (callback) => {
  setTimeout(() => {
    console.log('计算路线2');
    callback();
  }, 2000);
});

car.calculateRoutes(() => { console.log('最终的回调'); }); // 会在1s的时候打印‘计算路线1’。2s的时候打印‘计算路线2’。紧接着打印‘最终的回调’
```

我觉得AsyncParallelHook的精髓就在于这个最终的回调。当所有的异步任务执行结束后，再最终的回调中执行接下来的代码。可以确保所有的插件的代码都执行完毕后，再执行某些逻辑。如果不需要这个最终的回调来执行某些代码，那使用SyncHook就行了啊，反正你又不关心插件中的代码什么时候执行完毕。

### AsyncSeriesHook

对比SyncHook, 我们想要希望顺序执行的异步的函数数组

```js
// Car.js
import {
  AsyncSeriesHook,
} from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncSeriesHook(),
    };
  }

  calculateRoutes() {
    return this.hooks.calculateRoutes.promise();
  }
}

```

```js
// index.js
import Car from './Car';

const car = new Car();
car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin1', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('计算路线1');

      resolve();
    }, 1000);
  });
});

car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin2', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('计算路线2');
      resolve();
    }, 2000);
  });
});

car.calculateRoutes().then(() => { console.log('最终的回调'); });
// 1s过后，打印计算路线1，再过2s（而不是到了第2s，而是到了第3s），打印计算路线2，再立马打印最终的回调。

```

### AsyncSeriesBailHook

串行执行，并且只要一个插件有返回值，立马调用最终的回调，并且不会继续执行后续的插件。

```js

// Car.js
import {
  AsyncSeriesBailHook,
} from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncSeriesBailHook(),
    };
  }

  calculateRoutes() {
    return this.hooks.calculateRoutes.promise();
  }
}

```

```js
// index.js
import Car from './Car';

const car = new Car();
car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin1', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('计算路线1');

      resolve(1);
    }, 1000);
  });
});

car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin2', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('计算路线2');
      resolve(2);
    }, 2000);
  });
});

car.calculateRoutes().then(() => { console.log('最终的回调'); });
// 1s过后，打印计算路线1，立马打印最终的回调，不会再执行计算路线2了。

```

### AsyncSeriesWaterfallHook

串行执行，并且前一个插件的返回值，会作为后一个插件的参数。

## Hook types

Each hook can be tapped with one or several functions. How they are executed depends on the hook type:

* Basic hook (without “Waterfall”, “Bail” or “Loop” in its name). This hook simply calls every function it tapped in a row.
* **Waterfall**. A waterfall hook also calls each tapped function in a row. Unlike the basic hook, it passes a return value from each function to the next function.
* **Bail**. A bail hook allows exiting early. When any of the tapped function returns anything, the bail hook will stop executing the remaining ones.
* **Loop**. TODO

Additionally, hooks can be synchronous or asynchronous. To reflect this, there’re “Sync”, “AsyncSeries”, and “AsyncParallel” hook classes:

* **Sync**. A sync hook can only be tapped with synchronous functions (using `myHook.tap()`).
* **AsyncSeries**. An async-series hook can be tapped with synchronous, callback-based and promise-based functions (using `myHook.tap()`, `myHook.tapAsync()` and `myHook.tapPromise()`). They call each async method in a row.
* **AsyncParallel**. An async-parallel hook can also be tapped with synchronous, callback-based and promise-based functions (using `myHook.tap()`, `myHook.tapAsync()` and `myHook.tapPromise()`). However, they run each async method in parallel.

The hook type is reflected in its class name. E.g., `AsyncSeriesWaterfallHook` allows asynchronous functions and runs them in series, passing each function’s return value into the next function.

## Interception

All Hooks offer an additional interception API:

```
myCar.hooks.calculateRoutes.intercept({
 call: (source, target, routesList) => {
  console.log("Starting to calculate routes");
 },
 register: (tapInfo) => {
  // tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
  console.log(`${tapInfo.name} is doing its job`);
  return tapInfo; // may return a new tapInfo object
 }
})
```

**call**: `(...args) => void` Adding `call` to your interceptor will trigger when hooks are triggered. You have access to the hooks arguments.

**tap**: `(tap: Tap) => void` Adding `tap` to your interceptor will trigger when a plugin taps into a hook. Provided is the `Tap` object. `Tap` object can't be changed.

**loop**: `(...args) => void` Adding `loop` to your interceptor will trigger for each loop of a looping hook.

**register**: `(tap: Tap) => Tap | undefined` Adding `register` to your interceptor will trigger for each added `Tap` and allows to modify it.

## Context

Plugins and interceptors can opt-in to access an optional `context` object, which can be used to pass arbitrary values to subsequent plugins and interceptors.

```
myCar.hooks.accelerate.intercept({
 context: true,
 tap: (context, tapInfo) => {
  // tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
  console.log(`${tapInfo.name} is doing it's job`);

  // `context` starts as an empty object if at least one plugin uses `context: true`.
  // If no plugins use `context: true`, then `context` is undefined.
  if (context) {
   // Arbitrary properties can be added to `context`, which plugins can then access.
   context.hasMuffler = true;
  }
 }
});

myCar.hooks.accelerate.tap({
 name: "NoisePlugin",
 context: true
}, (context, newSpeed) => {
 if (context && context.hasMuffler) {
  console.log("Silence...");
 } else {
  console.log("Vroom!");
 }
});
```

## webpack 插件封装

我们将注册插件的逻辑单独封装出来，如下：

```
export default class CalculateRoutesPlugin {
  // 调用apply方法就可以完成注册
  apply(car) {
    car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin', (result) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('计算路线1', result);

          resolve('北京');
        }, 1000);
      });
    });
  }
}

```

在index.js中调用：

```
// index.js
import Car from './Car';
import CalculateRoutesPlugin from './CalculateRoutesPlugin';
const car = new Car();
const calculateRoutesPlugin = new CalculateRoutesPlugin();

calculateRoutesPlugin.apply(car); // 此节重点逻辑

car.calculateRoutes().then(() => { console.log('最终的回调'); });
// 运行正常，会打印'计算路线1'

```

看到这里，代码和Webpack的使用方式就差不多了，car类似Webpack中的Compiler/Compilation。index.js比作是Webpack的运行类，使用我们的Car（类比Compiler/Compilation），使用注入来的CalculateRoutesPlugin（类比Webpack的各种插件）。完成打包工作。

# Tapable

tapable的readme中没有介绍一个类，就是Tapable，但是是可以使用到的，如下

```
const {
  Tapable
} = require("tapable");
 
export default class Car extends Tapable {
    ...
}
复制代码
```

如果看tapable源码的话，看不到这个类，但是切换到tapable-1分支，可以看到。

在Webpack源码中，Compiler和Compilation都和上面的Car一样，继承自Tapable。

那Tapable究竟干了啥啊，看了一下它源码，发现它啥也没干，就是一个标志，表示我这个类是一个可以注册插件的类。

虽然没有什么增强的功能，但是此时的Car有了两个限制。如下：

```
const car = new Car();
car.apply(); // 报错  Tapable.apply is deprecated. Call apply on the plugin directly instead
car.plugin(); // 报错 Tapable.plugin is deprecated. Use new API on `.hooks` instead
复制代码
```

这两个方法不让用了，我理解是为Webpack而做的限制，提醒插件作者升级自己的插件，使用最新的实践。

# 钩子类型（Hook Types）

上面我们研究了钩子们的使用，接下来做一些总结。首先来说钩子的类型。

## 按被注册插件们的执行逻辑来分钩子

1. 基本钩子。注册的插件顺序执行。如SyncHook、AsyncParallelHook、AsyncSeriesHook。
2. 瀑布流钩子。前一个插件的返回值，是后一个插件的入参。如SyncWaterfallHook，AsyncSeriesWaterfallHook。
3. Bail钩子。Bail钩子是指一个插件返回非undefined的值，就不继续执行后续的插件。我理解这里Bail是取迅速离开的意思。如：SyncBailHook，AsyncSeriesBailHook
4. 循环钩子。循环调用插件，直到插件的返回值是undefined。如SyncLoopHook。

## 按时序来区分钩子

1. 同步钩子。Sync开头的钩子
2. 异步串行钩子。AsyncSeries开头的钩子。
3. 异步并行钩子。AsyncParallel开头的钩子。

# 拦截器（Interception）

我们还可以为钩子添加拦截器。 一个插件从对钩子注册，到钩子调用，再到插件响应。我们都可以通过拦截器监听到。

```
car.hooks.calculateRoutes.intercept({
  call: (...args) => {
    console.log(...args, 'intercept call');
  }, // 插件被call时响应。
  //
  register: (tap) => {
    console.log(tap, 'ntercept register');

    return tap;
  },// 插件用tap方法注册时响应。
  loop: (...args) => {
    console.log(...args, 'intercept loop')
  },// loop hook的插件被调用时响应。
  tap: (tap) => {
    console.log(tap, 'intercept tap')
  } // hook的插件被调用时响应。
})
复制代码
```

# 上下文（Context）

插件和拦截器都可以往里面传一个上下文对象的参数，该对象可用于向后续插件和拦截器传递任意值。

```
myCar.hooks.accelerate.intercept({
 context: true, // 这里配置启用上下文对象
 tap: (context, tapInfo) => {
  if (context) { // 这里就可以拿到上下文对象
   context.hasMuffler = true;
  }
 }
});

myCar.hooks.accelerate.tap({
 name: "NoisePlugin",
 context: true
}, (context, newSpeed) => {
    // 这里可以拿到拦截器里的上下文对象，然后我们在插件里利用它的值做相应操作。
 if (context && context.hasMuffler) {
  console.log("Silence...");
 } else {
  console.log("Vroom!");
 }
});
复制代码
```

# 结束语

tapable的简单使用，就研究到这里。它为插件机制提供了很强大的支持，不但让我们对主体（Car）注册各种插件，还能控制插件彼此的关系，控制自身相应的时机。

在Webpack中使用这样的库，再合适不过，Webpack是一个插件的集合，通过tapable，有效的将插件们组织起来，在合理的时机，合理的调用。
