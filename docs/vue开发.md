## slot

### 个人理解

在开发通用组件的时候，我们并不知道具体的数据结构，这个时候需要一定的抽象，组件需要概括主要的逻辑，这个时候就需要slot

### 官方

## 组件化

1. 适当的抽象化
2. 考虑这个组件应该持有的数据
3. 考虑这个组件应该具有的方法
4. 这个组件对于输入和输出的反应（数据输入和事件输入）

## 自定义的指令，不支持语句包装成函数

## 滚动到顶部

this.$refs['svrContent'].scrollTop = 0
this.$refs['svrContent'].scroll(0,0)

## 弹窗聚焦

当弹窗打开时，自动聚焦到input输入框。
看似很简单，但是有两个容易出问题的地方：
一、聚焦的时机
当弹窗的开关变量为true时，你让相应的元素聚焦，但此时可能弹窗并没有渲染完成
二、聚焦的元素
当你使用第三方组件的Input输入框时，你为这个输入框标记了ref，但是获取到的是这个组件，而并不是组件中的input
而你使用原生的input元素则不会有这个问题

```js
data () {
    return {
        modalFocus: false,
        inputValue: '',
    }
},
watch: {
    modalFocus (val) {
        if (val) {
            this.$nextTick(() => { // nextTick 保证元素渲染完成
                this.$refs.inputFocus.$el.children[1].focus()
            })
        }
    },
},
```

## keypress keyup keydown 元素聚焦才能触发？
