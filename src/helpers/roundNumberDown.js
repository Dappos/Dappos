
/**
 * Rounds a number down to a maxLength. eg. if maxLength is 2: 123 -> 120
 *
 * @param {*} nr input
 * @param {*} maxLength of the nr to round down eg. 3 to round down everything above 1000
 * @returns roundedDown nr
 */
function roundNumberDown (nr, maxLength) {
  const len = nr.toString().length
  if (len <= maxLength) return nr
  const excessLen = len - maxLength
  const floorLog = 10 ** excessLen
  return Math.floor(nr / floorLog) * floorLog
}

export default roundNumberDown
