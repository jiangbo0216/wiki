// 注意递归函数返回值保持一致
// 也可以用动态规划的方案
const numToAlpha = (prefix, num) => {
  const numStr = String(num)
  if (!numStr) return [prefix]
  const op1 = prefix + String.fromCharCode(Number(numStr[0]) + 96)
  const oo1 = numToAlpha(op1, numStr.slice(1))
  let op2
  let oo2
  if (numStr.length >= 2 && Number(numStr.slice(0,2)) <= 26) {
    op2 = prefix + String.fromCharCode(Number(numStr.slice(0,2)) + 96)
    oo2 = numToAlpha(op2, numStr.slice(2))
  }
  if (oo2) {
    return [...oo1, ...oo2]
    // return oo1
  } else {
    return [...oo1]
    // return oo1
  }
}

// 对于1234
// dp[0] = ["a"]
// dp[1] = ["ab", 'l']
// dp[2] = ["abc", "lc", "aw"]
// dp[3] = ["abcd", "lcd", "awd"]

// dp[i] = dp[i - 1] + (s[i-1, i] <= 26 && dp[i - 2])



console.log(numToAlpha('', 1234))

