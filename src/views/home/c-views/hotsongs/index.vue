<template>
  <div class="hotsongs">
    <div class="banner padding-left is-border-box">
      <p class="padding-top">
        {{ $t('home.hotsongsView.titleText') }}
      </p>
    </div>
    <div class="list">
      <songItem isHotSongs :songInfo="songInfo" :key="songInfo.id" :order="index + 1"  v-for="(songInfo,index) in hotSongsList"/>
    </div>
  </div>
</template>

<script>
import songItem from '@/components/song-item'
import { getPlaylistDetail } from '@/api/song'
export default {
  components: {
    songItem
  },
  data() {
    return {
      hotSongsList: []
    }
  },
  mounted() {
    this.getPlaylistDetail()
  },
  methods: {
    // 获取热歌榜单
    getPlaylistDetail() {
      getPlaylistDetail({ id: 3778678 }).then(res => {
        this.hotSongsList = res.playlist.tracks
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hotsongs {
  width: 100%;
  .banner {
    font-size: 20px;
    color: #ffffff;
    width: 100%;
    height: 145px;
    background: url('https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=') no-repeat;
    background-size: cover;
    img { width: 100%; height: 100%; }
  }
}
</style>
