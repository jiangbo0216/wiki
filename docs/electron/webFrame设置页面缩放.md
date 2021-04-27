# [webFrame](https://www.electronjs.org/docs/api/web-frame#webframe)

> Customize the rendering of the current web page.

Process: [Renderer](https://www.electronjs.org/docs/glossary#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

An example of zooming current page to 200%.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```