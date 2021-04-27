很多人都想知道单线程的 [Node.js](https://nodejs.org/en/) 怎么能与多线程后端竞争。考虑到其所谓的单线程特性，许多大公司选择 Node 作为其后端似乎违反直觉。要想知道原因，必须理解其单线程的真正含义。

JavaScript 的设计非常适合在网上做比较简单的事情，比如验证表单，或者说创建彩虹色的鼠标轨迹。 [在2009年，Node.js的创始人 Ryan Dahl](https://www.youtube.com/watch?v=ztspvPYybIY)使开发人员可以用该语言编写后端代码。

通常支持多线程的后端语言具有各种机制，用于在线程和其他面向线程的功能之间同步数据。要向 JavaScript 添加对此类功能的支持，需要修改整个语言，这不是 Dahl 的目标。为了让纯 JavaScript 支持多线程，他必须想一个变通方法。接下来让我们探索一下其中的奥秘……

### Node.js 是如何工作的

Node.js 使用两种线程：*event loop* 处理的主线程和 *worker pool* 中的几个辅助线程。

事件循环是一种机制，它采用回调（函数）并注册它们，准备在将来的某个时刻执行。它与相关的 JavaScript 代码在同一个线程中运行。当 JavaScript 操作阻塞线程时，事件循环也会被阻止。

工作池是一种执行模型，它产生并处理单独的线程，然后同步执行任务，并将结果返回到事件循环。事件循环使用返回的结果执行提供的回调。

简而言之，它负责异步 I/O操作 —— 主要是与系统磁盘和网络的交互。它主要由诸如 `fs`（I/O 密集）或 `crypto`（CPU 密集）等模块使用。工作池用 [libuv](http://docs.libuv.org/en/v1.x/) 实现，当 Node 需要在 JavaScript 和 C++ 之间进行内部通信时，会导致轻微的延迟，但这几乎不可察觉。

基于这两种机制，我们可以编写如下代码：

```
fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
 if (err) {
   return null;
 }

 console.log(content.toString());
});
复制代码
```

前面提到的 `fs` 模块告诉工作池使用其中一个线程来读取文件的内容，并在完成后通知事件循环。然后事件循环获取提供的回调函数，并用文件的内容执行它。

以上是非阻塞代码的示例，我们不必同步等待某事的发生。只需告诉工作池去读取文件，并用结果去调用提供的函数即可。由于工作池有自己的线程，因此事件循环可以在读取文件时继续正常执行。

在不需要同步执行某些复杂操作时，这一切都相安无事：任何运行时间太长的函数都会阻塞线程。如果应用程序中有大量这类功能，就可能会明显降低服务器的吞吐量，甚至完全冻结它。在这种情况下，无法继续将工作委派给工作池。

在需要对数据进行复杂的计算时（如AI、机器学习或大数据）无法真正有效地使用 Node.js，因为操作阻塞了主（且唯一）线程，使服务器无响应。在 Node.js v10.5.0 发布之前就是这种情况，在这一版本增加了对多线程的支持。

### 简介：*worker_threads*

`worker_threads` 模块允许我们创建功能齐全的多线程 Node.js 程序。

thread worker 是在单独的线程中生成的一段代码（通常从文件中取出）。

注意，术语 *thread worker*，*worker* 和 *thread* 经常互换使用，他们都指的是同一件事。

要想使用 thread worker，必须导入 `worker_threads` 模块。让我们先写一个函数来帮助我们生成这些thread worker，然后再讨论它们的属性。

```
type WorkerCallback = (err: any, result?: any) => any;

export function runWorker(path: string, cb: WorkerCallback, workerData: object | null = null) {
 const worker = new Worker(path, { workerData });

 worker.on('message', cb.bind(null, null));
 worker.on('error', cb);

 worker.on('exit', (exitCode) => {
   if (exitCode === 0) {
     return null;
   }

   return cb(new Error(`Worker has stopped with code ${exitCode}`));
 });

 return worker;
}
复制代码
```

要创建一个 worker，首先必须创建一个 `Worker` 类的实例。它的第一个参数提供了包含 worker 的代码的文件的路径；第二个参数提供了一个名为 `workerData` 的包含一个属性的对象。这是我们希望线程在开始运行时可以访问的数据。

请注意：不管你是用的是 JavaScript， 还是最终要转换为 JavaScript 的语言（例如，TypeScript），路径应该始终引用带有 `.js` 或 `.mjs` 扩展名的文件。

我还想指出为什么使用回调方法，而不是返回在触发  `message`  事件时将解决的 promise。这是因为 worker 可以发送许多  `message`  事件，而不是一个。

正如你在上面的例子中所看到的，线程间的通信是基于事件的，这意味着我们设置了 worker 在发送给定事件后调用的侦听器。

以下是最常见的事件：

```
worker.on('error', (error) => {});
复制代码
```

只要 worker 中有未捕获的异常，就会发出 `error` 事件。然后终止 worker，错误可以作为提供的回调中的第一个参数。

```
worker.on('exit', (exitCode) => {});
复制代码
```

在 worker 退出时会发出 `exit` 事件。如果在worker中调用了 `process.exit()`，那么 `exitCode` 将被提供给回调。如果 worker 以 `worker.terminate()` 终止，则代码为1。

```
worker.on('online', () => {});
复制代码
```

只要 worker 停止解析 JavaScript 代码并开始执行，就会发出 `online` 事件。它不常用，但在特定情况下可以提供信息。

```
worker.on('message', (data) => {});
复制代码
```

只要 worker 将数据发送到父线程，就会发出 `message` 事件。

现在让我们来看看如何在线程之间共享数据。

### 在线程之间交换数据

要将数据发送到另一个线程，可以用 `port.postMessage()` 方法。它的原型如下：

```
port.postMessage(data[, transferList])
复制代码
```

port 对象可以是 `parentPort`，也可以是 `MessagePort` 的实例 —— 稍后会详细讲解。

#### 数据参数

第一个参数 —— 这里被称为 `data` —— 是一个被复制到另一个线程的对象。它可以是复制算法所支持的任何内容。

数据由[结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)进行复制。引用自 Mozilla：

> 它通过递归输入对象来进行克隆，同时保持之前访问过的引用的映射，以避免无限遍历循环。

该算法不复制函数、错误、属性描述符或原型链。还需要注意的是，以这种方式复制对象与使用 JSON 不同，因为它可以包含循环引用和类型化数组，而 JSON 不能。

由于能够复制类型化数组，该算法可以在线程之间共享内存。

#### 在线程之间共享内存

人们可能会说像 `cluster` 或 `child_process` 这样的模块在很久以前就开始使用线程了。这话对，也不对。

`cluster` 模块可以创建多个节点实例，其中一个主进程在它们之间对请求进行路由。集群能够有效地增加服务器的吞吐量；但是我们不能用 `cluster` 模块生成一个单独的线程。

人们倾向于用 PM2 这样的工具来集中管理他们的程序，而不是在自己的代码中手动执行，如果你有兴趣，可以研究一下如何使用 `cluster` 模块。

`child_process` 模块可以生成任何可执行文件，无论它是否是用 JavaScript 写的。它和 `worker_threads` 非常相似，但缺少后者的几个重要功能。

具体来说 thread workers 更轻量，并且与其父线程共享相同的进程 ID。它们还可以与父线程共享内存，这样可以避免对大的数据负载进行序列化，从而更有效地来回传递数据。

现在让我们看一下如何在线程之间共享内存。为了共享内存，必须将  `ArrayBuffer` 或 `SharedArrayBuffer` 的实例作为数据参数发送到另一个线程。

这是一个与其父线程共享内存的 worker：

```
import { parentPort } from 'worker_threads';

parentPort.on('message', () => {
 const numberOfElements = 100;
 const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * numberOfElements);
 const arr = new Int32Array(sharedBuffer);

 for (let i = 0; i < numberOfElements; i += 1) {
   arr[i] = Math.round(Math.random() * 30);
 }

 parentPort.postMessage({ arr });
});
复制代码
```

首先，我们创建一个 `SharedArrayBuffer`，其内存需要包含100个32位整数。接下来创建一个 `Int32Array` 实例，它将用缓冲区来保存其结构，然后用一些随机数填充数组并将其发送到父线程。

在父线程中：

```
import path from 'path';

import { runWorker } from '../run-worker';

const worker = runWorker(path.join(__dirname, 'worker.js'), (err, { arr }) => {
 if (err) {
   return null;
 }

 arr[0] = 5;
});

worker.postMessage({});
复制代码
```

把 `arr [0]` 的值改为`5`，实际上会在两个线程中修改它。

当然，通过共享内存，我们冒险在一个线程中修改一个值，同时也在另一个线程中进行了修改。但是我们在这个过程中也得到了一个好处：该值不需要进行序列化就可以另一个线程中使用，这极大地提高了效率。只需记住管理数据正确的引用，以便在完成数据处理后对其进行垃圾回收。

共享一个整数数组固然很好，但我们真正感兴趣的是共享对象 —— 这是存储信息的默认方式。不幸的是，没有 `SharedObjectBuffer` 或类似的东西，但我们可以[自己创建一个类似的结构](https://stackoverflow.com/questions/51053222/nodejs-worker-threads-shared-object-store)。

#### transferList参数

`transferList` 中只能包含 `ArrayBuffer` 和 `MessagePort`。一旦它们被传送到另一个线程，就不能再次被传送了；因为内存里的内容已经被移动到了另一个线程。

目前，还不能通过 `transferList`（可以使用 `child_process` 模块）来传输网络套接字。

#### 创建通信渠道

线程之间的通信是通过 port 进行的，port 是 `MessagePort` 类的实例，并启用基于事件的通信。

使用 port 在线程之间进行通信的方法有两种。第一个是默认值，这个方法比较容易。在 worker 的代码中，我们从`worker_threads` 模块导入一个名为 `parentPort` 的对象，并使用对象的 `.postMessage()` 方法将消息发送到父线程。

这是一个例子：

```
import { parentPort } from 'worker_threads';
const data = {
 // ...
};

parentPort.postMessage(data);
复制代码
```

`parentPort` 是 Node.js 在幕后创建的 `MessagePort` 实例，用于与父线程进行通信。这样就可以用 `parentPort` 和 `worker` 对象在线程之间进行通信。

线程间的第二种通信方式是创建一个 `MessageChannel` 并将其发送给 worker。以下代码是如何创建一个新的 `MessagePort` 并与我们的 worker 共享它：

```
import path from 'path';
import { Worker, MessageChannel } from 'worker_threads';

const worker = new Worker(path.join(__dirname, 'worker.js'));

const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => {
 console.log('message from worker:', message);
});

worker.postMessage({ port: port2 }, [port2]);
复制代码
```

在创建 `port1` 和 `port2` 之后，我们在 `port1` 上设置事件监听器并将 `port2` 发送给 worker。我们必须将它包含在 `transferList` 中，以便将其传输给 worker 。

在 worker 内部：

```
import { parentPort, MessagePort } from 'worker_threads';

parentPort.on('message', (data) => {
 const { port }: { port: MessagePort } = data;

 port.postMessage('heres your message!');
});
复制代码
```

这样，我们就能使用父线程发送的 port 了。

使用 `parentPort` 不一定是错误的方法，但最好用 `MessageChannel` 的实例创建一个新的 `MessagePort`，然后与生成的 worker 共享它。

请注意，在后面的例子中，为了简便起见，我用了 `parentPort`。

### 使用 worker 的两种方式

可以通过两种方式使用 worker。第一种是生成一个 worker，然后执行它的代码，并将结果发送到父线程。通过这种方法，每当出现新任务时，都必须重新创建一个工作者。

第二种方法是生成一个 worker 并为 `message` 事件设置监听器。每次触发 `message` 时，它都会完成工作并将结果发送回父线程，这会使 worker 保持活动状态以供以后使用。

Node.js 文档推荐第二种方法，因为在创建 thread worker 时需要创建虚拟机并解析和执行代码，这会产生比较大的开销。所以这种方法比不断产生新 worker 的效率更高。

这种方法被称为工作池，因为我们创建了一个工作池并让它们等待，在需要时调度 `message` 事件来完成工作。

以下是一个产生、执行然后关闭 worker 例子：

```
import { parentPort } from 'worker_threads';

const collection = [];

for (let i = 0; i < 10; i += 1) {
 collection[i] = i;
}

parentPort.postMessage(collection);
复制代码
```

将 `collection` 发送到父线程后，它就会退出。

下面是一个 worker 的例子，它可以在给定任务之前等待很长一段时间：

```
import { parentPort } from 'worker_threads';

parentPort.on('message', (data: any) => {
 const result = doSomething(data);

 parentPort.postMessage(result);
});
复制代码
```

### worker_threads 模块中可用的重要属性

`worker_threads` 模块中有一些可用的属性：

#### isMainThread

当不在工作线程内操作时，该属性为 `true` 。如果你觉得有必要，可以在 worker 文件的开头包含一个简单的 `if` 语句，以确保它只作为 worker 运行。

```
import { isMainThread } from 'worker_threads';

if (isMainThread) {
 throw new Error('Its not a worker');
}
复制代码
```

#### workerData

产生线程时包含在 worker 的构造函数中的数据。

```
const worker = new Worker(path, { workerData });
复制代码
```

在工作线程中：

```
import { workerData } from 'worker_threads';

console.log(workerData.property);
复制代码
```

#### parentPort

前面提到的 `MessagePort` 实例，用于与父线程通信。

#### threadId

分配给 worker 的唯一标识符。

------

现在我们知道了技术细节，接下来实现一些东西并在实践中检验学到的知识。

### 实现 `setTimeout`

`setTimeout` 是一个无限循环，顾名思义，用来检测程序运行时间是否超时。它在循环中检查起始时间与给定毫秒数之和是否小于实际日期。

```
import { parentPort, workerData } from 'worker_threads';

const time = Date.now();

while (true) {
    if (time + workerData.time <= Date.now()) {
        parentPort.postMessage({});
        break;
    }
}
复制代码
```

这个特定的实现产生一个线程，然后执行它的代码，最后在完成后退出。

接下来实现使用这个 worker 的代码。首先创建一个状态，用它来跟踪生成的 worker：

```
const timeoutState: { [key: string]: Worker } = {};
复制代码
```

然后时负责创建 worker 并将其保存到状态的函数：

```
export function setTimeout(callback: (err: any) => any, time: number) {
 const id = uuidv4();

 const worker = runWorker(
   path.join(__dirname, './timeout-worker.js'),
   (err) => {
     if (!timeoutState[id]) {
       return null;
     }

     timeoutState[id] = null;

     if (err) {
       return callback(err);
     }

     callback(null);
   },
   {
     time,
   },
 );

 timeoutState[id] = worker;

 return id;
}
复制代码
```

首先，我们使用 UUID 包为 worker 创建一个唯一的标识符，然后用先前定义的函数 `runWorker` 来获取 worker。我们还向 worker 传入一个回调函数，一旦 worker 发送了数据就会被触发。最后，把 worker 保存在状态中并返回 `id`。

在回调函数中，我们必须检查该 worker 是否仍然存在于该状态中，因为有可能会 `cancelTimeout()`，这将会把它删除。如果确实存在，就把它从状态中删除，并调用传给 `setTimeout` 函数的 `callback`。

`cancelTimeout` 函数使用 `.terminate()` 方法强制 worker 退出，并从该状态中删除该这个worker：

```
export function cancelTimeout(id: string) {
 if (timeoutState[id]) {
   timeoutState[id].terminate();

   timeoutState[id] = undefined;

   return true;
 }

 return false;
}
复制代码
```

如果你有兴趣，我也实现了 `setInterval`，代码在[这里](https://github.com/maciejcieslar/threads-nodejs/blob/master/src/timeout/timeout.ts#L64)，但因为它对线程什么都没做（我们重用`setTimeout`的代码），所以我决定不在这里进行解释。

我已经创建了一个短小的测试代码，目的是检查这种方法与原生方法的不同之处。你可以[在这里找到代码](https://github.com/maciejcieslar/threads-nodejs/blob/master/src/timeout/index.ts#L13)。这些是结果：

```
native setTimeout { ms: 7004, averageCPUCost: 0.1416 }
worker setTimeout { ms: 7046, averageCPUCost: 0.308 }
复制代码
```

我们可以看到 `setTimeout` 有一点延迟 - 大约40ms  - 这时 worker 被创建时的消耗。平均 CPU 成本也略高，但没什么难以忍受的（CPU 成本是整个过程持续时间内 CPU 使用率的平均值）。

如果我们可以重用 worker，就能够降低延迟和 CPU 使用率，这就是要实现工作池的原因。

### 实现工作池

如上所述，工作池是给定数量的被事先创建的 worker，他们保持空闲并监听 `message` 事件。一旦 `message` 事件被触发，他们就会开始工作并发回结果。

为了更好地描述我们将要做的事情，下面我们来创建一个由八个 thread worker 组成的工作池：

```
const pool = new WorkerPool(path.join(__dirname, './test-worker.js'), 8);
复制代码
```

如果你熟悉[限制并发操作](https://medium.freecodecamp.org/how-to-limit-concurrent-operations-in-javascript-b57d7b80d573)，那么你在这里看到的逻辑几乎相同，只是一个不同的用例。

如上面的代码片段所示，我们把指向 worker 的路径和要生成的 worker 数量传给了 `WorkerPool` 的构造函数。

```
export class WorkerPool<T, N> {
 private queue: QueueItem<T, N>[] = [];
 private workersById: { [key: number]: Worker } = {};
 private activeWorkersById: { [key: number]: boolean } = {};

 public constructor(public workerPath: string, public numberOfThreads: number) {
   this.init();
 }
}
复制代码
```

这里还有其他一些属性，如 `workersById` 和 `activeWorkersById`，我们可以分别保存现有的 worker 和当前正在运行的 worker 的 ID。还有 `queue`，我们可以使用以下结构来保存对象：

```
type QueueCallback<N> = (err: any, result?: N) => void;

interface QueueItem<T, N> {
 callback: QueueCallback<N>;
 getData: () => T;
}
复制代码
```

`callback` 只是默认的节点回调，第一个参数是错误，第二个参数是可能的结果。 `getData` 是传递给工作池 `.run()` 方法的函数（如下所述），一旦项目开始处理就会被调用。 `getData` 函数返回的数据将传给工作线程。

在 `.init()` 方法中，我们创建了 worker 并将它们保存在以下状态中：

```
private init() {
  if (this.numberOfThreads < 1) {
    return null;
  }

  for (let i = 0; i < this.numberOfThreads; i += 1) {
    const worker = new Worker(this.workerPath);

    this.workersById[i] = worker;
    this.activeWorkersById[i] = false;
  }
}
复制代码
```

为避免无限循环，我们首先要确保线程数 > 1。然后创建有效的 worker 数，并将它们的索引保存在 `workersById` 状态。我们在 `activeWorkersById` 状态中保存了它们当前是否正在运行的信息，默认情况下该状态始终为false。

现在我们必须实现前面提到的 `.run()` 方法来设置一个 worker 可用的任务。

```
public run(getData: () => T) {
  return new Promise<N>((resolve, reject) => {
    const availableWorkerId = this.getInactiveWorkerId();

    const queueItem: QueueItem<T, N> = {
      getData,
      callback: (error, result) => {
        if (error) {
          return reject(error);
        }
return resolve(result);
      },
    };

    if (availableWorkerId === -1) {
      this.queue.push(queueItem);

      return null;
    }

    this.runWorker(availableWorkerId, queueItem);
  });
}
复制代码
```

在 promise 函数里，我们首先通过调用 `.getInactiveWorkerId()` 来检查是否存在空闲的 worker 可以来处理数据：

```
private getInactiveWorkerId(): number {
  for (let i = 0; i < this.numberOfThreads; i += 1) {
    if (!this.activeWorkersById[i]) {
      return i;
    }
  }

  return -1;
}
复制代码
```

接下来，我们创建一个 `queueItem`，在其中保存传递给 `.run()` 方法的 `getData` 函数以及回调。在回调中，我们要么 `resolve` 或者 `reject` promise，这取决于 worker 是否将错误传递给回调。

如果 `availableWorkerId` 的值是 -1，意味着当前没有可用的 worker，我们将 `queueItem` 添加到 `queue`。如果有可用的 worker，则调用 `.runWorker()` 方法来执行 worker。

在 `.runWorker()` 方法中，我们必须把当前 worker 的 `activeWorkersById` 设置为使用状态；为 `message` 和 `error` 事件设置事件监听器（并在之后清理它们）；最后将数据发送给 worker。

```
private async runWorker(workerId: number, queueItem: QueueItem<T, N>) {
 const worker = this.workersById[workerId];

 this.activeWorkersById[workerId] = true;

 const messageCallback = (result: N) => {
   queueItem.callback(null, result);

   cleanUp();
 };

 const errorCallback = (error: any) => {
   queueItem.callback(error);

   cleanUp();
 };

 const cleanUp = () => {
   worker.removeAllListeners('message');
   worker.removeAllListeners('error');

   this.activeWorkersById[workerId] = false;

   if (!this.queue.length) {
     return null;
   }

   this.runWorker(workerId, this.queue.shift());
 };

 worker.once('message', messageCallback);
 worker.once('error', errorCallback);

 worker.postMessage(await queueItem.getData());
}
复制代码
```

首先，通过使用传递的 `workerId`，我们从 `workersById` 中获得 worker 引用。然后，在 `activeWorkersById` 中，将 `[workerId]` 属性设置为true，这样我们就能知道在 worker 在忙，不要运行其他任务。

接下来，分别创建 `messageCallback` 和 `errorCallback` 用来在消息和错误事件上调用，然后注册所述函数来监听事件并将数据发送给 worker。

在回调中，我们调用 `queueItem` 的回调，然后调用 `cleanUp` 函数。在 `cleanUp` 函数中，要删除事件侦听器，因为我们会多次重用同一个 worker。如果没有删除监听器的话就会发生内存泄漏，内存会被慢慢耗尽。

在 `activeWorkersById` 状态中，我们将 `[workerId]` 属性设置为 `false`，并检查队列是否为空。如果不是，就从 `queue` 中删除第一个项目，并用另一个 `queueItem` 再次调用 worker。

接着创建一个在收到 `message` 事件中的数据后进行一些计算的 worker：

```
import { isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
 throw new Error('Its not a worker');
}

const doCalcs = (data: any) => {
 const collection = [];

 for (let i = 0; i < 1000000; i += 1) {
   collection[i] = Math.round(Math.random() * 100000);
 }

 return collection.sort((a, b) => {
   if (a > b) {
     return 1;
   }

   return -1;
 });
};

parentPort.on('message', (data: any) => {
 const result = doCalcs(data);

 parentPort.postMessage(result);
});
复制代码
```

worker 创建了一个包含 100 万个随机数的数组，然后对它们进行排序。只要能够多花费一些时间才能完成，做些什么事情并不重要。

以下是工作池简单用法的示例：

```
const pool = new WorkerPool<{ i: number }, number>(path.join(__dirname, './test-worker.js'), 8);

const items = [...new Array(100)].fill(null);

Promise.all(
 items.map(async (_, i) => {
   await pool.run(() => ({ i }));

   console.log('finished', i);
 }),
).then(() => {
 console.log('finished all');
});
复制代码
```

首先创建一个由八个 worker 组成的工作池。然后创建一个包含 100 个元素的数组，对于每个元素，我们在工作池中运行一个任务。开始运行后将立即执行八个任务，其余任务被放入队列并逐个执行。通过使用工作池，我们不必每次都创建一个 worker，从而大大提高了效率。

### 结论

`worker_threads` 提供了一种为程序添加多线程支持的简单的方法。通过将繁重的 CPU 计算委托给其他线程，可以显着提高服务器的吞吐量。通过官方线程支持，我们可以期待更多来自AI、机器学习和大数据等领域的开发人员和工程师使用 Node.js.



作者：前端先锋
链接：https://juejin.cn/post/6844903808330366989
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。