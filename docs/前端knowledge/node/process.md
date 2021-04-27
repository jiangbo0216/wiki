## 去掉Listener限制

实例:

```js
process.setMaxListeners(0)
```

#### `emitter.setMaxListeners(n)`[#](https://nodejs.org/api/events.html#events_emitter_setmaxlisteners_n)

Added in: v0.3.5

- `n` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
- Returns: [](https://nodejs.org/api/events.html#events_class_eventemitter)

By default `EventEmitter`s will print a warning if more than `10` listeners are added for a particular event. This is a useful default that helps finding memory leaks. The `emitter.setMaxListeners()` method allows the limit to be modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.
