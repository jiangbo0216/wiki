* 预处理
* 编译 生成后缀为.s的汇编语言文件
* 汇编 生成后缀为 .o 的目标文件
* 链接
  * 静态链接
  * 动态链接

 gcc 最开始的时候是 GNU C Compiler，就是一个 c 编译器。但是后来因为这个项目里边集成了更多其他不同语言的编译器， GCC 就代表 the GNU Compiler Collection，所以表示一堆编译器的合集。g++ 则是GCC的 c++ 编译器。
  现在调用 gcc 的时候，已经不是当初那个 c 语言编译器了，更确切地说它是一个驱动程序，根据代码的后缀名来判断调用 c 编译器还是 c++ 编译器（g++）。即代码后缀是 .c，则调用 c 编译器和 linker 去链接 c 的 library，代码后缀是 .cpp，则调用 g++ 编译器，但是这里 gcc 不会自动和 c++ 库链接。

## 获取帮助
gcc -help
```

-E                       Preprocess only; do not compile, assemble or link
-S                       Compile only; do not assemble or link
-c                       Compile and assemble, but do not link
-o <file>                Place the output into <file>

```

gcc不会自动连接c++库

## include规则
当前目录（#include “” 方式会搜索当前目录，#include <> 方式不会搜索当前目录）
-I 选项指定的目录
gcc 环境变量 CPLUS_INCLUDE_PATH 指示的目录（c 程序使用的是 C_INCLUDE_PATH）
gcc 的默认目录( gcc 的默认目录，不是由 $PATH 环境变量指定的，而是由 g++ 的配置 prefix 指定。)
```
/usr/local/include
/usr/include
/usr/lib/x86_64-linux-gnu/5.4.0/include
```


## lib库文件搜索路径
静态库文件

-L 选项指定的路径
gcc 的环境变量 LIBRARY_PATH
gcc 的默认目录
```
/lib
/usr/local/lib
/usr/lib
```

动态库文件
编译代码时指定的路径（gcc 的参数 -Wl, -rpath 指定）
环境变量 LD_LIBRARY_PATH 指定的路径（多个路径用冒号 : 分隔）
配置文件 /etc/ld.so.conf 指定的路径
默认的动态库路径 /lib，/usr/lib

## 其他命令参数
### -I（大写的i）、 -include、 -L、 -l（小写的L） 参数说明
1. -I 扩展 gcc 在编译时对包含文件的搜索路径，即不使用 -I 参数时，只会在上述默认路径下搜索。

```
$ cd ~/design-pattern/factory/
$ ls
Factory.cpp  Factory.h  main.cpp  Product.cpp  Product.h
$ mv *.h ../
$ gcc -c -I ../ *.cpp
$ ls
Factory.cpp  Factory.o  main.cpp  main.o  Product.cpp  Product.o
$ gcc

```
2. -include 指定包含头文件，很少用，因为一般头文件都在源代码中用 #include xxx实现了。
3. -L 扩展 gcc 在链接时对库文件的搜索路径，即不使用 -L 参数时，只会在上述默认路径下搜索。

```
$ gcc *.cpp -I ../ -L /usr/lib/gcc/x86_64-linux-gnu/5.4.0 -lstdc++

# or

$ g++ *.cpp -I ../ -L /usr/lib/gcc/x86_64-linux-gnu/5.4.0
$ ./a.out
Concrete Facotry
Concrete Product...


```
4. -l 紧接库名，指定程序要链接的库。
这里注意库名与库文件名的区别，以文件 ./usr/lib/gcc/x86_64-linux-gnu/5/libstdc++.so 为例，libstdc++.so 为库文件名，而库名则是 stdc++。如

```
$ gcc *.cpp -I ../ -lstdc++
$ ls
a.out  Factory.cpp  Factory.o  main.cpp  main.o  Product.cpp  Product.o
$ ./a.out
Concrete Facotry
Concrete Product...

```