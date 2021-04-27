// (?:exp)      | 匹配exp,不捕获匹配的文本，也不给此分组分配组号  

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

const a = skipWhiteSpace.exec('// 这是一个注释')
console.log(a) // 输出： [ '// 这是一个注释', index: 0, input: '// 这是一个注释', groups: undefined ]

var skipWhiteSpace1 = /(\s|\/\/.*|\/\*[^]*?\*\/)*/g;

const a1 = skipWhiteSpace1.exec('// 这是一个注释')
console.log(a1)
// 输出
/*
[
  '// 这是一个注释',       
  '// 这是一个注释',       
  index: 0,
  input: '// 这是一个注释',
  groups: undefined        
]
*/


