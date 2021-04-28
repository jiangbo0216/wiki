```js
const a = {a: 1}
// undefined
const b = Object.create(a)
// undefined
b
// {}
b.__proto__ === a
// true
```
