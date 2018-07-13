import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/_ws'))
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/_ws'))
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))

export default web3
