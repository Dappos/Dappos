/**
 * DOM Class Helpers
 *
 * @author     Luca Ban
 * @contact    https://lucaban.com
 */
function hasClass (element, cls) {
  return (' ' + element.className + ' ').includes(' ' + cls + ' ')
}
function addClass (element, cls) {
  if (!(' ' + element.className + ' ').includes(' ' + cls + ' ')) {
    element.className += ' ' + cls
  }
  return element
}
function removeClass (element, cls) {
  element.className = ' ' + element.className + ' '
  if (element.className.includes(' ' + cls + ' ')) {
    element.className = element.className.replace(' ' + cls + ' ', ' ').trim()
  }
  return element
}

// Make hasClass(el, 'class') available as el.hasClass('class')
window.Element.prototype.hasClass = function (config) { return hasClass(this, config) }
window.Element.prototype.addClass = function (config) { return addClass(this, config) }
window.Element.prototype.removeClass = function (config) { return removeClass(this, config) }

export { hasClass, addClass, removeClass }
