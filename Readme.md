[![Build Status](https://circleci.com/gh/segmentio/proxy-clone.png?circle-token=cd57354006cdfce87e62342e89a0689ba0757756)](https://circleci.com/gh/segmentio/proxy-clone)

# proxy-clone

  Harmony proxies based deep clone, that's way more efficient than the traditional clone implementations.

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
  the original value from the object.


## Kudos

  Thanks to @segmentio for letting me publish this private module that I developed while working for them.


## License

  MIT

