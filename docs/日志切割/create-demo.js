const fs = require('fs')
const Readable = require('stream').Readable

let w = fs.createWriteStream('./create.log')

let i = 0
setInterval(() => {
  const s = new Readable({
    read() {}
  })
  if (i % 5 === 0) {
    if (fs.existsSync("./create.log")) {
      fs.renameSync('./create.log', './create.old.log')
    }
    
    w.end()
    w = fs.createWriteStream('./create.log')
  }
  s.push(`${i++} \n`)
  s.pipe(w)
}, 1000)
