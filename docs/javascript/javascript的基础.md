面向对象的javascript
```js
var a = {
  b:1,
  log: function () {
    console.log(this.b)
  }
}

a.log() //输出1
```

## + 运算符
undefined + number =NAN

## map 异步方法
```js
// 使用async await 处理异步操作
let results = await Promise.all(arr.map(async (item) => {
	// 等待异步操作完成，返回执行结果
	return await asyncWorker(item);
}));
```

## es5继承

1. 对象冒充不能继承原型链上的属性和方法
2. 单独的原型链继承, 实例化子类的时候没法给父类传参

```js
// 原型链+对象冒充的组合继承模式

function Person(name,age){
          this.name=name;  /*属性*/
          this.age=age;
          this.run=function(){  /*实例方法*/
              alert(this.name+'在运动');
          }
  } 
  Person.prototype.sex="男";
  Person.prototype.work=function(){
          alert(this.name+'在工作');

  }
    
  function Web(name,age){
      Person.call(this,name,age);   //对象冒充继承   实例化子类可以给父类传参
  }

  Web.prototype=new Person(); // 原型链继承
  // Web.prototype=Person.prototype; // 原型链继承的另一种写法, 所以什么是原型, 原型就是一个对象

  var w=new Web('赵四',20);

  // w.run();
  w.work();

  // var w1=new Web('王五',22);
```


## nodejs服务端异常处理
The **uncaughtException** only works with synchronous code. For asynchronous code, there is another event called **unhandledRejection**.

```js
// 同步情况
process.on("uncaughtException", () => {})

// 异步情况
process.on("unhandledRejection", () => {})
```


## 异常处理
Error对象
1. message
2. stack

### 捕获异常
```js
try {
  // Code to run
} catch (e) {
  // Code to run if an exception occurs
}
[ // optional
  finally {
    // Code that is always executed regardless of 
    // an exception occurring
  }
]
```
try-catch-finally 只能捕获同步的错误
try-catch-finally can only catch synchronous errors. If we try to use it with asynchronous code, it’s possible that try-catch-finally will have already been executed before the asynchronous code finishes its execution.

### 回调函数
```js
asyncfunction(code, (err, result) => {
    if(err) return console.error(err);
    console.log(result);
})
```

### Promise
With promises — then or catch — we can process errors by passing an error handler to the then method or using a catch clause.

```js
promise.then(onFulfilled, onRejected)

Promise.resolve('1')
  .then(res => {
      console.log(res) // 1
      throw new Error('something went wrong'); // exception thrown 
})
.then(res => {
      console.log(res) // will not get executed
})
.catch(err => { 
      console.error(err) // exception catched and handled
})
.finally(() => {

})
```

### async and await with try-catch

With async/await and try-catch-finally, handling exceptions is a breeze.

```js
async function() {
    try {
        await someFuncThatThrowsAnError()
    } catch (err) {
        console.error(err) 
    }
}
```

### 浏览器处理异常

```html

<img src="testt.jpg" onerror="alert('An error occurred loading yor photo.')" />
<script>
window.onerror()
</script>

```

### 类继承处理异常
```js
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
    this.message = message
  }
}
class PermissionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PermissionError'
    this.message = message
  }
}
class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
    this.message = message
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    }
  }
}

function myFunction(input) {
   if (!input)
     throw new ValidationError('A validation error')
   return input
}

try {
  myFunction(null)
} catch (e) {
  if (e.name === 'ValidationError') {
    console.log("Handle input validation error")
  } else {
    console.log("Handle other errors")
  }
}
```

### 获取函数的名字

```js
Function.prototype.getName = function(){
  return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}
```

### 异常处理

大量的异步的情况，时机的编码是应该要避免大量的 try catch finally的出现，适当的用返回值控制流程，使用高阶函数抽象出异常处理的方法，进一步如果支持装饰器，使用装饰器来增强方法的功能。尽量多使用具名方法，避免使用匿名函数。


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

### 异常处理的promise的一种写法
写法不如async-await清晰
```js
function test() {
  return Promise.resolve(1)
  
}

test().catch(console.log).then((res) => {console.log(res + 1)}) // 2
```

### 异常处理async-await写法

```js
const handleTryCatch = (handler) =>
  (fn) => async(...args) => {
    try {
      return [null, await fn(...args)];
    } catch(e) {
      return [handler(e)];
    }
  }
```

1. 使用async-await最外层使用try-catch捕获异常
2. 对于直接end的异常, 在使用Promise.catch抛出
3. 对于需要处理的异常, 使用handleTryCatch处理

### await中发生了异常, 是无法返回的

```js
function test () {
  return Promise.reject(1).catch(()=>{throw new Error('1')})
}
(async() => {

  try {
    console.log('======', await test())
  } catch (error) {
    console.log(error)
  }
})()
```

### 面向对象中的异常处理的上下文问题

```js
class A {
  constructor() {
    this.a = 1
  }

  say () {
    console.log(this.a)
  }
}

/**
 * 异常分为直接退出的异常, 大多数情况是这种情况, 
 * 其次是发生异常之后我们需要处理的异常
 * @param {*} handler 
 */
const handleTryCatch = (handler) =>
  (fn) => async(...args) => {
    try {
      return [null, await fn(...args)];
    } catch(e) {
      // 打印出错的函数名称
      return [handler(e)];
    }
  }


const a = new A();

(async () => {
  console.log(await handleTryCatch(x=>x)(a.say)()) // TypeError: Cannot read property 'a' of undefined
})()

```

### 解决异常handleTryCatch处理异常的上下文问题

```js
/**
 * 异常分为直接退出的异常, 大多数情况是这种情况, 
 * 其次是发生异常之后我们需要处理的异常
 * @param {*} handler 
 */
const errorFistPromise = (p) => {
  return p.then(res => [null, res]).catch(e => [e])
}


function test() {
  return Promise.reject('1')
}
(async () => {
  console.log(await errorFistPromise(test()))
})()
```

### 如何包装抛出的错误
我的理解, javascript没有完整的类型系统，使用类的继承来包装Error，不好实现

### Object.keys()

返回包括函数的的所有enumerable property names

### [实现Object.assign](https://juejin.im/post/5c31e5c4e51d45524975d05a#heading-2)

```js
// 木易杨
if (typeof Object.assign2 != 'function') {
  // Attention 1
  Object.defineProperty(Object, "assign2", {
    value: function (target) {
      'use strict';
      if (target == null) { // Attention 2
        throw new TypeError('Cannot convert undefined or null to object');
      }

      // Attention 3
      var to = Object(target);
        
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {  // Attention 2
          // Attention 4
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

// 木易杨
// 测试用例
let a = {
  name: "advanced",
  age: 18
}
let b = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  }
}
let c = Object.assign2(a, b);
console.log(c);
// {
// 	name: "muyiy",
//  age: 18,
// 	book: {title: "You Don't Know JS", price: "45"}
// } 
console.log(a === c);
// true

```

### js抛出异常不一定是Error对象

```js
function test() {
    throw {a:1}
}

try{
    test()
} catch (e){
    console.log(e) // {a:1}
}
```

### error 对象中的属性不可枚举

```js
var a = new Error('hello')
console.log(Object.keys(a)) // []
```

### 继承不够灵活

```js
class Base {
  id = 1

}

class A extends Base{

}

class B extends Base{
  
}

const a = new A()
const b = new B()

b.id = 2
console.log(a.id) // 1
console.log(b.id) // 2
```
1. 基类base封装了请求的方法 axios, 在登录的场景, base中包含属性cookie。
2. 另外有A,B,C三个类，都会用到base类的请求方法。同时A,B,C三个需要使用同一个cookie对象
3. 这个时候如果A,B,C都继承base类,这个时候在new A,B,C的时候,会存在三个cookie对象.

作者：萧萧
链接：https://www.zhihu.com/question/21862257/answer/181179184
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

为什么有“组合优于继承”的说法首先需要注意， 广为流传的“组合优于继承” 的说法是一种不严谨的翻译， 其来源如下众多设计模式包含的2个最核心原则（引自参考书籍 《Design Patterns: Elements of Reusable Object-Oriented Software》）1. Program to an interface, not an implementation. (面向接口编程，而不是具体的实现)2. Favor object composition over class inheritance.（如果某个场景的代码复用既可以通过类继承实现， 也可以通过对象组合实现， 尽量选择对象组合的设计方式）第一个原则的好处非常明显： 可以极大程度地减少子系统具体实现之间的相互依赖。 第二个原则则不那么容易理解， 下面展开叙述 。对象组合与类继承的对比面向对象设计的过程中， 两个最常用的技巧就是类继承和对象组合，同一个场景下的代码复用，这两个技巧基本上都可以完成。 但是他们有如下的区别：通过继承实现的代码复用常常是一种“白盒复用”， 这里的白盒指的是可见性： 对于继承来说，父类的内部实现对于子类来说是不透明的（实现一个子类时， 你需要了解父类的实现细节， 以此决定是否需要重写某个方法）对象组合实现的代码复用则是一种“黑盒复用”“: 对象的内部细节不可见，对象仅仅是以“黑盒”的方式出现（可以通过改变对象引用来改变其行为方式）这里通过汽车的刹车逻辑进行说明。 对于汽车来说， 存在多种不同的型号， 我们会很自然的希望定义一个类 Car 来描述所有汽车通用的刹车行为 brake()， 然后通过某种方式（继承/组合）来为不同的型号的汽车提供不同的刹车行为。如果通过继承来实现， 思路就是定义一个Car, 实现不同子类 CarModelA， CarModelB 来重写父类的 brake() 方法以体现不同型号车的刹车行为区别。

```java
public abstract class Car {

    // 也可以将该方法设置成抽象方法， 强迫子类来实现该方法
    public void brake() {
      // 提供一个默认的刹车实现
      ...
    }
}

```


```java
public class CarModelA extends Car {

    public void brake() {
      aStyleBrake();// A 风格的刹车行为
    }
}

public class CarModelB extends Car {

    public void brake() {
      bStyleBrake(); // B 风格的刹车行为
    }
}
```

上述的例子展现了如何通过继承来完成不同型号车辆刹车行为的变化。但是可以注意到， 每一个型号的车的刹车行为是在编译时就确定好的 ， 没有办法在运行时刻将 CarModelB 的刹车行为赋予 CarModelA 。如果通过对象组合的实现方式， 则需要为 Car 定义一个引用， 该引用的类型是一个为刹车行为定义的接口。

```java
public interface IBrakeBehavior {
    public void brake();
}

public class AStyleBrake implements IBrakeBehavior {
    public void brake() {
        aStyleBrake(); // A 风格的刹车行为
    }
}

public class BStyleBrake implements IBrakeBehavior {
    public void brake() {
        bStyleBrake(); // B 风格的刹车行为
    }
}


//通过给下面的类赋予 AStyleBrake 或 BStyleBrake 可以完成不同 Model 的刹车行为的切换 

// 同理， 汽车其他的行为（如启动 launch） 也可以用类似的方法实现
// 不同型号的汽车实现， 可以通过赋予不同风格的行为实例来 “组装” 出来的， 也就不需要为 Car 定义不同的子类了 
public class Car{
    protected IBrakeBehavior brakeBehavior;

    public void brake() {
        brakeBehavior.brake();
    }

    public void setBrakeBehavior(final IBrakeBehavior brakeType) {
        this.brakeBehavior = brakeType;
    }
}
```
值得注意的是， 上面的刹车行为不一定需要通过接口来实现， 定义一个 BrakeBehaviour 的父类， 然后再定义AStyleBrake , BStyleBrake 来继承该类， 实现不同的行为， 同样是组合方式的应用。所以不难发现， 当我们拿类继承和组合在一起进行对比时， 并不是以实现方式中是否有用到类继承而区分的。我们真正关注的是行为的继承与行为的组合 ：**需要变化的行为是通过 继承后重写的方式 实现， 还是通过 赋予不同的行为实例 实现**。继承与组合的优缺点对比类继承优点：类之间的继承关系时在编译时刻静态地定义好的， 因此使用起来也非常直观， 毕竟继承是被编程语言本身所支持的功能。类继承也使得修改要重用的代码变得相对容易， 因为可以仅仅重写要更改的父类方法。类继承缺点:第一个缺点是伴随第一个优点而生的： 没有办法在运行时刻改变继承了父类的子类行为。 这一点在之前汽车的例子中已经进行了说明第二个缺点与第一个缺点相比往往更严重： 通过继承实现的代码复用，本质上把父类的内部实现细节暴露给了子类， 子类的实现会和父类的实现紧密的绑定在一起， 结果是父类实现的改动，会导致子类也必须得改变。 以之前的例子进行说明， 如果是通过继承的方式来实现不同型号汽车的刹车行为变化， 假设现在我们基于 Car 这个父类实现了 10 种不同型号的汽车 CarModel( A, B, C, D, E, F, G,H ,I , J ), 其中前 5 个型号( A、B、C、D、E) 都没有重写父类的刹车方法， 直接使用了父类 Car 提供的默认方法， 后 5 个型号均提供了自己独特的 brake 实现 。 现假设， 我们希望对 Car 中的 brake 方法进行升级改造， 然而，升级改造后的 brake 行为只适用于C，D ， 最早的两种型号A， B 并不兼容升级后的刹车行为。 这样， 我们为了保证 A， B 依旧能正常工作， 就不得不把旧的 brake 实现挪到 A、B 中。 或者， 分别去升级 C、 D、E 中的 brake 方法。对象组合优点:对象的组合是在运行时刻通过对象之间获取引用关系定义的，所以对象组合要求不同的对象遵从对方所实现的接口来实现引用传递， 这样反过来会要求更加用心设计的接口，以此支持你在使用一个对象时， 可以把它和很多其他的对象组合在一起使用而不会出现问题。对象的组合由于是通过接口实现的， 这样在复用的过程中是不会打破其封装的。 任意一个对象都可以在运行时刻被替换成另外一个实现了相同接口且类型相同对象， 更重要的是，由于一个对象的实现是针对接口而编写的， 具体实现之间的依赖会更少。对象组合的方式可以帮助你保持每个类的内聚性，让每个类专注实现一个任务。 类的层次会保持的很小，不会增长到一种无法管理的恐怖数量。 （这也是为什么Java语言支持单继承的原因）对象组合缺点：不具备之前所罗列的类继承的优点


### js Date 操作

```js
console.log(new Date().toTimeString())  // 09:41:36 GMT+0800 (China Standard Time)

```

### instanceof

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```
