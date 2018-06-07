
export default {
  appMinimised: (state, getters) => {
    return (state.windowSize.width >= 576)
    //  &&
    //   this.state.windowSize.height >= 750)
  },
}
