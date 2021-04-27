## 浅拷贝 Object.assign

语法如下所示：

Object.assign(target, ...sources)

其中 target 是目标对象，sources 是源对象，可以有多个，返回修改后的目标对象 target。
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后来的源对象的属性将类似地覆盖早先的属性。

我们知道浅拷贝就是拷贝第一层的基本类型值，以及第一层的引用类型地址。

String 类型和 Symbol 类型的属性都会被拷贝，而且不会跳过那些值为 null 或 undefined 的源对象。

## Object.assign 模拟实现
实现一个 Object.assign 大致思路如下：
1、判断原生 Object 是否支持该函数，如果不存在的话创建一个函数 assign，并使用 Object.defineProperty 将该函数绑定到 Object 上。
2、判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去,但必须设置值）。
3、使用 Object() 转成对象，并保存为 to，最后返回这个对象 to。
4、使用 for..in 循环遍历出所有可枚举的自有属性。并复制给新的目标对象（使用 hasOwnProperty 获取自有属性，即非原型链上的属性）。
实现代码如下，这里为了验证方便，使用 assign2 代替 assign。注意此模拟实现不支持 symbol 属性，因为ES5 中根本没有 symbol 。

### 可枚举性
原生情况下挂载在 Object 上的属性是不可枚举的，但是直接在 Object 上挂载属性 a 之后是可枚举的，所以这里必须使用 Object.defineProperty，并设置 enumerable: false 以及 writable: true, configurable: true。


```js
// 木易杨
for(var i in Object) {
    console.log(Object[i]);
}
// 无输出

Object.keys( Object );
// []
```

上面代码说明原生 Object 上的属性不可枚举。
我们可以使用 2 种方法查看 Object.assign 是否可枚举，使用 Object.getOwnPropertyDescriptor 或者 Object.propertyIsEnumerable 都可以，其中propertyIsEnumerable(..) 会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足  enumerable: true。具体用法如下：

```js
// 方法1
Object.getOwnPropertyDescriptor(Object, "assign");
// {
// 	value: ƒ, 
//  writable: true, 	// 可写
//  enumerable: false,  // 不可枚举，注意这里是 false
//  configurable: true	// 可配置
// }

// 方法2
Object.propertyIsEnumerable("assign");
// false

```

所以要实现 Object.assign 必须使用 Object.defineProperty，并设置 writable: true, enumerable: false, configurable: true，当然默认情况下不设置就是 false。

```js
Object.defineProperty(Object, "b", {
    value: function() {
        console.log("log b");
    }
});

Object.getOwnPropertyDescriptor(Object, "b");
// {
// 	value: ƒ, 
//  writable: false, 	// 注意这里是 false
//  enumerable: false,  // 注意这里是 false
//  configurable: false	// 注意这里是 false
// }


```

定义对象属性
```js
// 判断原生 Object 中是否存在函数 assign2
if (typeof Object.assign2 != 'function') {
  // 使用属性描述符定义新属性 assign2
  Object.defineProperty(Object, "assign2", {
    value: function (target) { 
      ...
    },
    // 默认值是 false，即 enumerable: false
    writable: true,
    configurable: true
  });
}

```


### 原始类型被包装成对象

JS 对于不可写的属性值的修改静默失败（silently failed）,在严格模式下才会提示错误。

```js

var a = "abc";
var b = "def";
Object.assign(a, b);  // TypeError: Cannot assign to read only property '0' of object '[object String]'
```

对于string的来说, 不能修改string类型的索引的值

```js
var a = "abc";
var b = {
    v1: "def",
    v2: true,
    v3: 10,
    v4: Symbol("foo"),
    v5: null,
    v6: undefined
}

var obj = Object.assign(a, b); 
console.log(obj);
// { 
//   [String: 'abc']
//   v1: 'def',
//   v2: true,
//   v3: 10,
//   v4: Symbol(foo),
//   v5: null,
//   v6: undefined 
// }
```

### 存在性

这边使用了 in 操作符和 hasOwnProperty 方法，区别如下（你不知道的JS上卷 P119）：
1、in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中。
2、hasOwnProperty(..) 只会检查属性是否在 myObject 对象中，不会检查  [[Prototype]] 原型链。
Object.assign 方法肯定不会拷贝原型链上的属性，所以模拟实现时需要用 hasOwnProperty(..) 判断处理下，但是直接使用 myObject.hasOwnProperty(..) 是有问题的，因为有的对象可能没有连接到 Object.prototype 上（比如通过 Object.create(null) 来创建），这种情况下，使用 myObject.hasOwnProperty(..) 就会失败。


```js
var anotherObject = {
    a: 1
};

// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );
myObject.b = 2;

("a" in myObject); // true
("b" in myObject); // true

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true

```

解决办法:

```js
var myObject = Object.create( null );
myObject.b = 2;

Object.prototype.hasOwnProperty.call(myObject, "b");
// true
```

### Object.assign实现代码:

```js

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

```