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
  }, {
    path: '/singerCate',
    component: () => import('@/views/singerCate/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/singerList',
    component: () => import('@/views/singerList/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/singerDetail',
    component: () => import('@/views/singerDetail/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/albumDetail',
    component: () => import('@/views/albumDetail/index'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/mvDetail',
    component: () => import('@/views/mvDetail/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/download',
    component: () => import('@/views/download/index'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/comment',
    component: () => import('@/views/comment/index'),
    meta: {
      keepAlive: false
    }
  }

]
