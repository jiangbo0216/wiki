#### 124. mouseover 和 mouseenter 的区别？

```
当鼠标移动到元素上时就会触发 mouseenter 事件，类似 mouseover，它们两者之间的差别是 mouseenter 不会冒泡。

由于 mouseenter 不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其 mouseover 和 mouseout 事件，但是却不会触发 mouseenter 和 mouseleave 事件。
```

详细资料可以参考： [《mouseenter 与 mouseover 为何这般纠缠不清？》](https://github.com/qianlongo/zepto-analysis/issues/1)