
import request from '@/utils/request'
// 歌单分类
export function getPlaylistCatlist() {
  return request({
    url: '/musicApi/playlist/catlist',
    method: 'get'
  })
}
// 歌单分类
export function getPlaylist(params) {
  return request({
    url: '/musicApi/top/playlist',
    method: 'get',
    params
  })
}

