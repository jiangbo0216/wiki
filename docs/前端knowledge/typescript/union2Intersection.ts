type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;

type Contra1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

type Contra2 = Bar<{ a: (x: { a: string }) => void; b: (x: { b: string }) => void }>;

type a = { a: string } | { b: string };

// 利用函数参数逆变, 把 | 变成 &
type Union2Intersection<T> = (T extends any ? (a: T) => any : never) extends (b: infer U) => any ? U : never;

type res = Union2Intersection<a>;