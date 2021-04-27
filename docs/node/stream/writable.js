// const { Writable } = require('stream');

// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   }
// });

// process.stdin.pipe(outStream);

// process.stdin.pipe(process.stdout);


const { Readable } = require('stream'); 

// const inStream = new Readable({
//   read() {}
// });

// inStream.push('ABCDEFGHIJKLM');
// inStream.push('NOPQRSTUVWXYZ');

// inStream.push(null); // No more data

// inStream.pipe(process.stdout);

// const inStream = new Readable({
//   read(size) {
//     this.push(String.fromCharCode(this.currentCharCode++));
//     if (this.currentCharCode > 90) {
//       this.push(null);
//     }
//   }
// });

// inStream.currentCharCode = 65;

// inStream.pipe(process.stdout);

const { Duplex } = require('stream');

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout);