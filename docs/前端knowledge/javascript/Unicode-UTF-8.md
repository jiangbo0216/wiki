#### 94. Unicode 和 UTF-8 之间的关系？

```
Unicode 是一种字符集合，现在可容纳 100 多万个字符。每个字符对应一个不同的 Unicode 编码，它只规定了符号的二进制代码，却没有规定这个二进制代码在计算机中如何编码传输。

UTF-8 是一种对 Unicode 的编码方式，它是一种变长的编码方式，可以用 1~4 个字节来表示一个字符。
```

详细资料可以参考： [《字符编码详解》](https://blog.51cto.com/polaris/377468) [《字符编码笔记：ASCII，Unicode 和 UTF-8》](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)