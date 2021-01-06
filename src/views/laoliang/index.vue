<template>
  <div class="">
    <van-nav-bar
      :title="'老梁故事汇 全新版 2020'"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- <p v-for="(item, index) in list" :key="index">
      <a  :href="item.url" > {{item.name}} </a>
   </p> -->
    <div class="top text-center padding-top-sm">
      <img class="top-banner" src="https://pic.qingting.fm/channel/2020/06/18/e8532125b09aed27dee74393e5b4c425.jpg!400" alt="">
      <p class="top-name margin-tb-xs">{{currentPlaysong.name}}</p>
      <audio autoplay preload="auto" @play="handlePlay" ref="audio" controls :src="currentPlaysong.url"></audio>
    </div>
    <div class="list margin-top-sm">
      <div class="list-item padding-xs flex justify-between" v-for="song in list" :key="song.url">
        <span class="name">{{ song.name }}</span>
        <svg-icon  v-if="song.url === currentPlaysong.url"  className="icon" icon-class="laba"   />
        <van-icon  v-else  @click="play(song)" size="20" name="play-circle-o"  color="#ccc"/>
      </div>
    </div>
  </div>

</template>

<script>
import { laoliangList } from '@/api/laoliang'
import { Toast } from 'vant'

export default {
  data() {
    return {
      list: [],
      currentPlaysong: {}
    }
  },
  mounted() {
    this.getLaoliang()
  },
  methods: {
    handlePlay() {

    },
    play(song) {
      const audio = this.$refs.audio
      this.currentPlaysong = song
      audio.load()
      const playPromise = audio.play()
      Toast.loading({
        forbidClick: true
      })
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('then')
          Toast.clear()
        }).catch((err) => {
          console.log('err', err)
        })
      }
    },
    getLaoliang() {
      laoliangList().then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-banner {
  width: 120px;
  height: 120px;
  border-radius: 4px;
}
.list {
  .list-item {
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
