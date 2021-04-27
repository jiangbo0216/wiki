```js
// import { EventEmitter } from 'events'
const events = require('events')

class HelloEmitter extends events.EventEmitter {
  hello () {
    console.log(this.listeners('hello'))
  }
}

const a = new HelloEmitter()
function hello1 () { console.log('hello1') }
function hello2 () { console.log('hello2') }
function hello3 () { console.log('hello3') }
a.on('hello', hello1)
a.on('hello', hello1)
a.on('hello', hello3)

a.hello()
a.off('hello', hello1)
a.off('hello', hello1)
a.emit('hello')


```
