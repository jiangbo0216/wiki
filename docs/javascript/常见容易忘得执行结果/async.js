
setImmediate(function () {
  setTimeout(function () {
     console.log('1');
  },0);
 
  setImmediate(function () {
     console.log('2');
  })
})