# typeof

## Syntax

The `typeof` operator is followed by its operand:

```
typeof operand
typeof(operand)
```



### Parameters

- `operand`

  An expression representing the object or [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) whose type is to be returned.

  表示式返回的对象或者原始类型



## Description

The following table summarizes the possible return values of `typeof`. For more information about types and primitives, see also the [JavaScript data structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) page.

| Type                                                         | Result                                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined) | `"undefined"`                                                |
| [Null](https://developer.mozilla.org/en-US/docs/Glossary/Null) | `"object"` (see [below](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null)) |
| [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean) | `"boolean"`                                                  |
| [Number](https://developer.mozilla.org/en-US/docs/Glossary/Number) | `"number"`                                                   |
| [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt) (new in ECMAScript 2020) | `"bigint"`                                                   |
| [String](https://developer.mozilla.org/en-US/docs/Glossary/String) | `"string"`                                                   |
| [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol) (new in ECMAScript 2015) | `"symbol"`                                                   |
| [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function) object (implements [[Call]] in ECMA-262 terms) | `"function"`                                                 |
| Any other object                                             | `"object"`                                                   |