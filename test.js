var tape = require('tape')
var retryify = require('./')

tape('basic function', function (t) {
  return retryify(2, second, 'a', 'b', 'c', function (err, r1, r2, r3) {
    t.ifError(err, 'should not error')
    t.deepEqual(r1, 'a', 'result 1 should match')
    t.deepEqual(r2, 'b', 'result 2 should match')
    t.deepEqual(r3, 'c', 'result 3 should match')
    return t.end()
  })
})

tape('give up', function (t) {
  return retryify(5, never, 'a', function (err, result) {
    t.equal(err.message, 'never', 'should error')
    return t.end()
  })
})

var secondCalls = 0
function second (arg1, arg2, arg3, cb) {
  if (secondCalls++ % 2 === 0) return cb(null, arg1, arg2, arg3)

  return cb(new Error(secondCalls))
}

function never (arg1, cb) {
  return cb(new Error('never'))
}
