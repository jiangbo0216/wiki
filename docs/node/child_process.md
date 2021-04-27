```js
let c
try {
  // require(require('path').resolve(__dirname, 'fd')) // 可以使用这段来保证fork的模块存在
  c = require('child_process').fork('fd') // 抛出的异常不会影响主进程的执行
  c.on('error', () => console.log('error'))
  c.on('close', () => console.log('close'))
  c.on('disconnect', () => console.log('disconnect'))
  c.on('message', () => console.log('message'))
  c.on('exit', () => console.log('exit'))
} catch (error) {
  // console.log('111', error)
}
process.on('uncaughtException', function (err) {
  console.log('uncaughtException====', err)
})
throw new Error('hello')

// const c = require('child_process').fork('fd')
// c.on('error', () => console.log('error'))
// c.on('close', () => console.log('close'))
// c.on('disconnect', () => console.log('disconnect'))
// c.on('message', () => console.log('message'))
// c.on('exit', () => console.log('exit'))
// console.log('111')

```