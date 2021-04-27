const PENDING = 'pending'
const FUlFILLED = 'fulfilled'
const REJECT = 'reject'

function MyPromise (callback) {
  var _this = this
  
  _this.currentState = PENDING
  this.value = void 0

  _this.onResolveCallbacks = []
  _this.onRejectedCallbacks = []

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      return value.then(_this.resolve. _this.reject)
    }

    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = FUlFILLED
        _this.value = value
        _this.onResolveCallbacks.forEach(cb => cb()) // 后面再MyPromise的上下文中创建 cb, 其中能够引用到 _this.value
      }
    }) 
  }

  _this.resolve = function (value) {
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED // 状态管理
        _this.value = value
        _this.onRejectedCallbacks.forEach(cb => cb())
      }
    })
  }

  try {
    callback(_this.resolve, _this.reject)
  } catch (error) {
    _this.reject(error)
  }
}


