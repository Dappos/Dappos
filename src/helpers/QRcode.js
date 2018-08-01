import QRCode from 'qrcode'

/**
 * Creates the data for the QR code based on parameters
 *
 * @export
 * @param {string} to ETH address
 * @param {number} value amount to pay in ETH
 * @returns {string} QR data string
 */
export function getQrDataEthPayment (to, value) {
  return `ethereum:${to}?amount=${value}`
}

/**
 * Generates a QR code based on data to a DOM element target
 *
 * @export
 * @param {string} data the Data for the QR code
 * @param {string} targetSelector selector
 * @returns nothing
 */
export function generateQr (data, targetSelector) {
  const el = document.querySelector(targetSelector)
  QRCode.toCanvas(el, data, {margin: 0})
    .then(url => {
      console.log(url)
    })
    .catch(err => {
      console.error(err)
    })
}
