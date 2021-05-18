type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;

type Contra1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

type Contra2 = Bar<{ a: (x: { a: string }) => void; b: (x: { b: string }) => void }>;

type a = { a: string } | { b: string };

// 利用函数参数逆变, 把 | 变成 &
type Union2Intersection<T> = (T extends any ? (a: T) => any : never) extends (b: infer U) => any ? U : never;

type res = Union2Intersection<a>;


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

type LastInUnion1111<U> = UnionToIntersection<
U extends unknown ? (x: U) => 0 : never
>

type last111 = LastInUnion1111<{ foo: string } | { bar: string }>
type last1111 = LastInUnion1111<1 | 2>


type lastinunion11<T> = T extends (x: infer L) => 0
 ? L : never

type lastinunion33 = lastinunion11<last1111>
type lastinunion22 = lastinunion11<(x: 3) => 0 & ((x: 1) => 0) & ((x: 2) => 0)>
type lastinunion44 = lastinunion11<((x: 3) => 0) & ((x: 1) => 0) & ((x: 2) => 0)>
type lastinunion55 = lastinunion11<(x: 3) => 0 | ((x: 1) => 0) | ((x: 2) => 0)>
type lastinunion66 = lastinunion11<((x: 3) => 0) | ((x: 1) => 0) | ((x: 2) => 0)>
