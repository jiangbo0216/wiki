# emmet 使用

Emmet uses CSS-like selector syntax, You write CSS-like abbreviations, place your cursor at the end of abbreviation and then press `Tab`, `Ctrl+E` or any other keyboard key configured to expand abbreviations into actual HTML code. 

使用类似css选择器的语法， 编写 emmet 缩写， 光标放在最后，按下扩展快捷键（自定义或者tab）

## html缩写和操作符

| 缩写和操作符        | 示例                          |
| ------------------- | ----------------------------- |
| Element             | div, p, span                  |
| Element with id     | div#header                    |
| Element with class  | div.container, aside.siderbar |
| Child element       | div.header>div.main>.post     |
| Sibling Element E+N | h1+h2                         |
| Multi of Elements   | li*5                          |
| Item numbering      | li.item$*5                    |
| Climb-up ^          | header>#main^footer           |
| Grouping            | ()                            |
| Adding text         | E{text}                       |
|                     |                               |



## Css缩写



| Css缩写    | 示例                                                         |
| ---------- | ------------------------------------------------------------ |
| 属性       | bd （boder: ;）<br />br  (border-right: ;)                   |
| 赋值       | bl:10  (border-left: 10px;)                                  |
| 指定多个值 | m10-20 (margin: 10px 20px;)  负值  m-10--20 （margin: -10px -20px;） |
|            |                                                              |



## 参考

https://www.sitepoint.com/faster-workflow-mastering-emmet-part-1/