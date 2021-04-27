#### 40. 什么是 DOM 和 BOM？

```
DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM
的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）
对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati
on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对
象的子对象。
```

详细资料可以参考： [《DOM, DOCUMENT, BOM, WINDOW 有什么区别?》](https://www.zhihu.com/question/33453164) [《Window 对象》](http://www.w3school.com.cn/jsref/dom_obj_window.asp) [《DOM 与 BOM 分别是什么，有何关联？》](https://www.zhihu.com/question/20724662) [《JavaScript 学习总结（三）BOM 和 DOM 详解》](https://segmentfault.com/a/1190000000654274#articleHeader21)

#### 70. documen.write 和 innerHTML 的区别？

```
document.write 的内容会代替整个文档内容，会重写整个页面。

innerHTML 的内容只是替代指定元素的内容，只会重写页面中的部分内容。
```

详细资料可以参考： [《简述 document.write 和 innerHTML 的区别。》](https://www.nowcoder.com/questionTerminal/2c5d8105b2694d85b06eff85e871cf50)

#### 71. DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？

（1）创建新节点

```
createDocumentFragment(node);
createElement(node);
createTextNode(text);
```

（2）添加、移除、替换、插入

```
appendChild(node)
removeChild(node)
replaceChild(new,old)
insertBefore(new,old)
```

（3）查找

```
getElementById();
getElementsByName();
getElementsByTagName();
getElementsByClassName();
querySelector();
querySelectorAll();
```

（4）属性操作

```
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
```

详细资料可以参考： [《DOM 概述》](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction#DOM_interfaces) [《原生 JavaScript 的 DOM 操作汇总》](https://harttle.land/2015/10/01/javascript-dom-api.html) [《原生 JS 中 DOM 节点相关 API 合集》](https://microzz.com/2017/04/06/jsdom/)

#### 72. innerHTML 与 outerHTML 的区别？

```
对于这样一个 HTML 元素：<div>content<br/></div>。

innerHTML：内部 HTML，content<br/>；
outerHTML：外部 HTML，<div>content<br/></div>；
innerText：内部文本，content ；
outerText：内部文本，content ；
```
