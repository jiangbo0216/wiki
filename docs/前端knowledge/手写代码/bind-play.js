Function.prototype.bind = function (content, ...args) {
  // 防止出现let a = {} a.__proto__ = Function.prototype a.bind(window)
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind bind  what is not callable')
  }

  const self = this
  const noop = function () {}

  const fBind = function (...otherArgs) {
    const finalArgs = args.concat(otherArgs)
    return self.apply(this instanceof noop ? this: content, finalArgs)
  }

  // Function.prototype 没有 prototype
  if (this.prototype) {
    noop.prototype = this.prototype
  }

  fBind.prototype = new noop() 
  return fBind
}