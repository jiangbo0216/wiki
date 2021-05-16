// Implement a type IsNever, which takes input type T. If the type of resolves to never, return true, otherwise false.

// For example:

type A = IsNever<never>  // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false


// This solution seems too simple, but in my opinion, using the standard Equal function is the most correct way to create functions of the form IsNever, IsAny, IsVoid, and so on, since Equal extracts the exact internal function of type equality from TS, and does not rely on some peculiarities of types (which may hypothetically change in future versions of TS).
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

// type IsNever<T> = T[] extends never[] ? true : false 
// type IsNever<T> = [T] extends [never] ? true : false 
type IsNever<T> = Equal<never, T>