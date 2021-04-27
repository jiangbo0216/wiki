
const P = new Promise((resolve) => {
  throw new Error()
});
(async () => {
  try {
  
    // 两个都会执行
    await P.then((a) => {
      console.log(a)
    })
  } catch (error) {
    console.log('111')
  }
  
  try {
    await P.then((a) => {
      console.log(a)
    })
  } catch (error) {
    console.log('11122')
  }
})()

