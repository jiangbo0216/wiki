# in 操作符
遍历

```ts
type a = {
  [k in 'a']: string;
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
/*
1. 遍历对象返回对象
2. 遍历数组，返回数组
3. 遍历一个值，返回一个值
*/

```