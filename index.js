'use strict'

/**
 * Module dependencies.
 */

const debug = require('debug')('proxy-clone')

/**
 * Unique utility.
 */

const unique = (el, i, arr) => arr.indexOf(el) === i

/**
 * Object check.
 */

const isObject = obj => typeof obj === 'object' && obj !== null

/**
 * Clone `obj`.
 *
 * @param {Object} obj
 * @return {Object}
 */

const proxyClone = obj => {
  const override = Object.create(null)
  const deleted = Object.create(null)

  const get = name => {
    let value
    if (!deleted[name]) value = override[name] || obj[name]
    if (isObject(value)) {
      value = proxyClone(value)
      override[name] = value
    }
    if (typeof value === 'function') {
      value = value.bind(obj)
    }
    return value
  }

  return new Proxy(Object.prototype, {
    getPrototypeOf: () => Object.getPrototypeOf(obj),
    /* setPrototypeOf: function () {
      console.log('setPrototypeOf')
    },
    isExtensible: function () {
      console.log('isExtensible')
    },
    preventExtensions: function () {
      console.log('preventExtensions')
    }, */
    getOwnPropertyDescriptor: (target, name) => {
      let desc
      if (!deleted[name]) {
        desc =
          Object.getOwnPropertyDescriptor(override, name) ||
          Object.getOwnPropertyDescriptor(obj, name)
      }
      if (desc) desc.configurable = true
      debug('getOwnPropertyDescriptor %s = %j', name, desc)
      return desc
    },
    /* defineProperty: function () {
      debug('defineProperty')
    }, */
    has: (_, name) => {
      const has = !deleted[name] && (name in override || name in obj)
      debug('has %s = %s', name, has)
      return has
    },
    get: (receiver, name) => {
      const value = get(name)
      debug('get %s = %j', name, value)
      return value
    },
    set: (_, name, val) => {
      delete deleted[name]
      override[name] = val
      debug('set %s = %j', name, val)
      return true
    },
    deleteProperty: (_, name) => {
      debug('deleteProperty %s', name)
      deleted[name] = true
      delete override[name]
    },
    ownKeys: () => {
      const keys = Object.keys(obj)
        .concat(Object.keys(override))
        .filter(unique)
        .filter(key => !deleted[key])
      debug('ownKeys %j', keys)
      return keys
    }
    /* apply: function () {
      console.log('apply')
    },
    construct: function () {
      console.log('construct')
    },
    enumerate: function () {
      console.log('enumerate')
    },
    isExtensible: function () {
      console.log('isExtensible')
    },
    preventExtensions: function () {
      console.log('preventExtensions')
    } */
  })
}

/**
 * Expose `proxyClone`.
 */

module.exports = proxyClone
