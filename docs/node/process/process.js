// process.on('beforeExit', (code) => {
//   console.log('进程 beforeExit 事件的代码: ', code);
//   setInterval(() => {
//     console.log('111111111')
//   }, 1000)
// });

// process.on('exit', (code) => {
//   console.log('进程 exit 事件的代码: ', code);
// });

// console.log('此消息最新显示');
// process.exit(0)


process.on('multipleResolves', (type, promise, reason) => {
  console.error(type, promise, reason);
  setImmediate(() => process.exit(1));
});

async function main() {
  try {
    return await new Promise((resolve, reject) => {
      resolve('第一次调用');
      resolve('吞没解决');
      reject(new Error('吞没解决'));
    });
  } catch {
    throw new Error('失败');
  }
}

main().then(console.log);
