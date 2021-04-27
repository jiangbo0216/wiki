# 特征(Feature)

基本上vite和静态文件服务器没有太大的不同

相对于本机ESM导入，Vite提供了许多增强功能，以支持通常在基于bundle的设置中看到的各种特性。

## 依赖解析和预打包(NPM Dependency Resolving and Pre-Bundling)

```js
import { someMethod } from 'my-dep'
```

上面大代码在浏览器中会抛出异常, vite 会处理所有静态的源文件中这样的模块引入

1. 预打包, 使用了esbuild
2. 改写import路径为类似这种, /node_modules/.vite/my-dep.js?v=f3sf2ebd



## CSS

### PostCSS

postcss.config.js 会自动应用

