# Vuex

## install

修改了Vue初始化的过程，给每一个创建出来的Vue实例加上了$store属性

```js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

```

在使用Vue.extend之前可以修改Vue函数对象，Vue.install(Vuex), 然后创建出的对象对象就能够使用$store, 包含组件中的子组件

在mutation中调用其他的mutation

```js
this.commit('chat/updateSession', {
        group_id: groupId,
        unread
      })

```
