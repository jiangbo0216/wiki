// Polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
// Because older browsers are generally also slower browsers, it is far more critical than most people recognize to create performance polyfills to make the browsing experience in outdated browsers slightly less horrible.

// Thus, presented below are two options for Function.prototype.bind() polyfills:

// The first one is much smaller and more performant, but does not work when using the new operator.
// The second one is bigger and less performant, but it permits some usage of the new operator on bound functions.
// Generally, in most code it's very rare to see new used on a bound function, so it is generally best to go with the first option.

//  Does not work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
// You can partially work around this by inserting the following code at the beginning of your scripts, allowing use of much of the functionality of bind() in implementations that do not natively support it.

//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  Function.prototype.bind = function(otherThis) {
    var ArrayPrototypeSlice = Array.prototype.slice;
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        // 这个是函数本身
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
            // 兼容 new 的情况
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      // Function.prototype.bind({}).prototype.prototype 这个情况, 不加判断为 undefined
      fNOP.prototype = this.prototype;
    }
    // 如果不使用中间层的话, 会出现修改this.prototype, 也就是原函数的prototype
    fBound.prototype = new fNOP();

    return fBound;
  };
})();


// function a () {}
// undefined
// const abind = a.bind(1)
// undefined
// abind.prototype.a = 1
// 1
// a.prototype
// {a: 1, constructor: ƒ}