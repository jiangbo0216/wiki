

## 描述

考虑以下示例：

```js
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

下表列出这个脚本的返回值：

| 对象             | 属性/索引                                                    | 描述                                          | 例子                    |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------- | ----------------------- |
| `result`         | `[0]`                                                        | 匹配的全部字符串                              | `Quick Brown Fox Jumps` |
| `[1], ...[*n* ]` | 括号中的分组捕获                                             | `[1] = Brown[2] = Jumps`                      |                         |
| `index`          | 匹配到的字符位于原始字符串的基于0的索引值                    | `4`                                           |                         |
| `input`          | 原始字符串                                                   | `The Quick Brown Fox Jumps Over The Lazy Dog` |                         |
| `re`             | `lastIndex`                                                  | 下一次匹配开始的位置                          | `25`                    |
| `ignoreCase`     | 是否使用了 "`i`" 标记使正则匹配忽略大小写                    | `true`                                        |                         |
| `global`         | 是否使用了 "`g`" 标记来进行全局的匹配.                       | `true`                                        |                         |
| `multiline`      | 是否使用了 "`m`" 标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。） | `false`                                       |                         |
| `source`         | 正则匹配的字符串                                             | `quick\s(brown).+?(jumps)`                    |                         |

## 