# props

## vue 2.6.x 使用v-bind="$attrs", 属性会加在html标签上, 而在组件中声明了props, 使用$props透传则不会有这个现象

## 校验props

```js
shape: {
  type: String,
  default: 'circle',
  validator: function (value) {
    return ['circle', 'square', 'multiple'].includes(value)
  }
}
```
