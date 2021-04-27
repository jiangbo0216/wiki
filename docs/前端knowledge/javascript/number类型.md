# 为什么不要在 JavaScript 中使用位操作符？

May 15, 2015 - 浏览量：702,299次 | [JavaScript](https://jerryzou.com/all-articles/?label=JavaScript) [位操作符](https://jerryzou.com/all-articles/?label=位操作符)

如果你的第一门编程语言不是 JavaScript，而是 C++ 或 Java，那么一开始你大概会看不惯 JavaScript 的数字类型。在 JavaScript 中的数字类型是不区分什么 Int，Float，Double，Decimal 的。咳咳，我说的当然是在 ES6 之前的 JS，在 ES6 的新标准中提出了像 Int8Array 这样新的数据类型。不过这不是本文叙述的重点，暂且就不谈啦。本文将更着重地谈 JS 的数字类型以及作用于它的位操作符，而关于包装对象 Number 的更多了解可以看拔赤翻译的[《JavaScript设计模式》](https://github.com/lxj/javascript.patterns/blob/master/chapter3.markdown#原始值的包装对象)

## 数字类型的本质

实际上，JavaScript的数字类型的本质就是一个**基于 IEEE 754 标准的双精度 64 位的浮点数**。按照标准，它的数据结构如图示这样：由1位符号位，11位指数部分以及52位尾数部分构成。

![general double float number](number%E7%B1%BB%E5%9E%8B-imgs/double_float.png)

在浮点数中，数字通常被表示为：

```
(-1)sign × mantissa × 2exponent
```

而为了将尾数规格化，并做到尽量提高精确度，就需要把尾数精确在 `[1,2)` 的区间内，这样便可省去前导的1。比如：

```
11.101 × 23 = 1.1101 × 24
0.1001 × 25 = 1.001 × 24
```

并且标准规定指数部分使用 0x3ff 作为偏移量，也就有了双精度浮点数的一般公式：

```
(-1)sign × 1.mantissa × 2exponent - 0x3ff
```

举一些例子，应该能帮助你理解这个公式：

```
3ff0 0000 0000 0000  =  1
c000 0000 0000 0000  =  -2
3fd5 5555 5555 5555  ~  1/3
0000 0000 0000 0000  =  0
8000 0000 0000 0000  =  -0
7ff0 0000 0000 0000  =  无穷大 ( 1/0 )
fff0 0000 0000 0000  =  负无穷大 ( 1/-0 )
7fef ffff ffff ffff  ~  1.7976931348623157 x 10^308 (= Number.MAX_VALUE)
433f ffff ffff ffff  =  2^53 - 1 (= Number.MAX_SAFE_INTEGER)
c33f ffff ffff ffff  =  -2^53 + 1 (= Number.MIN_SAFE_INTEGER)
```

得益于尾数省略的一位“1”，使用双精度浮点数来表示的最大安全整数为 -253+1 到 253-1 之间，所以如果你仅仅使用 JavaScript 中的数字类型进行一些整数运算，那么你也可以近似地将这一数字类型理解为 **53** 位整型。

## 让人又爱又恨的位操作符

熟悉 C 或者 C++ 的同学一定对位操作符不陌生。位操作符最主要的应用大概就是作为标志位与掩码。这是一种节省存储空间的高明手段，在曾经内存的大小以 KB 为单位计算时，每多一个变量就是一份额外的开销。而使用位操作符的掩码则在很大程度上缓解了这个问题：

```
#define LOG_ERRORS            1  // 0001
#define LOG_WARNINGS          2  // 0010
#define LOG_NOTICES           4  // 0100
#define LOG_INCOMING          8  // 1000

unsigned char flags;

flags = LOG_ERRORS;                                 // 0001
flags = LOG_ERRORS | LOG_WARNINGS | LOG_INCOMING;   // 1011
```

因为标志位一般只需要 1 bit，就可以保存，并没有必要为每个标志位都定义一个变量。所以按上面这种方式只使用一个变量，却可以保存大量的信息——无符号的 char 可以保存 8 个标志位，而无符号的 int 则可以同时表示 32 个标志位。

可惜位操作符在 JavaScript 中的表现就比较诡异了，因为 JavaScript 没有真正意义上的整型。看看如下代码的运行结果吧：

```
var a, b;

a = 2e9;   // 2000000000
a << 1;    // -294967296

// fxck！我只想装了个逼用左移1位给 a * 2，但是结果是什么鬼！！！

a = parseInt('100000000', 16); // 4294967296
b = parseInt('1111', 2);       // 15
a | b;                         // 15

// 啊啊啊，为毛我的 a 丝毫不起作用，JavaScript真是门吊诡的语言！！！
```

好吧，虽然我说过大家可以近似地认为，JS 的数字类型可以表示 53 位的整型。但事实上，位操作符并不是这么认为的。在 [ECMAScript® Language Specification](https://www.ecma-international.org/ecma-262/5.1/#sec-11.10) 中是这样描述位操作符的：

> The production A : A @ B, where @ is one of the bitwise operators in the productions above, is evaluated as follows:
>
> 1. Let lref be the result of evaluating A.
> 2. Let lval be GetValue(lref).
> 3. Let rref be the result of evaluating B.
> 4. Let rval be GetValue(rref).
> 5. Let lnum be **ToInt32**(lval).
> 6. Let rnum be **ToInt32**(rval).
> 7. Return the result of applying the bitwise operator @ to lnum and rnum. The result is a signed 32 bit integer.

需要注意的是第5和第6步，按照ES标准，两个需要运算的值会被先转为**有符号的32位整型**。所以超过32位的整数会被截断，而小数部分则会被直接舍弃。

而反过来考虑，我们在什么情况下需要用到位操作符？使用左移来代替 2 的幂的乘法？Naive啊，等遇到像第一个例子的问题，你就要抓狂了。而且对一个浮点数进行左移操作是否比直接乘 2 来得效率高，这也是个值得商榷的问题。

那用来表示标志位呢？首先，现在的内存大小已经不值得我们用精简几个变量来减少存储空间了；其次呢，使用标志位也会使得代码的可读性大大下降。再者，在 JavaScript 中使用位操作符的地方毕竟太少，如果你执意使用位操作符，未来维护这段代码的人又对 JS 中的位操作符的坑不熟悉，这也会造成不利的影响。

所以，我对大家的建议是，尽量在 JavaScript 中别使用位操作符。

## 参考资料

1. [维基百科：双精度浮点数](https://zh.wikipedia.org/wiki/雙精度浮點數)
2. [MDN：JavaScript数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
3. [MDN：按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
4. [How to use bitmask?](https://stackoverflow.com/questions/18591924/how-to-use-bitmask)
5. [ECMAScript® Language Specification - 11.10 Binary Bitwise Operators](https://www.ecma-international.org/ecma-262/5.1/#sec-11.10)





# [IEEE754 浮点数格式 与 Javascript number 的特性](https://segmentfault.com/a/1190000008268668)

[![img](number%E7%B1%BB%E5%9E%8B-imgs/479033160-5a92d74bbd42e_big64)**新しい世界**](https://segmentfault.com/u/xlfsummer)发布于 2017-02-06

![img](number%E7%B1%BB%E5%9E%8B-imgs/lg.php)

Javascript 作为一门动态语言，其数字类型只有 `number` 一种。 `nubmer` 类型使用的就是 IEEE754 标准中的 **双精度浮点数**。Javascript 数字的许多特性都依赖于此标准，例如令人费解的 0.1+0.2不等于0.3

这篇文章介绍 IEEE754 标准中双精度浮点数二进制储存格式，并由此推出 js 中数字的一些特性。

# 一、IEEE754 中浮点数的储存格式

在 IEEE754 中，双精度浮点数储存为64位：

![双精度浮点数储存格式](number%E7%B1%BB%E5%9E%8B-imgs/bVIRcL)

指数位可以通过下面的方法转换为使用的指数值：
![指数位代表的值](number%E7%B1%BB%E5%9E%8B-imgs/bVIRcY)

浮点数表示的值的形式由 $e$ 和 $f$ 确定：
![浮点数表示的值的形式](number%E7%B1%BB%E5%9E%8B-imgs/bVIRdb)

# 二、根据 IEEE754 计算 0.1+0.2

## 1. 将 0.1 使用转换为二进制

![将 0.1 使用转换为二进制](number%E7%B1%BB%E5%9E%8B-imgs/bVIRdp)

$0.1 = (0.0\dot0\dot0\dot1\dot1)_2=(-1)^0\times2^{-4}\times(1.\dot1\dot0\dot0\dot1)_2$

$0.2 = 0.1\times2^1=(-1)^0\times2^{-3}\times(1.\dot1\dot0\dot0\dot1)_2$

由于小数位 $f$ 仅储存 52bit, 储存时会将超出精度部分进行"零舍一入"

| 值类型     | 小数位(储存范围内)                                           | 小数位(储存范围外) |
| ---------- | ------------------------------------------------------------ | ------------------ |
| 无限精确值 | 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 | 1001 1001...       |
| 实际储存值 | 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 | -                  |

由于计算加减时不会对指数位进行位运算，这里不计算指数位的表示，直接使用数字表示最终的指数值

0.1、0.2 的表示如下：

| 浮点数数值 | 符号位 $s$ | 指数值 $E$ | 小数位 $f$                                                   |
| ---------- | ---------- | ---------- | ------------------------------------------------------------ |
| 0.1        | 0          | -4         | 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 |
| 0.2        | 0          | -3         | 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 |

## 2. 将 0.1 与 0.2 相加

在计算浮点数相加时需要先进行“对位”，将较小的指数化为较大的指数，并将小数部分相应右移

$0.1 \rightarrow (-1)^0\times2^{-3}\times(0.1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1101 0)_2$
$0.2 \rightarrow (-1)^0\times2^{-3}\times(1.1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010)_2$

![计算0.1与0.2相加](number%E7%B1%BB%E5%9E%8B-imgs/bVIRdy)

$0.1 + 0.2 = (-1)^0\times2^{-2}\times(1.0011001100110011001100110011001100110011001100110100)_2$

可以通过下面的方法检验计算结果是否于 js 中一致：

```
0.1 + 0.2 === (-1)**0 * 2**-2 * (0b10011001100110011001100110011001100110011001100110100 * 2**-52)
//> true
//计算正确
```

# 三、计算 javascript Number 的特性

在js中 Number对象上附带了许多属性，表示可数的范围等信息，例如 `Number.MAX_SAFE_INTEGER` 是一个16位的数字，这一部分将解释如何计算出这些有特殊意义的数字。

## 1.计算 `Number.MAX_VALUE` 和 `Number.MIN_VALUE`

当符号位为0、指数取到1023、小数位全为1时，为可表示的最大值
当符号位为0、指数位全为0（表示非规格浮点数）、小数位仅最后一位为1时，为可表示的最小正值

```
var max = (-1)**0 * 2**1023 * (Number.parseInt( "1".repeat(53) ,2) * 2**-52);
max === Number.MAX_VALUE;
//> true

var min = (-1)**0 * 2**-1022 * (Number.parseInt( "0".repeat(52)+"1" ,2) * 2**-52);
min === Number.MIN_VALUE;
//> true
```

## 2.计算 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER`

`Number.MAX_SAFE_INTEGER` 表示最大安全整数，它是9开头的16位数字，也表明js number最大精度不超过16位。

ECMASCRIPT-262 定义：

> The value of Number.MAX_SAFE_INTEGER is the largest integer n such that n and n + 1 are both exactly representable as a Number value.
> [http://www.ecma-international...](http://www.ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)

改变指数位为53，这让每个小数位都表示浮点数的整数部分，小数位最低位对应 $2^0$，然后将每个小数位都置1，可得最大准确整数：

```
var max_safe_int = (-1)**0 * 2**52 * (Number.parseInt("1".repeat(53),2) * 2**-52);
max_safe_int === Number.MAX_SAFE_INTEGER;
//> true
//当它 +1 时，可由 (-1)**0 * 2**53 * (Number.parseInt("1"+"0".repeat(52),2) * 2**-52) 正确表示，而再 +1 时则无法准确表示

//符号位取反可得最小安全整数
-1 * max_safe_int === Number.MIN_SAFE_INTEGER;
```

## 3.计算 `Number.EPSILON`

`Number.EPSILON` 是一个极小值，~~用于检测计算结果是否在误差范围内~~。例如：

```
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
//> true

//2017-9-27 补充
1.1 + 1.3 - 2.4 < Number.EPSILON
//> false
```

根据 ECMASCRIPT-262 定义：

> The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately 2.2204460492503130808472633361816 x 10‍−‍16.

[http://www.ecma-international...](http://www.ecma-international.org/ecma-262/6.0/#sec-number.epsilon)

根据定义`Number.EPSILON`是大于1的最小可表示数与1的差，可以据此计算出 `Number.EPSILON` 的值：

```
//将表示1的二进制小数位的最左端置1，可表示大于1的最小数
var epsilon = (-1)**0 * 2**0 * (Number.parseInt("1"+"0".repeat(51)+"1",2) * 2**-52) - 1;
// (-1)**0 * 2**0 * (+`0b1${"0".repeat(51)}1` * 2**-52) - 1;
epsilon === Number.EPSILON;
//> true
```