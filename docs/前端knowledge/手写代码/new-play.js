function create () {
  const construct = [].shift.call(arguments)
  const obj = Object.create(construct)

  const ret = construct.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}