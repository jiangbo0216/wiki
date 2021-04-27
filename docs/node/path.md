

然后我们在task.js文件中写入一下代码

```js
const path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

在editor目录下运行node src/task.js，我们可以看到结果如下：




1.__dirname:返回的是这个文件所在文件夹的位置
2.__filename:你运行命令代表的是文件所在的位置，不管你运行什么命令，都是指向文件
3.process.cwd():你运行node命令所在文件夹的位置，比如你在src目录下运行，那么就是输出到src为止，下面的同理。


