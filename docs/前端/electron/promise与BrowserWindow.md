## 创建BrowserWindow传入外部BrowserWindow中的promise

```js
await createLocalBrowserWindow(`${path}?${queryString}`, {
      width: options.width,
      height: options.height,
      frame: false,
      modal: true,
      center: true,
      resizable: false,
      movable: true,
      spellcheck: false,
      customProperty: {
        resolve,
        reject,
        ...(options.customProperty || {})
      }
    }) as BrowserWindow & {resolve: any; reject: any}
```

在创建出的BrowserWindow调用 resolve

```js
const custom = win.webContents
  .browserWindowOptions.customProperty

custom.resolve && custom.resolve(this.psw) // 这里会有一个this的指向问题, 不能直接 const resolve = custom.resolve; resolve()
```
