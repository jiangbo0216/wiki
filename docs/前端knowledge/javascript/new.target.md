# [new.target](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target)

The **`new.target`** pseudo-property lets you detect whether a function or constructor was called using the [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator. In constructors and functions invoked using the [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator, `new.target` returns a reference to the constructor or function. In normal function calls, `new.target` is [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

使用

```js
  constructor(comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    // Array representation of the heap.
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }
```

```js
function Foo() {
  if (!new.target) { throw 'Foo() must be called with new'; }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // expected output: "Foo() must be called with new"
}

```
