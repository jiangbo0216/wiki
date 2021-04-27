# [dart语言之旅](https://dart.dev/guides/language/language-tour#a-basic-dart-program)

* [语言示例](https://dart.dev/samples)
* [核心库](https://dart.dev/guides/libraries/library-tour)
* [语言规范](https://dart.dev/guides/language/spec)

## 基础Dart程序

```Dart
// Define a function.
void printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
void main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

* main [更多](https://dart.dev/guides/language/language-tour#the-main-function)
* var 声明变量不用指定类型
* $variableName (or ${expression})  String interpolation

## 重要概念
