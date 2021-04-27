### 简单的命令行传参数和promise

```js
console.log(process.argv)
const  p = new Promise((resolve, reject) => {
  if (process.argv[2] == 1) {
    resolve(1)
    console.log(1)
  }
  resolve(3) // then(res = 3)
  console.log(2) // 继续执行
  return 2 // 之前如果不存在resolve, then(res = 2)
})
p.then(console.log)
```

输入命令: node test.js 1

```text
[
  'xxx/node',
  'xxx/test.js',
  '1'
]
1
2
1
```

输入命令: node test.js

```text
[
  'xxx/node',
  'xxx/test.js'
]
2
3
```
