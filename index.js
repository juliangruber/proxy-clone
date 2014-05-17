
/**
 * Module dependencies.
 */

var debug = require('debug')('proxy-clone');

/**
 * Expose `proxyClone`.
 */

module.exports = proxyClone;

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

function proxyClone(obj){
  var override = {};
  var deleted = {};

  var proxy = Proxy.create({
    getOwnPropertyDescriptor: function(name){
      var desc;
      if (!deleted[name]) {
        desc = Object.getOwnPropertyDescriptor(override, name)
          || Object.getOwnPropertyDescriptor(obj, name);
      }
      if (desc) desc.configurable = true;
      debug('getOwnPropertyDescriptor %s = %j', name, desc);
      return desc;
    },
    getPropertyDescriptor: function(name){
      debug('getPropertyDescriptor %s', name);
      return {
        get: function(){
          var value;
          if (!deleted[name]) value = override[name] || obj[name];
          debug('get %s = %s', name, value);
          return value;
        },
        set: function(val){
          debug('set %s = %s', name, val);
          delete deleted[name];
          return override[name] = val;
        }
      }
    },
    getOwnPropertyNames: function(){
      var names = Object.getOwnPropertyNames(obj)
        .concat(Object.getOwnPropertyNames(override))
        .filter(unique)
        .filter(function(key){
          return !deleted[key];
        });
      debug('getOwnPropertyNames %j', names);
      return names;
    },
    delete: function(name){
      debug('delete %s', name);
      deleted[name] = true;
      delete override[name];
    },
    has: function(name){
      var has = !deleted[name] && (name in override || name in obj);
      debug('has %s = %s', name, has);
      return has;
    },
    hasOwn: function(name){
      var has = !deleted[name]
        && (hasOwnProperty.call(override, name)
        || hasOwnProperty.call(obj, name));
      debug('hasOwn %s = %s', name, has);
      return has;
    },
    get: function(receiver, name){
      var value;
      if (!deleted[name]) value = override[name] || obj[name];
      debug('get %s = %j', name, value);
      if ('object' == typeof value) {
        value = proxyClone(value);
        override[name] = value;
      }
      return value;
    },
    set: function(receiver, name, val) {
      delete deleted[name];
      override[name] = val;
      debug('set %s = %s', name, val);
      return true;
    },
    enumerate: function(){
      var keys = Object.keys(obj)
        .concat(Object.keys(override))
        .filter(unique)
        .filter(function(key){
          return !deleted[key];
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

