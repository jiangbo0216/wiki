**一、Linux下安装启动FTP服务**

Linux服务器默认是没有开启FTP服务的。也没有FTP服务器，为了文件的传输需要用到FTP服务器，以典型的vsftpd为例。

vsftpd作为FTP服务器，在Linux系统中是非常常用的；下面就说如何在centos 6.5系统上安装vsftp。
1.查看是否安装vsftpd    rpm -qa|grep vsftpd
2.执行以下安装命令     yum install vsftpd
3.设置开机启动服务     chkconfig vsftpd on
4.启动服务            service vsftpd start
5.配置防火墙
打开/etc/sysconfig/iptables文件
vi /etc/sysconfig/iptables
在REJECT行之前添加如下代码
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 21 -j ACCEPT
保存和关闭文件，重启防火墙

service iptables start

6.配置vsftpd服务器

默认的配置文件是/etc/vsftpd/vsftpd.conf，你可以用文本编辑器打开。vi /etc/vsftpd/vsftpd.conf

7.添加ftp用户
下面是添加ftpuser用户，设置根目录为/home/wwwroot/ftpuser,禁止此用户登录SSH的权限，并限制其访问其它目录。
a、修改/etc/vsftpd/vsftpd.conf
将底下三行

\#chroot_list_enable=YES
\# (default follows)
\#chroot_list_file=/etc/vsftpd.chroot_list
改为
chroot_list_enable=YES
\# (default follows)
chroot_list_file=/etc/vsftpd/chroot_list
b、增加用户ziyouwu，指向目录/home/wwwroot/ziyouwu,禁止登录SSH权限。
useradd -d /home/wwwroot/oneuser -g ftp -s /sbin/nologin oneuser
c、设置用户口令          passwd oneuser 
d、编辑文件chroot_list:    vi /etc/vsftpd/chroot_list
内容为ftp用户名,每个用户占一行,如：
oneuser 
user1
user2
e、重新启动vsftpd       service vsftpd restart
出现的错误：1、500 OOPS: cannot change directory
解决方法：在终端输入命令：
setsebool -P ftpd_disable_trans 1
service vsftpd restart

就可以解决了！ 



**二、Windows下安装启动FTP服务**

 1、首先在本地机器上创建一个用户！这些用户是用来登录到FTP的！我的电脑右键->管理->本地用户和组－>用户->“右键”新建用户－>输入用户名和密码再点创建就行了！

2、其次是在C盘新建文件夹“FTP上传”和“FTP下载”两个文件夹！并在每个文件夹里放不同的文件，以便区分！

3、之后是安装IIS组件！在开始菜单里—>控制面板－〉添加或删除程序->添加/删除windows组件－>应用程序服务器->Internet 信息服务->－〉FTP服务器-〉确定－〉完成！这样就把FTP安装在服务器上了！

4、最后就是配置FTP服务器，创建上传和下载服务！创建上传服务器：右键网站－>选择添加FTP站点－>描述可以根据自己的需要填写－>地址一般都是自己的IP地址，端口默认使用21->物理路径指向“C:\FTP上传”->访问权限要钩上“读取”和“写入”－>点击完成就把上传的服务创建好了！创建下载服务器：因为21号端口已经被占用所以我们就用2121端口！它的物理路径指向“C：\FTP下载”！只有读取权限！！具体的步骤就看图吧。