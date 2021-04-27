## 箭头函数
如果你使用箭头函数的话，可能还会有一个由箭头函数带来的坑：
如果你的 type 是 Object，你需要这么写
default: () => ({})
而不是
default: () => {}

## [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
JavaScript 的 Number 对象是经过封装的能让你处理数字值的对象。Number 对象由 Number() 构造器创建。
JavaScript的Number类型为[双精度IEEE 754 64位浮点类型](https://en.wikipedia.org/wiki/Floating-point_arithmetic)。

`Number.MAX_VALUE` , `Number.MIN_VALUE`, Number.MAX_SAFE_INTEGER, 

`Number.MAX_SAFE_INTEGER` 常量表示在 JavaScript 中最大的安全整数（maxinum safe integer)（253 - 1）。
参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER


值得注意的是，对于整数的位运算（比如移位等操作），JavaScript仅支持32位整型数，也即从-2147483648到+2147483647之间的整数。


参考：　https://segmentfault.com/a/1190000002608050
JS 中所有的数字类型，实际存储都是通过 8 字节 double 浮点型 表示的。浮点数并不是能够精确表示范围内的所有数的， 虽然 double 浮点型的范围看上去很大: 2.23x10^(-308) ~ 1.79x10^308。 可以表示的最大整数可以很大，但能够精确表示，使用算数运算的并没有这么大。


它其实连这样的简单加法也会算错：
```js
console.log(0.1 + 0.2)
//output: 0.30000000000000004
```
所以在 js 中能够安全使用的有符号 安全 大整数（注意这里是指能够安全使用，进行算数运算的范围），并不像其他语言在 64 位环境中那样是:
```js
2^63 - 1;//9223372036854775807

```
而是

```js
Math.pow(2, 53) - 1     // 9007199254740991

```
JS 的最大和最小安全值可以这样获得:

```js
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991

```
通过下面的例子，你会明白为什么大于这个值的运算是不安全的:

```js
var x = 9223372036854775807;
console.log(x === x + 1);// output: true
console.log(9223372036854775807 + 1000); //output: 9223372036854776000

```
https://segmentfault.com/img/bVk6xZ
这些运算都是错误的结果， 因为它们进行的都是浮点数运算会丢失精度。


```js
var MAX_INT = 9007199254740992;
for (var i = MAX_INT; i < MAX_INT + 2; ++i) {
  // infinite loop
}
```
由于计算精度问题，上面的for语句将陷入死循环。


对于位运算，JavaScript仅支持32位整型数：

```js
var smallInt = 256;
var bigInt = 2200000000;
console.log(smallInt / 2);
console.log(smallInt >> 1);
console.log(bigInt / 2);
console.log(bigInt >> 1);

```
可以看到，对于32位以内的整数(256)，JavaScript可以进行正确的位运算，所得结果与除法运算的结果一致(128)。而对于32位以外的整数，JavaScript可以进行正确的除法运算(1100000000)，但进行位运算后所得结果却与正确结果相去甚远(-1047483648)。
### 描述
MAX_SAFE_INTEGER 是一个值为 9007199254740991的常量。因为Javascript的数字存储使用了IEEE 754中规定的双精度浮点数数据类型，而这一数据类型能够安全存储 -(253 - 1) 到 253 - 1 之间的数值（包含边界值）。

这里安全存储的意思是指能够准确区分两个不相同的值，例如 Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 将得到 true的结果，而这在数学上是错误的，参考Number.isSafeInteger()获取更多信息.

由于 MAX_SAFE_INTEGER 是Number的一个静态属性，所以你不用自己动手为Number对象创建Number.MAX_SAFE_INTEGER这一属性，就可以直接使用它。

## [运算优先级](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
`… && …`(6) >  `… || …`(5)

### js使用unicode字符集
String.fromCharCode(8255)
查看对应的字符

str.charCodeAt(char).toString(进制)

String.fromCharCode(parseInt(code,进制))

### JSON pretty
```js
var jsonString = '{"some":"json"}';
var jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2);  
```

### js构造函数无法被修改