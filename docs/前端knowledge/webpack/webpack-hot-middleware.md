This module is only concerned with the mechanisms to connect a browser client to a webpack server & receive updates. It will subscribe to changes from the server and execute those changes using webpack's HMR API. Actually making your application capable of using hot reloading to make seamless changes is out of scope, and usually handled by another library.

这个模块只关心 浏览器客户端与webpack服务的 connect 以及接收 updates

Webpack-hot-middleware 插件的作用就是提供浏览器和 Webpack 服务器之间的通信机制、且在浏览器端接收 Webpack 服务器端的更新变化。
