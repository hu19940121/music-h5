<template>
  <div class="playlist">
      <van-nav-bar
        z-index="100"
        fixed
        placeholder
        title="歌单详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <template #right >
          <div @click="share" v-if="isInApp">
            <svg-icon style="color:#d43c33ff;font-size:18px;" icon-class="share"    />
          </div>
        </template>
      </van-nav-bar>
      <div class="banner-wrap">
        <div class="banner" :style="{ background:`url(${playlistInfo.coverImgUrl}) no-repeat` }">

        </div>
        <div class="content flex">
          <div class="left">
            <img :src="playlistInfo.coverImgUrl" alt="">
          </div>
          <div class="right padding-left-sm">
            <p>{{ playlistInfo.name }}</p>
            <div class="info flex align-center margin-top-xs" v-if="playlistInfo.creator">
              <img  :src="playlistInfo.creator.avatarUrl" alt="">
              <span class="padding-left-xs">{{ playlistInfo.creator.nickname }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="title">
        歌曲列表
      </div>
      <van-skeleton  :row="10" :loading="loading">
        <div class="list">
          <songItem :playList="list" isHotSongs  :order="index + 1" :songInfo="songInfo" :key="songInfo.id" v-for="(songInfo,index) in list" />
        </div>
        {{ list.length === 0 ? '暂无歌曲' : '' }}
      </van-skeleton>

  </div>
</template>

<script>
import songItem from '@/components/song-item'
import { mapState, mapActions } from 'vuex'
import { getPlaylistDetail, getSongDetail } from '@/api/song'
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
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp
    })
  },
  methods: {
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong'
    }),
    share() {
      // eslint-disable-next-line no-undef
      uni.postMessage({
        data: {
          action: 'sharePlayList',
          text: `分享歌单：${this.playlistInfo.name}`,
          href: location.href
        }
      })
    },
    getPlaylistDetail() {
      this.loading = true
      getPlaylistDetail({ id: this.$route.query.id }).then((res) => {
        this.loading = false
        this.playlistInfo = res.playlist
        let idsString = ''
        res.playlist.trackIds.map((trackInfo) => {
          idsString = idsString + trackInfo.id + ','
        })
        idsString = idsString.substring(0, idsString.length - 1)
        getSongDetail(idsString).then((res) => {
          this.list = res.songs
        })
        // this.trackIds = res.playlist.trackIds
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
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
