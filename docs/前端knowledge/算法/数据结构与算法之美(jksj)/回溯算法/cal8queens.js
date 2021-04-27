let result = [] // 全局变量中, 下标表示行, 值表示queen存储在哪一列
let total = 0
function cal8queens(row) {
  if (row === 8) { // 8个都放置好了, 打印结果
    printQueens(result)
    return
  }
  // 每一次的递归中都有一次循环, 最终某一次不OK的时候回到for循环这里继续下一次的搜索
  for (let column = 0; column < 8; column++) {  // 每一行有8种放法
    if (isOk(row, column)) {
      result[row] = column  // 第row行的棋子放到了column列
      cal8queens(row + 1) // 考察下一行
    }
  }
}

function isOk(row, column) { //判断row行column列放置是否合适
  let leftup = column -1, rightup = column + 1
  for (let i = row - 1; i >= 0; --i) {  // 逐行往上考察每一行
    if (result[i] === column) return false // 第i行的column列有棋子吗？
    if (leftup >= 0) {// 考察左上对角线：第i行leftup列有棋子吗？
      if (result[i] === leftup) return false
    }
    if (rightup < 8) {// 考察右上对角线：第i行rightup列有棋子吗？
      if (result[i] === rightup) return false
    }
    --leftup, ++rightup
  }
  return true
}

function printQueens (result) {  // 打印出一个二维矩阵
  console.log(`第${++total}种情况: `)
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      if (result[row] === column) process.stdout.write('Q ')
      else process.stdout.write('* ')
    }
    console.log()
  }
  console.log()
}

cal8queens(0)