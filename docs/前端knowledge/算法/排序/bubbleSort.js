function bubbleSort (arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return

  let lastIndex = arr.length - 1
  while (lastIndex > 0) {
    let flag = true, k = lastIndex
    // 每一轮循环把最大的数放在末尾
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1] ) { 
        flag = false,
        // 没有发生交换说明有序
        lastIndex = j // 记录下最后一次交换的位置
        [arr[j], arr[j+1]] = [arr[j + 1], arr[j]]
      }
    }

    if (flag) break
  }
}