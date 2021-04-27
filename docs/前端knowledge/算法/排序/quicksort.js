function quicksort (arr) {
  if (arr.length <= 1) return arr

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  let left = [], right = []

  for (let i = 0; i < arr.length; i++) {
   if (arr[i] < pivot) {
     left.push(arr[i])
   } else {
     right.push(arr[i])
   }
  }
  return quicksort(left).concat([pivot], quicksort(right))
}

console.log(quicksort([1,4,5,7,2,8,3,7,4,5,2,5,25]))