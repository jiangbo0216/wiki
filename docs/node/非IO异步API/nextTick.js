function foo () {
  console.log('aaa')  
}
process.nextTick(foo)
console.log('bbb')