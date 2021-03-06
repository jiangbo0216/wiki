# HTTP 2.0 协议详解

## 一、HTTP 2.0：改进传输性能

> HTTP 2.0 的主要目标是改进传输性能，实现低延迟和高吞吐量。从另一方面看，HTTP 的高层协议语义并不会因为这次版本升级而受影响。所有HTTP 首部、值，以及它们的使用场景都不会变。

### 现有的任何网站和应用，无需做任何修改都可以在HTTP 2.0 上跑起来。不用为了利用HTTP 2.0 的好处而修改标记。HTTP 服务器必须运行HTTP 2.0 协议，但大部分用户都不会因此而受到影响。

## 二、HTTP2.0历史及其与SPDY的渊源

> SPDY 是谷歌开发的一个实验性协议，于2009 年年中发布，主要目标是通过解决HTTP 1.1 中广为人知的一些性能限制，来减少网页的加载延迟

### SPDY协议设定的目标

- 页面加载时间（PLT，Page • Load Time）降低 50%；
- 无需网站作者修改任何内容；
- 把部署复杂性降至最低，无需变更网络基础设施；
- 与开源社区合作开发这个新协议；
- 收集真实性能数据，验证这个实验性协议是否有效。

[![Alt text](HTTP2-imgs/binary-frame-layout.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/binary-frame-layout.png)

### 注：为了达到降低50% 页面加载时间的目标，SPDY 引入了一个新的二进制分帧数据层，以实现多向请求和响应、优先次序、最小化及消除不必要的网络延迟，目的是更有效地利用底层TCP 连接；

### HTTP-WG（HTTP Working Group）在2012 年初把HTTP 2.0提到了议事日程，吸取SPDY 的经验教训，并在此基础上制定官方标准

## 三、HTTP2.0深入探究

> HTTP/2.0 应该满足如下条件：

- 相对于使用TCP 的HTTP 1.1，• 用户在大多数情况下的感知延迟要有实质上、可度量的改进；
- 解决 HTTP 中的“队首阻塞”问题；
- 并行操作无需与服务器建立多个连接，从而改进 TCP 的利用率，特别是拥塞控制方面；
- 保持 HTTP 1.1 的语义，利用现有文档，包括（但不限于）HTTP 方法、状态码、URI，以及首部字段；
- 明确规定 HTTP 2.0 如何与 HTTP 1.x 互操作，特别是在中间介质上；
- 明确指出所有新的可扩展机制以及适当的扩展策略。

### HTTP 2.0 致力于突破上一代标准众所周知的性能限制，但它也是对之前1.x 标准的扩展，而非替代。之所以要递增一个大版本到2.0，主要是因为它改变了客户端与服务器之间交换数据的方式，HTTP 2.0 增加了新的二进制分帧数据层

## 四、HTTP2.0设计和技术目标

> HTTP/2.0 通过支持首部字段压缩和在同一连接上发送多个并发消息，让应用更有效地利用网络资源，减少感知的延迟时间。而且，它还支持服务器到客户端的主动推送机制。

- 二进制分帧层

  - HTTP 2.0 二进制分帧层，封装HTTP 消息并在客户端与服务器之间传输

  [![Alt text](HTTP2-imgs/binary-frame-layout.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/binary-frame-layout.png)

  - HTTP2.0 将所有传输的信息分割为更小的消息和帧，并对它们采用二进制格式的编码。
  - 注：HTTPS 是二进制分帧的另一个典型示例：所有HTTP 消息都以透明的方式为我们编码和解码，不必对应用进行任何修改。HTTP2.0工作原理有点类似

- 流、消息和帧

  - 流：流是连接中的一个虚拟信道，可以承载双向的消息；每个流都有一个唯一的整数标识符（1、2…N）；
  - 消息：是指逻辑上的 HTTP 消息，比如请求、响应等，由一或多个帧组成。
  - 帧：HTTP 2.0 通信的最小单位，每个帧包含帧首部，至少也会标识出当前帧所属的流，承载着特定类型的数据，如 HTTP 首部、负荷，等等

  [![Alt text](HTTP2-imgs/http2-connect-stream.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-connect-stream.png)

  - HTTP 2.0 的所有帧都采用二进制编码，所有首部数据都会被压缩。
  - 所有通信都在一个 TCP 连接上完成。
  - HTTP 2.0 把HTTP协议通信的基本单位缩小为一个一个的帧，这些帧对应着逻辑流中的消息。相应地，很多流可以并行地在同一个TCP 连接上交换消息

- 多向请求与响应

  - HTTP 2.0 中新的二进制分帧层突破了这些限制，实现了多向请求和响应：客户端和服务器可以把HTTP 消息分解为互不依赖的帧，然后乱序发送，最后再在另一端把它们重新组合起来

    [![Alt text](HTTP2-imgs/http2-request-more.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-request-more.png)

  - 图中包含了同一个连接上多个传输中的数据流：客户端正在向服务器传输一个DATA 帧（stream 5），与此同时，服务器正向客户端乱序发送stream 1 和stream 3的一系列帧。此时，一个连接上有3 个请求/ 响应并行交换！

  - 把HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装是HTTP 2.0 最重要的一项增强。这个机制会在整个Web 技术栈中引发一系列连锁反应，从而带来巨大的性能提升。

  ```
    * 可以并行交错地发送请求，请求之间互不影响；
    * 可以并行交错地发送响应，响应之间互不干扰；
    * 只使用一个连接即可并行发送多个请求和响应；
    * 消除不必要的延迟，从而减少页面加载的时间；
    * 不必再为绕过 HTTP 1.x 限制而多做很多工作；
  ```

  - HTTP 2.0 的二进制分帧机制解决了HTTP 1.x 中存在的队首阻塞问题，也消除了并行处理和发送请求及响应时对多个连接的依赖。

- 请求优先级

  - 把HTTP 消息分解为很多独立的帧之后，就可以通过优化这些帧的交错和传输顺序，每个流都可以带有一个31 比特的优先值：0 表示最高优先级；2的31次方-1 表示最低优先级。
  - 服务器可以根据流的优先级，控制资源分配（CPU、内存、带宽），而在响应数据准备好之后，优先将最高优先级的帧发送给客户端。
  - HTTP 2.0 一举解决了所有这些低效的问题：浏览器可以在发现资源时立即分派请求，指定每个流的优先级，让服务器决定最优的响应次序。这样请求就不必排队了，既节省了时间，也最大限度地利用了每个连接。

- 每个来源一个连接

  - 有了新的分帧机制后，HTTP 2.0 不再依赖多个TCP 连接去实现多流并行了。每个数据流都拆分成很多帧，而这些帧可以交错，还可以分别优先级。HTTP 2.0 连接都是持久化的，而且客户端与服务器之间也只需要一个连接即可。
    - 实验表明，客户端使用更少的连接肯定可以降低延迟时间。HTTP 2.0 发送的总分组数量比HTTP 差不多要少40%。
    - 大多数HTTP 连接的时间都很短，而且是突发性的，但TCP 只在长时间连接传输大块数据时效率才最高。HTTP 2.0 通过让所有数据流共用同一个连接，可以更有效地使用TCP 连接。

- 流量控制

  - HTTP 2.0 为数据流和连接的流量控制提供了一个简单的机制：
    - 流量控制基于每一跳进行，而非端到端的控制；
    - 流量控制基于窗口更新帧进行，即接收方广播自己准备接收某个数据流的多少字节，以及对整个连接要接收多少字节；
    - 流量控制窗口大小通过 WINDOW_UPDATE 帧更新，这个字段指定了流 ID 和窗口大小递增值；
    - 流量控制有方向性，即接收方可能根据自己的情况为每个流乃至整个连接设置任意窗口大小；
    - 流量控制可以由接收方禁用，包括针对个别的流和针对整个连接。

- 服务器推送

  - HTTP 2.0 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。服务器向客户端推送资源无需客户端明确地请求。

    [![Alt text](HTTP2-imgs/http2-server-push.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-server-push.png)

  - HTTP 2.0 连接后，客户端与服务器交换SETTINGS 帧，借此可以限定双向并发的流的最大数量。因此，客户端可以限定推送流的数量，或者通过把这个值设置为0 而完全禁用服务器推送。

  - 所有推送的资源都遵守同源策略。换句话说，服务器不能随便将第三方资源推送给客户端，而必须是经过双方确认才行。

  - PUSH_PROMISE：所有服务器推送流都由PUSH_PROMISE 发端，服务器向客户端发出的有意推送所述资源的信号。客户端接收到PUSH_PROMISE 帧之后，可以视自身需求选择拒绝这个流

  - 几点限制：

    - 服务器必须遵循请求- 响应的循环，只能借着对请求的响应推送资源
    - PUSH_PROMISE 帧必须在返回响应之前发送，以免客户端出现竞态条件。

- 首部压缩（HPACK压缩算法，一边用index mapping table压缩，一边编码，这个table由静态表和动态表组成）

  - http2.0会压缩首部元数据：在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送；“首部表”在http2.0的连接存续期内始终存在，由客户端和服务器共同渐进地更新；每个新的首部键值对要么追加到当前表的末尾，要么替换表中之前的值。

  - http2.0首部差异化传输

    [![Alt text](HTTP2-imgs/http2-header-diff.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-header-diff.png)

    - 请求与响应首部的定义在HTTP2.0中基本没有改变，只是所有首部键必须全部小写，而且请求行要独立为 :method、:scheme、:host、:path这些键值对。

- 有效的HTTP2.0升级与发现

  - 大多数现代浏览器都内置有高效的后台升级机制，支持HTTP2.0的客户端在发起新请求之前，必须能发现服务器及所有中间设备是否支持HTTP2.0协议。有三种可能的情况：
    - 通过TLS和ALPN发起新的HTTPS连接；
    - 根据之前的信息发起新的HTTP连接；
    - 没有之前的信息而发起新的HTTP连接。
  - HTTPS 协商过程中有一个环节会使用ALPN（应用层协议协商）。减少网络延迟是HTTP 2.0 的关键条件，因此在建立HTTPS 连接时一定会用到ALPN协商。
  - 通过常规非加密信道建立HTTP2.0连接需要多做一点工作。因为HTTP1.0和HTTP2.0都使用同一个端口（80），有没有服务器是否支持HTTP2.0的其他任何信息，此时客户端只能使用HTTP Upgrade机制通过协调确定适当的协议：

  ```
  Upgrade: HTTP/2.0 ➊
  HTTP2-Settings: (SETTINGS payload) ➋
  HTTP/1.1 200 OK ➌
  HTTP/1.1 101 Switching Protocols ➍
  ...
  ```

  ```
  ➊ 发起带有HTTP 2.0 Upgrade 首部的HTTP 1.1 请求
  ➋ HTTP/2.0 SETTINGS 净荷的Base64 URL 编码
  ➌ 服务器拒绝升级，通过HTTP 1.1 返回响应
  ➍ 服务器接受HTTP 2.0 升级，切换到新分帧
  ```

## HTTP2.0二进制分帧简介

> 建立HTTP2.0连接后，客户端与服务器会通过交换帧来通信，帧是基于这个新协议通信的最小单位。所有帧都共享一个8字节的首部，其中包含帧的长度、类型、标志，还有一个保留位和一个31位的流标识符。

[![Alt text](HTTP2-imgs/http2-binary-summary.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-binary-summary.png)

- 发起新流

  - 在发送应用数据之前，必须创建一个新流并随之发送相应的元数据，比如流优先级、HTTP 首部等；
  - 客户端通过发送HEADERS帧来发起新流；
  - 服务器通过发送 PUSH_PROMISE 帧来发起推送流。

  [![Alt text](HTTP2-imgs/http2-headers-priority.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-headers-priority.png)

- 发送应用数据

  - 创建新流并发送HTTP 首部之后，接下来就是利用DATA 帧。应用数据可以分为多个DATA 帧，最后一帧要翻转帧首部的END_STREAM 字段

  [![Alt text](HTTP2-imgs/http2-data-frame.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-data-frame.png)

  - HTTP 2.0 标准要求DATA 帧不能超过2的14次方-1（16383）字节。长度超过这个阀值的数据，就得分帧发送。

- HTTP2.0帧数据流分析

  - HTTP2.0在共享的连接上同时发送请求和响应

  [![Alt text](HTTP2-imgs/http2-connect-frame.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-connect-frame.png)

  - 3 个流的 ID 都是奇数，说明都是客户端发起的
  - 服务器发送的 stream 1 包含多个 DATA 帧，这是对客户端之前请求的响应数据
  - 服务器在交错发送 stream 1 的 DATA 帧和 stream 3 的 HEADERS 帧，这就是响应的多路复用！
  - 客户端正在发送 stream 5 的 DATA 帧，表明 HEADERS 帧之前已经发送过了。

## 针对HTTP2.0的优化建议

- 去掉对1.x的优化

  - 每个来源使用一个连接，HTTP 2.0 通过将一个TCP 连接的吞吐量最大化来提升性能。
  - 去掉不必要的文件合并和图片拼接：HTTP 2.0，很多小资源都可以并行发送
  - 利用服务器推送：之前针对HTTP 1.x 而嵌入的大多数资源，都可以而且应该通过服务器推送来交付。

- 双协议应用策略

  - 相同的应用代码，双协议部署
  - 分离应用代码，双协议部署
  - 动态HTTP 1.x和HTTP 2.0优化：某些自动化的Web 优化框架在响应请求时动态重写交付的应用代码（包括连接、拼合、分区，等等）
  - 单协议部署

- 1.x与2.0的相互转换

  [![Alt text](HTTP2-imgs/http2-proxy-http1x.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-proxy-http1x.png)

- 评估服务器质量与性能

  - HTTP 2.0 服务器必须理解流优先级；
  - HTTP 2.0 服务器必须根据优先级处理响应和交付资源；
  - HTTP 2.0 服务器必须支持服务器推送；
  - HTTP 2.0 服务器应该提供不同推送策略的实现。

- 2.0与TLS

  - 两种可能出现ALPN 协商和TLS 终止的情况
    - TLS 连接可能会在 HTTP 2.0 服务器上终止；
    - TLS 连接可能会在上游（如负载均衡器）上终止。
  - 第一种情况要求HTTP 2.0 服务器能够处理TLS；
  - 第二种情况建立一条加密信道，直接将非加密的HTTP 2.0 流发送到服务器

  [![Alt text](HTTP2-imgs/http2-tls-http1x.png)](https://raw.githubusercontent.com/zqjflash/http2-protocol/master/http2-tls-http1x.png)

- 负载均衡器、代理及应用服务器

  - 要在TLS 之上实现HTTP 2.0通信，终端服务器必须支持 ALPN；
  - 尽可能在接近用户的地方终止 TLS；
  - 如果无法支持 ALPN，那么选择 TCP 负载均衡模式；
  - 如果无法支持 ALPN 且 TCP 负载均衡也做不到，那么就退而求其次，在非加密信道上使用HTTP 的Upgrade 流；