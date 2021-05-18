// Implement RemoveIndexSignature<T> , exclude the index signature from object types.

// For example:


type Foo = {
  [key: string]: any;
  foo(): void;
}

type _RemoveIndexSignature = RemoveIndexSignature<Foo>  // expected { foo(): void }

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K]
};


type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

// FIXME
// as keyword