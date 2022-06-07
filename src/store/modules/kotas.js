export default {
  namespaced: true,
  state: {
    limit: 24,
    offset: 0,
    pokemons: [],
    message: 'Congrats!',
  },
  mutations: {
    incrementLimit (state) {
      state.limit += state.limit
    },
    incrementOffset (state) {
      state.offset += state.limit
    },
    setPokemons(state, payload) {
      state.pokemons = payload
    },
    pushPokemons(state, payload) {
      state.pokemons = state.pokemons.concat(payload)
    },
  },
  getters: {
    getAllPokemons: (state) => {
      return state.pokemons
    },
  },
}
