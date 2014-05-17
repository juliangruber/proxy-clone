var clone = require('./');
var assert = require('assert/');
var deepEqual = assert.deepEqual;

describe('clone(obj)', function(){
  it('should clone', function(){
    var obj = { foo: 'bar' };
    var cloned = clone(obj);
    assert(cloned);
    deepEqual(cloned, obj);
  });

  describe('set', function(){
    it('should add a value', function(){
      var obj = { foo: 'bar' };
      var cloned = clone(obj);
      cloned.bar = 'baz';
      deepEqual(cloned, { foo: 'bar', bar: 'baz' });
      deepEqual(obj, { foo: 'bar' });
    });
  
    it('should override a value', function(){
      var obj = { foo: 'bar' };
      var cloned = clone(obj);
      cloned.foo = 'baz';
      deepEqual(cloned, { foo: 'baz' });
      deepEqual(obj, { foo: 'bar' });
    });
    
    it('should add a previously deleted value', function(){
      var obj = { foo: 'bar' };
      var cloned = clone(obj);
      delete cloned.foo;
      cloned.foo = 'baz';
      deepEqual(cloned, { foo: 'baz' });
      deepEqual(obj, { foo: 'bar' });
    });

    it('should add a nested value', function(){
      var obj = { foo: { bar: 'baz' } };
      var cloned = clone(obj);
      cloned.foo.beep = 'boop';
      deepEqual(cloned, { foo: { bar: 'baz', beep: 'boop' } });
      deepEqual(obj, { foo: { bar: 'baz' } });
    });

    it('should override a nested value', function(){
      var obj = { foo: { bar: 'baz' } };
      var cloned = clone(obj);
      cloned.foo.bar = 'beep';
      deepEqual(cloned, { foo: { bar: 'beep' } });
      deepEqual(obj, { foo: { bar: 'baz' } });
    });
  });

  describe('delete', function(){
    it('should delete a value', function(){
      var obj = { foo: 'bar' };
      var cloned = clone(obj);
      delete cloned.foo;
      delete cloned.unknown;
      deepEqual(cloned, {});
      deepEqual(obj, { foo: 'bar' });
    });
  });

});

