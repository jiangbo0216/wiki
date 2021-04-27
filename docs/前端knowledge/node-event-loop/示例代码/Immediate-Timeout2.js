setImmediate(function () {
  setTimeout(function () {
     console.log('1');
  },0);
 
  setImmediate(function () { // 从 setImmediate 回调中加入queue, 下一次event loop 才会触发
     console.log('2');
  })
})
// 可能会出现 1 2 和 2 1 取决于事件循环的tick触发的时间, 与timer返回的时间



setImmediate(function (){
  setImmediate(function A() {
    console.log(5);
    setImmediate(function B(){console.log(6);});
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});

// 5
// TIMEOUT FIRED
// 6

// 或者

// TIMEOUT FIRED
// 5
// 6
