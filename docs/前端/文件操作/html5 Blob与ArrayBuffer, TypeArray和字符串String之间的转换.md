# [HTML5 Blob与ArrayBuffer、TypeArray和字符串String之间转换](https://www.cnblogs.com/tianma3798/p/5834598.html)

**1.将String字符串转换成Blob对象**



```
//将字符串 转换成 Blob 对象
var blob = new Blob(["Hello World!"], {
    type: 'text/plain'
});
console.info(blob);
console.info(blob.slice(1, 3, 'text/plain'));
```



**2.将TypeArray  转换成 Blob 对象**



```
//将 TypeArray  转换成 Blob 对象
var array = new Uint16Array([97, 32, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33]);
//测试成功
//var blob = new Blob([array], { type: "application/octet-binary" });
//测试成功， 注意必须[]的包裹
var blob = new Blob([array]);
//将 Blob对象 读成字符串
var reader = new FileReader();
reader.readAsText(blob, 'utf-8');
reader.onload = function (e) {
    console.info(reader.result); //a Hello world!
}
```



**ArrayBuffer转Blob**

 

```
var buffer = new ArrayBuffer(32);
var blob = new Blob([buffer]);       // 注意必须包裹[]
```

 

 

 

**3，将Blob对象转换成String字符串，使用FileReader的readAsText方法**



```
//将字符串转换成 Blob对象
var blob = new Blob(['中文字符串'], {
    type: 'text/plain'
});
//将Blob 对象转换成字符串
var reader = new FileReader();
reader.readAsText(blob, 'utf-8');
reader.onload = function (e) {
    console.info(reader.result);
}
```



**4.将Blob对象转换成ArrayBuffer，使用FileReader的 readAsArrayBuffer方法**



```
//将字符串转换成 Blob对象
var blob = new Blob(['中文字符串'], {
    type: 'text/plain'
});
//将Blob 对象转换成 ArrayBuffer
var reader = new FileReader();
reader.readAsArrayBuffer(blob);
reader.onload = function (e) {
    console.info(reader.result); //ArrayBuffer {}
    //经常会遇到的异常 Uncaught RangeError: byte length of Int16Array should be a multiple of 2
    //var buf = new int16array(reader.result);
    //console.info(buf);

    //将 ArrayBufferView  转换成Blob
    var buf = new Uint8Array(reader.result);
    console.info(buf); //[228, 184, 173, 230, 150, 135, 229, 173, 151, 231, 172, 166, 228, 184, 178]
    reader.readAsText(new Blob([buf]), 'utf-8');
    reader.onload = function () {
        console.info(reader.result); //中文字符串
    };

    //将 ArrayBufferView  转换成Blob
    var buf = new DataView(reader.result);
    console.info(buf); //DataView {}
    reader.readAsText(new Blob([buf]), 'utf-8');
    reader.onload = function () {
        console.info(reader.result); //中文字符串
    };
}
```