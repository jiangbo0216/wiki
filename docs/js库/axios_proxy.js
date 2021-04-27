const axios = require('axios').default

axios.get(' http://www.baidu.com/', {
  proxy: {
    host: '127.0.0.1',
    port: 8899
  }
})
//浏览器设置无效, 仅node端生效