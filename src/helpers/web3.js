
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
