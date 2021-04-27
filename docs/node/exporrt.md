## [export导出及exports](https://www.typescriptlang.org/play?target=0&module=1#code/FAYw9gdgzgLgBAQzgXjhArgG08ApgDwAcwAneAbwQF88jT4AzdCEGAS0jgYAoBKOcsDjDEKOAEZgVEUA)

```ts
const a = null
export {a}
export function f() {
    a = 1
}
```

commonjs

```js
"use strict";
exports.__esModule = true;
exports.f = exports.a = void 0;
var a = null;
exports.a = a;
function f() {
    exports.a = a = 1;
}
exports.f = f;
```

[普通的导出](https://babeljs.io/en/repl)

```js
let a = 1

exports.a = a
function f() {
    a = 2
}
exports.f = f
```
