## CMD控制台输入
### [readline](https://nodejs.org/api/readline.html#readline_event_close)
Event
* close
* line
* pause
* resume
* SIGCONT
* SIGINT
* SIGTSTP
* rl.close()
* rl.pause()
* rl.prompt([preserveCursor])
* rl.question(query, callback)
* rl.resume()
* rl.setPrompt(prompt)
* rl.write(data[, key])
* rl[Symbol.asyncIterator]()
* rl.line
* rl.cursor
* rl.getCursorPos()
* readline.clearLine(stream, dir[, callback])
* readline.clearScreenDown(stream[, callback])
* readline.createInterface(options)
  * Use of the completer Function
* readline.cursorTo(stream, x[, y][, callback])
* readline.emitKeypressEvents(stream[, interface])
* readline.moveCursor(stream, dx, dy[, callback])

示例代码1
```js
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const question = (query) => new Promise(resolve => rl.question(query, (answer) => resolve(answer)));

(async () => {
  let answer = await question('这个是异步的还是同步的？ \n');
  console.log(`真的是${answer}吗QAQ……`);

  answer = await question('async/await好不好用啊 ');
  console.log(`${answer}……`);

  answer = await question('等待多少秒？ ');
  rl.pause();
  await wait(parseInt(answer) * 1000);
  rl.resume();

  while ((await question('输入bye退出 ')).trim() !== 'bye');

  console.log('Good day.');

  rl.close();
})();
```

示例代码2
```js
require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}).on('line', function (line) {
  // TODO: 处理这一行输入
  console.log(line)
});

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
  // 对答案进行处理
  console.log(`多谢你的反馈：${answer}`);
  rl.close();
});

```

### process
```js
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdout.write('请输入:'); //标准输出
process.stdin.on('data', function (data) {
    var str = data.slice(0, -1);
    process.stdin.emit('end');
    process.stdout.write('输入的:'+str);
     
});
process.stdin.on('end', function () {
     process.stdin.pause();
});
```
