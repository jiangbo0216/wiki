# express

## [merge实现](https://github.com/jaredhanson/utils-merge/blob/master/index.js)

```js
/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

exports = module.exports = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
```

## [setprototypeof](https://github.com/wesleytodd/setprototypeof)

1. 优先使用：Object.setPrototypeOf
2. 第二选择：proto
3. 最后选择：遍历赋值

* instanceof 查找对象的构造函数   [The **`instanceof` operator** tests whether the `prototype` property of a constructor appears anywhere in the prototype chain of an object.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
* `{ __proto__: [] }` 对象改变了原型链, 用来测试能不能给 __proto 赋值 IE 8 - 10 不支持这个写法
* `!obj.hasOwnProperty(prop)`找到原型链上的属性

```js
  
'use strict'
/* eslint no-proto: 0 */
module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties)

function setProtoOf (obj, proto) {
  obj.__proto__ = proto
  return obj
}

function mixinProperties (obj, proto) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = proto[prop]
    }
  }
  return obj
}
```

参考： https://stackoverflow.com/questions/45954157/understanding-the-extends-function-generated-by-typescript



# test

[supertest](https://github.com/visionmedia/supertest)  
[assert](https://nodejs.org/api/assert.html)  
assert(value[, message]), An alias of assert.ok().  

* value <any> The input that is checked for being truthy. 否则会抛出异常
* message <string> | <Error>

```js
var assert = require('assert')
var request = require('supertest')

```

# 实现

基于 event emitter
