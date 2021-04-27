const www = new Proxy(new URL('http://www'), {
  get: function get (target, prop) {
    let o = Reflect.get(target, prop)

    // www.justjavac.com.toString() toString的时候返回一个函数， () 调用这个函数
    if (typeof o === 'function') {
      return o.bind(target)
    }

    // object key 只能是字符串和 Symbol，所以这里是判断是否为 Symbol
    // 使用场景是 www.justjavac.com + 'foo/bar'， 这里会调用 symbol Symbol(Symbol.toPrimitive)
    console.log(typeof prop, prop)
    if (typeof prop !== 'string') {
      return o
    }

    if (prop === 'then') {
      return Promise.prototype.then.bind(fetch(target))
    }

    target = new URL(target)

    target.hostname += `.${prop}`
    return new Proxy(target, {get})
  }
})

console.log(www.justjavac.com + 'foo/bar')

// 
console.log(new URL('http://www.justjavac.com') + '')
