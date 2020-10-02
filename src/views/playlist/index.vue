<template>
  <div class="playlist">
      <div class="banner-wrap">
        <div class="banner" :style="{ background:`url(${playlistInfo.coverImgUrl}) no-repeat` }">

        </div>
        <div class="content flex">
          <div class="left">
            <img :src="playlistInfo.coverImgUrl" alt="">
          </div>
          <div class="right padding-left-sm">
            <p>{{ playlistInfo.name }}</p>
            <div class="info flex align-center margin-top-xs">
              <img :src="playlistInfo.creator.avatarUrl" alt="">
              <span class="padding-left-xs">{{ playlistInfo.creator.nickname }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="title">
        歌曲列表
      </div>
      <van-skeleton  :row="10" :loading="true">
        <div class="list">
          <songItem isHotSongs  :order="index + 1" :songInfo="songInfo" :key="songInfo.id" v-for="(songInfo,index) in list" />
        </div>
      </van-skeleton>

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
      loading: false,
      list: [],
      playlistInfo: {
        creator: {}
      }
    }
  },
  mounted() {
    this.getPlaylistDetail()
  },
  methods: {
    getPlaylistDetail() {
      this.loading = true
      getPlaylistDetail({ id: this.$route.query.id }).then((res) => {
        this.loading = false
        this.playlistInfo = res.playlist
        this.list = res.playlist.tracks
        console.log(this.list)
        // console.log('res', res)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  /deep/.van-skeleton__row {
    @include background_color('van_skeleton');
  }
  .banner-wrap {
    position: relative;
    width: 100%;
    height: 170px;
    overflow: hidden;
    .banner {
      position: relative;
      width: 100%;
      height: 170px;
      background-size: cover;
      filter: blur(10px);
      background-position: 50%;
      &:after {
        content: '';
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.25);
        z-index: 1;
      }
    }
    .content {

      width: 90%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 2;
      .left {
        flex: 1;
        width: 126px;
        height: 126px;
        img { width: 100%;height: 100%; }
      }
      .right {
        color: #fff;
        flex: 1.5;
        .info {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .title {
    padding: 4px;
    font-size: 12px;
    @include background_color('background_color1');
    @include font_color('font_color1')
    /* background-color: #eeeff0; */
  }
}
</style>
