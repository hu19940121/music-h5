// axios
import request from '@/utils/request'

// 登陆
export function login(data) {
  return request({
    url: `/musicApi/login/cellphone?timestamp=${new Date().getTime()}`,
    method: 'post',
    data
  })
}
// 退出登陆
export function logout() {
  return request({
    url: `/musicApi/logout?timestamp=${new Date().getTime()}`,
    method: 'get'
  })
}
// 获取登陆状态
export function getLoginStatus() {
  return request({
    url: `/musicApi/login/status?timestamp=${new Date().getTime()}`,
    method: 'get'
  })
}
// 获取用户详情
export function getUserInfo(params) {
  return request({
    url: `/musicApi/user/detail?timestamp=${new Date().getTime()}`,
    method: 'get',
    params
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount() {
  return request({
    url: `/musicApi/user/subcount?timestamp=${new Date().getTime()}`,
    method: 'get'
  })
}
// 获取用户歌单列表
export function getPlaylist(params) {
  return request({
    url: `/musicApi/user/playlist?timestamp=${new Date().getTime()}`,
    method: 'get',
    params
  })
}

// 登录
// export function login(data) {
//   return request({
//     url: api.Login,
//     method: 'post',
//     data
//   })
// }

// // 用户信息 post 方法
// export function getUserInfo(data) {
//   return request({
//     url: api.UserInfo,
//     method: 'post',
//     data,
//     hideloading: true
//   })
// }

// // 用户名称 get 方法
// export function getUserName(params) {
//   return request({
//     url: api.UserName,
//     method: 'get',
//     params,
//     hideloading: true
//   })
// }
