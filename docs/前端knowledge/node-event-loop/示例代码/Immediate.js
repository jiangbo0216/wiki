setTimeout(function () {
  console.log('1');
},0);

setImmediate(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('9');
  });
})

setImmediate(function () {
  console.log('3');
  process.nextTick(function () {
    console.log('10');
  });
})

setImmediate(function () {
  console.log('4');
})



// 2
// 9
// 3
// 4
// 1

// 或者

// 1
// 2
// 9
// 3
// 4

/* 这里有个矛盾的地方:
当 setImmediate 回调先执行的时候, 所有的 setImmediate 回调都会在 setTimeout 回调前执行, 可以看作
所有 setImmediate 的回调在同一次事件循环中, 这个时候 nextTick 中的回调为什么插入到中间执行呢
*/

// 这是由 setTimeout 的执行特性导致的，setTimeout 中的回调会在超时时间后被执行，但是具体的执行时间却不是确定的，即使设置的超时时间为 0。所以，当事件循环启动时，定时任务可能尚未进入队列，于是，setTimeout 被跳过，转而执行了 check 阶段的任务。
// 换句话说，这种情况下，setTimeout 和 setImmediate 不一定处于同一个循环内，所以它们的执行顺序是不确定的。

// TODO 这句存在疑问
// 在具体实现上, process.nextTick 的回调函数保存在一个数组中, setImmediate 回调函数是
// 保存在链表中, 每一轮事件循环中执行链表的第一个回调函数

// setImmediate 文档链接 https://nodejs.org/api/timers.html#timers_setimmediate_callback_args
// When multiple calls to setImmediate() are made, the callback functions are queued for execution in the order in which they are created. The entire callback queue is processed every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration.