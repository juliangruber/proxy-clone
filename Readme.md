
# proxy-clone [![build status](https://secure.travis-ci.org/juliangruber/proxy-clone.svg)](http://travis-ci.org/juliangruber/proxy-clone)

  Harmony proxies based deep clone, that's way more efficient than the traditional clone implementations, when dealing with big objects.
  
  __This is not a traditional clone(). Changes to the source object will be reflected in the clone, changes to the clone however won't modify the source.__

## Stability

  This module makes certain assumptions about what you do with the cloned object, and I only tested it with the operations one project required. If something behaves odly, open an issue and I'll look into it.

## Performance

  Depending on the object size, `proxy-clone` can be wayyyyy faster than naive JSON clone or the [clone](https://npmjs.org/clone) module from npm. The most important thing to note is that clone speed is constant, however using the cloned object is slightly slower.

```
JSON small x 40,755 ops/sec ±13.60% (65 runs sampled)
JSON medium x 6,318 ops/sec ±3.52% (84 runs sampled)
JSON big x 526 ops/sec ±9.41% (75 runs sampled)
JSON gigantic x 27.20 ops/sec ±15.18% (40 runs sampled)

clone small x 13,755 ops/sec ±12.13% (66 runs sampled)
clone medium x 1,084 ops/sec ±12.39% (59 runs sampled)
clone big x 37.76 ops/sec ±12.18% (40 runs sampled)
clone gigantic x 0.68 ops/sec ±8.74% (6 runs sampled)

proxy-clone small x 298,286 ops/sec ±2.99% (79 runs sampled)
proxy-clone medium x 269,721 ops/sec ±5.39% (79 runs sampled)
proxy-clone big x 255,918 ops/sec ±7.33% (72 runs sampled)
proxy-clone gigantic x 259,387 ops/sec ±4.84% (69 runs sampled)
```

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

  Remember that you need to run node `0.11.x` and pass the `--harmony` flag:

```bash
$ node --harmony my-app.js
```

## Installation

```bash
$ npm install proxy-clone
```

## API

### clone(obj)

  Return a deep clone of `obj`.

## How it works

  Traditional clone implementations recursively iterate over the object and
  copy all the properties to a new object, which can be slow. This module
  instead creates an ES6
  [Proxy](http://wiki.ecmascript.org/doku.php?id=harmony:proxies). When you
  change a property on the proxy, it adds it to an internal change log. When
  you read from the proxy, it first checks for overrides, otherwise returns
  the value from the original object. This also means that any changes on
  the original object are going to be reflected on the cloned object, unlike
  traditional cloning.


## Kudos

  Thanks to @segmentio for letting me publish this private module that I developed while working for them.


## License

  MIT

