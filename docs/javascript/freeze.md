# Object.freeze()

The `**Object.freeze()**` method **freezes** an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. `freeze()` returns the same object that was passed in.

changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. `freeze()` returns the same object that was passed in.

<iframe class="interactive interactive-js" width="100%" height="250" src="https://interactive-examples.mdn.mozilla.net/pages/js/object-freeze.html" title="MDN Web Docs Interactive Example" loading="lazy" style="box-sizing: border-box; background-color: rgb(238, 238, 238); border: 0px; color: rgb(33, 33, 33); height: 490px; padding: 10px; width: 1002.02px;"></iframe>

## [Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#syntax)

```
Object.freeze(obj)
```

### [Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#parameters)

- `obj`

  The object to freeze.

### [Return value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#return_value)

The object that was passed to the function.