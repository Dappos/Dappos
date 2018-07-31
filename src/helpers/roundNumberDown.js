
/**
 * Rounds a number down to a maxLength. eg. if maxLength is 2: 123 -> 120
 *
 * @param {number} nr input
 * @param {number} maxLength of the nr to round down eg. 3 to round down everything above 1000
 * @returns {number} roundedDown nr
 */
export function roundNumberDown (nr, maxLength) {
  const len = nr.toString().length
  if (len <= maxLength) return nr
  const excessLen = len - maxLength
  const round = Number('1e' + excessLen)
  return Math.round(nr / round) * round
}
/**
 * Floors an amount of decimals
 *
 * @param {number} nr input
 * @param {number} maxDecimalCount eg. 2 makes 1.234 into 1.23
 * @returns {number}
 */
export function floorDecimals (nr, maxDecimalCount) {
  const decimals = Number('1e' + maxDecimalCount)
  return Math.round(nr * decimals) / decimals
}
