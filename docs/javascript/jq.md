## 修改a标签属性

原生写法：
```js
document.getElementById("myId").setAttribute("href","www.xxx.com");
document.getElementById("myId").href = "www.xxx.com";
```

jquery:

```js
$("#myId").attr("href","www.xxx.com"); 
```

## 监听input值

```js
jq('#url').bind('input', function (e) {
  console.log(e)
})
```
