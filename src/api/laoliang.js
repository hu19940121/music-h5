
import request from '@/utils/request'
// 歌单分类
export function laoliangList() {
  return request({
    url: '/api/v2/spider/laoliang',
    method: 'get'
  })
}

