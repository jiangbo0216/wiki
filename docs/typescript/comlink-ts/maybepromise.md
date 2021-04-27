```ts
/**
 * Expresses that a type can be either a sync or async.
 */
type MaybePromise<T> = Promise<T> | T;
```
