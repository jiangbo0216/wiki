## [N1盒子做旁路由刷OpenWRT系统（小白专用）](https://www.cnblogs.com/neobuddy/p/n1-setup.html)

### 为什么要用N1盒子

1. 现如今新上市的路由器，市面上能买到的300元以内的路由器大多数都是双频(5G Hz和2.4G Hz)和几年前相比无论是速度还是性能都有大幅度提升，作为普通用户已经能满足上网需求。但是由于部分用户对网络环境有其他需求例如，本地NAS存储，可以实现为一台不限速的网络存储，省去随身携带U盘；亦或是实现某些网站的自动签到；再或者实现去广告上网等等等等。
2. **使用普通路由器不可以吗？**由于需要的功能较多，现有路由器在运算和存储容量上都已经无法满足需求，就需要有一台本地的高性能路由器，软路由应运而生，既能解决特殊需求，也不影响网络质量。
3. **直接买软路由不就得了，N1盒子有什么优势？**由于软路由使用基本上是针对企业或者电子发烧友，普通家庭宽带要求速率不是很高，500M带宽用起来也是绰绰有余，家里也没有较多的网络设备，一来使用多口软路由有些浪费，软路由低配基本也要300元左右，耗电量高不说，多余的网络接口也没啥用，个头也大等等诸多原因，N1对于一般玩家完全够用。

### N1盒子是什么

- N1盒子是2018年初斐讯公司推出的一款天天链终端，用来做本地NAS(矿机)使用的，由于某些原因公司倒闭，N1盒子也无法使用，淘宝、京东等平台纷纷下架。由于设计N1的时候是为了计算，所以N1盒子在同领域算是性能较高且第三方源码及维护也比较及时，可以说是当今一款性价比较高的产品。

- N1盒子配置如下：

  

  ```
  分辨率 - 支持4K输出
  SoC - Allogic S905D 64bit 4Core Cortex-A53 1.5G Hz
  GPU - Mali-450
  RAM - 2GB
  ROM - 8GB eMMC
  WIFI - 2.4G/5G
  蓝牙 - BT4.1
  电源 - 5V/2A x1
  网口 - 千兆网口 x1
  HDMI - x1
  USB - USB2.0 x2
  ```

### 使用的工具及资源下载地址

1. 电脑
2. N1盒子
3. HDMI线
4. 显示器或者电视
5. 路由器（将路由器提前改为123网段：IP：192.168.123.1）
6. USB公对公线（可能用不到，最好备上一条）
7. USB2.0 U盘
8. 网线一根
9. N1盒子电源
10. [OpenWRT固件](https://www.right.com.cn/forum/thread-3160780-1-1.html)介绍固件的特性及固件相关信息。[百度网盘](https://pan.baidu.com/share/init?surl=bnigZ0cQTBY6pzo0saP1nQ)下载密码（6n4k）；或者[谷歌网盘](https://drive.google.com/drive/folders/1Gn2hMw2G6I_LgC8MlWFx_n9GDCbb9a14)
11. [降级工具+设置U盘启动工具](https://www.lanzous.com/ia9fgdi)

### N1盒子刷入OpenWRT系统方法

1. 接通连线如下：

   [![刷机](https://images.cnblogs.com/cnblogs_com/neobuddy/1664659/o_20031414384501刷机.png)](https://images.cnblogs.com/cnblogs_com/neobuddy/1664659/o_20031414384501刷机.png)

2. **降级：**

   > 开机后记录下N1盒子上被路由器DHCP分配的IP地址。
   >
   > 按照[降级教程](https://www.right.com.cn/forum/thread-340279-1-1.html)操作降级。注意：一定保证电脑和N1在同一个网段里。

3. **制作镜像U盘：**

   > 使用[balenaEtcher]工具将OpenWRT镜像写入U盘里，U盘里的东西会被格式化，请做好备份。

4. **设置盒子U盘启动：**

   > 将写好系统的U盘插入靠近HDMI口的U盘，然后使用U盘启动工具提示输入N1盒子的地址，大部分情况还是最初路由器DHCP分配的IP地址。之后N1会自动重启，屏幕会显示OpenWRT启动信息，此时即可在浏览器输入192.168.123.2即可进入后台界面。

5. **设置eMMC启动：**

   > 进入下图的TTYD界面，输入用户名：root密码：password。按照[OpenWRT固件](https://www.right.com.cn/forum/thread-3160780-1-1.html)文末方法设置将OpenWRT从U盘写入到eMMC。
   > [![TTYD](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/t_20031414385803ttyd.png)](https://images.cnblogs.com/cnblogs_com/neobuddy/1664659/t_20031414385803ttyd.png?a=1584196961514)

6. 重启

7. 拔掉U盘

8. 浏览器输入192.168.123.2进入网页管理后台

### N1做为旁路有上网

1. **连接图：**

   [![接线图](https://images.cnblogs.com/cnblogs_com/neobuddy/1664659/o_20031414385202接线图.png)](https://images.cnblogs.com/cnblogs_com/neobuddy/1664659/o_20031414385202接线图.png)

2. 浏览器输入192.168.123.1进入路由器后台，关闭DHCP服务(不同路由器设置网上查一查)

3. 浏览器输入192.168.123.2进入N1后台，做如下操作：



```
网络 - 接口 - Lan口
	1. 把Lan口的IPV4地址改到与AP一样的网段(默认是IP192.168.123.2，如果不是可以设置成此IP)
       2. 把Lan口的DNS服务器、网关都填写为AP的静态网络地址IP:192.168.123.1
       3. 下面的DHCP，点到第二个选项卡，把“强制”勾上，强制用N1作为DHCP服务器
   网络 - 防火墙 - 自定义规则
   	4.增加一条规则：iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
```

### 结束

 本文只介绍了将N1设置为旁路由的方法，N1还可以作为电视盒子、游戏主机等多种玩法，感兴趣的网友再自行研究。后续将介绍OpenWRT的使用方法，针对文章有疑问的地方请联系email: x@xzsu.top 。