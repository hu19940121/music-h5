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

  },
  components: {
    playerBar
  },
  methods: {
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong
    })
  },
  watch: {

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
#app {
  font-size: 14px;
  padding-bottom: 50px;
}
</style>
