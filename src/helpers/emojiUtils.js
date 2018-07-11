const emojiRegex = require('emoji-regex')

/**
 * Finds one or all emoji in a string
 *
 * @param {string} str target to search in
 * @param {emoji} emoji (optional) if emoji is provided will only search for that emoji, otherwise will search for all emoji
 * @returns {array} with all emoji in the string. If a specific emoji was provided will return an array with just that emoji for each time it appears in the string.
 */
function findEmoji (str, emoji) {
  const re = (emoji)
    ? new RegExp(emoji, 'g')
    : emojiRegex()
  const results = str.match(re)
  return (!results)
    ? []
    : results
}

/**
 * Returns the first index of an Emoji in a string
 *
 * @param {*} str target string to search through
 * @param {*} emoji the emoji to search
 * @returns {number} the first index of the emoji
 */
function indexOfEmoji (str, emoji) {
  return str.indexOf(emoji)
}

export { findEmoji, indexOfEmoji }
