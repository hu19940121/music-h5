<template>
  <div id="app" :class="[{ paddingBottom50: currentSong.url }]">
     <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view /> -->
    <transition name="fade">
      <playerBar v-show="currentSong.url" />
    </transition>
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
    console.log('mounted--------')
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
          console.log('已经加载过js了')
          // eslint-disable-next-line no-undef
          uni.postMessage({
            data: {
              action: 'watchRoute',
              value: newVal === '/'
            }
          })
        } else {
          console.log('还没有加载js')
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
        console.log('watch--------')

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
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateY(100%);
}
.paddingBottom50 {
  padding-bottom: 50px;
}
#app {
  font-size: 14px;

}
</style>
