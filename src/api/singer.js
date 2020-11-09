
import request from '@/utils/request'

// 获取热门歌手列表
export function getHotArtists(params) {
  return request({
    url: '/musicApi/top/artists',
    method: 'get',
    params,
    hideloading: true
  })
}

// 获取歌手列表
export function getArtists(params) {
  return request({
    url: '/musicApi/artist/list',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取歌手详情
export function getArtistDetail(params) {
  return request({
    url: '/musicApi/artist/desc',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取歌手最热50首歌曲
export function getArtistTopSongs(params) {
  return request({
    url: '/musicApi/artist/top/song',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取歌手全部专辑
export function getArtistAlbum(params) {
  return request({
    url: '/musicApi/artist/album',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取歌手专辑详情
export function getArtistAlbumDetail(params) {
  return request({
    url: '/musicApi/album',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取歌手相关mv

export function getArtistMv(params) {
  return request({
    url: '/musicApi/artist/mv',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取mv详情信息
export function getMvDetail(params) {
  return request({
    url: '/musicApi/mv/detail',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取mvurl
export function getMvUrl(params) {
  return request({
    url: '/musicApi/mv/url',
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取相似mv
export function getSimiMv(params) {
  return request({
    url: '/musicApi/simi/mv',
    method: 'get',
    params,
    hideloading: false
  })
}
