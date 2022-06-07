// store/index.js
import { createStore } from 'vuex'
import kotas from './modules/kotas'

const store = createStore({
  namespaced: true,
  modules: {
    kotas,
  },
})

export default store
