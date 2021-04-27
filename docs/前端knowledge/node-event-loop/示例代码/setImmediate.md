# setImmediate

When multiple calls to setImmediate() are made, the callback functions are queued for execution in the order in which they are created. The entire callback queue is processed every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration.

当多次调用setimimmediate()时，回调函数将按照创建的顺序排队执行。每次事件循环迭代都会处理整个回调队列。如果一个immediate计时器从正在执行的回调函数中排队，那么该计时器直到下一次事件循环迭代才会被触发。
