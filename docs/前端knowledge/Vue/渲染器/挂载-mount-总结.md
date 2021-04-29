## [渲染器的意义](http://hcysun.me/vue-design/zh/renderer.html)

渲染器的意义是将`Virtual DOM`渲染成特定平台下真实`DOM`的工具

渲染器工作流程分为 mount 和 patch

```js
function render (vnode, container) { // 久 vnode 通过 container.vnode 引用然后对比
  // 如果没有旧 vnode mount
  // 新旧都有 patch
  // 只有旧的, 没有新的 removeChild
}
```

渲染器与Vue组件:

1. 控制部分组件生命周期钩子的调用 (挂载, 卸载等)
2. 多端渲染的桥梁(自定义渲染器)
3. 与异步渲染有直接关系 (// todo 需要搞懂)
   1. Vue3 的异步渲染是基于调度器的实现，若要实现异步渲染，组件的挂载就不能同步进行，DOM的变更就要在合适的时机，一些需要在真实DOM存在之后才能执行的操作(如 ref)也应该在合适的时机进行。对于时机的控制是由调度器来完成的，但类似于组件的挂载与卸载以及操作 DOM 等行为的入队还是由渲染器来完成的，这也是为什么 Vue2 无法轻易实现异步渲染的原因。
4. 包含核心的 Diff 算法

### 挂载mount

mount 函数的作用是把一个 VNode 渲染成真实 DOM，根据不同类型的 VNode 需要采用不同的挂载方式

```js
function mount(vnode, container) {
  const { flags } = vnode
  if (flags & VNodeFlags.ELEMENT) {
    // 挂载普通标签
    mountElement(vnode, container)
  } else if (flags & VNodeFlags.COMPONENT) {
    // 挂载组件
    mountComponent(vnode, container)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    mountText(vnode, container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    mountFragment(vnode, container)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    mountPortal(vnode, container)
  }
}
```
