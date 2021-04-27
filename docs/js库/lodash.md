## [柯里化 _.curry(func, [arity=func.length])](https://lodash.com/docs/4.17.15#curry)

示例代码

```js
 var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

## _.debounce(func, [wait=0], [options={}])

* func (Function): The function to debounce.
* [wait=0] (number): The number of milliseconds to delay.
* [options={}] (Object): The options object.
* [options.leading=false] (boolean): Specify invoking on the leading edge of the timeout.
* [options.maxWait] (number): The maximum time func is allowed to be delayed before it's invoked.
* [options.trailing=true] (boolean): Specify invoking on the trailing edge of the timeout.
