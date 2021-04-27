https://blog.csdn.net/q_l_s/article/details/54897684

Linux中time命令，我们经常用来计算 某个程序的运行耗时(real)， 用户态cpu耗时(user)， 系统态cpu耗时(sys)。

例如：

```
$ time foo


real        0m0.003s
user        0m0.000s
sys         0m0.004s$
```



那么这三个时间都具体代表什么意思呢？

[1] real : 表示foo程序整个的运行耗时。可以理解为foo运行开始时刻你看了一下手表，foo运行结束时，你又看了一下手表，两次时间的差值就是本次real 代表的值

举个极端的例子如下：可以看到real time恰好为2秒。

```
# time sleep 2

real 0m2.003s
user 0m0.000s
sys 0m0.000s
```



[2] user 0m0.000s：这个时间代表的是foo运行在用户态的cpu时间，什么意思？

首先，我来讲一下用户态和核心态：

核心态（Kernel Mode）：

在内核态，代码拥有完全的，不受任何限制的访问底层硬件的能力。可以执行任意的CPU指令，访问任意的内存地址。内核态通常情况下都是为那些最底层的，由操作系统提供的，可信可靠的代码来运行的。内核态的代码崩溃将是灾难性的，它会影响到整个系统。

—– In Kernel mode, the executing code has complete and unrestricted access to the underlying hardware. It can execute any CPU instruction and reference any memory address. Kernel mode is generally reserved for the lowest-level, most trusted functions of the operating system. Crashes in kernel mode are catastrophic; they will halt the entire PC.

用户态（User Mode）：

在用户态，代码不具备直接访问硬件或者访问内存的能力，而必须借助操作系统提供的可靠的、底层的API来访问硬件或者内存。由于这种隔离带来的保护作用，用户态的代码崩溃（Crash），系统是可以恢复的。我们大多数的代码都是运行在用户态的。

—– In User mode, the executing code has no ability to directly access hardware or reference memory. Code running in user mode must delegate to system APIs to access hardware or memory. Due to the protection afforded by this sort of isolation, crashes in user mode are always recoverable. Most of the code running on your computer will execute in user mode.

为什么要区分Kernel Mode 和 User Mode呢？答案是隔离保护，使得系统更稳定。

好，讲完用户态和核心态之后，我们来看user time。我们已经说过了，这个指的是程序foo运行在用户态的cpu时间，cpu时间不是墙上的钟走过的时间，而是指CPU工作时间。

[3] sys 0m0.004s : 这个时间代表的是foo运行在核心态的cpu时间。

好，讲完上面的这些，我们来看看这三个的关系，这三者之间没有严格的关系，常见的误区有：

误区一： real_time = user_time + sys_time

我们错误的理解为，real time 就等于 user time + sys time，这是不对的，real time是时钟走过的时间，user time 是程序在用户态的cpu时间，sys time 为程序在核心态的cpu时间。

利用这三者，我们可以 计算程序运行期间的cpu利用率如下：

%cpu_usage = (user_time + sys_time)/real_time * 100%

如：

```
# time sleep 2

real 0m2.003s
user 0m0.000s
sys 0m0.000s
```



cpu利用率为0，因为本身就是这样的，sleep 了2秒，时钟走过了2秒，但是cpu时间都为0，所以利用率为0

误区二：real_time > user_time + sys_time

一般来说，上面是成立的，上面的情况在单cpu的情况下，往往都是对的。

但是在多核cpu情况下，而且代码写得确实很漂亮，能把多核cpu都利用起来，那么这时候上面的关系就不成立了，例如可能出现下面的情况，请不要惊奇。

```
real 1m47.363s
user 2m41.318s
sys 0m4.013s
```



更多讨论请参阅： http://stackoverflow.com/questions/556405/what-do-real-user-and-sys-mean-in-the-output-of-time1