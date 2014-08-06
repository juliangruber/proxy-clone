var Benchmark = require('benchmark');
var proxyClone = require('..');

var suite = new Benchmark.Suite;
var seg = '"foo":{"bar":"baz"},"beep":["boop", 1]'

var input = {
  smal: JSON.parse('{' + seg + '}'),
  medium: JSON.parse('{' + Array(100).join(' ').split(' ').map(function(){ return seg }) + '}'),
  big: JSON.parse('{' + Array(1000).join(' ').split(' ').map(function(){ return seg }) + '}'),
  gigantic: JSON.parse('{' + Array(10000).join(' ').split(' ').map(function(){ return seg }) + '}')
};

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

test('proxy-clone', proxyClone);
test('JSON', function(o){
  return JSON.parse(JSON.stringify(o));
});

suite.on('cycle', function(e){
  console.log(String(e.target));
});

suite.run({ async: true });
