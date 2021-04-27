process.on('uncaughtException', (err, origin) => {
  // fs.writeSync(
  //   process.stderr.fd,
  //   `捕获的异常: ${err}\n` +
  //   `异常的来源: ${origin}`
  // );
  console.log(process.stderr.fd, 
        `捕获的异常: ${err}\n` +
    `异常的来源: ${origin}`)
});

setTimeout(() => {
  console.log('这里仍然会运行');
}, 500);

// 故意引起异常，但不要捕获它。
// nonexistentFunc();
Promise.reject('11111') // 如果需要让 uncaughtException 捕捉到异常, 需要设置  node --unhandled-rejections=strict uncaughtException.js
console.log('这里不会运行');

