import Web3 from 'web3'

let wallet
if (typeof window.web3 !== 'undefined' || typeof window.web3 !== 'undefined') {
  wallet = new Web3(window.web3.currentProvider)
} else {
  // MetaMask is not enabled
  // Should show an alert
  wallet = new Web3('ws://localhost:7545')
}

export default wallet
