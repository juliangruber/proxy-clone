var Benchmark = require('benchmark');
var proxyClone = require('..');

var suite = new Benchmark.Suite;
var seg = '"foo":{"bar":"baz"},"beep":["boop", 1]'
var small = JSON.parse('{' + seg + '}');
var big = JSON.parse('{' + Array(100).join(' ').split(' ').map(function(){ return seg }) + '}');

suite.add('proxy-clone small', function(){
 var obj = proxyClone(small);
});
suite.add('proxy-clone big', function(){
  var obj = proxyClone(big);
});

function jsonClone(o){
  return JSON.parse(JSON.stringify(o));
}

suite.add('JSON small', function(){
 var obj = jsonClone(small);
});
suite.add('JSON big', function(){
 var obj = jsonClone(big);
});

suite.on('cycle', function(e){
  console.log(String(e.target));
});

suite.run({ async: true });
