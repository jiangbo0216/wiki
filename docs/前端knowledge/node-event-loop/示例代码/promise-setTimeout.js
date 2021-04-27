setTimeout(()=> {
  console.log(3)
})
new Promise((resolve) => {
  console.log('1')
  resolve(2)
}).then((res) => {
  console.log(res)
  return 4
}).then(console.log)

// 1
// 2
// 4
// 3