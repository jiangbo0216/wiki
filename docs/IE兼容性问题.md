## IE9 不支持 CORS
## ele.href 兼容性问题

## 检查IE浏览器
```js
/**
 * 判断ie所有版本
 * @returns {Number} - ie版本号 或 false
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {

        /* ie10- 返回版本号 */
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');

        /* ie11 返回版本号 */
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {

        /* Edge(ie 12+) 返回版本号 */
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    /* 其他浏览器 返回false */
    return false;
}
```

```js
/**
 * 判断ie6、7、8、9版本
 * @param {Number|String} [num] - ie版本号。可填6、7、8、9；若为空则只要是ie6~9则返回1
 * @returns {Number} - 0 或 1
 */
function isIE(num) {
    var dom = document.createElement('b');

    dom.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->';

    return dom.getElementsByTagName('i').length;
}
```


