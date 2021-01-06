// import api from './index'
// axios
import request from '@/utils/request'
// 歌曲详情
export function getSongDetail(ids) {
  return request({
    url: '/musicApi/song/detail',
    method: 'get',
    params: {
      ids
    }
  })
}
// 获取歌曲url
export function getSongUrl(params) {
  return request({
    url: '/musicApi/song/url',
    method: 'get',
    params,
    hideloading: true
  })
}

// 推荐新音乐
export function getNewsong() {
  return request({
    url: '/musicApi/personalized/newsong',
    method: 'get',
    hideloading: true
  })
}
// 推荐歌单

export function personalized(params) {
  return request({
    url: '/musicApi/personalized',
    method: 'get',
    params
    // hideloading: true
  })
}

// 歌单详情
export function getPlaylistDetail(params) {
  return request({
    url: '/musicApi/playlist/detail',
    method: 'get',
    params
  })
}

// 歌曲搜索
export function search(keywords) {
  return request({
    url: '/musicApi/search',
    method: 'get',
    // hideloading: true,
    params: {
      keywords
    }
  })
}
// 搜索建议
export function getSuggest(params) {
  return request({
    url: '/musicApi/search/suggest',
    method: 'get',
    hideloading: true,
    params
  })
}

// 热门搜索列表
export function getSearchHotList() {
  return request({
    url: '/musicApi/search/hot',
    method: 'get'
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: '/musicApi/lyric',
    hideloading: true,
    params: {
      id
    }
  })
}
// 获取banner
export function getBanners() {
  return request({
    url: '/musicApi/banner',
    method: 'get',
    hideloading: true
  })
}
// 获取歌曲评论
export function getComment(params) {
  return request({
    params,
    url: '/musicApi/comment/music',
    method: 'get'
  })
}
// 获取楼层评论
export function getCommentFloor(params) {
  return request({
    params,
    url: '/musicApi/comment/floor',
    method: 'get'
  })
}

