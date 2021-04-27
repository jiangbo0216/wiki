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



## figure

[figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
使用参考掘金文章
https://juejin.im/post/5cc5ad456fb9a032233532df

```html
<!-- Just an image -->
<figure>
  <img
  src="https://developer.mozilla.org/static/img/favicon144.png"
  alt="The beautiful MDN logo.">
</figure>

<!-- Image with a caption -->
<figure>
  <img
  src="https://developer.mozilla.org/static/img/favicon144.png"
  alt="The beautiful MDN logo.">
  <figcaption>MDN Logo</figcaption>
</figure>
<!-- code snippet -->
<figure>
  <figcaption>Get browser details using <code>navigator</code>.</figcaption>
  <pre>
function NavigatorExample() {
  var txt;
  txt = "Browser CodeName: " + navigator.appCodeName + "; ";
  txt+= "Browser Name: " + navigator.appName + "; ";
  txt+= "Browser Version: " + navigator.appVersion  + "; ";
  txt+= "Cookies Enabled: " + navigator.cookieEnabled  + "; ";
  txt+= "Platform: " + navigator.platform  + "; ";
  txt+= "User-agent header: " + navigator.userAgent  + "; ";
  console.log("NavigatorExample", txt);
}
  </pre>
</figure>
<!-- quotation -->
<figure>
  <figcaption><cite>Edsger Dijkstra:</cite></figcaption>
  <blockquote>If debugging is the process of removing software bugs,
  then programming must be the process of putting them in.</blockquote>
</figure>

<!-- poems-->
<figure>
  <p style="white-space:pre">
Bid me discourse, I will enchant thine ear,
  Or like a fairy trip upon the green,
Or, like a nymph, with long dishevell'd hair,
  Dance on the sands, and yet no footing seen:
Love is a spirit all compact of fire,
  Not gross to sink, but light, and will aspire.</p>
  <figcaption><cite>Venus and Adonis</cite>,
    by William Shakespeare</figcaption>
</figure>
```