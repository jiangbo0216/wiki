```ts
type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;
```
