## Js中的window.parent ,window.top,window.self 详解



在应用有frameset或者iframe的页面时：

​     parent：是【父窗口】

 
    top：是【最顶级父窗口/浏览器窗口】（有的窗口中套了好几层frameset或者iframe）

 
    self：是【当前窗口】

 
    opener：是用【open方法打开当前窗口的那个窗口】。

 

window.self



功能：是对当前窗口自身的引用。它和window属性是等价的。

语法：window.self

注：window、self、window.self是等价的。

 



window.top

功能：返回顶层窗口，即浏览器窗口。

语法：window.top

注：如果窗口本身就是顶层窗口，top属性返回的是对自身的引用。

 

window.parent

功能：返回父窗口。

语法：window.parent

注：如果窗口本身是顶层窗口，parent属性返回的是对自身的引用。

在框架网页中，一般父窗口就是顶层窗口，但如果框架中还有框架，父窗口和顶层窗口就不一定相同了。

 

判断当前窗口是否在一个框架中：

<script type="text/javascript">var b = window.top!=window.self;document.write( "当前窗口是否在一个框架中："+b );</script>

你应当将框架视为窗口中的不同区域，框架是浏览器窗口中特定的部分。一个浏览器窗口可以根据你的需要分成任意多的框架，一个单个的框架也可以分成其它多个框架，即所谓的嵌套框架。