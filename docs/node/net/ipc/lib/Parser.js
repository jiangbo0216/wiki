'use strict';

const StringDecoder = require('string_decoder').StringDecoder
const EventEmitter = require('events')

class Parser extends EventEmitter {
  constructor () {
    super ()
    this.decoder = new StringDecoder('utf-8')
    this.jsonBuffer = ''
  }

  encode (message) {
    return JSON.stringify(message) + '\n'
  }

  feed (buf) {
    let jsonBuffer = this.jsonBuffer

    jsonBuffer += this.decoder.write(buf)

    let i, start = 0

    // 找到消息结束的位置索引
    while ((i=jsonBuffer.indexOf('\n', start) )> 0) {
      const json = jsonBuffer.slice(start, i)
      const message = JSON.parse(json)
      console.log(message)
      this.emit('message', message)
      start = i + 1;
    }

    this.jsonBuffer = jsonBuffer.slice(start)
  }
}

module.exports = Parser;