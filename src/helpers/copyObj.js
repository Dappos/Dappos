/**
 * copyObj helper
 *
 * @author     Adam Dorling
 * @contact    https://codepen.io/naito
 */
/* eslint-disable */
function isObject (payload) {
  return Object.prototype.toString.call(payload) === '[object Object]'
}
function isArray (payload) {
  return Object.prototype.toString.call(payload) === '[object Array]'
}

export default function copyObj (obj) {
  let newObj
  if (typeof obj !== 'object') {
    return obj
  }
  if (!obj) {
    return obj
  }
  if (!isObject(obj) || !isArray(obj)) {
    return JSON.parse(JSON.stringify(obj))
  }
  // Object is an Array
  if (isArray(obj)) {
    newObj = []
    for (let i = 0, len = obj.length; i < len; i++) {
      newObj[i] = copyObj(obj[i])
    }
    return newObj
  }
  // Object is an Object
  newObj = {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = copyObj(obj[i])
    }
  }
  return newObj
}
