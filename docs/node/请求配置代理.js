const fetch = require('node-fetch')

const axios = require('axios')

var url = require('url');
var http = require('http');
// require('https').globalAgent.options.ca = require('ssl-root-cas').create();
var HttpsProxyAgent = require('https-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy =  'http://127.0.0.1:8899';
console.log('using proxy server %j', proxy);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0


const randStr = 'rtvrzc67d6'
const params = new URLSearchParams();
params.append('randStr', randStr);
fetch('https://www.google.com',{
  "headers": {

  },
  agent,
  "body": params,
  "method": "post",
  "mode": "cors"
}).then(async (res) => {
  const data = await res.json()
  console.log(data)
  if (data.code === "1") {
    return data.data
  } else {
    throw new Error()
  }
});

// https://github.com/axios/axios
axios.post(`https://www.google.com`, params, {
  "headers": {

  },
  "method": "post",
  "mode": "cors",
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
}).then(async (res) => {
  console.log(res.data)
}).catch(e => {
  console.error(e.toJSON())
});

axios.get('https://testflight.apple.com/v1/invite/b151932af714467a97b4ffc0fb7191d46c573be608594b3398d4e0f8275477d85c81b1d5').then(res => {
  console.log(res.data.indexOf('revoked') > 0)
})
