```ts
type Unpromisify<P> = P extends Promise<infer T> ? T : P;
```