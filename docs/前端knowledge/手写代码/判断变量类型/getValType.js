const getValType = (val) => {
  let type = typeof val
  if (type === 'object') {
    const s = Object.prototype.toString.call(val)
    typeStr = typeStr.split(' ')[1]
    type = typeStr.substring(0, typeStr.length - 1)
  }
  return type
}