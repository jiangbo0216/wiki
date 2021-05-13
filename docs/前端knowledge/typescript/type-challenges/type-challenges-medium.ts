// Get Return Type
type returntype = ReturnType<() => number>
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Omit 从对象中omit
interface Todo {
  title: string
  description: string
  completed: boolean
}
type omit = Omit<Todo, 'completed'>
type MyOmit<T, K> = {
  [P in keyof T as Exclude<P,K>]: T[P]
}

type omit1 = MyOmit<Todo, 'completed'>


// ReadOnly
type todo_ReadOnly = Readonly<todo>
type fal = 'false'
type readOnly_arr = Readonly<fal>
type MyReadOnly<T> = {
  readonly [k in keyof T]: T[k];
}

type a111 = keyof 'a'
type a222 = MyReadOnly<'a'>

type a333 = {
  readonly [k in keyof 'a']: 'a'[k];
}

// Deep ReadOnly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string | number, unknown>
      ? DeepReadonly<T[P]>
      : T[P];
};

type DeepReadonly1<T> = {
  readonly [P in keyof T]: T[P] extends ((...arg: any) => any) ? T[P] : DeepReadonly<T[P]>
}

type DeepReadonly2<T> = {
  readonly [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends Record<any, any> ? DeepReadonly<T[K]> : T[K];
}

type DeepReadonly3<T> = keyof T extends never ? T : { readonly [P in keyof T]: DeepReadonly<T[P]>  }


// Tuple to Union
type TypeToUnion<T> = T extends any[] ? T[number] : T
type tupletoUnion = TypeToUnion<[1,2,3]>

// Chainable Options
type Chainable<T = {}>= {
  option<S extends string | number | symbol, U>(key: S, value: U): Chainable<T & {[key in S]: U}>;
  get(): T;
}

declare const config: Chainable
// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
let result1: Result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// in 的作用: 遍历
type a = {
  [k in 'a']: string;
}

// Last of Array

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type Last<T> = T extends [...any, infer L] ? L :T

type Length<T extends any[]> = T['length'];

type RestOfArray<T extends any[]> = T extends [infer A0, ...infer A] ? A : never;

type Last1<T extends any[], N extends number = 0> = {
  0: T[N];
  1: Last1<RestOfArray<T>>
}[Length<T> extends 1 ? 0 : 1];

type ExcludeFirst<T extends any[]> = T extends [any, ...infer F] ? F : never;
type Last3<T extends any[]> = T extends [infer F] ? F : Last3<ExcludeFirst<T>>;

// Last of Array 添加元素
type Last4<T extends any[]> = [any, ...T][T["length"]];

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
type tail3 = Last3<arr1> // expected to be 1
type tail4 = Last3<arr2> // expected to be 1
type tail5 = Last4<arr1> // expected to be 1
type tail6 = Last4<arr2> // expected to be 1

// Pop
type Pop<T extends any[]> = T extends [...infer A, any] ? A : never
type arr11 = ['a', 'b', 'c', 'd']
type arr22 = [3, 2, 1]

type re1 = Pop<arr11> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr22> // expected to be [3, 2]


// Promise.all
declare function PromiseAll<T extends any[]> (values : readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer V> ? V : T[P]
}>

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, number, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)
const pp = PromiseAll([promise1, promise2, promise3] as const)

// 遍历一个数据, 生成一个数组
type fdd<T extends any[]> = {
  [P in keyof T]: T[P]
}

type aaaa = fdd<[1,2,3]>

