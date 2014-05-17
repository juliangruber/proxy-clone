var clone = require('./');
var assert = require('assert');
var deepEqual = assert.deepEqual;

describe('clone(obj)', function(){
  it('should clone', function(){
    var obj = { foo: 'bar' };
    var cloned = clone(obj);
    assert(cloned);
    deepEqual(cloned, obj);
  });

  it('should add a value', function(){
    var obj = { foo: 'bar' };
    var cloned = clone(obj);
    cloned.bar = 'baz';
    deepEqual(cloned, { foo: 'bar', bar: 'baz' });
    deepEqual(obj, { foo: 'bar' });
  });
});

