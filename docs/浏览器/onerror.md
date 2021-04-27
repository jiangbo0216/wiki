# [onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)

用于收集错误报告

The `**onerror**` property of the [`GlobalEventHandlers`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers) mixin is an [`EventHandler`](https://developer.mozilla.org/en-US/docs/Web/API/EventHandler) that processes `error` events.

Error events are fired at various targets for different kinds of errors:

- When a **JavaScript runtime error** (including syntax errors and exceptions thrown within handlers) occurs, an `error` event using interface [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) is fired at [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) and `window.onerror()` is invoked (as well as handlers attached by [`window.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/Window/addEventListener) (not only capturing)).
- When a resource (such as an [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) or [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)) **fails to load**, an `error` event using interface [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) is fired at the element that initiated the load, and the `onerror()` handler on the element is invoked. These error events do not bubble up to window, but can be handled with a [`window.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/Window/addEventListener) configured with `useCapture` set to `true`.

Installing a global `error` event handler is useful for automated collection of error reports.



## Syntax

For historical reasons, different arguments are passed to `window.onerror` and `element.onerror` handlers (as well as on error-type [`window.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/Window/addEventListener) handlers).

### window.onerror



```js
window.onerror = function(message, source, lineno, colno, error) { ... };
```

Function parameters:

- `message`: error message (string). Available as `event` (sic!) in HTML `onerror=""` handler.
- `source`: URL of the script where the error was raised (string)
- `lineno`: Line number where error was raised (number)
- `colno`: Column number for the line where the error occurred (number)
- `error`: [Error Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) (object)

When the function returns `true`, this prevents the firing of the default event handler.

### window.addEventListener('error')



```html
window.addEventListener('error', function(event) { ... })
```

`event` of type [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) contains all the information about the event and the error.

### element.onerror



```js
element.onerror = function(event) { ... }
```

`element.onerror` accepts a function with a single argument of type [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event).

A good example for this is when you are using an image tag, and need to specify a backup image in case the one you need is not available on the server for any reason.

```
<img src="imagenotfound.gif" onerror="this.onerror=null;this.src='imagefound.gif';" />
```

The reason we have the `this.onerror=null` in the function is that the browser will be stuck in an endless loop if the onerror image itself generates an error.