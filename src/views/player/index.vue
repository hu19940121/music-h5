<template>
  <div class="player-wrap">
    <div class="player-wrap-cover" :style="`background:url(${ currentSong.al && currentSong.al.picUrl })`"></div>
    <van-nav-bar
      style="background:transparent !important;"
      :title="currentSong.name"
      left-text="返回"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right v-if="isInApp">
        <svg-icon style="color:#d43c33ff;font-size:18px;" icon-class="share" @click="share"   />
      </template>
    </van-nav-bar>
    <!-- <van-notice-bar
      @click.native="gift"
      :scrollable="false"
      left-icon="volume-o"
      text="更多更能正在开发中！"
    /> -->
    <div class="player flex flex-direction align-center">
      <van-image round :class="['cover', { 'donghua': isPlaying } ]" :src=" getSizeImage(currentSong.al && currentSong.al.picUrl,300) " />
      <div class="lrylist"  ref="scroll">
        <div class="scroll-content">
          <p ref="lry"  :class="{ 'redColor':currentLyricIndex === index, 'moveColor': lyricMoveIndex === index }" :key="item.time" v-for="(item,index) in lyricList">{{ item.content }}</p>
        </div>
      </div>
      <div v-show=" lyricList.length === 0 ">
        <p>暂无歌词</p>
      </div>
    </div>
    <div class="bottom-button flex justify-around margin-top">
      <svg-icon class="anction-icon"  icon-class="aixin"   @click="forbid" />
      <svg-icon class="anction-icon" icon-class="xiazai"   @click="downloadMusic" />
      <svg-icon @click="linkToComment" class="anction-icon" icon-class="pinglun"   />
    </div>
    <van-dialog v-model="show" title="赏杯奶茶？" show-cancel-button>
      <div style="text-align:center;">
        <img style="width:80%;" src="./zhifu.jpg" />
      </div>
    </van-dialog>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getSongDetail } from '@/api/song'
import { getSizeImage, createDownload } from '@/utils'
import BScroll from '@better-scroll/core'
import { Toast } from 'vant'
import axios from 'axios'
export default {
  data() {
    return {
      // formatMinuteSecond,
      timer: null,
      showMarkLine: false,
      lyricMoveIndex: null,
      getSizeImage,
      show: false,
      enableScroll: true,
      noticeBarScrollable: false
    }
  },
  watch: {
    currentLyricIndex(value) {
      if (this.$refs.lry[value] && this.enableScroll) {
        this.bs.scrollToElement(this.$refs.lry[value], 300, false, true)
      }
    },
    // 歌词变了会调整对应的dom 结构 dom结构改变要执行refresh方法
    lyricList() {
      this.$nextTick(() => {
        this.bs.refresh()
      })
    }
  },
  mounted() {
    (this.$route.query.id && !this.isPlaying) && this.playMusicByRouterId()
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  computed: {

    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentSong: (state) => state.song.currentSong,
      isPlaying: (state) => state.song.isPlaying,
      lyricList: (state) => state.song.lyricList,
      currentLyricIndex: (state) => state.song.currentLyricIndex
    })
  },
  methods: {
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong'
    }),
    forbid() {
      Toast('未开放')
    },
    linkToComment() {
      this.$router.push({
        path: '/comment',
        query: {
          id: this.currentSong.id
        }
      })
    },
    handleTouchstart() {
      this.showMarkLine = true
    },

    // 停止滚动后五秒后消失
    handleTouchmove() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.showMarkLine = false
      }, 5000)
    },
    jumpToplay() {
      this.SET_CURRENT_MOVE_LYRIC(this.currentMoveLyric)
      this.enableScroll = true
      // console.log('jumpToplay')
    },
    initScroll() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true
      })
      this.bs.on('beforeScrollStart', () => {
        // console.log('beforeScrollStart')
        this.enableScroll = false
      })
      this.bs.on('scrollEnd', (position) => {
        // console.log('scrollEnd', position)
        this.enableScroll = true
      })
    },
    share() {
      // eslint-disable-next-line no-undef
      uni.postMessage({
        data: {
          action: 'sharePlayList',
          text: `分享歌曲：${this.currentSong.name}`,
          href: `${location.href}?id=${this.currentSong.id}`
        }
      })
    },
    // 如果页面有id根据id播放
    playMusicByRouterId() {
      getSongDetail(this.$route.query.id).then(res => {
        this.setCurrentSong({ song: res.songs[0] })
      })
    },
    gift() {
      this.show = true
    },
    downloadMusic() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '下载中'
      })
      axios.get(this.currentSong.url, { responseType: 'blob' }).then((res) => {
        toast.message = '下载完成'
        Toast.clear()
        createDownload(this.currentSong.name, res.data)
      }).catch(() => {
        Toast.clear()
      })
    }
  }

}
</script>

<style lang="scss">
.anction-icon{
  font-size: 24px;
  color: #ffffff;
}
@keyframes changeright {
    0%{-webkit-transform:rotate(0deg);}
    50%{-webkit-transform:rotate(180deg);}

    100%{-webkit-transform:rotate(360deg);}
}
.player-wrap {
  height: calc(100vh - 50px);
  background-color:rgba(0,0,0,0.4);
  .player-wrap-cover{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(50px);
    z-index: -1;
    background-size: cover;
  }
  /deep/ .van-nav-bar__title {
    color: #ffffff !important;
  }
  /deep/.van-notice-bar__wrap{
    display: flex;
    justify-content: center;
  }
  .player {
    .cover {
      display: inline-block;
      margin: 50px 0;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      &.donghua {
        animation: changeright 6s linear infinite
      }
    }
    .lrylist {
      width: 100%;
      text-align: center;
      height: 200px;
      overflow: hidden;
      position: relative;
      .mark-line {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .line {
          height: 1px;
          background-color: #4e72b8;
          width: 80%;
        }
        .num {
          color: #4e72b8;
        }
      }
      p {
        /* @include font_color('font_color1'); */
        color: #ffffff;
        position: relative;
        width: auto;
        padding: 4px 0;
        &.redColor {
          @include font_color('lyric_active_font_color');
        }
        &.moveColor {
          color: orange !important;
        }
      }
    }
  }
}

</style>
