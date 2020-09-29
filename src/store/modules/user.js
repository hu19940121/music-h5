import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserId, removeUserId, getUserId } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: getUserId(),
    userInfo: {},
    nickName: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NICK_NAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}
const actions = {
  // 设置name
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        if (res.code === 502) {
          reject('密码错误')
        }
        resolve(res)
        commit('SET_TOKEN', res.token)
        commit('SET_USER_ID', res.profile.userId)
        setToken(res.token)
        setUserId(res.profile.userId)
      })
    })
  },
  getUserInfo({ commit, state }) {
    return new Promise((resolve) => {
      getUserInfo({ uid: state.userId }).then((res) => {
        commit('SET_USER_INFO', res.profile)
        commit('SET_NICK_NAME', res.profile.nickname)
        resolve(res.profile)
      })
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeUserId()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
