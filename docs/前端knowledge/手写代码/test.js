console.time('1')
for (let i = 0; i < 50000; i++) {
  let a = {}
  // 如果没有这一行, 时间为2.2ms左右, 加上之后时间为120ms左右
  // a.__proto__ = {b: 1}
  a.a = 1
}

console.timeEnd('1')