[Learn How To Compile a C++ Program](https://medium.com/better-programming/learn-how-to-compile-a-c-program-382c4c690bdc)

![20191116122551.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116122551.png)

## 摘要
* 最难的事: 学习C++的时候除了指针和内存管理之外, 如何使用第三方库成功地编译代码
* Pre-processing
* Compilation
* Link
* c++有预处理程序指令，这些指令在代码中由前缀#标识, 它定义了在编译源代码之前对源代码执行的行为。
* [更多预编译标识符](https://docs.microsoft.com/en-us/cpp/preprocessor/preprocessor-directives?view=vs-2019)
* 预处理器工作的确切性质取决于预处理器指令, 比如 `#include`(要将一个文件中的代码与另一个文件中的代码链接起来)
* 编译阶段第一步把C++转换成汇编语言, 第二步把汇编语言转换成机器语句, 表现形式为 object file( .0 .obj)
* Link阶段把编译阶段生成的object file, 将它们链接在一起以生成实际的可执行文件或库。下一步是将这个可执行文件与我们希望在程序中使用的任何外部库连接起来。 我们的注意:一个库只是一个可重用的函数、类和对象的集合，它们有一个共同的用途，例如，一个数学库。
* 在visual studio中上面的三个步骤集合到了 build 中

One of the hardest things I found when first learning C++, outside of learning about pointers and memory management, was how to successfully compile code using third-party libraries.

As a game developer, you rely a lot on libraries for aspects of your game, such as rendering and physics, and it can be surprisingly tricky to successfully compile an empty project with these libraries included.

I struggled because I simply didn’t understand how C++ programs were built and distributed over the internet. I didn’t understand how my source code was turned into an executable or library, nor did I understand how to compile platform-independent code.

This meant that I simply did not know how to incorporate a library into my code, or I’d be banging my head against a wall trying to resolve errors that occurred when trying to compile. In reality, this shouldn’t be the difficult part of building your game.

This knowledge isn’t something that I have found to be taught. The focus is mostly on problem-solving and C++ syntax and yet, if you want to do any serious game programming in C++ without writing everything from scratch, this knowledge is required.

Therefore, I want to write a series of articles exploring many of the issues I have discussed. This first article will look at learning how to compile a C++ program.

## The Three-Step Process
![20191116123125.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116123125.png)
Compiling a C++ program involves taking the source code we have written (.cpp, .c, .h, .hpp files) and converting them into an executable or library that can run on a specified platform.

This process can be divided into three key stages:
1. Pre-processing
2. Compilation
3. Linking


## Pre-Processing
C++ has pre-processor directives that are identified in the code by the prefix #, which defines behaviors that are to be carried out on the source code before it’s compiled.
You can read more about pre-processor directives [here](https://docs.microsoft.com/en-us/cpp/preprocessor/preprocessor-directives?view=vs-2019). The first stage of compiling a C++ program, using the pre-processor, involves carrying out these behaviors.
The exact nature of what the pre-processor does depends on the pre-processor directive.
For example, we often split code into separate files to make it easier to organize and read. To link code in one file with that in another, we use the #include directive.
When compiling our C++ program, the pre-processor takes this #include and copy-paste’s the code defined in that header file into the file that includes it. This saves us time and avoids the potential for errors to occur from us having to copy code manually between files.
The include directive is just one example of pre-defined directives, for more examples see this [article](http://www.cplusplus.com/doc/tutorial/preprocessor/#conditional_inclusions).
By the end of the pre-processor stage, all pre-processor directives in your code will have been handled by the compilers pre-processor and the outputted code is now ready to be compiled.


## Compiling
Compiling is the next step in the process and is concerned with turning the source code that we write into something that a computer can understand, machine code.
C++ compilation is itself a two-step process. First, the compiler takes the source code and converts it into assembly language. Assembly language is a low-level programming language that more closely resembles the machine instructions of a CPU.
Second, the source code now converted into assembly language is converted again into actual machine code using an assembler. The resulting output is a set of files stored in an intermediary file format known as an object file.
Note: Machine code consists of instructions written in binary, described as machine language because it’s code the CPU actually understands.
An object file has the .obj or .o file extension and is created for each source code file. The object file contains all of the machine-level instructions for that file. It is referred to as an intermediary file because it’s not until the final stage, linking, that an actual executable or library that we can use is created.
It’s at the compilation stage that we will be warned about any errors in our code that cause our code to not compile. Any errors that occur will be due to the compiler not understanding the code that we have written.
The code won’t be recognizable C++ so we have basically messed up with our syntax somewhere. Common compilation examples are missing a semi-colon, miss-spelling a C++ keyword, or adding one too many curly braces at the end of a method.
If an error is found, compilation is stopped entirely. You won’t be able to compile your C++ code until all errors are fixed.
## Linking
The final stage of the process is linking, which is concerned with taking our output from the previous step and linking it all together to produce the actual executable or library.
The first step in this stage is compiling all of the object files into an executable or library. Once this has been successfully achieved, the next step is linking this executable with any external libraries we want to use with our program.
Note: A library is just a reusable collection of functions, classes, and objects that share a common purpose, for example, a math library.
Finally, the linker needs to resolve any dependencies. This is where any errors relating to linking will happen.
Common errors include not being able to find a library specified, or trying to link two files that might, for example, both have a class that shares the same name.
Assuming no errors occur during this stage, we will be gifted with an executable file or library by the compiler.
## Building
One extra thing I think is worth mentioning is that in an IDE like Visual Studio, the compilation steps described are grouped into a process called build. A typical workflow when creating a program is to build then debug.
What is happening, is that the build produces the executable by compiling and linking the code, or a list of errors, depending on whether we did a good job coding since our last build. When we click Start Debugging, Visual Studio will run the executable file produced.
## Compiling a Simple C++ Program
Now we know the basic steps for compiling C++ programs, I thought we could finish this article by looking at a simple example to help solidify the things we have just learned.
For this example, I plan on using the [MSCV](https://docs.microsoft.com/en-us/cpp/build/building-on-the-command-line?view=vs-2019) toolset and I am compiling from the developer command prompt.
This isn’t a tutorial on how to set up and use the MSCV toolset from a command line, so if you are looking to do that, you can find more information [here](https://docs.microsoft.com/en-us/cpp/build/building-on-the-command-line?view=vs-2019).
The steps we are going to follow:
1. Create a folder for our C++ program.
2. Navigate to that folder.
3. Create our C++ program from a text editor (I used Visual Studio Code).
4. Compile our source code into object files.
5. Link our object files to produce an executable file.
## Create a Place to Store Our C++ Program

All we do in this step is use the Windows command md to create a directory at the path specified, with the name HelloWorld. We could have just created the folder from the file explorer but it’s way cooler to do it this way.
## Navigate to the Folder
![20191116132052.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116132052.png)
In this step, all we do is navigate to our folder using the command cd, followed by the path we want to navigate to. In our case, the folder we created in the last step.
We do this to make our life easier.
If we don’t navigate to the folder for every file we want to compile, we have to specify the full pathname but if we are already in the folder then we just have to give the name of the file.
## Creating C++ Code

```c++
class HelloWorld
{
public:
void PrintHelloWorld();
};
#include "HelloWorld.h"
#include <iostream>
using namespace std;
void HelloWorld::PrintHelloWorld()
{
std::cout << "Hello World";
}
#include "HelloWorld.h"
int main()
{
HelloWorld hello;
hello.PrintHelloWorld();
return 0;
}

```
The above code is a very simple program containing three files, main.cpp, HelloWorld.h, and HelloWorld.cpp.
Our HelloWorld header file defines a single function, PrintHelloWorld(), the implementation of that function is defined in HelloWorld.cpp and the actual creation of the HelloWorld object and calling its function is done from main.cpp.
Note: These files are saved in the folder we created earlier.
## Compiling the Program
To compile and link our program we simply use the cl command, followed by all of the .cpp files we want to compile. If we want to compile without linking, we use the command cl /c.
Note: We are not including the .h file in the compilation because the contents of the file are included in main.cpp and HelloWorld.cpp by the pre-processor automatically because of the #include pre-processor directive.
![20191116132237.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116132237.png)
![20191116132244.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116132244.png)
The above image shows the object files for our two .cpp source files. Also, notice that we don’t have an executable because we haven’t run the linker.
## Linking
In this final step, we need to link our object files to produce the final executable.
To do this, we use the LINK command, followed by the object files created.
![20191116132302.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116132302.png)
![20191116132310.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191116132310.png)
Now, all we need to do is double-click on helloworld.exe to run our program.
It’s worth mentioning that, given that our program only prints to the console before the main function returns, you might not see the console appear, or it might only appear very briefly.
A common solution to make sure that the console stays open is to ask for user input at the end of the program using cin.
This is only a simple example but I hope it gets across how a C++ program is compiled.
There are still a lot of things we haven’t looked at, such as how to link external libraries, how our code can be compiled across multiple platforms, and how to better handle compiling large C++ programs.
There is also a much better way to compile and link programs than having to type each file out into a command line and, no, it’s not just clicking on build in our IDE.
## Summary
Compiling a C++ program is a three-step process: pre-processing, compilation, and linking.
The pre-processor handles pre-processor directives such as #include, compiling converts source code files into machine code, stored in object files, and linking links object files and external libraries to produce an executable or library file.
## References
* https://en.wikipedia.org/wiki/C%2B%2B
* https://stackoverflow.com/questions/6264249/how-does-the-compilation-linking-process-work
* http://faculty.cs.niu.edu/~mcmahon/CS241/Notes/compile.html
* https://www.learncpp.com/cpp-tutorial/introduction-to-the-compiler-linker-and-libraries/
