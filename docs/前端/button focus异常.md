# 键盘回车和鼠标点击触发button按钮click事件的问题

## 一、问题描述

button按钮在获得焦点\(foucs\)的情况下，敲击键盘enter键也会触发button按钮的click事件，一般情况下不会有什么影响。但如果用户鼠标点击按钮后，在表单提交或者某些请求过程中，用户不停点击回车键，就会重复发起提交或者请求，如果未处理，很容易就出现错误。若涉及交易请求一类，这个问题会更加严重。（别问为什么会知道，问就是不知道）

以下面的代码为例：

```html
<!-- 省略 -->
<body>
  <button id="btn">按钮</button>
</body>
<!-- 省略 -->
<script type="text/javascript">
document.getElementById("btn").onclick = function(e) {
  console.log('click')
  console.log(e)
}
</script>
```

当点击一次按钮后，在敲击键盘回车，控制台照样会输出‘click’

![](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20190904201310684.png)

上图中第二条输出就是键盘敲击回车enter后的结果，可以看到触发了click，默认为鼠标事件，但没有鼠标光标坐标信息

## 二、解决方案

这里提供能够想到的四种解决方案：

### 1\. 去掉button的焦点

具体方法是，在click事件中主动去掉焦点，回车就不会触发click。

`event.target` is the element the event originated from. https://stackoverflow.com/questions/41225739/event-target-blur-not-working

```javascript
document.getElementById("btn").onclick = function(e) {
  console.log('click')
  console.log(e)
  e.target.blur() // 或者 e.currentTarget.blur()
}
```

### 2.全局禁用enter事件

具体方法是监听键盘事件，如果keyCode为13，则直接返回。PS：键盘事件触发顺序keydown \-> keypress \-> keyup

```javascript
document.getElementById("btn").onclick = function(e) {
  console.log('click')
  console.log(e)
}
document.onkeydown = function(e) {
  var ev = (typeof event!= 'undefined') ? window.event : e
  if(ev.keyCode == 13) {
    return false
  }
}
```

### 3.阻止键盘的默认行为

键盘按下回车后会转换成click

```javascript
document.getElementById("btn").onclick = function(e) {
  console.log('click')
  console.log(e)
}
document.onkeypress= function(e) {
  console.log('keypress')
}
```

![](https://img-blog.csdnimg.cn/20190904204039655.png)

所以只要监听键盘事件，阻止键盘的所有默认行为即可

```javascript
document.getElementById("btn").onclick = function(e) {
  console.log('click')
  console.log(e)
}
document.onkeypress = function(e) {
  e.preventDefault()
}
```

### 4.设置全局锁

具体方法设置一个全局变量，如果执行就改变状态，下次不再执行

```javascript
var flag = true
document.getElementById("btn").onclick = function(e) {
  if (flag) {
    console.log('click')
    console.log(e)
  }
  flag = false
}
```

## 三、总结

在实际应用中，个人觉得第二种和第三种方式比较可取，当事件绑定比较多的时候，第一种和第四种方式明显工作量更大，冗余代码更多。

如果在vue项目中，可以配合使用修饰符解决这个问题，其本质上就是上面说的第二和第三个方法的结合。比如在button中绑定\@keypress.enter.prevent或者v-on:keypress.enter.prevent、\@keypress.prevent或者v-on:keypress.prevent