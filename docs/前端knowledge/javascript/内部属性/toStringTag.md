# [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#custom_classes_default_to_object_tag)

The **`Symbol.toStringTag`** well-known symbol is a string valued property that is used in the creation of the default string description of an object. It is accessed internally by the [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method.

<iframe class="interactive interactive-js" width="100%" height="250" src="https://interactive-examples.mdn.mozilla.net/pages/js/symbol-tostringtag.html" title="MDN Web Docs Interactive Example" loading="lazy" style="box-sizing: border-box; background-color: rgb(238, 238, 238); border: 0px; color: rgb(33, 33, 33); height: 490px; padding: 10px; width: 809.276px;"></iframe>

| Property attributes of `Symbol.toStringTag` |      |
| :------------------------------------------ | ---- |
| Writable                                    | no   |
| Enumerable                                  | no   |
| Configurable                                | no   |

## [Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#examples)

### [Default tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#default_tags)

```
Object.prototype.toString.call('foo');     // "[object String]"
Object.prototype.toString.call([1, 2]);    // "[object Array]"
Object.prototype.toString.call(3);         // "[object Number]"
Object.prototype.toString.call(true);      // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null);      // "[object Null]"
// ... and more
```

### [Built-in toStringTag symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#built-in_tostringtag_symbols)

```
Object.prototype.toString.call(new Map());       // "[object Map]"
Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
// ... and more
```

### [Custom classes default to object tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#custom_classes_default_to_object_tag)

When creating your own class, JavaScript defaults to the "Object" tag:

```
class ValidatorClass {}

Object.prototype.toString.call(new ValidatorClass()); // "[object Object]"
```

### [Custom tag with toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#custom_tag_with_tostringtag)

Now, with the help of `toStringTag`, you are able to set your own custom tag:

```
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return 'Validator';
  }
}

Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```

### [toStringTag available on all DOM prototype objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag#tostringtag_available_on_all_dom_prototype_objects)

Due to a [WebIDL spec change](https://github.com/heycam/webidl/pull/357) in mid-2020, browsers are adding a `Symbol.toStringTag` property to all DOM prototype objects. For example, to acccess the `Symbol.toStringTag` property on [`HTMLButtonElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement):

```
let test = document.createElement('button');
test.toString(); // Returns [object HTMLButtonElement]
test[Symbol.toStringTag];  // Returns HTMLButtonElement
```

# 