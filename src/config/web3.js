import Web3 from 'web3'

/**
 * Returns an instanciated web3 object through a web-socket URL
 *
 * @param {string} url Needs to be a WEB SOCKET!
 * @returns {object} an instanciated web3 object
 */
function getWeb3 (url) {
  return new Web3(new Web3.providers.WebsocketProvider(url))
}

export default getWeb3
