## undefined 有什么问题

 1.     因为 undefined 不是保留字（Reserved Word），它只是全局对象的一个属性，在低版本的IE浏览器中会被重写。

```js
var undefined = 10;

// undefined -- chrome
// 10 -- IE 8
alert(undefined);

```

 2.     在局部作用域中 undefined 还是可以被重写

```js
(function() {
  var undefined = 10;

  // 10 -- chrome
  alert(undefined);
})();

```

## 为什么要用 void 0 代替

> MDN 定义： The void operator evaluates the given expression and then returns undefined.

意思是说 void 运算符可以对给定的表达式求值，并且无论后面跟的是什么，都是返回 undefined，所以说不论是void 0 还是void 1都是可以的，更重要的是void不能被重写。

## JavaScript URIs

当用户点击一个`javascript: URI` 时，它会执行URI中的代码，然后用返回的值替换页面中的内容，除非返回的事undefined。

```
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，
  如果去掉 void()，点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome中即使<a href="javascript:0;">也没变化，firefox中会变成一个字符串0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>

```

注意，虽然这么做是可行的，但利用 javascript: 伪协议来执行 JavaScript 代码是不推荐的.
