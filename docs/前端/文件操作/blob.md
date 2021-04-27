## [Syntax](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#syntax)

```
var newBlob = new Blob(array, options);
```

### [Parameters](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#parameters)

- `array`

  An [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView), [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) objects, or a mix of any of such objects, that will be put inside the [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob). `USVString` objects are encoded as UTF-8.

- `options` Optional

  An optional object of type `BlobPropertyBag` which may specify any of the following properties:`type` OptionalThe [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the data that will be stored into the blob. The default value is the empty string, (`""`).`endings` Optional How to interpret newline characters (`\n`) within the contents, if the data is text. The default value, `transparent`, copies newline characters into the blob without changing them. To convert newlines to the host system's native convention, specify the value `native`.



所以是 `new Blob([new Buffer()])`