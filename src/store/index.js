import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import song from './modules/song'
import user from './modules/user'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],

  modules: {
    app,
    song,
    user
  },
  getters
})

export default store
