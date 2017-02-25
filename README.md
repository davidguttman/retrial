# retrial

Easily retry an async function without mangling it.

## Example

```js
var retrial = require('retrial')

retrial(5, finickyFunction, 1, 2, 3, function (err, r1, r2, r3) {
  if (err) return console.error(err) // 'unlucky' if we're unlucky ;)

  console.log(r1, r2, r3) // 2, 6, 12
})

function finickyFunction (arg1, arg2, arg3, cb) {
  if (Math.random() < 0.5) return cb(null, arg1 * 2, arg2 * 3, arg3 * 4)

  return cb(new Error('unlucky'))
}
```

## API

### retrial(count, fn[, args1...argsN], cb)

* `count`: number of times to retry `fn`
* `fn`: the async function you'd like to retry
* `args`: the arguments to your function
* `cb`: the callback to your async function

## Why

I needed a simple retry helper, but I didn't want to mangle how I was calling my functions. Here's `retrial` vs `async.retry`:

```js

retrial(2, request, 'http://guttman.io', function (err, res, body) {
  console.log(err, res, body)
})

// vs.

asyncRetry(2, function (cb) {
  request('http://guttman.io', function (err, res, body) {
    cb(err, [res, body])
  }),
  function (err, result) {
    var res = res[0]
    var body = res[1]
    console.log(err, res, body)
  }
})

```

## license

MIT
