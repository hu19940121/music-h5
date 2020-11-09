import Cookies from 'js-cookie'
import { getTheme, setTheme } from '@/utils/auth'

import { getLanguage } from '@/i18n/index'

const state = {
  isInApp: false,
  userName: '',
  theme: getTheme(),
  language: getLanguage()
}
const mutations = {
  SET_IS_IN_APP(state, status) {
    state.isInApp = status
  },
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  CHANGE_THEME(state, theme) {
    state.theme = theme
    setTheme(theme)
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
