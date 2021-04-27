const PENDING = 'pending'
const FULFILLED  = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(callback) {
  var _this = this
  _this.currentState = PENDING
  _this.value = void 0
  _this.onResolveCallbacks = []
  _this.onRejectedCallback = []

  _this.resolve = function (value) {
    if ( value instanceof MyPromise) {
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => {
      if (_this.currentState === PENDING) { 
        _this.currentState = FULFILLED
        _this.value = value
        _this.onResolveCallbacks.forEach(cb => cb()) // 后面再MyPromise的上下文中创建 cb, 其中能够引用到 _this.value
      }
    }) 
  }

  _this.reject = function (value) {
    setTimeout(() => {
      if (_this.currentState === PENDING) { 
        _this.currentState = REJECTED
        _this.value = value
        _this.onRejectedCallback.forEach(cb => cb()) // 后面再MyPromise的上下文中创建 cb, 其中能够引用到 _this.value
      }
    }) 
  }

  // 异常处理
  try {
    callback(_this.resolve, _this.reject)
  } catch (e) {
    _this.reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var _this = this

  // 规范, 必须返回一个promise
  var promise2

  // 根据规范 2.2.1 ，onFulfilled、onRejected 都是可选参数
  // onFulfilled、onRejected不是函数需要忽略，同时也实现了值穿透
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}

  if (_this.currentState === FULFILLED) {
    return promise2 = new MyPromise(function (resolve, reject) {
      // 如果promise1（此处为self/this）的状态已经确定并且为fulfilled，我们调用onFulfilled
      // 如果考虑到有可能throw，所以我们将其包在try/catch块中, 存在 .then(() => {throw new Error()})
      try {
        var x = onFulfilled(this.value)
        resolutionProcedure(promise2, x, resolve, reject)
      } catch (e) {
        reject(err)
      }

    })
  } 

  function resolutionProcedure (promise2, x, resolve, reject) {
     // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
     // var a = Promise.resolve(1).then(() => return a) then 返回了 a, 然后 onFulfilled 返回的 x , 也是 a
     if (promise2 === x) {
      return reject(new TypeError("Chaining cycle detected for promise!"))
     }
  }

}