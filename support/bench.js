var Benchmark = require('benchmark');
var proxyClone = require('..');
var deepClone = require('clone');

var suite = new Benchmark.Suite;
var seg = '"$foo":{"bar":"baz"},"$beep":["boop", 1]'

var input = {
  small: gen(10),
  medium: gen(100),
  big: gen(1000),
  gigantic: gen(10000)
};

function gen(size){
  var o = {};
  for (var i = 0; i < size; i++) {
    o[i + 'foo'] = { bar: 'baz' };
    o[i + 'beep'] = ['boop', 1];
  }
  return o;
}

function use(o){
  var foo = o.foo;
  o.bar = foo;
}

function test(name, fn){
  Object.keys(input).forEach(function(n){
    suite.add(name + ' ' + n, function(){
     var obj = fn(input[n]);
     use(obj);
    });
  });
}

function jsonClone(obj){
  return JSON.parse(JSON.stringify(obj));
}

test('JSON', jsonClone);
test('clone', deepClone);
test('proxy-clone', proxyClone);

suite.on('cycle', function(e){
  console.log(String(e.target));
});

suite.run({ async: true });
