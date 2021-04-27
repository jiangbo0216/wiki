## 常用api
_.partial(func, [partials])

创建一个函数。 该函数调用 func，并传入预设的 partials 参数。 这个方法类似 _.bind，除了它不会绑定 this。

这个 _.partial.placeholder 的值，默认是以 _ 作为附加部分参数的占位符。
```js
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};
 
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// 使用了占位符。
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```

## 函数式编程

function compose(...funcs) {
  return funcs
    .reverse()
    .reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));
}


pipe 和 compose 功能上是一样的， 参数传递的顺序相反
