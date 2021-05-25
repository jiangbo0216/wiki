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
type a2221 = MyReadOnly<[1,2,3]>

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


// https://github.com/type-challenges/type-challenges/issues/737
/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
 type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;


/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type aaaaaa = LastInUnion<1|2>

type aaaaa = (((x: 1) => 0) & ((x: 2) => 0)) extends (x: infer L) => 0
? L
: never;

type bbb = ((x: 1) => 0) & ((x: 2) => 0)

function cc(x: 1 | 2): 0 {
  return 0
}
let dd: bbb = cc
type UnionToTuple111<T> = { [P in T as string]: [P] }[string];
type a1a = UnionToTuple111<1|2>

// Type lookup
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type LookUp<T extends {type: string}, P> = T extends {type: P} ? T : never
type LookUp1<T extends {type: string}, P> = T['type'] extends P ? T : never

type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
type MyDogType1 = LookUp1<Cat | Dog, 'dog'> // expected to be `Dog`


// Distributed condition type only in Generics
type aaaaabb = 'dog' | 'cat' extends 'dog' ? true : never

type aaaaabb4 = ('cat' extends 'dog' ? true : never) | ('dog' extends 'dog' ? true : never)
type aaaaabb1 = ('dog' extends 'dog' ? true : never)
type aaaaabb2 = ('cat' extends 'dog' ? true : never)
type aaaaabb3 = true | never


// Trim Left
type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer R}`
  ? TrimLeft<R>
  : S;

// Trim
type Trim<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}` ? Trim<R> : S extends `${infer R}${' ' | '\t' | '\n'}` ? Trim<R> : S

// Capitalize
type Capitalize1<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S

type CharMap = { "a": "A", "b": "B", "c": "C", "d": "D", "e": "E", "f": "F", "g": "G", "h": "H", "i": "I", "j": "J", "k": "K", "l": "L", "m": "M", "n": "N", "o": "O", "p": "P", "q": "Q", "r": "R", "s": "S", "t": "T", "u": "U", "v": "V", "w": "W", "x": "X", "y": "Y", "z": "Z" }
type Capitalize2<S extends string> =
    S extends `${infer First}${infer U}` ?
    (First extends keyof CharMap ? `${CharMap[First]}${U}` : S)
    : S;

// Replace
type Replace<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer E}` ? From extends '' ? S : `${F}${To}${E}` : S

// ReplaceAll
type ReplaceAll<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer E}` ? From extends '' ? S : `${F}${ReplaceAll<`${To}${E}`, From, To>}` : S

// Append Argument
//keeps original parameters' name and added "appendArg" for appened argument name.
//not using built-in "Parameters" and "ReturnType"

type AppendArgument<Fn extends (...args: any) => any, A> = Fn extends (
  ...args: infer T
) => infer R
  ? (...args: [...args: T, appendArg: A]) => R
  : never;

// Permutation
type Permutation<T, K=T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never

type Permuted = Permutation<'a' | 'b'>  // ['a', 'b'] | ['b' | 'a']

type StringToArray<S extends string, A extends any[] = []> =
    S extends `${infer Char}${infer Other}`
    ? StringToArray<Other, [...A, Char]>
    : [...A];
type StringToArrayDemo = StringToArray<'123'> // ["1", "2", "3"]


type LengthOfString<S extends string> = StringToArray<S>['length']
type LengthOfString1<S extends string> = S['length'] 
type a21 = LengthOfString1<'123'> // number
type a22 = LengthOfString<'123'> // 3
type a23 = [1,2,3]['length']


// FLat
type Flatten<T extends any[]> = T extends [infer F, ...infer R] ? [...(F extends any[] ? Flatten<F> : [F]), ...Flatten<R>]
: T;

// Append to object
type Test = { id: '1' }
type AppendToObject<T, P extends string, V> = {
  [K in keyof T | P]: K extends keyof T ? T[K] : V
}
type Result11 = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }

// Absolute
// your answers
type Absolute<T extends number | string | bigint> = T extends `${infer First}${infer Rest}` ?
  First extends '-' ?
  Rest : T : Absolute<`${T}`>


// String to Union
type StringToUnion<T extends string, R extends string[] = []>
  = T extends `${infer First}${infer Rest}`
      ? StringToUnion<Rest, [...R, First]>
      : R[number]

type Test11 = '123';
type Result111 = StringToUnion<Test11>; // expected to be "1" | "2" | "3"

// Merge
type Merge<F, S> = {
  [k in keyof F | keyof S]: k extends keyof S ? S[k]: k extends keyof F ? F[k] : never
}

type Flatten111<T> = {[P in keyof T]: T[P]}
type Merge1<F, S> = Flatten111<{[P in Exclude<keyof F, keyof S>]: F[P]} & S>

// CamelCase
type CamelCase<S> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2> 
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S

type KebabCase<S, T extends string = ""> = S extends `${infer First}${infer Rest}` 
? First extends Uncapitalize<First>
  ? KebabCase<Rest, `${T}${First}`>
  : T extends ""
    ? KebabCase<Rest, `${Uncapitalize<First>}`>
    : KebabCase<Rest, `${T}-${Uncapitalize<First>}`>
: T;

type keba = KebabCase<'ooBarBaz'>

type KebabCase1<S> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase1<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase1<S2>}` 
  : S;

// your answers
type Diff<O, O1> = {
  [K in (Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>)]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
}

// Anyof
type Falsy = 0 | '' | false | [] | { [key: string]: never }
type AnyOf<T extends readonly any[]> = 
  T extends [infer H, ...infer Rest]
  ? H extends Falsy ? AnyOf<Rest> : true
  : false;
