https://github.com/type-challenges/type-challenges/issues/737

```
type h = ((x: 1) => 0) & ((x: 2) => 0) //why h not never
```

Function arguments are in contravariant positions, so when functions intersect, arguments do not intersect, but are united.
This intersection of functions forms an overload -- a function that takes either 1 or 2 as its first argument.

```
type e = (((x: 1) => 0) & ((x: 2) => 0)) extends (x: infer L) => 0 ? L : never; //  why e is 2 not never or 1?
```

This is a feature of TS, mentioned somewhere in the documentation -- if it is necessary to output one type from overload, TS selects the last signature (`(x: 2) => 0`) in the overload.

```ts
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
```

