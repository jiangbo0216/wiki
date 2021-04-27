const {Writable} = require('stream') 

const w = new Writable()
w.on('end', ()=>console.log('end'))
w.end()