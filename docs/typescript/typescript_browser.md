
## tsc, import与浏览器环境

tsc编译的代码要直接在浏览器中运行,

* 使用umd module, 但是不能使用import
* es2015, 引入脚本加上 type="module"
* requirejs 不支持 加载url指定的package
