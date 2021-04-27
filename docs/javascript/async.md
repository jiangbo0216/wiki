let array = [1,1,1];
(async () => {

  for (let index = 0; index < array.length; index++) {
    console.log(index)
    await Promise.resolve(index).then(console.log)
  }
  // console.log(index)
  // await Promise.resolve(index).then(console.log)
  // console.log(index)
  // await Promise.resolve(index).then(console.log)
  // console.log(index)
  // await Promise.resolve(index).then(console.log)
})()

0
0
1
1
2
2
