/**
 * DOM Class Helpers
 *
 * @author     Luca Ban
 * @contact    https://lucaban.com
 */

/**
  * @param {string} string
  * @returns a padded string
  */
function pad (string) {
  return ' ' + string + ' '
}

/**
 * Checks if an elemnt has a class
 *
 * @param {Element} element
 * @param {string} cls
 * @returns {Boolean} Boolean
 */
function hasClass (element, cls) {
  return (pad(element.className)).includes(pad(cls))
}

/**
 * Adds a class to an element
 *
 * @param {Element} element
 * @param {string} cls
 * @returns {Element} the element
 */
function addClass (element, cls) {
  if (!hasClass(element, cls)) {
    element.className += ' ' + cls
  }
  return element
}

/**
 * Removes a class of an element
 *
 * @param {Element} element
 * @param {string} cls
 * @returns {Element} the element
 */
function removeClass (element, cls) {
  if (!hasClass(element, cls)) return element
  element.className = pad(element.className).replace(pad(cls), ' ').trim()
  return element
}

// Make hasClass(el, 'class') available as el.hasClass('class')
window.Element.prototype.hasClass = function (config) { return hasClass(this, config) }
window.Element.prototype.addClass = function (config) { return addClass(this, config) }
window.Element.prototype.removeClass = function (config) { return removeClass(this, config) }

export { hasClass, addClass, removeClass }
