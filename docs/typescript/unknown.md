# [未知类型 在TypeScript中](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

五月15，2019

TypeScript 3.0引入了一个新`unknown`类型，它是该类型的类型安全的对应物`any`。

`unknown`和之间的主要区别在于，`any`它`unknown`的容忍度远小于`any`：在对类型的值执行大多数操作之前，我们必须做某种形式的检查`unknown`，而对类型的值执行操作之前，我们不必进行任何检查`any`。

这篇文章着重于`unknown`类型的实际方面，包括与`any`类型的比较。有关显示`unknown`类型语义的综合代码示例，请查看Anders Hejlsberg的[原始pull request](https://github.com/Microsoft/TypeScript/pull/24439)。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#the-any-type)该`any`类型

首先让我们看一下`any`类型，以便我们可以更好地了解引入`unknown`类型的动机。

`any`自2012年首次发布以来，该类型一直在TypeScript中使用。它表示所有可能的JavaScript值-基元，对象，数组，函数，错误，符号以及所拥有的内容。

在TypeScript中，每种类型都可以分配给`any`。这使类型系统`any`成为[*顶级类型*](https://en.wikipedia.org/wiki/Top_type)（也称为*通用超类型*）。

以下是一些我们可以分配给类型变量的值的示例`any`：

```
let value: any;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK
value = Symbol("type");   // OK
```

的`any`，实质上是从类型系统中的逃逸舱口。作为开发人员，这给了我们很大的自由度：TypeScript允许我们对类型的值执行我们想要的任何操作，`any`而无需事先执行任何类型的检查。

在上面的示例中，`value`变量的类型为`any`。因此，TypeScript认为以下所有操作都是类型正确的：

```
let value: any;

value.foo.bar;  // OK
value.trim();   // OK
value();        // OK
new value();    // OK
value[0][1];    // OK
```

在许多情况下，这太宽松了。使用`any`类型，可以很容易地编写类型正确但在运行时有问题的代码。如果选择使用，我们不会从TypeScript获得很多保护`any`。

如果存在默认情况下安全的顶级类型怎么办？这就是`unknown`发挥作用的地方。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#the-unknown-type)该`unknown`类型

就像所有类型都可以分配给一样`any`，所有类型都可以分配给`unknown`。这使`unknown`TypeScript的类型系统成为另一个顶级类型（另一个是`any`）。

这是我们之前看到的相同的分配示例列表，这次使用的变量类型为`unknown`：

```
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK
value = Symbol("type");   // OK
```

所有对该`value`变量的分配都被认为是类型正确的。

但是，当我们尝试将类型的值分配给`unknown`其他类型的变量时会发生什么呢？

```
let value: unknown;

let value1: unknown = value;   // OK
let value2: any = value;       // OK
let value3: boolean = value;   // Error
let value4: number = value;    // Error
let value5: string = value;    // Error
let value6: object = value;    // Error
let value7: any[] = value;     // Error
let value8: Function = value;  // Error
```

该`unknown`类型只分配到`any`类型和`unknown`类型本身。从直觉上讲，这是有道理的：只有能够容纳任意类型的值的容器才能容纳type的值`unknown`；毕竟，我们对存储什么类型的值一无所知`value`。

现在，让我们看看尝试对type的值执行操作时会发生什么`unknown`。以下是我们之前查看过的相同操作：

```
let value: unknown;

value.foo.bar;  // Error
value.trim();   // Error
value();        // Error
new value();    // Error
value[0][1];    // Error
```

将`value`变量键入`unknown`为时，这些操作都不再被视为类型正确的。从`any`转到`unknown`，我们已将默认设置从允许所有更改为不允许（几乎）禁止任何更改。

这是类型的主要价值主张`unknown`：TypeScript不允许我们对type的值执行任意操作`unknown`。相反，我们必须先执行某种类型检查，以缩小正在使用的值的类型。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#narrowing-the-unknown-type)缩小`unknown`类型

我们可以通过`unknown`不同的方式将类型缩小为更具体的类型，包括`typeof`运算符，`instanceof`运算符和自定义类型保护功能。所有这些缩小技术都有助于TypeScript[基于控制流的类型分析](https://mariusschulz.com/blog/control-flow-based-type-analysis-in-typescript)。

下面的示例说明`value`在两个`if`语句分支中如何具有更特定的类型：

```
function stringifyForLogging(value: unknown): string {
  if (typeof value === "function") {
    // Within this branch, `value` has type `Function`,
    // so we can access the function's `name` property
    const functionName = value.name || "(anonymous)";
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) {
    // Within this branch, `value` has type `Date`,
    // so we can call the `toISOString` method
    return value.toISOString();
  }

  return String(value);
}
```

除了使用`typeof`or`instanceof`运算符外，我们还可以`unknown`使用自定义类型保护功能来缩小类型：

```
/**
 * A custom type guard function that determines whether
 * `value` is an array that only contains numbers.
 */
function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.every(element => typeof element === "number")
  );
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
  // Within this branch, `unknownValue` has type `number[]`,
  // so we can spread the numbers as arguments to `Math.max`
  const max = Math.max(...unknownValue);
  console.log(max);
}
```

请注意，尽管声明为type，但它在语句分支中如何`unknownValue`具有type 。`number[]``if``unknown`

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#using-type-assertions-with-unknown)将类型断言与 `unknown`

在上一节中，我们已经了解了如何使用`typeof`，`instanceof`和自定义类型保护函数来说服TypeScript编译器某个值具有某种类型。这是将类型的值范围缩小`unknown`到更具体的类型的安全且推荐的方法。

如果要强制编译器信任类型值`unknown`是给定类型，则可以使用如下类型断言：

```
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase();  // "HELLO WORLD"
```

请注意，TypeScript不会执行任何特殊检查来确保类型断言实际上是有效的。类型检查器假定您了解更多，并相信类型断言中使用的任何类型都是正确的。

如果您输入错误并指定了错误的类型，则很容易导致在运行时引发错误：

```
const value: unknown = 42;
const someString: string = value as string;
const otherString = someString.toUpperCase();  // BOOM
```

该`value`变量保存了一些，但我们假装它的使用类型断言的字符串`value as string`。注意类型断言！

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#the-unknown-type-in-union-types)将`unknown`在联盟类型类型

现在让我们看一下在`unknown`联合类型中如何处理类型。在下一节中，我们还将研究交点类型。

在联合类型中，`unknown`吸收每种类型。这意味着，如果任何构成类型为`unknown`，则联合类型的计算结果为`unknown`：

```
type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
```

此规则的一个例外是`any`。如果构成类型中的至少一种是`any`，则联合类型的计算结果为`any`：

```
type UnionType5 = unknown | any;  // any
```

那么，为什么要`unknown`吸收所有类型（除了`any`）？让我们考虑这个`unknown | string`例子。此类型表示可分配给type的所有值`unknown`以及可分配给type的值`string`。正如我们之前所了解的，所有类型都可以分配给`unknown`。这包括所有字符串，因此，`unknown | string`表示的是与其`unknown`本身相同的一组值。因此，编译器可以将联合类型简化为`unknown`。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#the-unknown-type-in-intersection-types)将`unknown`在路口类型类型

在交叉点类型中，每种类型都吸收`unknown`。这意味着与任何类型相交`unknown`不会更改结果类型：

```
type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
```

让我们看一下`IntersectionType3`：`unknown & string`类型代表可同时分配给`unknown`和的所有值`string`。由于每种类型都可分配给`unknown`，所以`unknown`在相交中包括类型不会更改结果。我们只剩下`string`。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#using-operators-with-values-of-type-unknown)使用具有类型值的运算符 `unknown`

类型的值`unknown`不能用作大多数运算符的操作数。这是因为如果我们不知道所使用的值的类型，大多数运算符就不太可能产生有意义的结果。

您可以在类型值上使用的唯一运算符`unknown`是四个相等和不相等运算符：

- `===`
- `==`
- `!==`
- `!=`

如果要对键入为的值使用任何其他运算符`unknown`，则必须先缩小类型的范围（或使用类型断言强制编译器信任您）。

## [＃](https://mariusschulz.com/blog/the-unknown-type-in-typescript#example-reading-json-from-localstorage)示例：从中读取JSON `localStorage`

这是我们如何使用该`unknown`类型的真实示例。

假设我们要编写一个函数，该函数从`localStorage`JSON中读取值并将其反序列化为JSON。如果该项不存在或不是有效的JSON，则该函数应返回错误结果；否则，该函数将返回错误结果。否则，应反序列化并返回该值。

由于我们不知道反序列化持久化JSON字符串后将获得哪种类型的值，因此我们将其`unknown`用作反序列化值的类型。这意味着我们的函数的调用者在对返回的值执行操作之前必须进行某种形式的检查（或使用类型断言）。

这是我们如何实现该功能的方法：

```
type Result =
  | { success: true, value: unknown }
  | { success: false, error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);

  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`)
    };
  }

  let value: unknown;

  try {
    value = JSON.parse(item);
  } catch (error) {
    // The item is not valid JSON, thus return an error result
    return {
      success: false,
      error
    };
  }

  // Everything's fine, thus return a success result
  return {
    success: true,
    value
  };
}
```

返回类型`Result`是带[标记的联合类型](https://mariusschulz.com/blog/tagged-union-types-in-typescript)（也称为*区分联合类型*）。在其他语言中，它也被称为`Maybe`，`Option`或`Optional`。我们使用`Result`干净的模型来模拟操作成功和失败的结果。

该`tryDeserializeLocalStorageItem`函数的调用者必须`success`在尝试使用`value`或`error`属性之前检查该属性：

```
const result = tryDeserializeLocalStorageItem("dark_mode");

if (result.success) {
  // We've narrowed the `success` property to `true`,
  // so we can access the `value` property
  const darkModeEnabled: unknown = result.value;

  if (typeof darkModeEnabled === "boolean") {
    // We've narrowed the `unknown` type to `boolean`,
    // so we can safely use `darkModeEnabled` as a boolean
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  // We've narrowed the `success` property to `false`,
  // so we can access the `error` property
  console.error(result.error);
}
```

请注意，由于以下两个原因，该`tryDeserializeLocalStorageItem`函数不能简单地返回`null`信号指示反序列化失败：

1. 该值`null`是有效的JSON值。因此，我们将无法区分是对值进行反序列化`null`还是由于缺少项或语法错误而导致整个操作失败。
2. 如果`null`要从函数返回，则无法同时返回错误。因此，我们函数的调用者将不知道操作为何失败。

为了完整起见，此方法的一种更复杂的替代方法是使用[类型化的解码器](https://dev.to/joanllenas/decoding-json-with-typescript-1jjc)进行安全的JSON解析。解码器使我们可以指定要反序列化的值的预期模式。如果持久化的JSON与该模式不匹配，则解码将以定义良好的方式失败。这样，我们的函数将始终返回有效或失败的解码结果，并且我们可以`unknown`完全消除该类型。

这篇文章是[TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution)系列的一部分。