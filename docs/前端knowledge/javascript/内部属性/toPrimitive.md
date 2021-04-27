# Symbol.toPrimitive

The **`Symbol.toPrimitive`** is a symbol that specifies a function valued property that is called to convert an object to a corresponding primitive value.

<iframe class="interactive interactive-js" width="100%" height="250" src="https://interactive-examples.mdn.mozilla.net/pages/js/symbol-toprimitive.html" title="MDN Web Docs Interactive Example" loading="lazy" style="box-sizing: border-box; background-color: rgb(238, 238, 238); border: 0px; color: rgb(33, 33, 33); height: 490px; padding: 10px; width: 809.276px;"></iframe>

## [Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive#description)

With the help of the `Symbol.toPrimitive` property (used as a function value), an object can be converted to a primitive value. The function is called with a string argument `hint`, which specifies the preferred type of the result primitive value. The `hint` argument can be one of "`number`", "`string`", and "`default`".



| Property attributes of `Symbol.toPrimitive` |      |
| :------------------------------------------ | ---- |
| Writable                                    | no   |
| Enumerable                                  | no   |
| Configurable                                | no   |



## [Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive#examples)

### [Modifying primitive values converted from an object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive#modifying_primitive_values_converted_from_an_object)

Following example describes how `Symbol.toPrimitive` property can modify the primitive value converted from an object.

```
// An object without Symbol.toPrimitive property.
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ''); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10;
    }
    if (hint == 'string') {
      return 'hello';
    }
    return true;
  }
};
console.log(+obj2);     // 10        -- hint is "number"
console.log(`${obj2}`); // "hello"   -- hint is "string"
console.log(obj2 + ''); // "true"    -- hint is "default"
```

## [Specifications](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive#specifications)

| Specification                                                |
| :----------------------------------------------------------- |
| [ECMAScript (ECMA-262) The definition of 'Symbol.toPrimitive' in that specification.](https://tc39.es/ecma262/#sec-symbol.toprimitive) |

