>

怎么说呢？我被斐讯N1刷机Armbian活生生折腾了4个晚上，终于还是搞定了。

首先得恭喜你，运气好搜到了我的博客，否则你可能需要8个晚上，16个晚上，甚至绝望。

我先说一下网上教程都坑在哪里：

- 搞不清楚到底哪个Armbian内核版本好用（好用是指：稳定、低负载、各硬件驱动正常）。
- 搞不清楚所选内核应该配套哪个dtb文件（或者不知道dtb是啥）。
- 刷到emmc遇到各种诡异现象（例如：偶然上不去网、readonly、拔掉U盘后无法启动）。
- 刷到emmc不正常，不知道如何正确重刷。

没错，我把所有坑都踩了一遍，累的我死去活来。

所以，你搜到我的博客算是真的走运了：

> 我会告诉你每一步怎么做，用什么版本，为什么会被坑。

# 为什么买斐讯N1

主要是因为它比树莓派好。

网上实测N1性能超过树莓派3B+，我觉得没必要实测了，因为计算性能本身就不是板子的强项，够用即可。

N1的优势在于：

- ARM64主流架构，真64位linux系统，docker随便玩。（Armbian输出：Linux aml 5.0.2-aml-s905 #5.77 SMP PREEMPT Mon Apr 1 17:41:33 MSK 2019 aarch64 GNU/Linux）
- 真千兆有线网口，2.4/5G双频wifi，可以作热点。
- 自带8G的emmc存储，linux系统直接刷到盒子里，不用额外插SD卡，I/O性能好。
- CPU 4核，2G内存。

唯一缺点：

- USB2.0，显然是不配套千兆网口带宽的，磁盘将成为了下载电影的瓶颈。
- 需要精力折腾，因为是小众社区来支持N1硬件适配到Armbian系统，安装过程缺乏标准化的方案。

# 购买斐讯N1

全网只有拼多多售卖。

截止2019年11月份，全新未开封未刮K码的全新N1，售价在130元左右，我建议大家还是买新的省心。

N1目前处于炒作阶段，价格持续攀升，建议趁早购买。

**注意：不需要买USB双公头刷机线，无论刷机还是重刷都是用不到的！**

# 降级关键分区

连接HDMI、网线、电源，你会进入斐讯自带的安卓系统。

安卓系统的标准启动过程如下：

- bootloader：斐讯针对该盒子硬件实现的类似BIOS的东西，它负责硬件的初始化，最终引导操作系统。
- boot分区：放着安卓操作系统的内核文件，由bootloader唤起，也就实现了进入操作系统的效果。
- recovery分区：类似于WinPE的东西，如果boot分区挂了，则可以通过Recovery方式进入一个临时的操作系统，然后恢复boot分区（类似于ghost做系统）。

问题就在于，bootloader是斐讯针对盒子定制的，它设置了一些限制，比如：

- 只能使用他家的安卓系统
- 不支持U盘引导操作系统

所以呢，恩山论坛有一位叫做webpad的大神，修改了斐讯的bootloader。

我们要做的，就是把bootloader覆盖到盒子里面去。

webpad提供了工具，大家按照教程与工具：<https://www.right.com.cn/forum/thread-340279-1-1.html，通过adb>网络连接的方式刷入即可。

一台N1这辈子只需要做一次降级操作，后续不需要再研究这个问题了。

连接USB线刷的方式，除非你想玩电视系统，否则刷Armbian是不需要强制使用的。

# 制作Armbian U盘

刷armbian的整体逻辑如下：

- 为了把armbian刷入emmc存储，我们首先得把armbian刷到U盘上，然后通过U盘引导进入armbian系统。
- U盘进入系统后，我们执行一个命令就可以把armbian系统的boot分区以及rootfs等等都copy到emmc上。
- 一旦完成emmc刷写，此后bootloader就会直接读emmc中的boot分区，直接引导进入armbian。

首先是选什么版本的Armbian，以及替换哪一个dtb文件，我直接告诉大家结论：

> Armbian 5.77版本，使用xiangsm的dtb文件，这是恩山论坛的帖子：<https://www.right.com.cn/forum/thread-510423-1-1.html>

这是目前恩山论坛最新也是最广泛肯定的版本，大家就不要自己再折腾研究了。

至于armbian和dtb分别是什么来头，我简单说明一下：

- armbian：直接来源于armbian的官方，armbian其实就是debian发行版为arm架构适配后的版本。也就是说，恩山论坛是没有人去改动armbian系统代码的，是非常可靠的。
- dtb：各种品牌的盒子千千万，每个盒子使用的网卡啊、cpu芯片啊的型号千千万，armbian内核为了能够和这些外设正常工作，就要求提供一种叫做dtb的描述文件，我理解就是针对各个硬件的驱动程序。
  - 为了让斐讯N1的各个硬件可以被armbian正常调度，所以需要给斐讯N1适配一套dtb文件。
  - dtb文件需要随着内核编译，所以不同armbian内核版本必须使用配套的dtb文件。
  - 目前斐讯N1的dtb文件已经被armbian收录到官方源码库里，但是使用的时候linux负载会显示的很高，所以热心网友为armbian5.77编译了一个fix过的dtb文件。

armbian5.77大家直接走我的网盘下载即可，因为从armbian官方下载非常慢：

> 链接: <https://pan.baidu.com/s/1-7AmPhRkP1LKtqb6X7s9IA> 提取码: sjp9 复制这段内容后打开百度网盘手机App，操作更方便哦

现在将系统烧录到U盘。

armbian5.77修改过的dtb文件从上面的帖子里下载，然后打开我的电脑U盘：

> 将meson-gxl-s905d-phicomm-n1-xiangsm.dtb文件放到dtb/meson-gxl-s905d-phicomm-n1-xiangsm.dtb下面，修改一下uEnv.ini文件指向它：
>
> dtb_name=/dtb/meson-gxl-s905d-phicomm-n1-xiangsm.dtb

# 进入U盘armbian

千万不要在安卓系统开机的情况下插入U盘，否则U盘中的文件权限会被安卓系统篡改！这不是一句废话！

千万不要在安卓系统开机的情况下插入U盘，否则U盘中的文件权限会被安卓系统篡改！这不是一句废话！

千万不要在安卓系统开机的情况下插入U盘，否则U盘中的文件权限会被安卓系统篡改！这不是一句废话！

> 补充：如果没有USB双公头线，那么将无法通过webpad降级工具的功能3）触发U盘启动。
>
> 替代方法是下载adb工具，然后执行如下2个命令，即可确保支持U盘启动：
>
> adb connect 斐讯IP
>
> adb shell reboot update

先让N1断电，然后插上U盘到靠近HDMI的USB口，然后通电即可进入armbian系统，启动过程中有一些看似报错的东西不需要理睬，属于正常。

默认root 1234登录即可。

ls -l /确认一下目录权限没有被安卓篡改，都是root用户即可：

```sh
root@aml:~# ls -l /
total 84
drwxr-xr-x   2 root root  4096 Apr  1  2019 bin
drwxr-xr-x   6 root root 16384 Jan  1  1970 boot
drwxr-xr-x  17 root root  4100 Oct 22 21:46 dev
drwxr-xr-x  87 root root  4096 Oct 23 02:01 etc
drwxr-xr-x   2 root root  4096 Feb  3  2019 home
drwxr-xr-x  17 root root  4096 Apr  1  2019 lib
drwx------   2 root root 16384 Oct 22 20:17 lost+found
drwxr-xr-x   2 root root  4096 Oct 22 20:18 media
drwxr-xr-x   2 root root  4096 Oct 22 20:18 mnt
drwxr-xr-x   2 root root  4096 Apr  1  2019 opt
dr-xr-xr-x 137 root root     0 Jan  1  1970 proc
drwx------   5 root root  4096 Oct 23 10:12 root
drwxr-xr-x  20 root root   700 Oct 23 11:04 run
drwxr-xr-x   2 root root  4096 Apr  1  2019 sbin
drwxrwxr-x   2 root root  4096 Apr  1  2019 selinux
drwxr-xr-x   2 root root  4096 Apr  1  2019 srv
dr-xr-xr-x  12 root root     0 Jan  1  1970 sys
drwxrwxrwt   7 root root   160 Oct 23 12:00 tmp
drwxr-xr-x  10 root root  4096 Apr  1  2019 usr
drwxr-xr-x  12 root root  4096 Apr  1  2019 var

```

# 刷armbian到emmc

这一步非常坑！

网上都说执行/root/install.sh刷写U盘中的armbian到emmc，但实际上这个脚本存在严重问题：

> 拔掉U盘后，首次emmc启动可以成功，再重启一次就无法进入系统了，应该是boot分区的处理存在bug。
>
> 如果你此前已经install.sh被坑了，你必须再次插入U盘来引导系统，然后继续往下读。

真正有效的刷写方式是执行如下命令：

*nand*–*sata*-install

它可以完成所有刷写emmc所需的事情，完成后halt关机拔掉U盘，所有刷机工作就结束了。

**如果你想重刷armbian系统，那么还是U盘启动armbian，重新执行nand-sata-install即可完整覆盖掉emmc中的数据，网上的教程一般是教你ddbr或者线刷先恢复到安卓系统再重来，这都是胡扯。**

# 坑爹问题-1

我遇到的第一个问题就是开机后，偶尔无法联通外网。

后来我发现，只需要开机后多等一会，外网就会联通了，所以这个问题就不纠结了。

另外，armbian启动的时候没有等待网卡分配到IP，会导致一些监听网络的程序无法正常工作，需要大家修改一下网卡的模式为auto，即可强制开机等待网络分配（当然太久分配不到也会超时进入系统）：

修改/etc/network/interfaces，注释hotplug热插拔模式，换成auto即可：

```
root@aml:~# cat /etc/network/interfaces
source /etc/network/interfaces.d/*

# Wired adapter #1
auto eth0
#allow-hotplug eth0
```

# 坑爹问题-2

我在路由器上给N1分配静态IP的时候发现，armbian的有线网卡每次重启后MAC地址都会变，解决方法也不复杂。

打开/etc/network/interfaces文件，在eth0网卡上写死一个mac地址即可：

> root@aml:~# cat /etc/network/interfaces
> source /etc/network/interfaces.d/*
>
> \# Wired adapter #1
> allow-hotplug eth0
> no-auto-down eth0
> iface eth0 inet dhcp
> hwaddress 4e:03:88:54:39:93

# 坑爹问题-3

发现ssh终端无法显示中文，也无法输入中文。

输入armbian-config命令，选择personal，locales，确认locale配置了en_US.utf-8，但仍旧无法使用中文。

执行locale命令显示如下，的确诡异：

```
root@aml:~# locale -a
C
C.UTF-8
en_US.utf8
POSIX
root@aml:~# locale
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.utf-8"
LC_NUMERIC="en_US.utf-8"
LC_TIME="en_US.utf-8"
LC_COLLATE="en_US.utf-8"
LC_MONETARY="en_US.utf-8"
LC_MESSAGES="en_US.utf-8"
LC_PAPER="en_US.utf-8"
LC_NAME="en_US.utf-8"
LC_ADDRESS="en_US.utf-8"
LC_TELEPHONE="en_US.utf-8"
LC_MEASUREMENT="en_US.utf-8"
LC_IDENTIFICATION="en_US.utf-8"
LC_ALL=en_US.utf-8
```

经过查实，armbian官方也有人反馈，只需要改一下/etc/environment中的LC_ALL：

> root@aml:~# cat /etc/environment
> ARCH=arm64
> LC_ALL=”en_US.utf-8″

# 配置时区

执行armbian-config，选择personal，然后配置Timezone为chongqing即可。

# 换apt源

执行armbian-config，选择personal，选择Mirror中清华大学的那个即可。

# 连接wifi

当你完成了上述所有步骤，如果你对网速没有太高要求，那么就可以让N1联无线网。

这样的话，N1就可以放在任何有电源的地方，当一个小型linux服务器了。

执行armbian-config，选择network -> wlan0，选择wifi信号输入账号密码即可。

# 修改vim粘贴模式

默认debian的vim右键没法粘贴内容，需要改一下模式：

```
vim /usr/share/vim/vim80/defaults.vim

查找 set mouse
if has('mouse')
  set mouse=a
endif

将值从"a"改成"r"
if has('mouse')
  set mouse=r
endif
```

> 至此，斐讯N1刷armbian就完成了，一个可靠稳定的盒子，祝大家玩的愉快。



