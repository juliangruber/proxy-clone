const clone = require('./')
const test = require('tap').test

test('clone(obj)', t => {
  t.test('should clone', t => {
    const obj = { foo: 'bar' }
    const cloned = clone(obj)
    t.assert(cloned)
    t.deepEqual(cloned, obj)
    t.end()
  })

  t.test('set', t => {
    t.test('should add a value', t => {
      const obj = { foo: 'bar' }
      const cloned = clone(obj)
      cloned.bar = 'baz'
      t.deepEqual(cloned, { foo: 'bar', bar: 'baz' })
      t.deepEqual(obj, { foo: 'bar' })
      t.end()
    })

    t.test('should override a value', t => {
      const obj = { foo: 'bar' }
      const cloned = clone(obj)
      cloned.foo = 'baz'
      t.deepEqual(cloned, { foo: 'baz' })
      t.deepEqual(obj, { foo: 'bar' })
      t.end()
    })

    t.test('should add a previously deleted value', t => {
      const obj = { foo: 'bar' }
      const cloned = clone(obj)
      delete cloned.foo
      cloned.foo = 'baz'
      t.deepEqual(cloned, { foo: 'baz' })
      t.deepEqual(obj, { foo: 'bar' })
      t.end()
    })

    t.test('should add a nested value', t => {
      const obj = { foo: { bar: 'baz' } }
      const cloned = clone(obj)
      cloned.foo.beep = 'boop'
      t.deepEqual(cloned, { foo: { bar: 'baz', beep: 'boop' } })
      t.deepEqual(obj, { foo: { bar: 'baz' } })
      t.end()
    })

    t.test('should override a nested value', t => {
      const obj = { foo: { bar: 'baz' } }
      const cloned = clone(obj)
      cloned.foo.bar = 'beep'
      t.deepEqual(cloned, { foo: { bar: 'beep' } })
      t.deepEqual(obj, { foo: { bar: 'baz' } })
      t.end()
    })

    t.test('should not clone nulls', t => {
      const obj = { foo: null }
      const cloned = clone(obj)
      t.deepEqual(cloned, { foo: null })
      t.end()
    })

    t.end()
  })

  t.test('delete', t => {
    t.test('should delete a value', t => {
      const obj = { foo: 'bar' }
      const cloned = clone(obj)
      delete cloned.foo
      delete cloned.unknown
      t.deepEqual(cloned, {})
      t.deepEqual(obj, { foo: 'bar' })
      t.end()
    })

    t.test('should delete a nested value', t => {
      const obj = { foo: { bar: 'baz' } }
      const cloned = clone(obj)
      delete cloned.foo.bar
      delete cloned.foo.unknown
      t.deepEqual(cloned, { foo: {} })
      t.deepEqual(obj, { foo: { bar: 'baz' } })
      t.end()
    })
    t.end()
  })

  t.test('get', t => {
    t.test('should bind functions', t => {
      function Obj () {}
      Obj.prototype.fn = function () {
        t.assert(this instanceof Obj)
      }
      const obj = new Obj()
      const cloned = clone(obj)
      cloned.fn()
      t.end()
    })

    t.test('should inherit', t => {
      const d = new Date()
      const c = clone(d)
      t.deepEqual(d.toString(), c.toString())
      t.end()
    })
    t.end()
  })

  t.end()
})
