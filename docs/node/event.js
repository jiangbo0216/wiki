const events = require('events')

function hello1 () { console.log('hello1') }
function hello2 () { console.log('hello2') }
function hello3 () { console.log('hello3') }
function hello4 () { console.log('hello4') }
class HelloEmitter extends events.EventEmitter {
  hello () {
    this.on('hello', hello4)
    console.log(this.listeners('hello'))
  }
}

const a = new HelloEmitter()

a.on('hello', hello1)
a.on('hello', hello2)
a.on('hello', hello3)

a.hello()
a.off('hello', hello1)
a.off('hello', hello2)
a.emit('hello')
