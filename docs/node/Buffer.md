# Buffer

在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。这是来自 Node.js 官网的一段描述，比较晦涩难懂，总结起来一句话 Node.js 可以用来处理二进制流数据或者与之进行交互。

Buffer 用于读取或操作二进制数据流，做为 Node.js API 的一部分使用时无需 require，用于操作网络协议、数据库、图片和文件 I/O 等一些需要大量二进制数据的场景。Buffer **在创建时大小已经被确定且是无法调整的**，在内存分配这块 Buffer 是由 C++ 层面提供而不是 V8.

## 什么是 Stream

流，英文 Stream 是对输入输出设备的抽象，这里的设备可以是文件、网络、内存等。流是有方向性的，当程序从某个数据源读入数据，会开启一个输入流，这里的数据源可以是文件或者网络等，例如我们从 a.txt 文件读入数据。相反的当我们的程序需要写出数据到指定数据源（文件、网络等）时，则开启一个输出流。当有一些大文件操作时，我们就需要 Stream 像管道一样，一点一点的将数据流出。



### 什么是 Buffer？

通过以上 Stream 的讲解，我们已经看到数据是从一端流向另一端，那么他们是如何流动的呢？

通常，数据的移动是为了处理或者读取它，并根据它进行决策。伴随着时间的推移，每一个过程都会有一个最小或最大数据量。如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理。

这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 RAM 中。这些概念可能会很难理解，不要担心下面通过一个例子进一步说明。

**公共汽车站乘车例子**

举一个公共汽车站乘车的例子，通常公共汽车会每隔几十分钟一趟，在这个时间到达之前就算乘客已经满了，车辆也不会提前发车，早到的乘客就需要先在车站进行等待。假设到达的乘客过多，后到的一部分则需要在公共汽车站等待下一趟车驶来。

![20200420182242](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200420182242.png)



在上面例子中的等待区公共汽车站，对应到我们的 Node.js 中也就是缓冲区（Buffer），另外乘客到达的速度是我们不能控制的，我们能控制的也只有何时发车，对应到我们的程序中就是我们无法控制数据流到达的时间，可以做的是能决定何时发送数据。

## Buffer基本使用

了解了 Buffer 的一些概念之后，我们来看下 Buffer 的一些基本使用，这里并不会列举所有的 API 使用，仅列举一部分常用的，更详细的可参考 Node.js 中文网。

### 创建Buffer

在 6.0.0 之前的 Node.js 版本中， Buffer 实例是使用 Buffer 构造函数创建的，该函数根据提供的参数以不同方式分配返回的 Buffer `newBuffer()`。

现在可以通过 Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe() 三种方式来创建

**Buffer.from()**

1. `const b1 =` `Buffer.from('10');`
2. `const b2 =` `Buffer.from('10',` `'utf8');`
3. `const b3 =` `Buffer.from([10]);`
4. `const b4 =` `Buffer.from(b3);`
5. `console.log(b1, b2, b3, b4);` `//    `



**Buffer.alloc**

返回一个已初始化的 Buffer，可以保证新创建的 Buffer 永远不会包含旧数据。

1. `const bAlloc1 =` `Buffer.alloc(10);` `// 创建一个大小为 10 个字节的缓冲区`
2. `console.log(bAlloc1);` `// `



**Buffer.allocUnsafe**

创建一个大小为 size 字节的新的未初始化的 Buffer，由于 Buffer 是未初始化的，因此分配的内存片段可能包含敏感的旧数据。在 Buffer 内容可读情况下，则可能会泄露它的旧数据，这个是不安全的，使用时要谨慎。

1. `const bAllocUnsafe1 =` `Buffer.allocUnsafe(10);`
2. `console.log(bAllocUnsafe1);` `// `



### Buffer 字符编码

通过使用字符编码，可实现 Buffer 实例与 JavaScript 字符串之间的相互转换，目前所支持的字符编码如下所示：

- 'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
- 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
- 'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- 'ucs2' - 'utf16le' 的别名。
- 'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
- 'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
- 'binary' - 'latin1' 的别名。
- 'hex' - 将每个字节编码成两个十六进制的字符。

1. `const buf =` `Buffer.from('hello world',` `'ascii');`
2. `console.log(buf.toString('hex'));` `// 68656c6c6f20776f726c64`



### 字符串与 Buffer 类型互转

**字符串转 Buffer**

这个相信不会陌生了，通过上面讲解的 Buffer.form() 实现，如果不传递 encoding 默认按照 UTF-8 格式转换存储

1. `const buf =` `Buffer.from('Node.js 技术栈',` `'UTF-8');`
2. `console.log(buf);` `// `
3. `console.log(buf.length);` `// 17`



**Buffer 转换为字符串**

Buffer 转换为字符串也很简单，使用 toString([encoding], [start], [end]) 方法，默认编码仍为 UTF-8，如果不传 start、end 可实现全部转换，传了 start、end 可实现部分转换（这里要小心了）

1. `const buf =` `Buffer.from('Node.js 技术栈',` `'UTF-8');`
2. `console.log(buf);` `// `
3. `console.log(buf.length);` `// 17`
4. `console.log(buf.toString('UTF-8',` `0,` `9));` `// Node.js �`



运行查看，可以看到以上输出结果为 `Node.js�` 出现了乱码，为什么？

**转换过程中为什么出现乱码？**

首先以上示例中使用的默认编码方式 UTF-8，问题就出在这里一个中文在 UTF-8 下占用 3 个字节， `技` 这个字在 buf 中对应的字节为 `8a80e6`而我们的设定的范围为 0～9 因此只输出了 `8a`，这个时候就会造成字符被截断出现乱码。

下面我们改下示例的截取范围：

1. `const buf =` `Buffer.from('Node.js 技术栈',` `'UTF-8');`
2. `console.log(buf);` `// `
3. `console.log(buf.length);` `// 17`
4. `console.log(buf.toString('UTF-8',` `0,` `11));` `// Node.js 技`



可以看到已经正常输出了