<template>
  <div class="box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in banners" :key="banner.imageUrl">
        <img :src="banner.imageUrl" alt="" @click="jumpToSongDetail(banner.targetId)">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanners } from '@/api/song'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      banners: []
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong'
    }),
    getBanners() {
      getBanners().then((res) => {
        this.banners = res.banners
      })
    },
    jumpToSongDetail(songId) {
      this.setCurrentSong({ song: { id: songId }}).then(() => {
        this.$router.push({
          path: '/player'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 150px;
    text-align: center;
    /* background-color: #39a9ed; */
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
