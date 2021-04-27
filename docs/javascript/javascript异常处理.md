已剪辑自: https://juejin.im/post/5cc15de5e51d456e68659340

## 引入

我们都知道 try catch 无法捕获 setTimeout 异步任务中的错误，那其中的原因是什么。以及异步代码在 js 中是特别常见的，我们该怎么做才比较？

## 无法捕获的情况

```
function main() {
  try {
    setTimeout(() => {
      throw new Error('async error')
    }, 1000)
  } catch(e) {
    console.log(e, 'err')
    console.log('continue...')
  }
}

main();

```

这段代码中，setTimeout 的回调函数抛出一个错误，并不会在 catch 中捕获，会导致程序直接报错崩掉。

所以说在 js 中 try catch 并不是说写上一个就可以高枕无忧了。难道每个函数都要写吗， 那什么情况下 try catch 无法捕获 error 呢？

### 异步任务

- 宏任务的回调函数中的错误无法捕获

  上面的栗子稍微改一下，主任务中写一段 try catch，然后调用异步任务 task，task 会在一秒之后抛出一个错误。

  ```
  // 异步任务
  const task = () => {
    setTimeout(() => {
     throw new Error('async error')
   }, 1000)
  }
  // 主任务
  function main() {
    try {
      task();
    } catch(e) {
      console.log(e, 'err')
      console.log('continue...')
    }
  }
  
  
  ```

  这种情况下 main 是无法 catch error 的，这跟浏览器的执行机制有关。异步任务由 eventloop 加入任务队列，并取出入栈(js 主进程)执行，而当 task 取出执行的时候， main 的栈已经退出了，也就是上下文环境已经改变，所以 main 无法捕获 task 的错误。

  事件回调，请求回调同属 tasks，所以道理是一样的。eventloop 复习可以看这篇[文章](https://github.com/sunyongjian/blog/issues/38)

- 微任务（promise）的回调

  ```
  // 返回一个 promise 对象
  const promiseFetch = () => 
    new Promise((reslove) => {
    reslove();
  })
  
  function main() {
    try {
      // 回调函数里抛出错误
      promiseFetch().then(() => {
        throw new Error('err')
      })
    } catch(e) {
      console.log(e, 'eeee');
      console.log('continue');
    }
  }
  
  ```

  promise 的任务，也就是 then 里面的回调函数，抛出错误同样也无法 catch。因为微任务队列是在两个 task 之间清空的，所以 then 入栈的时候，main 函数也已经出栈了。

### 并不是回调函数无法 try catch

很多人可能有一个误解，因为大部分遇到无法 catch 的情况，都发生在回调函数，就认为回调函数不能 catch。

不全对，看一个最普通的栗子。

```
// 定义一个 fn，参数是函数。
const fn = (cb: () => void) => {
  cb();
};

function main() {
  try {
    // 传入 callback，fn 执行会调用，并抛出错误。
    fn(() => {
      throw new Error('123');
    })
  } catch(e) {
    console.log('error');
  }
}
main();

```

结果当然是可以 catch 的。因为 callback 执行的时候，跟 main 还在同一次事件循环中，即一个 eventloop tick。所以上下文没有变化，错误是可以 catch 的。 根本原因还是同步代码，并没有遇到异步任务。

## promise 的异常捕获

#### 构造函数

先看两段代码：

```
function main1() {
  try {
    new Promise(() => {
      throw new Error('promise1 error')
    })
  } catch(e) {
    console.log(e.message);
  }
}

function main2() {
  try {
    Promise.reject('promise2 error');
  } catch(e) {
    console.log(e.message);
  }
}


```

以上两个 try catch 都不能捕获到 error，因为 promise 内部的错误不会冒泡出来，而是被 promise 吃掉了，只有通过 promise.catch 才可以捕获，所以用 Promise 一定要写 catch 啊。

然后我们再来看一下使用 promise.catch 的两段代码：

```
// reject
const p1 = new Promise((reslove, reject) => {
  if(1) {
    reject();
  }
});
p1.catch((e) => console.log('p1 error'));

// throw new Error
const p2 = new Promise((reslove, reject) => {
  if(1) {
    throw new Error('p2 error')
  }
});

p2.catch((e) => console.log('p2 error'));

```

promise 内部的无论是 reject 或者 throw new Error，都可以通过 catch 回调捕获。

这里要跟我们最开始微任务的栗子区分，promise 的微任务指的是 then 的回调，而此处是 Promise 构造函数传入的第一个参数，new Promise 是同步执行的。

#### then

那 then 之后的错误如何捕获呢。

```
function main3() {
  Promise.resolve(true).then(() => {
    try {
      throw new Error('then');
    } catch(e) {
      return e;
    }
  }).then(e => console.log(e.message));
}

```

只能是在回调函数内部 catch 错误，并把错误信息返回，error 会传递到下一个 then 的回调。

#### 用 Promise 捕获异步错误

```
const p3 = () =>  new Promise((reslove, reject) => {
  setTimeout(() => {
    reject('async error');
  })
});

function main3() {
  p3().catch(e => console.log(e));
}
main3();

```

把异步操作用 Promise 包装，通过内部判断，把错误 reject，在外面通过 promise.catch 捕获。

## async/await 的异常捕获

首先我们模拟一个请求失败的函数 fetchFailure，fetch 函数通常都是返回一个 promise。

main 函数改成 async，catch 去捕获 fetchFailure reject 抛出的错误。能不能获取到呢。

```
var fetchFailure = () => new Promise((resolve, reject) => {
  setTimeout(() => {// 模拟请求
    if(1) reject('fetch failure...');
  })
})

async function main () {
  try {
    const res = await fetchFailure().catch(e => {
      console.error(e)
      throw new Error('ffffffffffffff')
    });
    console.log(res, 'res');
  } catch(e) {
    console.log(e, 'e.message');
  }
}
main().catch(e => {
  console.error('222222222222222222')
});

```

async 函数会被编译成好几段，根据 await 关键字，以及 catch 等，比如 main 函数就是拆成三段。

1. fetchFailure 2. console.log(res) 3. catch

通过 step 来控制迭代的进度，比如 "next"，就是往下走一次，从 1->2，异步是通过 Promise.then() 控制的，你可以理解为就是一个 Promise 链，感兴趣的可以去研究一下。 关键是生成器也有一个 "throw" 的状态，当 Promise 的状态 reject 后，会向上冒泡，直到 step('throw') 执行，然后 catch 里的代码 `console.log(e, 'e.message');` 执行。

明显感觉 async/await 的错误处理更优雅一些，当然也是内部配合使用了 Promise。

### 更进一步

async 函数处理异步流程是利器，但是它也不会自动去 catch 错误，需要我们自己写 try catch，如果每个函数都写一个，也挺麻烦的，比较业务中异步函数会很多。

首先想到的是把 try catch，以及 catch 后的逻辑抽取出来。

```
const handle = async (fn: any) => {
  try {
    return await fn();
  } catch(e) {
    // do sth
    console.log(e, 'e.messagee');
  }
}

async function main () {
    const res = await handle(fetchFailure);
    console.log(res, 'res');
}

```

写一个高阶函数包裹 fetchFailure，高阶函数复用逻辑，比如此处的 try catch，然后执行传入的参数-函数 即可。

然后，加上回调函数的参数传递，以及返回值遵守 first-error，向 node/go 的语法看齐。如下：

```
const handleTryCatch = (fn: (...args: any[]) => Promise<{}>) => async (...args: any[]) => {
  try {
    return [null, await fn(...args)];
  } catch(e) {
    console.log(e, 'e.messagee');
    return [e];
  }
}

async function main () {
  const [err, res] = await handleTryCatch(fetchFailure)('');
  if(err) {
    console.log(err, 'err');
    return;
  }
  console.log(res, 'res');
}


```

但是还有几个问题，一个是 catch 后的逻辑，这块还不支持自定义，再就是返回值总要判断一下，是否有 error，也可以抽象一下。 所以我们可以在高阶函数的 catch 处做一下文章，比如加入一些错误处理的回调函数支持不同的逻辑，然后一个项目中错误处理可以简单分几类，做不同的处理，就可以尽可能的复用代码了。

```js
// 1. 三阶函数。第一次传入错误处理的 handle，第二次是传入要修饰的 async 函数，最后返回一个新的 function。

const handleTryCatch = (handle: (e: Error) => void = errorHandle) =>
  (fn: (...args: any[]) => Promise<{}>) => async(...args: any[]) => {
    try {
      return [null, await fn(...args)];
    } catch(e) {
      return [handle(e)];
    }
  }
   
// 2. 定义各种各样的错误类型
//    我们可以把错误信息格式化，成为代码里可以处理的样式，比如包含错误码和错误信息
class DbError extends Error {
  public errmsg: string;
  public errno: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.errmsg = msg || 'db_error_msg';
    this.errno = code || 20010;
  }
}
class ValidatedError extends Error {
  public errmsg: string;
  public errno: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.errmsg = msg || 'validated_error_msg';
    this.errno = code || 20010;
  }
}

// 3. 错误处理的逻辑，这可能只是其中一类。通常错误处理都是按功能需求来划分
//    比如请求失败（200 但是返回值有错误信息），比如 node 中写 db 失败等。
const errorHandle = (e: Error) => {
  // do something
  if(e instanceof ValidatedError || e instanceof DbError) {
    // do sth
    return e;
  }
  return {
    code: 101,
    errmsg: 'unKnown'
  };
}   
const usualHandleTryCatch = handleTryCatch(errorHandle);

// 以上的代码都是多个模块复用的，那实际的业务代码可能只需要这样。
async function main () {
  const [error, res] = await usualHandleTryCatch(fetchFail)(false);
  if(error) {
    // 因为 catch 已经做了拦截，甚至可以加入一些通用逻辑，这里甚至不用判断 if error
    console.log(error, 'error');
    return;
  }
  console.log(res, 'res');
}

```

解决了一些错误逻辑的复用问题之后，即封装成不同的错误处理器即可。但是这些处理器在使用的时候，因为都是高阶函数，可以使用 es6 的装饰器写法。

不过装饰器只能用于类和类的方法，所以如果是函数的形式，就不能使用了。不过在日常开发中，比如 React 的组件，或者 Mobx 的 store，都是以 class 的形式存在的，所以使用场景挺多的。

比如改成类装饰器：

```ts
const asyncErrorWrapper = (errorHandler: (e: Error) => void = errorHandle) => (target: Function) => {
  const props = Object.getOwnPropertyNames(target.prototype);
  props.forEach((prop) => {
      var value = target.prototype[prop];
      if(Object.prototype.toString.call(value) === '[object AsyncFunction]'){
        target.prototype[prop] = async (...args: any[]) => {
          try{
            return await value.apply(this,args);
          }catch(err){
            return errorHandler(err);
          }
        }
      }
  });
}

@asyncErrorWrapper(errorHandle)
class Store {
  async getList (){
    return Promise.reject('类装饰：失败了');
  }
}

const store = new Store();

async function main() {
  const o = await store.getList();
}
main();

```

这种 class 装饰器的写法是看到[黄子毅](https://github.com/ascoders) 这么写过，感谢灵感。

## koa 的错误处理

如果对 koa 不熟悉，可以选择跳过不看。

koa 中当然也可以用上面 async 的做法，不过通常我们用 koa 写 server 的时候，都是处理请求，一次 http 事务会掉起响应的中间件，所以 koa 的错误处理很好的利用了中间件的特性。

比如我的做法是，第一个中间件为捕获 error，因为洋葱模型的缘故，第一个中间件最后仍会执行，而当某个中间件抛出错误后，我期待能在此捕获并处理。

```js
// 第一个中间件
const errorCatch = async(ctx, next) => {
  try {
    await next();
  } catch(e) {
    // 在此捕获 error 路由，throw 出的 Error
    console.log(e, e.message, 'error');
    ctx.body = 'error';
  }
}

app.use(errorCatch);

// logger
app.use(async (ctx, next) => {
  console.log(ctx.req.body, 'body');
  await next();
})

// router 的某个中间件
router.get('/error', async (ctx, next) => {
  if(1) {
    throw new Error('错误测试')
  }
  await next();
})



```

为什么在第一个中间件写上 try catch，就可以捕获前面中间件 throw 出的错误呢。首先我们前面 async/await 的地方解释过，async 中`await handle()`，handle 函数内部的 `throw new Error` 或者 `Promise.reject()` 是可以被 async 的 catch 捕获的。所以只需要 next 函数能够拿到错误，并抛出就可以了，那看看 next 函数。

```
// compose 是传入中间件的数组，最终形成中间件链的，next 控制游标。
 compose(middlewares) {
    return (context) => {
      let index = 0;
      // 为了每个中间件都可以是异步调用，即 `await next()` 这种写法，每个 next 都要返回一个 promise 对象

      function next(index) {
        const func = middlewares[index];
        try {
          // 在此处写 try catch，因为是写到 Promise 构造体中的，所以抛出的错误能被 catch
          return new Promise((resolve, reject) => {
            if (index >= middlewares.length) return reject('next is inexistence');
            resolve(func(context, () => next(index + 1)));
          });
        } catch(err) {
          // 捕获到错误，返回错误
          return Promise.reject(err);
        }
      }
      return next(index);
    }
  }

```

next 函数根据 index，取出当前的中间件执行。中间件函数如果是 async 函数，同样的转化为 generator 执行，内部的异步代码顺序由它自己控制，而我们知道 async 函数的错误是可以通过 try catch 捕获的，所以在 next 函数中加上 try catch 捕获中间件函数的错误，再 return 抛出去即可。所以我们才可以在第一个中间件捕获。详细代码可以看下[简版 koa](https://github.com/sunyongjian/mock-koa)

然后 koa 还提供了 ctx.throw 和全局的 app.on 来捕获错误。 如果你没有写错误处理的中间件，那可以使用 ctx.throw 返回前端，不至于让代码错误。 但是 throw new Error 也是有优势的，因为某个中间件的代码逻辑中，一旦出现我们不想让后面的中间件执行，直接给前端返回，直接抛出错误即可，让通用的中间件处理，反正都是错误信息。

```
// 定义不同的错误类型，在此可以捕获，并处理。
const errorCatch = async(ctx, next) => {
  try {
    await next();
 } catch (err) {
    const { errmsg, errno, status = 500, redirect } = err;
    
    if (err instanceof ValidatedError || err instanceof DbError || err instanceof AuthError || err instanceof RequestError) {
      ctx.status = 200;
      ctx.body = {
        errmsg,
        errno,
      };
      return;
    }
    ctx.status = status;
    if (status === 302 && redirect) {
      console.log(redirect);
      ctx.redirect(redirect);
    }
    if (status === 500) {
      ctx.body = {
        errmsg: err.message,
        errno: 90001,
      };
      ctx.app.emit('error', err, ctx);
    }
  }
}

app.use(errorCatch);

// logger
app.use(async (ctx, next) => {
  console.log(ctx.req.body, 'body');
  await next();
})

// 通过 ctx.throw
app.use(async (ctx, next) => {
  //will NOT log the error and will return `Error Message` as the response body with status 400
  ctx.throw(400,'Error Message');
}); 

// router 的某个中间件
router.get('/error', async (ctx, next) => {
  if(1) {
    throw new Error('错误测试')
  }
  await next();
})

// 最后的兜底
app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});


```

## 最后

本文的代码都存放于[此](https://github.com/wiseowner/js-asynchronization-error)

总的来说，目前 async 结合 promise 去处理 js 的异步错误会是比较方便的。另外，成熟的框架（react、koa）对于错误处理都有不错的方式，尽可能去看一下官方是如何处理的。

这只是我对 js 中处理异步错误的一些理解。不过前端的需要捕获异常的地方有很多，比如前端的代码错误，cors 跨域错误，iframe 的错误，甚至 react 和 vue 的错误我们都需要处理，以及异常的监控和上报，以帮助我们及时的解决问题以及分析稳定性。采取多种方案应用到我们的项目中，让我们不担心页面挂了，或者又报 bug 了，才能安安稳稳的去度假休息😆

最后的最后，blog地址： [github.com/sunyongjian…](https://github.com/sunyongjian/blog)