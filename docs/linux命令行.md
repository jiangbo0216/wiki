## 获取帮助
### 简要说明
```
$whatis command
正则匹配:
$whatis -w "loca*"
详细：
$info command
```
### help command
适用于内部命令
```
type cd
# cd is a shell builtin
help cd
```

### Command --help/-h
适用于外部命令
```
ls -h
ls --help
```
### 查看所在路径
```
$which command

$whereis command

```
### man Command
manual 手册，是分章节；man # Command （#表示章节号）

### info Command
有超链接稳文档，info是信息页，提供作者、版本，什么时候发布等更详细信息，man是手册告诉你怎么用

### README google

> 内部命令实际上是shell程序的一部分，其中包含的是一些比较简单的linux系统命令，这些命令由shell程序识别并在shell程序内部完成运行，通常在linux系统加载运行时shell就被加载并驻留在系统内存中。内部命令是写在bashy源码里面的，其执行速度比外部命令快，因为解析内部命令shell不需要创建子进程。比如：exit，history，cd，echo等。
> 外部命令是linux系统中的实用程序部分，因为实用程序的功能通常都比较强大，所以其包含的程序量也会很大，在系统加载时并不随系统一起被加载到内存中，而是在需要时才将其调用内存。通常外部命令的实体并不包含在shell中，但是其命令执行过程是由shell程序控制的。shell程序管理外部命令执行的路径查找、加载存放，并控制命令的执行。外部命令是在bash之外额外安装的，通常放在/bin，/usr/bin，/sbin，/usr/sbin......等等。可通过“echo $PATH”命令查看外部命令的存储路径，比如：ls、vi等。
> 使用type区分命令类型


## chmod
chmod - change file mode bits

> -R, --recursive
  change files and directories recursively

read (4), write (2), and execute
(1)

`chmod -R 755 ./dist`


## kill端口进程
1. 查看该端口的占用情况 
`lsof -i:端口号 `
2. 关闭进程 
`kill PID`

### grep 
 print lines matching a pattern
参考： man grep

## 创建文件
mkdir
-p, --parents     no error if existing, make parent directories as needed


## 用户别名
在etc/passwd 配置

## 删除指定文件夹外的文件
rm -rf !(keep) #删除keep文件之外的所有文件
rm -rf !(keep1 | keep2) #删除keep1和keep2文件之外的所有文件

## 同步文件 rsync
 rsync - a fast, versatile, remote (and local) file-copying tool

```sh
rsync [OPTION]... SRC DEST
rsync [OPTION]... SRC [USER@]host:DEST
rsync [OPTION]... [USER@]HOST:SRC DEST
rsync [OPTION]... [USER@]HOST::SRC DEST
rsync [OPTION]... SRC [USER@]HOST::DEST
rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]
```
对应于以上六种命令格式，rsync有六种不同的工作模式：

拷贝本地文件。当SRC和DES路径信息都不包含有单个冒号":"分隔符时就启动这种工作模式。如：rsync -a /data /backup
使用一个远程shell程序(如rsh、ssh)来实现将本地机器的内容拷贝到远程机器。当DST路径地址包含单个冒号":"分隔符时启动该模式。如：rsync -avz *.c foo:src
使用一个远程shell程序(如rsh、ssh)来实现将远程机器的内容拷贝到本地机器。当SRC地址路径包含单个冒号":"分隔符时启动该模式。如：rsync -avz foo:src/bar /data
从远程rsync服务器中拷贝文件到本地机。当SRC路径信息包含"::"分隔符时启动该模式。如：rsync -av root@192.168.78.192::www /databack
从本地机器拷贝文件到远程rsync服务器中。当DST路径信息包含"::"分隔符时启动该模式。如：rsync -av /databack root@192.168.78.192::www
列远程机的文件列表。这类似于rsync传输，不过只要在命令中省略掉本地机信息即可。如：rsync -v rsync://192.168.78.192/www

 -r not preserve permissions, times and symbolic links during the transfer

-v, --verbose 详细模式输出
-q, --quiet 精简输出模式
-c, --checksum 打开校验开关，强制对文件传输进行校验
-a, --archive 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD
-r, --recursive 对子目录以递归模式处理,同步目录时要加上
-R, --relative 使用相对路径信息
-L  加上该选项后，同步软链接时会把源文件给同步
-l 保留软连接
-z 传输时压缩
-p 保持文件的权限属性
-o 保持文件的属主
-g 保持文件的属组


 --delete-excluded 同样删除接收端那些被该选项指定排除的文件
 --delete-after 传输结束以后再删除

示例:

```sh
rsync -ravL . root@192.168.0.199:/data/
```

 ## 修改文件 sed
  sed - stream editor for filtering and transforming text

sed：是一个编辑器，是一个强大的文件处理工具。

sed作用：用来替换、删除，更新文件中的内容。sed能自动处理一个或多个文件。

sed原理：sed以文本的行为单位进行处理，一次处理一行内容。首先sed把当前处理的行存储在临时缓冲区中（称为模式空间pattern space），接着处理缓冲区中的行，处理完成后，把缓冲区的内容送往屏幕。sed处理完一行就将其从临时缓冲区删除，然后将下一行读入，进行处理和显示，这样不断的重复，直到文件末尾。处理完文件的最后一行后，sed便结束运行。

因为sed是对文件中每行在临时缓冲区中的副本进行编辑，所以原文件内容并没有改变，除非重定向输出。

### sed命令
#sed [-nefri][命令]

参数说明：

-i:直接修改文件，终端不输出结果。

-n:使用安静（slient）模式，取消默认输出。sed默认会将所有来自stdin的数据输出到终端上。但如果加上-n参数后，不自动打印处理后的结果，只是默默的处理，只有经过sed特殊处理的那一行才被列出来。

-e: --expression直接在命令模式上进行sed的动作编辑。sed -e '...' -e '...' -e '...'

-f:指定sed脚本的文件名。

-r:sed动作支持的是延伸型正规表示法的语法。（默认是基础正规表示法语法）

命令说明：[n1][n2]命令

n1,n2：表示行号，该参数可选，一般表示希望操作的行数，可以是数字，正则表达式或二者混合。

用逗号分隔的两个行数表示这两行为起止的行的范围。如1，3表示1,2,3行，美元符号（$）表示最后一行。如何没有指定地址，sed将处理输入文件的所有行。地址通常的写法有：n;n,m;n,$。举例，如果我的操作是需要在3到5行之间进行的，则【3,5,[动作行为]】。

命令:

a:新增，在当前行的下一行追加一行文本。

i:插入，在当前行的上一行插入一行文本。

c:替换，以行为单位进行替换，c的后面可以跟字符串，用这些字符串取代n1,n2之间的行。

d:删除，从模式空间删除一行。

p:打印，打印模式空间的行。通常p会与参数【-n】一起使用。

s:替换，通常s命令可以搭配正则表达式！例如1,20s/old/new/g。

### 例子
```text
$ cat song.txt
I'm a big big girl
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
```
将song.txt文件中每行的第一个big替换为small:

sed 's/big/small/' song.txt

解释：s：替换命令，/big/:匹配big字符串，/small/：把匹配替换成small。
```
$ sed 's/big/small/' song.txt
I'm a small big girl
In a small big world
It's not a small big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
```

将song.txt文件中每行所有的big替换为small:

sed 's/big/small/g' song.txt

解释：同上，/g表示一行上替换所有的匹配
```
$ sed 's/big/small/g' song.txt
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
```

Note:这里也可以使用 sed 's#big#small#g' song.txt  ，紧跟s命令的符号都会被认为是查找串和替换串之间的分隔符，这里使用#，其实无论什么字符串（换行符，反斜线除外），只要紧跟s命令，就成了新的串分隔符。

将song.txt文件中每行第2个big替换为small: sed 's/big/small/2' song.txt

解释：/2表示指定一行中第2个匹配的字段操作

```
$ sed 's/big/small/2' song.txt 
I'm a big small girl
In a big small world
It's not a big small thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
```
2、-i参数直接修改文件内容
上面的sed命令没有改变song.txt，只是把处理后的内容输出，如果要写回文件，可以使用重定向。

$ sed 's\big\small\g' song.txt >song.bak
或使用-i直接修改文件内容：sed -i 's\big\small\g' song.txt


```
$ sed -i 's\big\small\g' song.txt 
$ cat song.txt
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much


```
sed 的[-i]参数可以直接修改文件内容，该功能非常有用！

举例来说，如果有一个100万行的文件，要在第100行加某些文字。此时使用vim可能会疯掉！因为文件太大了打不开！但是通过sed直接修改/取代的功能，根本不需要打开文件就能完成任务。和vim相比sed就像会魔术一样，vim要打开文件-操作文件-关闭文件，sed直接隔空就对文件操作了，非常方便。

正因为sed -i 功能强大，可以直接修改原始文件，也是个危险的动作，需小心使用。

3、-e参数编辑命令，进行多行匹配
-e是编辑命令，用于sed执行多个编辑任务的情况下。在下一行开始编辑前，所有的编辑动作都将应用到模式缓冲区中的行上。因为是逐行进行多重编辑（即每个命令都在模式空间的当前行上执行），所以编辑命令的顺序会影响结果。

如果我们要一次替换多个模式，

sed "1,3s/big/small/g; 4,5s/do/don't/g" song.txt

解释：第一个模式：把第一行到第三行的big替换成small；第二个模式：把第四行到第五行的do替换成don't。

```
$ sed "1,3s/big/small/g; 4,5s/do/don't/g" song.txt
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I don't don't feel
that I don't don't will miss you much
Miss you much

```
上面的命令等价于：sed  -e "1,3s/big/small/g" -e "4,5s/do/don't/g" song.txt 


```
$ sed  -e "1,3s/big/small/g" -e "4,5s/do/don't/g" song.txt  
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I don't don't feel
that I don't don't will miss you much
Miss you much

```
4、删除命令d：删除匹配的行
命令d删除匹配的输入行，sed先将输入行从文件复制到模式空间里，然后对该行执行sed命令，最后将模式空间的内容显示在屏幕上。如果是命令d，当前模式空间里的输入行会被删除，不被显示。

利用匹配删除行

删除song.txt文件中第一次包含“Miss”的行 ：sed '/Miss/d' song.txt

$ sed '/Miss/d' song.txt 
I'm a big big girl
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
下面是利用行号删除行的例子

删除song.txt文件中的第1行：sed '1d' song.txt

$ sed '1d' song.txt 
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
删除song.txt文件中2到5行：sed '2,5d' song.txt  

$ sed '2,5d' song.txt   
I'm a big big girl
Miss you much
删除song.txt文件中第3行之后的行：sed '3,$d' song.txt

$ sed '3,$d' song.txt 
I'm a big big girl
In a big big world
正则匹配可以和行号一起使用，举一个openstack部署中的例子：

删除第一次包含“eth2”的行到最后所有的行：sed -i '/eth2/,$d' /etc/network/interfaces

5、插入命令a，在当前行后追加一行
a添加新文本到文件中当前行（即读入模式空间中的行）的后面。

在song.txt文件中第3行后插入一行并直接作用于song.txt：sed '3a AAAAAAAAAAAAAAAAAAAAAAA' song.txt 【用空格作为分隔符】

```
$ sed -i '3a AAAAAAAAAAAAAAAAAAAAAAA' song.txt 
$ cat song.txt
I'm a big big girl
In a big big world
It's not a big big thing if you leave me
AAAAAAAAAAAAAAAAAAAAAAA
But I do do feel
that I do do will miss you much
Miss you much

```

在匹配'Miss'的行后插入一行：sed '/Miss/a AAAAAAAAAAAAAAAAAAAAAAAAAA' song.txt 【用空格作为分隔符】

```
$ sed '/Miss/a AAAAAAAAAAAAAAAAAAAAAAAAAA' song.txt                                
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
AAAAAAAAAAAAAAAAAAAAAAAAAA

```
在song.txt最后插入一行：sed '$a append line' song.txt

```
$ sed '$a append line' song.txt 
I'm a big big girl
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
append line

```

6、插入命令i，在当前行前插入一行
i添加新文本到文件中当前行（即读入模式空间中的行）的前面。

在song.txt文件中第3行后插入一行：sed '3i#iiiiiiiiiiiiiiiiiiiiiiiiiii' song.txt  【#作为分隔符】

```
$ sed '3i#iiiiiiiiiiiiiiiiiiiiiiiiiii' song.txt                
I'm a small small girl
In a small small world
iiiiiiiiiiiiiiiiiiiiiiiiiii
It's not a small small thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much

```
在song.txt文件中匹配'Miss'的行前面插入一行：sed '/Miss/i iiiiiiiiiiiiiii' song.txt【空格作为分隔符】

```
$ sed '/Miss/i iiiiiiiiiiiiiii' song.txt                           
I'm a small small girl
In a small small world
It's not a small small thing if you leave me
But I do do feel
that I do do will miss you much
iiiiiiiiiiiiiii
Miss you much

```

7、新增多行（i行前插入，a行后追加，其他地方一样，以a为例）
插入相同的行，在第2行到第5行之后均插入一行:sed '2,5a append one line ' song.txt


```
$ sed '2,5a append one line ' song.txt 
I'm a big big girl
In a big big world
append one line 
It's not a big big thing if you leave me
append one line 
But I do do feel
append one line 
that I do do will miss you much
append one line 
Miss you much

```
插入不同的行，以\n换行

在第2行后面插入三行：sed '2a append one line \nappend two line \nappend three line' song.txt


```
liuxiaoyan@development:~/mytest$ sed '2a append one line \nappend two line \nappend three line' song.txt   
I'm a big big girl
In a big big world
append one line 
append two line 
append three line
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
```

8、c命令以行为单位替换
 把第2到第5行的内容替换为2-5content：sed '2,5c 2-5content' song.txt

$ sed '2,5c 2-5content' song.txt 
I'm a big big girl
2-5content
Miss you much

9、p命令显示模式空间的内容
以行为单位显示，

显示song.txt文件中的第2到第5行: sed -n '2,5p' song.txt

$ sed -n '2,5p' song.txt 
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
搜索匹配显示：

显示匹配'Miss'的行：sed -n '/Miss/p' song.txt

$ sed -n '/Miss/p' song.txt 
Miss you much

10、-n参数取消默认输出
上面的p命令显示时，用到-n参数，因为sed默认把输入行打印在屏幕上：sed '/Miss/p' song.txt


```
liuxiaoyan@development:~/mytest$ sed '/Miss/p' song.txt    
I'm a big big girl
In a big big world
It's not a big big thing if you leave me
But I do do feel
that I do do will miss you much
Miss you much
Miss you much

```
所以要打印选定内容，用-n配合p来使用。

五、简单正则表达式
^:行首定位符。

$:行尾定位符。

\<：词首定位符。

\>：词尾定位符。

.:匹配除换行以外的单个字符。

*:匹配0个或多个前导字符。

[]:匹配字符集合里的任一字符。

[^] :匹配不在指定字符集合里的任一字符。

 
### 查找linux超过30天的文件

查找超过30天的文件
find ./logs/ -mtime +30 -name "*.log";

删除超过30天的文件
find ./logs/ -mtime +30 -name "*.log" -exec rm -rf {} \;
