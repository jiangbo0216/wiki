# child_process 模块中的 spawn fork exec 与 execFile

具体用法参考[官方文档](https://nodejs.org/api/child_process.html)即可，已经写的很清楚。本文仅做一些简单对比。

#### 简单对比

| 方法                      | spawn                                                        | fork                                        | exec                   | execFile               |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------- | ---------------------- | ---------------------- |
| 是否通过 shell 执行子命令 | 否(*)                                                        | 否                                          | 是                     | 否(*)                  |
| 读取程序输出              | 利用子进程的 stdout / stderr                                 | 利用子进程的 stdout / stderr                | 在 callback 中一次返回 | 在 callback 中一次返回 |
| 父子进程通信              | `process.send()` 与 `process.on("message")` (仅当子进程为 Node 脚本时可用) | `process.send()` 与 `process.on("message")` | 不支持                 | 不支持                 |
| 备注                      |                                                              | 仅限执行 Node 脚本                          |                        |                        |

#### 说明

1. `fork`、`exec`、`execFile` 都是 `spawn` 的一种特殊情况，内部都是调用了 `spawn` 方法。
2. `spwan` 和 `execFile` 默认是创建子进程直接执行指定命令，但是可以通过 option 中的 `shell` 字段来明确要求在一个 shell 中执行命令。
3. 由于 `exec` 和 `execFile` 会把子进程的 stdout 和 stderr 缓存起来一次性返回给调用方，在子进程退出之前，这些缓存数据会在内存中不断累积。为了防止内存占用过多导致的问题，这两个方法的参数对象中接受一个 `maxBuffer` 字段，表示缓存数据的上限大小，超过该大小会导致子进程被 `kill()` 且缓存数据会被截断。该参数的默认值是 [`1024 * 1024`](https://github.com/nodejs/node/blob/v12.9.1/lib/child_process.js#L52)。
4. 以上几个方法的源码都在 [`lib/child_process.js`](https://github.com/nodejs/node/blob/v12.9.1/lib/child_process.js) 中可以找到。