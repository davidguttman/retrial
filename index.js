var slice = [].slice

module.exports = function retryify (count, fn) {
  var argsIn = arguments.length >= 3 ? slice.call(arguments, 2) : []
  var onFinish = argsIn.pop()

  return fn.apply(null, argsIn.concat([cb]))

  function cb (err) {
    var argsOut = slice.call(arguments)

    if (!err) return onFinish.apply(null, argsOut)

    if (count-- <= 0) return onFinish.apply(null, argsOut)

    return retryify.apply(null, [count, fn].concat(argsIn, [onFinish]))
  }
}
