import Cookies from 'js-cookie'

import { getLanguage } from '@/i18n/index'

const state = {
  userName: '',
  language: getLanguage()
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
