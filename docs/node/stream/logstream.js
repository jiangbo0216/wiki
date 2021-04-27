const fs = require('fs')
const Readable = require('stream').Readable

let w = fs.createWriteStream('./create.log')

let i = 0
class SourceWrapper extends Readable {
  constructor(options) {
    super(options);
  }
  // _read() will be called when the stream wants to pull more data in.
  // The advisory size argument is ignored in this case.
  _read(size) {
  }
}

let s = new SourceWrapper()
s.push(`日志${i++} \n`, )
s.pipe(w)

setInterval(() => {

  console.log(i, '=============')
  if (i % 5 === 0) {
    if (fs.existsSync("./create.log")) {
      fs.renameSync('./create.log', './create.old.log')
    }
    s.push(null)
    s = new SourceWrapper()
    w.end()
    w = fs.createWriteStream('./create.log')
    s.pipe(w)
  }
  s.push(`日志${i++} \n`, )
}, 100)