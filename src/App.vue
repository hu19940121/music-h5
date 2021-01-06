<template>
  <!-- <div id="app" :class="[{ paddingBottom50: currentSong.url }]"> -->
  <div id="app">

     <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view /> -->
    <playerBar  />
<!--
    <van-tabbar placeholder route>
  <van-tabbar-item replace to="/home" icon="home-o">
    标签
  </van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search">
    标签
  </van-tabbar-item>
</van-tabbar> -->
  </div>
</template>
<script>
import playerBar from '@/components/player-bar'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      isLoadScript: false
    }
  },
  mounted() {
    window.document.documentElement.setAttribute('data-theme', this.theme)
    // this.loadScript()
  },
  components: {
    playerBar
  },
  watch: {
    '$route.path': {
      handler(newVal) {
        if (this.isLoadScript) {
          // eslint-disable-next-line no-undef
          uni.postMessage({
            data: {
              action: 'watchRoute',
              value: newVal === '/'
            }
          })
        } else {
          this.loadScript().then(() => {
            this.isLoadScript = true
            // eslint-disable-next-line no-undef
            uni.postMessage({
              data: {
                action: 'watchRoute',
                value: newVal === '/'
              }
            })
          })
        }
        // eslint-disable-next-line no-undef
      },
      immediate: true // 刷新加载 立马触发一次handler
    }
  },
  methods: {
    ...mapMutations({
      SET_IS_IN_APP: 'app/SET_IS_IN_APP'
    }),
    // 加载webviewjs
    loadScript() {
      const that = this
      return new Promise((resolve, reject) => {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js`
        script.onload = script.onreadystatechange = async() => {
          if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            script.onload = script.onreadystatechange = null
            document.addEventListener('UniAppJSBridgeReady', function() {
            // eslint-disable-next-line no-undef
              uni.webView.getEnv(function(res) {
                console.log('-----', res)
                that.SET_IS_IN_APP(res.plus)
              })
              resolve(true)
            })
          }
        }
        document.body.appendChild(script)
      })
    }
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong,
      theme: (state) => state.app.theme
    })
  }
}
</script>
<style lang="scss">

.paddingBottom50 {
  padding-bottom: 50px;
}
#app {
  font-size: 14px;
}
</style>
