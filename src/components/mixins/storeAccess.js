
export default {
  computed:
  {
    state () { return this.$store.state },
  },
  methods:
  {
    get (path) { return this.$store.get(path) },
    set (path, val) { return this.$store.set(path, val) },
    commit (action, payload) { return this.$store.commit(action, payload) },
    dispatch (action, payload) { return this.$store.dispatch(action, payload) },
  }
}
