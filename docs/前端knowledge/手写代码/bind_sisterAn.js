Function.prototype.bind = function (context, ...args) {
  // 调用 bind 的不是函数，需要抛出异常
  // 需要加上这个, 防止出现这种情况
  // var a = {a:1}; a.__proto__ = Function.prototype; a.bind(window)
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  const self = this

  // 创建一个空对象, 内存中初始化 function fNOP 和 fNOP 的原型
  var fNOP = function () {};
  const fBind = function (...anotherArgs) {
    // 这里也可以用  this instanceof fNOP
    return self.apply(fNOP.prototype.isPrototypeOf(this) ? this : context, args.concat(anotherArgs))
  }

  if (this.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOP.prototype = this.prototype;
  }

  // 开辟新的内存空间, 避免影响原来的prototype
  fBound.prototype = new fNOP();

  return fBind;
}