## JSONP
```
$.ajax({
        url: 'your.url',
        type: 'get', //非必填
        async:false, //非必填
        dataType: "jsonp",
        jsonpCallback:"[callbackName]",
        success: function (res) {
          console.log(res);
        },
        error:function(){
        }
      })
```
参考：
* https://www.kancloud.cn/wizardforcel/zeptojs-api-doc/101802