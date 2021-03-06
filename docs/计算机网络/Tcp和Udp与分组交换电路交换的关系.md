电路交换渐渐被IP分组交换所取代，是由于电路交换有一个**致命的弱点：信道资源独占**，即使没有数据传输，依然会占据传输信道。

举个例子：中国与哈萨克斯坦建了石油管道，





![img](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/v2-55f9487e7ee7c9686eebad8774fae282_720w.jpg)





这个管道只能用于石油的运输，即使闲置，也不能用于天然气的运输，也不能用于自来水的运输，那要实现三者的运输，只能建设三根管道。

如果中国与哈萨克斯坦有一条高速公路，

![img](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/v2-977a1d34816654565b3ef02f2dd9a6a1_720w.jpg)



这条公路上跑着大型集装箱卡车，有运输原油的，有运输天然气的，也有运输自来水的，虽然卡车也占用道路资源，但一旦卡车经过，道路资源就被释放出来了，别的卡车还可以跑，这样只需要一条高速公路，可以实现多种任务，不光可以运货，还可以跑旅游大巴、小汽车，道路的利用率也很高，最最重要的是：**道路是共享的，道路不属于任何个体！**

以上的**输油管道**代表的就是**电路交换**，**石油**代表**语音数据**；而**高速公路**代表的是**IP网络分组交换**，**集卡**代表**IP包（分组）。**

如果上面的内容没看出两者的区别，请自觉一点，继续看，直到懂为止；如果看懂了，请继续阅读。

IP分组交换技术发明与上世纪60，70年代，远远落后于**电话技术**与**电报技术**（19世纪末发明的），那个时候电话与电报技术已经非常成熟，IP网络技术来源于生活、高于生活，它借鉴了电话、电报的服务理念，希望IP网络也可以提供类似电话、电报的传输服务。

TCP用来提供类似电话的服务，传输数据前**先建立连接（但和电话不一样的是，TCP不会用什么特权思维，将带宽资源保留给这个连接独占使用）**，这个不难，使用TCP头部字段就可以实现，但TCP连接是一个虚连接，何谓虚连接？就是依靠TCP报文双向的交换，本地维持一个状态机，一旦状态机为连接状态（三次握手成功，established)，就可以发送数据了，这个**连接在没有数据发送时，不会占用任何带宽，即使有数据需要传输，数据经过了物理链路，带宽就会空出来，就好比集卡经过一个路段，就会释放道路资源**。

UDP来提供类似电报的服务，不需要和接收方建立连接，电报就会到达对方，但**有一个前提**：对方的地址信息一定要对哦，否则到达不了目的地，对于**UDP**来说，就是**目的IP要对**，这样电报可以找到**电脑**，其次目的**端口要对（需要listening）**，这样可以找到对应的**进程（应用程序）**。

题主提到的其它问题，比如如何在电路交换上传输TCP或UDP，这不就是用电话拨号上网吗？ 电路交换把电脑与PSTN网关连接起来（信道资源独占），就是一条P2P线路了，PPP协议建立PPP连接，分配IP，就可以上网了，IP网络可以传输UDP或TCP。

最后一个问题就更简单了，以太网也是分组交换，以太网可以传输IP分组，IP分组可以封装UDP或TCP。

\-------
**电话拨号如何连接**
需要了解电话的历史，电话最初是直接拉电话线连接两台电话，后来有了人工插拔交换机（其实就是将需要连接的两部电话，电话线连接起来），后来又有了**PDH/SDH**技术，就是一根线上，可以传输[32/500/10000](https://www.zhihu.com/question/tel:32/500/10000)线信道（基于时隙time slot，一个slot 就是一个信道，分时复用的由来），这个信道的分配是由电话信令拨号连接时，**端对端、沿途一段一段顺序分配**，电话信令使用独立的信道，语音使用动态分配的语音信道，直到电话挂了之后，动态分配的语音信道才会释放，释放的顺序是从先挂电话的一方发起，由电话所连交换机使用信令信道顺序释放**（俗称的拆线）。**