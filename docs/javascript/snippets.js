// 判断是数组
var isArray = Array.isArray || (function (obj) { return (
  toString.call(obj) === "[object Array]"
); });

// 从空格间隔的字符串生成 | 格式的正则表达式
function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}s

// 匹配js字符串
var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;