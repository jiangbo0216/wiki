# [inline元素与padding margin的爱恨情仇](https://www.jianshu.com/p/d44142161eb7)



### 总结:

替换元素设置margin和pading生效并且可以撑开父元素

非替换元素不能设置竖直方向上的margin, 水平方向ok, 设置padding可以生效, 但是对周围元素没有任何影响



最近在刷面试题的时候遇到一个问题：**CSS 中 inline 元素可以设置 padding 和 margin 吗？**找了几篇博客，发现大家说的都不太一样。

![img](https:////upload-images.jianshu.io/upload_images/1968368-0ee243446da866f4?imageMogr2/auto-orient/strip|imageView2/2/w/1066/format/webp)

于是乎，有了这篇总结。

在HTML元素中，分为非替换元素和替换元素。

> 非替换元素： 内容由用户代理（通常是一个浏览器）在元素本身生成的框中显示，例如`<span>hello</span>`，文本"hello"将由用户代理显示。

> 替换元素：是指用来替换元素内容的部分并由文档内容直接表示。以`<img>`元素最为典型，例如`<img src="hello.jpg" />`，这个标记不包含任何内容，除非将其指向一个外部内容（这里是src属性指向一个图像），否则这个元素没有任何意。

讨论inline元素设置的`padding`和 `margin`是否有效，需要区分非替换元素和替换元素来讨论。

首先，我们先来看看CSS标准中的[margin规定](https://link.jianshu.com?t=https%3A%2F%2Fwww.w3.org%2FTR%2FCSS2%2Fbox.html%23margin-properties)：

![img](https:////upload-images.jianshu.io/upload_images/1968368-7d28efa94b21bd3a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

margin.png


 意思是非替换元素不能设置竖直方向上的margin，而替换元素是ok的。我们来验证一下：

![img](https:////upload-images.jianshu.io/upload_images/1968368-f9b6ce9e3140d49a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

非替换元素设置margin


 我们看到只有左右的外边距生效了，而垂直方向上并没有生效。并且父元素也不会被撑开。
 我们接着试验一下设置替换元素的margin值：

![img](https:////upload-images.jianshu.io/upload_images/1968368-6cd9940ff79937da.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

替换元素设置margin


 我们看到在垂直方向上margin生效并且可以撑开父元素。



接着我们来看看CSS标准中的[padding规定](https://link.jianshu.com?t=https%3A%2F%2Fwww.w3.org%2FTR%2FCSS2%2Fbox.html%23padding-properties)

![img](https:////upload-images.jianshu.io/upload_images/1968368-c9cad150a0ccca83.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

padding.png


 看起来没有说什么情况不能用的样子，我们来测试一下：





![img](https:////upload-images.jianshu.io/upload_images/1968368-ce53f7cccbf132fe.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

非替换元素设置padding-1


 我们看到垂直方向上的padding是生效了，并且不会撑开父元素。阿咧，但是第一个`span`元素的`padding-top`好像没有生效呢。。原因是设置垂直方向的padding没有影响元素的line-height，没有使整个元素下移显示 padding-top。我们改改代码就好了：

![img](https:////upload-images.jianshu.io/upload_images/1968368-6786e946779ae847.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

非替换元素设置padding-2.png


 加了个div，padding-top正常显示了。



最后，试验一下设置替换元素的padding值：



![img](https:////upload-images.jianshu.io/upload_images/1968368-0d922c7eda35c6cc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

替换元素设置padding



我们看到，替换元素设置的padding是生效的，并且撑开了父元素。

总结：
 对于non-replace inline元素，设置垂直方向的margin是无效的，设置垂直方向的padding虽然元素的内容范围是增大了，不过只是表象，对周围元素无任何影响。





第一次写博文，有啥地方说得不好希望大家评论告诉我。感谢观看到这里的各位。

![img](https:////upload-images.jianshu.io/upload_images/1968368-0a62a781153080be.png?imageMogr2/auto-orient/strip|imageView2/2/w/600/format/webp)



继续刷题去了～～～



作者：蛋包饭加蛋黄酱
链接：https://www.jianshu.com/p/d44142161eb7
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。