## 安装和编译
```
npm install -g typescript

tsc helloworld.ts
```

初始化
tsc --init


## 配置vscode
1. 创建 tsconfig.json 文件 tsc 
2. 点击菜单 任务-运行任务 点击 tsc:监视-tsconfig.json 然后就可以自动生成代码了

简单的配置
```json
{
    "compilerOptions": {
        "outDir": "./dist",
        "declaration": true,
        "target": "es6",
        "outFile": "./index.js", // 输出到一个文件中 
        "sourceMap": true,
        "module": "commonjs",
        "moduleResolution": "node",
        "strict": true,
        "lib": [
            "es2015",
        ],
        "typeRoots": [
            "./node_modules/@types/"
        ]
    },
    "include": [
        "./src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```


## typeScript中的数据类型

typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型


    布尔类型（boolean）
    数字类型（number） 
    字符串类型(string)
    数组类型（array）
    元组类型（tuple）
    枚举类型（enum）
    任意类型（any）
    null 和 undefined
    void类型
    never类型

## Promise.resolve 类型定义
```ts
<Promise<string>>Promise.resolve('') 
Promise.resolve('') as as Promise<string>
promise.resolve<string>('code')
```

## import * as xxx from ''
default 导出, 需要使用 xxx.default 来获取

## keyof and Lookup Types

##### Example

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string
```

The dual of this is *indexed access types*, also calle



## Mapped Types

One common task is to take an existing type and make each of its properties entirely optional. Let’s say we have a `Person`:

```
interface Person {
  name: string;
  age: number;
  location: string;
}
```

A partial version of it would be:

```
interface PartialPerson {
  name?: string;
  age?: number;
  location?: string;
}
```

with Mapped types, `PartialPerson` can be written as a generalized transformation on the type `Person` as:

```
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialPerson = Partial<Person>;
```



### Deferred

相同的属性名称，但使值是一个 `Promise`，而不是一个具体的值：

```ts
type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};
```





## `object` type

TypeScript did not have a type that represents the non-primitive type, i.e. any thing that is not `number`, `string`, `boolean`, `symbol`, `null`, or `undefined`. Enter the new `object` type.

With `object` type, APIs like `Object.create` can be better represented. For example:

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

## 全局扩充
参考链接：
https://www.itranslater.com/qa/details/2109727184179954688

https://www.tslang.cn/docs/handbook/declaration-merging.html
```ts
import MyInterface from './MyInterface';

declare global {
    interface Window {
        propName: MyInterface
    }
}
```

```ts
// observable.ts
export class Observable<T> {
    // ... still no implementation ...
}

declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}

Array.prototype.toObservable = function () {
    // ...
}
```