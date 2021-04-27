if (process.getuid) {
  console.log(`Current uid: ${process.getuid()}`);
}

console.log(process.getuid, '-------')
console.log(process.pid, 'process.pid')