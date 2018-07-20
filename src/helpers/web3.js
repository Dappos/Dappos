import Web3 from '@config/web3'

export async function countConfirmations (txnHash) {
  const currentBlock = await Web3.eth.getBlockNumber()
  const txn = await Web3.eth.getTransaction(txnHash)
  if (txn && txn.blockNumber) {
    const count = currentBlock - txn.blockNumber
    return count
  }
  return 0
}
