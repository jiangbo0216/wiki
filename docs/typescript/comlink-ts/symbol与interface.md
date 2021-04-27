
<https://github.com/jiangbo0216/comlink/blob/cc5874a8b310c102402cb782982c3fb9b1f5bf82/src/comlink.ts>

```ts
export const proxyMarker = Symbol("Comlink.proxy");
export interface ProxyMarked {
  [proxyMarker]: true;
}
```


