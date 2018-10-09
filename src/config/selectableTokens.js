
export default {
  'eth': {
    erc20: false,
    icon: 'fab fa-ethereum',
  },
  'dai': {
    erc20: true,
    contractAddresses: {
      mainnet: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
      kovan: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2'
    },
    icon: 'fab fa-dai-icon',
    sublabel: 'USD stabletoken by MakerDAO',
  },
  // 'zrx': {
  //   icon: 'fab fa-ethereum',
  //   sublabel: '0x protocol',
  //   contractAddresses: {
  //     ropsten: '0xa8e9fa8f91e5ae138c74648c9c304f1c75003a8d',
  //   }
  // },
}
