import Web3 from 'web3'

/**
 * Returns an instanciated web3 object through a web-socket URL
 *
 * @param {string} url Needs to be a WEB SOCKET!
 * @returns {object} an instanciated web3 object
 */
export function instanciateWeb3 (url) {
  return new Web3(new Web3.providers.WebsocketProvider(url))
}

/**
 * A single async function that returns the count of confirmations of a certain transaction.
 *
 * @export
 * @param {object} web3Instance A web3 object already instanciated with `new Web3(new Web3.providers.WebsocketProvider(net))`
 * @param {string} txnHash
 * @returns {number} the confirmation count
 */
export async function countConfirmations (web3Instance, txnHash) {
  const web3 = web3Instance
  const currentBlock = await web3.eth.getBlockNumber()
  const txn = await web3.eth.getTransaction(txnHash)
  if (txn && txn.blockNumber) {
    const count = currentBlock - txn.blockNumber
    return count
  }
  return 0
}

/**
 * Get the wallet address when in a DApp supported browser
 *
 * @export
 * @returns {(Promise<string> | Promise<undefined>)}
 */
export async function getAddress () {
  let address
  // Modern dapp browsers...
  if (window.ethereum) {
    // instanciate web3
    window.web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      const accounts = await window.ethereum.send('eth_requestAccounts')
      // Accounts now exposed, use them
      address = accounts[0]
    } catch (error) {
      // User denied account access
    }
    return address
  }
  // Legacy dapp browsers...
  if (!window.ethereum) {
    if (window.web3 && window.web3.currentProvider) {
      // instanciate web3
      window.web3 = new Web3(window.web3.currentProvider)
      // Accounts are always exposed
      address = window.web3.eth.accounts[0]
    }
    return address
  }
  // Non-dapp browsers...
  console.error('No wallet address found.')
  return undefined
}
