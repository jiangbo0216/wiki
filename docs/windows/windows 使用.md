* what happened in windows software installation
* Differences Between .exe and .msi

## 注册表
HKEY_LOCAL_MACHINE 存放的是这个计算机的设置，

而 HKEY_CURRENT_USER 存放的是有关当前登录的用户的设置，

也就是说，不同的用户登录时 HKEY_CURRENT_USER 的内容是不同的，而 HKEY_LOCAL_MACHINE 是相同的。

还有，假设一个程序只能以管理员身份运行，那么将该程序写入到HKEY_CURRENT_USER时，开机后程序不能正常启动

但是将程序写入到HKEY_LOCAL_MACHINE时，开启会有uac（管理员运行提示）弹窗


## 开机自启动
参考链接： http://blog.sina.com.cn/s/blog_6334b9690100kapw.html
### shell:startup 用户自启动文件夹
C:\Users\yourname\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup

### shell:Common Startup 系统启动文件夹
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp

### RUN注册 RUN once注册
用户级：
计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run

计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce

系统级：
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce

计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

总结以上就是可用的位置

备注： HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunServices (RunServicesOnce)
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\RunServices (RunServicesOnce)
windows10 已经不存在了

HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce\Setup

HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce\Setup
这两个启动项注册表中不存在，不确定新增的效果

## 自启动代码修改
未验证：参考：https://www.glbwl.com/regedit.html
Windows Registry Editor Version 5.00    [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run]  "kugou"="C:\\Program Files (x86)\\KuGou\\KGMusic\\KuGou.exe"


## msi 对比 exe
如果要在计算机中放置新软件，则需要通过在线或本地购买或从Internet下载免费软件来获取安装程序。对于安装程序，您需要打开两个公用文件才能开始安装。一种具有MSI扩展名，一种具有EXE扩展名。这两个扩展之间的主要区别是它们的目的。EXE主要用于指示该文件是可执行文件。相比之下，MSI表示该文件是Windows安装程序。

虽然MSI仅与安装程序一起使用，但EXE并非如此。任何应用程序都需要至少具有一个EXE文件，因为它是启动应用程序进程所必需的。即使安装有EXE或MSI的程序也将具有一个或多个EXE文件。

其中一个创建安装包时使用MSI的优点，是一种标准的图形用户界面，可定制的一些可用性程度，但消除了创建自己的接口的复杂性。但是，如果您使用EXE文件，则可以完全自由地了解安装程序与用户的交互方式。在大多数使用EXE作为其安装程序的现代游戏中，这很明显。它们通常具有非常漂亮的交互界面，在等待安装完成的过程中使用户感到愉悦。

MSI的另一个优点是它具有执行安装或需求的能力。使用这种类型的安装，实际上只有链接和其他次要内容才放在计算机上。当用户首次尝试运行该程序时，便完成了实际安装。此时，MSI将打开必要的文件并完成安装过程。EXE文件无法执行此操作。

创建软件安装程序时，在EXE和MSI之间进行选择纯粹是基于您拥有的程序以及要投入安装程序的工作量。EXE为您提供了最大的控制权，但以创建安装程序所需的额外工作为代价。MSI则完全相反，通过符合预设标准简化了任务。

摘要：

1.EXE是可执行文件，而MSI是安装包。
2.MSI是安装程序专有的，而EXE不是。
3.MSI提供标准的GUI，而EXE提供GUI灵活性。
4.MSI可以按需安装，而EXE不能。



Read more: Difference Between MSI and EXE | Difference Between http://www.differencebetween.net/technology/software-technology/difference-between-msi-and-exe/#ixzz60omsVQZq
1. An EXE is an executable file while an MSI is an installation package.
2. MSI is exclusive to installers while EXE is not.
3. An MSI provides a standard GUI while an EXE provides GUI flexibility.
4. An MSI can do installation on demand while an EXE can’t.

Read more: Difference Between MSI and EXE | Difference Between http://www.differencebetween.net/technology/software-technology/difference-between-msi-and-exe/#ixzz60omhChL1
http://www.differencebetween.net/technology/software-technology/difference-between-msi-and-exe/

## Windows wim操作
### 查看
dism /get-wiminfo /wimfile:< path >
### 挂载
dism /mount-image /imagefile:< path > /index:1 /mountdir:< path >

### 查询可升级的版本
dism /image:< path > /get-targeteditions

### 升级版本
dism /Image:< path > /Set-Edition:< 版本名称 >

### commit镜像
dism /unmount-wim /mountdir:< path > /commit


## 杀死占用某端口的进程
netstat -ano | findstr 80 //列出进程极其占用的端口，且包含 80

tasklist | findstr 2000 找到进程名称，任务管理器杀死

taskkill -PID <进程号> -F //强制关闭某个进程


## 查看环境变量
ps
1. Get-ChildItem Env:
2. dir env:

cmd
1. set


## 计算文件 MD5 SHA1 SHA256
```cmd
certutil -hashfile filename MD5
certutil -hashfile filename SHA1
certutil -hashfile filename SHA256
```

## 创建服务
sc create NewService  binPath= "D:\c#workspace\WPF\WPF\bin\Debug\start1.bat"  type= share start= auto displayname= "BWJXServices"

## 录屏
win + G

## 截图
shift + win + s

## 查看电池使用情况

```cmd
powercfg /batteryreport /output “C: eport.html”
```

## 注册表禁用HTTP服务 
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\HTTP
修改Start的值, 4表示禁止



## 注册表

###  计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services

**HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services** contains [sub-keys for services and device drivers](https://www.itprotoday.com/article/tips/jsi-tip-1328-serial-sub-key-can-cause-event-log-errors--72653). The following **value** entries appear in most sub-keys:

**ErrorControl** is a type **REG_DWORD** which specifies how to proceed if the driver fails to load or to initialize properly:

**HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services** contains [sub-keys for services and device drivers](https://www.itprotoday.com/article/tips/jsi-tip-1328-serial-sub-key-can-cause-event-log-errors--72653). The following **value** entries appear in most sub-keys:

**ErrorControl** is a type **REG_DWORD** which specifies how to proceed if the driver fails to load or to initialize properly:



DOWNLOAD OUR EXCLUSIVE REPORT | AN ITPRO GUIDE TO MULTICLOUD MANAGEMENT

To learn how to best integrate, maintain and optimize your heterogeneous platforms

ACCESS THE REPORT

CONTINUE TO SITE

| Value | D e s c r i p t i o n                                        |
| ----- | ------------------------------------------------------------ |
| 0     | Ignore: If the driver fails to load or initialize, startup proceeds, and no warning message appears. |
| 1     | Normal: If the driver fails to load or initialize, startup proceeds, but a warning message appears. |
| 2     | Severe: If the driver fails to load or initialize, declares the startup as having failed and restarts by using the LastKnownGood control set. If startup is already using the LastKnownGood control set, continues startup. |
| 3     | Critical: If the driver fails to load or initialize, declares the startup as having failed and restarts by by using the LastKnownGood control set. If startup is already using the LastKnownGood control set, stops startup and runs a debugging program. |

**ImagePath** is a type **REG_EXPAND_SZ** that contains the full path to the executable. This entry is not used for network adapters.

**ObjectName** is a type **REG_DWORD** which contains the account name for services or the driver object that the I/O manager uses to load the device driver.

**Start** is a type **REG_DWORD** which specifies how the service is loaded or started. If the service is a Win32 service, the value of Start must be 2, 3, or 4. This value entry is not used for network adapters.



| Value | D e s c r i p t i o n                                        |
| ----- | ------------------------------------------------------------ |
| 0     | Boot: Loaded by kernel loader. Components of the driver stack for the boot (startup) volume must be loaded by the kernel loader. |
| 1     | System: Loaded by I/O subsystem. Specifies that the driver is loaded at kernel initialization. |
| 2     | Automatic: Loaded by Service Control Manager. Specifies that the service is loaded or started automatically. |
| 3     | Manual:. The service does not start until the user starts it manually, such as by using Services or Devices in Control Panel. |
| 4     | Disabled: Specifies that the service should not be started.  |

**Type** is a type **REG_DWORD** that specifies what this object represents:



| Value       | D e s c r i p t i o n                                        |
| ----------- | ------------------------------------------------------------ |
| 1           | A kernel-mode device driver.                                 |
| 2           | A file system driver.                                        |
| 4           | A set of arguments for an adapter.                           |
| 8           | A file system driver service, such as a file system recognizer. |
| 16 (0x10)   | A Win32 program that runs in a process by itself. This type of Win32 service.can be started by the Service Controller. |
| 32 (0x20    | A Win32 program that shares a process. This type of Win32 service can be started by the Service Controller. |
| 272 (0x110) | A Win32 program that runs in a process by itself (like Type16) and can interact with users. |
| 288 (0x120) | A Win32 program that shares a process and can interact with users. |



 **Learn more:** [System Restore Registry Entries](https://www.itprotoday.com/article/windows-xp2/system-restore-registry-entries-25959)

## 查看http服务状态

**netsh http show servicestate**

## 刷新dns
ipconfig /flushdns

## 配置文件备份
```cmd
move .czrc .\OneDrive\config\.czrc

mklink  .czrc  .\OneDrive\config\.czrc
```



## 路径跳转

scoop install z

## cmd

### 当前用户目录

cd %homepath%

### 删除命令
del

## windows
不同电脑之前环境迁移很困难
配置文件耦合太严重（注册表）
## 创建软连接
mklink /d C:\"Program Files"\Git D:\Application\Scoop\apps\git\current

## 删除软连接
rmdir C:\"Program Files"\Git
