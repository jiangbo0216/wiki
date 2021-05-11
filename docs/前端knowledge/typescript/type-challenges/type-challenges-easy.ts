interface todo {
  title: string;
  description: string;
  completed: boolean;
}

// Pick
type todo_Pick = Pick<todo, 'title' | 'completed'>
type MyPick<T, K extends keyof T> = {
  [k in K]: T[k];
}

// Distributive conditional types 分配条件类型
// 扩展了 Conditional types

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T1 = TypeName<"a">;
type T5 = TypeName<string | (() => void)>;

// Exclude 从集合中排除
type exclude1 = Exclude<'a' | 'b' | 'c', 'a'>
type MyExclude<T, U> = T extends U ? never : T
type exclude2 = MyExclude<'a' | 'b' | 'c', 'a'>



const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// Tuple to Object
type TupleToObject<Tuple extends readonly any[]> = {
  [P in Tuple[number]]: P;
}
let result: TupleToObject<typeof tuple> = { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// Fist of Array
type FistOfArray<T extends any[]> = T['length'] extends 0 ? never: T[0]
type first = FistOfArray<[1,2]>

// Length of Tuple
type LengthOfTuple<T extends any[]> = T['length']
type Length<T extends any> = T extends { length: number } ? T['length'] : never
type length1 = LengthOfTuple<[1,2]>
type length2 = Length<[1,2]>
type length3 = Length<{a:1}>

// Awaited
type Awaited<T> = T extends Promise<infer U> ? U : T
const a = Promise.resolve(1)
type awaited1 = Awaited<1>
type awaited2 = Awaited<typeof a>
type awaited3 = Awaited<Promise<boolean>>

// If
type If<Bool extends boolean, A, B> = Bool extends true ? A : B
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'

// Concat
type Concat<A extends any[], B extends any[]> = [...A,...B]
type Concat1<A extends unknown[], B extends unknown[]> = [...A,...B]
type Concat2<A extends Array<any>, B extends Array<any>> = [...A,...B]

// Include
type Include<I extends any[], K> = K extends I[number] ? true : false 
type Includes<T extends readonly any[], U> = T extends Array<infer K> ? U extends K ? true : false : false;
type include = Include<[1,2], 1>
