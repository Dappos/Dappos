import Web3 from 'web3'

if (typeof window.web3 !== 'undefined' || typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // MetaMask is not enabled
  // Should show an alert
  myWeb3 = new Web3("ws://localhost:7545")
}

export default web3
