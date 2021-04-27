## 1. 什么是`HTML`

1. HTML 是用来描述网页的一种语言。
2. HTML 指的是`超文本标记语言`（HyperText Markup Language）
3. HTML `不是一种编程语言，而是一种标记语言`
4. 标记语言是一套`标记标签` (markup tag)
5. HTML 使用标记标签来描述网页
6. HTML 文档包含了`HTML 标签及文本内容`
7. HTML文档也叫做 `web 页面`

## 2. `<!DOCTYPE>` 文档声明

1. `doctype` 声明是不区分大小写的，用来告知 `Web 浏览器页面使用了 HTML 哪个版本`。

2. `HTML 4.01` 规定了三种不同的 `<!DOCTYPE>` 声明，分别是：`Strict`、`Transitional` 和 `Frameset`。

3. ```
   HTML5
   ```

    

   不是基于 SGML，因此不要求引用 DTD。

   ```js
    <DOCTYPE html>
    // 告诉浏览器当前文档使用的HTML标准是HTML5。如果不写浏览器会进入怪异渲染模式。
   12
   ```

## 3. 根元素`<HTML>`

1. 一个页面最多只能有一个，此元素是所有元素的`祖先元素`

2. `lang ：`根元素里面的属性，此属性为全局、局部属性均可，表示该元素内部使用的文字是`哪一种自然语言`（如：中文、英语…）书写的(值：en表示英文，cmn-hans表示简体中文)

   ```html
   <html lang="en">
   </html>
   12
   ```

## 4. 文档头`<head>`

1. 文档头内部的内容不会显示到网页上，文档头里也有属性。

   ```html
   <!--mate 文档的元数据 ：附加信息-->
     <mate charset="UTF-8">  <!--指定网页内容的编码-->
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!--适配手机端-->
     <meta http-equiv="X-UA-Compatible" content="ie=edge"> <!--告诉浏览器如果使用的是IE浏览器就切换至edge内核
     															edge是微软新开发的浏览器-->
     <title>Document</title> <!--网页标题，中间的内容（Document）可以更改-->				
   123456
   ```

## 5. 文档体`<body>`

1. 页面上所有要参与显示的元素，都应该放置到文档体中

   ```html
   <body>
   </body>
   12
   ```

## 6. 注释

1. 注释为代码的阅读者提供帮助，不参与运行

2. `Ctrl+？`：可以将一行代码变成注释，反之也可以取消注释

3. 空行输出 `Ctrl+?` 可以生成一个空注释

4. 注释可以写多行

   ```html
    <!-- 注释的内容 -->
   1
   ```

## 7. 元素

1. 其他叫法：`标签`、`标记`

2. 元素格式：起始标记（

   ```
   begin tag
   ```

   ） + 元素内容 + 结束标记（

   ```
   end tag
   ```

   ）

   ```js
   <a>元素内容</a>
   1
   ```

## 8. 属性

1. 属性格式：属性名=属性值
   如：`href="元素属性"`
   注：属性可以一个不写，也可以写多个；
2. 全局属性：所有元素通用
   如：`tatle`
3. 局部属性：某些元素特有的属性

## 9. 语义化

### 9.1 什么是语义化

1. 每一个`HTML`元素都有`具体含义`

   ```js
   // 例如：
   	a元素  //超链接
   	p元素  //段落
   	h1元素 //一级标题
   1234
   ```

2. 所有元素与`展示效果无关`:
   元素展示到页面中的效果，应该由css决定。
   因为浏览器带有默认的css样式，所以每个元素都有一些默认的样式。

3. 重点：`选择什么元素，取决于内容的含义`，而不是显示出的效果

### 9.2 为什么需要语义化？

1. 为了搜索`引擎优化`（`SEO`）
   搜索引擎：`百度`、`搜搜`、`Bing`、`google` `...`等等这些搜索引擎每隔一段时间会从整个互联网中抓取页面源代码，语义化能让搜索引擎更好的识别源代码。
2. 为了让浏览器理解网页

## 10. `HTML`实体字符

实体字符通常用于在页面中显示一些特殊符号

1. `<` 小于符号<
2. `>` 大于符号>
3. ` ` 空格
4. `©` 版权符号©
5. `&` &符号



# [为什么要用<!DOCTYPE>声明](https://blog.csdn.net/user_longling/article/details/40071281)



## 实例：

我们经常会看到类似这样的代码：

```html
<!DOCTYPE html>
<html>
<head>
<title>文档的标题</title>
</head>
<body>
文档的内容......
</body>
</html>
```



**注解：**可以看到最上面有一行关于“DOCTYPE”（文档类型）的声明，它就是告诉浏览器，使用哪种规范来解释这个文档中的规范。你知道如果没有它，浏览器在渲染页面的时候会使用怪异模式（各个浏览器在怪异模式下对各个元素渲染时有差异，因此会导致同一个样式在不同浏览器上看到的效果不同）。



## 定义和用法

<!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。

<!DOCTYPE> 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。

在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。

HTML5 不基于 SGML，所以不需要引用 DTD。

**提示：**请始终向 HTML 文档添加 <!DOCTYPE> 声明，这样浏览器才能获知文档类型。



## HTML 4.01 与 HTML5 之间的差异

在 HTML 4.01 中有三种 <!DOCTYPE> 声明。在 HTML5 中只有一种：

```
<!DOCTYPE html>
```



## HTML 元素和文档类型（Doctype）

请参阅这个 [HTML 元素表，其中列出了每种元素会出现在哪个文档类型中](http://www.w3school.com.cn/tags/html_ref_dtd.asp)。

## 提示和注释

**注释：**<!DOCTYPE> 声明没有结束标签。

**提示：**<!DOCTYPE> 声明对大小写不敏感。

**提示：**请使用 W3C 的验证器来检查您是否编写了有效的 HTML / XHTML 文档！



## 常用的 DOCTYPE 声明

### HTML 5

```
<!DOCTYPE html>
```

### HTML 4.01 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

### HTML 4.01 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
```

### HTML 4.01 Frameset

该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" 
"http://www.w3.org/TR/html4/frameset.dtd">
```

### XHTML 1.0 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

### XHTML 1.0 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

### XHTML 1.0 Frameset

该 DTD 等同于 XHTML 1.0 Transitional，但允许框架集内容。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

### XHTML 1.1

该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型（例如提供对东亚语系的 ruby 支持）。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```





## 总结

### （编写HTML时）声明文档类型：

```
<!DOCTYPE html>
```

### 这样声明的好处：



- 你可以轻松的写下这个doctype，而不用担心会写错；
- 它是向后兼容的(因为HTML5的doctype就是这样写的)，并且现代浏览器都认识它。



### 疑问：没有指定dtd将会开启浏览器的怪异模式？

​    这种说法是错的！正确的说法应该是没有定义doctype才会开启怪异模式，也就是说你只需要定义就可以让浏览器在严格模式（标准模式）下渲染页面，而不需要指定某个类型dtd。



### 回顾一下：

​    所有的浏览器都有两种模式：怪异模式和严格模式（也有人叫标准模式）。IE 6 for Windows/mac, Mozilla, Safari和Opera 都实现了这两种模式，但是IE 6以下版本永远定在了怪异模式。



### 关于两种模式，你需要知道以下几点：



1. 在标准化之前写的页面是没有doctype的，因此没有doctype的页面是在怪异模式下渲染的
2. 反过来说，如果web开发人员加入的doctype，说明他知道他所要做的事情，大部分的doctype会开启严格模式（标准模式），页面也会按照标准来渲染。
3. 任何新的或者未知的doctype都会开启严格模式（标准模式）。
4. 每个浏览器都有自己的方式来激活怪异模式。



你可以看看这个清单：http://hsivonen.iki.fi/doctype/

**注意：**你可以根本不需要根据你选择的doctype来验证你的页面，只要doctype标签存在就足以开启严格模式（标准模式）了。如果仍感到怀疑，那么请前往http://www.quirksmode.org/css/quirksmode.html#link2了解你想知道的内容。

我们只需要一小段JavaScript代码就可以得到答案，它就是：



```javascript
mode=document.compatMode;
```



这个代码可以用来判断，当前浏览器是处于怪异模式还是标准模式，该属性的兼容性毋庸置疑，如果你表示怀疑，可以查看http://www.quirksmode.org/dom/w3c_html.html#t11。