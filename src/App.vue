<template>
  <div id="app">
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
import { mapState } from 'vuex'
export default {
  name: 'App',
  mounted() {
    window.document.documentElement.setAttribute('data-theme', this.theme)
  },
  components: {
    playerBar
  },
  methods: {
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong,
      theme: (state) => state.app.theme
    })
  },
  watch: {

  }
}
</script>
<style lang="scss">
body {
  @include background_color("background_color1");

}
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateY(100%);
}
#app {
  font-size: 14px;
  padding-bottom: 50px;
}
</style>
