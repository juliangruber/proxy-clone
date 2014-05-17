
/**
 * Module dependencies.
 */

var debug = require('debug')('proxy-clone');

/**
 * hasOwnProperty reference.
 */

var hasOwnProperty = ({}).hasOwnProperty;

/**
 * Clone `obj`.
 *
 * @param {Object} obj
 * @return {Object}
 */

module.exports = function(obj){
  var override = {};
  var proxy = Proxy.create({
    getOwnPropertyDescriptor: function(name){
      var desc = Object.getOwnPropertyDescriptor(override, name)
        || Object.getOwnPropertyDescriptor(obj, name);
      if (desc) desc.configurable = true;
      debug('getOwnPropertyDescriptor %s = %s', name, desc);
      return desc;
    },
    getPropertyDescriptor: function(name){
      debug('getPropertyDescriptor %s', name);
      return {
        get: function(){
          return override[name] || obj[name];
        },
        set: function(val){
          return override[name] = val;
        }
      }
    },
    getOwnPropertyNames: function(){
      var names = Object.getOwnPropertyNames(obj)
        .concat(Object.getOwnPropertyNames(override))
        .filter(unique);
      debug('getOwnPropertyNames %j', names);
      return names;
    },
    has: function(name){
      var has = name in override || name in obj;
      debug('has %s = %s', name, has);
      return has;
    },
    hasOwn: function(name){
      var has = hasOwnProperty.call(override, name)
        || hasOwnProperty.call(obj, name);
      debug('hasOwn %s = %s', name, has);
      return has;
    },
    get: function(receiver, name){
      var value = override[name] || obj[name];
      debug('get %s = %s', name, value);
      return value;
    },
    set: function(receiver, name, val) {
      override[name] = val;
      debug('set %s = %s', name, val);
      return true;
    },
    enumerate: function(){
      var keys = Object.keys(obj)
        .concat(Object.keys(override))
        .filter(function(key, i, arr){
          return arr.indexOf(key) == i;
        });
      debug('enumerate %j', keys);
      return keys;
    }
  }, Object.prototype);

  return proxy;
};

/**
 * Unique utility.
 */

function unique(el, i, arr){
  return arr.indexOf(el) == i;
}

