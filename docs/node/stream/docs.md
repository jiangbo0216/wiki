# Stream

处理流式数据的抽象接口, stream 模块提供了实现了stream接口的api

Node.js提供了很多流对象, HTTP process.stdout

readable, writable, or both, 所有的stream是 EventEmitter的实例

`const stream = require('stream');`

## 类型

- [`Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable): streams to which data can be written (for example, [`fs.createWriteStream()`](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)).
- [`Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable): streams from which data can be read (for example, [`fs.createReadStream()`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)).
- [`Duplex`](https://nodejs.org/api/stream.html#stream_class_stream_duplex): streams that are both `Readable` and `Writable` (for example, [`net.Socket`](https://nodejs.org/api/net.html#net_class_net_socket)).
- [`Transform`](https://nodejs.org/api/stream.html#stream_class_stream_transform): `Duplex` streams that can modify or transform the data as it is written and read (for example, [`zlib.createDeflate()`](https://nodejs.org/api/zlib.html#zlib_zlib_createdeflate_options)).

Additionally, this module includes the utility functions [`stream.pipeline()`](https://nodejs.org/api/stream.html#stream_stream_pipeline_source_transforms_destination_callback), [`stream.finished()`](https://nodejs.org/api/stream.html#stream_stream_finished_stream_options_callback) and [`stream.Readable.from()`](https://nodejs.org/api/stream.html#stream_stream_readable_from_iterable_options).

## Buffering



