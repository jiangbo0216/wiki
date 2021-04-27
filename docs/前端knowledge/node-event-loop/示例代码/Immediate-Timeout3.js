setTimeout(function () {
  setImmediate(function A() {
     console.log('4');
  })
  setTimeout(function B() {
     console.log('3');
  },0);
 
})

// 输出 4, 3

// A 在 B 前一轮事件循环执行

timer
imm