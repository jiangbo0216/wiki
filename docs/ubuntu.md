## 国内镜像配置
```
##中科大源

deb https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse

# ali
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse

# 163
deb http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse

# tsinghua
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse

```

参考： https://zhuanlan.zhihu.com/p/36801617

## 清除屏幕
linux
clear ctrl+l
win
cls

## 查看系统版本
lsb_release -a

## ip addr | grep eth0 查看网络ip

## linux 系统组成
* linux内核（linus 团队管理）
* shell：用户与内核交互的接口
* 文件系统：ext3、ext4等。windows 有 fat32 、ntfs
* 第三方应用软件

## shell
Shell是系统的用户界面，提供了用户与内核进行交互操作的一种接口(命令解释器)
* 内部命令
* 应用程序
* shell脚本

## type区分是否内部命令
## shell 可以做什么
* 命令行解释(这是用得最多的！)
* 命令的多种执行顺序
* 通配符（ wild-card characters ）
* 命令补全、别名机制、命令历史
* I/O重定向（ Input/output redirection ）
* 管道（ pipes ）
* 命令替换（ 或$( ) ）
* Shell编程语言（ Shell Script ）

## linux基本目录结构
* bin 存放二进制可执行文件(ls,cat,mkdir等)
* boot 存放用于系统引导时使用的各种文件
* dev 用于存放设备文件
* etc 存放系统配置文件
* home 存放所有用户文件的根目录
* lib 存放跟文件系统中的程序运行所需要的共享库及内核模块
* mnt 系统管理员安装临时文件系统的安装点
* opt 额外安装的可选应用程序包所放置的位置
* proc 虚拟文件系统，存放当前内存的映射
* root 超级用户目录
* sbin 存放二进制可执行文件，只有root才能访问
* tmp 用于存放各种临时文件
* usr 用于存放系统应用程序，比较重要的目录/usr/local 本地管理员软件安装目录
* var 用于存放运行时需要改变数据的文件

## 命令基本格式
cmd [options] [arguments]，options称为选项，arguments称为参数

选项和参数都作为Shell命令执行时的输入，它们之间用空格分隔开。

Linux是区分大小写的
一般来说，后面跟的选项如果单字符选项前使用一个减号-。单词选项前使用两个减号--

这是一般的情况，有些命令还是不归属这种规律的(相对较少)~~~
例子：ls -a和ls -all，a 单个字符使用一个-，一个单词all 使用两个--
在Linux中，可执行的文件也进行了分类：

内置命令：出于效率的考虑，将一些常用命令的解释程序构造在Shell内部。
外置命令：存放在/bin、/sbin目录下的命令
实用程序：存放在/usr/bin、/usr/sbin、/usr/share、/usr/local/bin等目录下的实用程序
用户程序：用户程序经过编译生成可执行文件后，可作为Shell命令运行
Shell脚本：由Shell语言编写的批处理文件，可作为Shell命令运行

## 通配符
学过一些正则表达式的或者有点基础的同学对通配符应该就不陌生的了，在Linux也有通配符(在搜索的时候挺有用的)

*：匹配任何字符和任何数目的字符
?：匹配单一数目的任何字符
[ ]：匹配[ ]之内的任意一个字符
[! ]：匹配除了[! ]之外的任意一个字符，!表示非的意思

## 文件的类型
在Linux下文件的类型有这么多：

普通文件-
目录d
符号链接l
硬链接： 与普通文件没什么不同，inode 都指向同一个文件在硬盘中的区块
软链接： 保存了其代表的文件的绝对路径，是另外一种文件，在硬盘上有独立的区块，访问时替换自身路径(简单地理解为 Windows 中常见的快捷方式)。
字符设备文件 c
块设备文件b
套接字s
命名管道p


## 用户主目录
可能在网上查阅资料的时候会出现用户主目录这么一个名词，那他是什么呢？？？

前面已经说了，我们的Linux是多用户的网络系统！所以，我们可以在Linux下创建多个用户，每个用户都会有自己专属的空间。

所以，在创建用户时，系统管理员会给每个用户建立一个主目录，通常在/home/目录下
比如：用户osmond的主目录为：/home/osmond
用户对自己主目录的文件拥有所有权，可以在自己的主目录下进行相关操作。

## 常用的文件、目录操作命令
这是我们使用得最多的命令了，Linux最基础的命令！

可用 pwd命令查看用户的当前目录
可用 cd 命令来切换目录
.表示当前目录
.. 表示当前目录的上一级目录（父目录）
-表示用 cd 命令切换目录前所在的目录
~ 表示用户主目录的绝对路径名

### 绝对路径：

以斜线（/）开头 ，描述到文件位置的完整说明 ，任何时候你想指定文件名的时候都可以使用
### 相对路径 ：

不以斜线（/）开头 ，指定相对于你的当前工作目录而言的位置 ，可以被用作指定文件名的简捷方式
tips:输入命令的时候要常用tab键来补全

ls：显示文件或目录信息
mkdir：当前目录下创建一个空目录
rmdir：要求目录为空
touch：生成一个空文件或更改文件的时间
cp：复制文件或目录
mv：移动文件或目录、文件或目录改名
rm：删除文件或目录
ln：建立链接文件
find：查找文件
file/stat：查看文件类型或文件属性信息
cat：查看文本文件内容
more：可以分页看
less：不仅可以分页，还可以方便地搜索，回翻等操作
tail -10： 查看文件的尾部的10行
head -20：查看文件的头部20行
echo：把内容重定向到指定的文件中 ，有则打开，无则创建
管道命令 | ：将前面的结果给后面的命令，例如：ls -la | wc，将ls的结果加油wc命令来统计字数
重定向 > 是覆盖模式，>> 是追加模式，例如：echo "Java3y,zhen de hen xihuan ni" > qingshu.txt把左边的输出放到右边的文件里去
学了这些命令我们能干嘛？其实就是在Windows下复制文件、粘贴文件、创建文件、查看文件这几种~~~