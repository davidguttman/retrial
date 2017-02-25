var retrial = require('./')

retrial(5, finickyFunction, 1, 2, 3, function (err, r1, r2, r3) {
  if (err) return console.error(err) // 'unlucky' if we're unlucky ;)

  console.log(r1, r2, r3) // 2, 6, 12
})

function finickyFunction (arg1, arg2, arg3, cb) {
  if (Math.random() < 0.2) return cb(null, arg1 * 2, arg2 * 3, arg3 * 4)

  return cb(new Error('unlucky'))
}
