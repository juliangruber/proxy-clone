
# proxy-clone [![build status](https://secure.travis-ci.org/juliangruber/proxy-clone.svg)](http://travis-ci.org/juliangruber/proxy-clone)

  [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) based deep clone, that's way more efficient than the traditional clone implementations when dealing with big objects.

  Requires node 6 or later.
  
  Note: This is not a traditional clone(). Changes to the source object will be reflected in the clone, changes to the clone however won't modify the source.

## Performance

  Depending on the object size, `proxy-clone` can be a lot faster than naive JSON clone or the [clone](https://npmjs.org/clone) module from npm. The most important thing to note is that clone speed is constant, however using the cloned object is slightly slower.

```
JSON small x 60,036 ops/sec ±1.09% (92 runs sampled)
JSON medium x 5,919 ops/sec ±0.86% (91 runs sampled)
JSON big x 526 ops/sec ±1.20% (89 runs sampled)
JSON gigantic x 39.50 ops/sec ±1.83% (54 runs sampled)

clone small x 50,288 ops/sec ±1.20% (91 runs sampled)
clone medium x 4,381 ops/sec ±1.03% (90 runs sampled)
clone big x 230 ops/sec ±0.85% (85 runs sampled)
clone gigantic x 4.14 ops/sec ±1.54% (15 runs sampled)

proxy-clone small x 842,147 ops/sec ±1.18% (93 runs sampled)
proxy-clone medium x 891,579 ops/sec ±1.49% (87 runs sampled)
proxy-clone big x 814,796 ops/sec ±0.83% (92 runs sampled)
proxy-clone gigantic x 792,461 ops/sec ±0.79% (89 runs sampled)
```

## Installation

```bash
$ npm install juliangruber/proxy-clone
```

## Stability

  This module makes certain assumptions about what you do with the cloned object, and I only tested it with the operations one project required. If something behaves odly, open an issue and I'll look into it.

## Example

  The api is what you'd expect:

```js
var clone = require('proxy-clone');
var assert = require('assert');

var obj = {
  foo: {
    bar: 'baz'
  }
};

var cloned = clone(obj);
assert.deepEqual(cloned, obj);
```

## API

### clone(obj)

  Return a deep clone of `obj`.

## How it works

  Traditional clone implementations recursively iterate over the object and
  copy all the properties to a new object, which can be slow. This module
  instead creates an ES6
  [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). When you
  change a property on the proxy, it adds it to an internal change log. When
  you read from the proxy, it first checks for overrides, otherwise returns
  the original value from the object.


## Kudos

  Thanks to @segmentio for letting me publish this private module that I developed while working for them.


## License

  MIT

