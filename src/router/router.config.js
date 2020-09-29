/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  }, {
    path: '/playlist',
    component: () => import('@/views/playlist/index'),
    meta: {
      title: '歌曲列表',
      keepAlive: false
    }
  }, {
    path: '/player',
    component: () => import('@/views/player/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/feedback',
    component: () => import('@/views/feedback/index'),
    meta: {
      keepAlive: false
    }
  }
]
