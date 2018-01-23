'us estrict'

const Benchmark = require('benchmark')
const proxyClone = require('..')
const deepClone = require('clone')

const suite = new Benchmark.Suite()

const gen = size => {
  const o = {}
  for (let i = 0; i < size; i++) {
    o[i + 'foo'] = { bar: 'baz' }
    o[i + 'beep'] = ['boop', 1]
  }
  return o
}

const input = {
  small: gen(10),
  medium: gen(100),
  big: gen(1000),
  gigantic: gen(10000)
}

const use = o => {
  var foo = o.foo
  o.bar = foo
}

const test = (name, fn) =>
  Object.keys(input).forEach(n =>
    suite.add(name + ' ' + n, () => {
      const obj = fn(input[n])
      use(obj)
    })
  )

const jsonClone = obj => JSON.parse(JSON.stringify(obj))

test('JSON', jsonClone)
test('clone', deepClone)
test('proxy-clone', proxyClone)

suite.on('cycle', e => console.log(String(e.target)))

suite.run({ async: true })
