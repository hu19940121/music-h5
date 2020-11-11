<template>
  <div class="player-wrap">
    <van-nav-bar
      :title="currentSong.name"
      left-text="返回"
      left-arrow
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
        <!-- <div class="scroll-content" @touchmove="handleTouchmove" @touchstart="handleTouchstart"> -->
        <div class="scroll-content">
          <!-- <van-notice-bar  :scrollable="noticeBarScrollable && index === currentLyricIndex"  ref="lry" background="#fff"  :key="item.time" v-for="(item,index) in lyricList">
            <p ref="lryP" :class="{ 'redColor':currentLyricIndex === index, 'moveColor': (lyricMoveIndex === index) && showMarkLine }" >{{item.content}}</p>
          </van-notice-bar> -->
          <p ref="lry"  :class="{ 'redColor':currentLyricIndex === index, 'moveColor': lyricMoveIndex === index }" :key="item.time" v-for="(item,index) in lyricList">{{ item.content }}</p>
        </div>
        <!-- <div class="mark-line flex align-center justify-around" v-show="showMarkLine">
          <van-icon @click="jumpToplay" color="#4e72b8" name="play" />
          <div class="line"></div>
          <span class="num">{{formatMinuteSecond(currentMoveLyric.time ) }}</span>
        </div> -->
      </div>
      <div v-show=" lyricList.length === 0 ">
        <p>暂无歌词</p>
      </div>
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
import { getSizeImage } from '@/utils'
import BScroll from '@better-scroll/core'
// import { fraction, subtract } from 'mathjs'
// import { formatMinuteSecond } from '@/filters/filter.js'
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
        // this.noticeBarScrollable = this.$refs.lry[value].$el.childNodes[0].clientWidth === this.$refs.lryP[value].clientWidth
        // console.log(this.noticeBarScrollable)
        this.bs.scrollToElement(this.$refs.lry[value], 300, false, true)
      }
    }
  },
  mounted() {
    console.log('mounted')
    this.$route.query.id && this.playMusicByRouterId()
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
    // currentMoveLyric() {
    //   if (this.lyricMoveIndex) {
    //     return this.lyricList[this.lyricMoveIndex]
    //   } else {
    //     return ''
    //   }
    // }
  },
  methods: {
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong'
    }),
    // ...mapMutations({
    //   SET_CURRENT_MOVE_LYRIC: 'song/SET_CURRENT_MOVE_LYRIC'

    // }),
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
      // this.bs.on('scroll', (position) => {
      //   const oneLryItemHeight = this.$refs.lry[0].$el.clientHeight
      //   const ellesCount = (this.$refs.scroll.clientHeight / 2) / oneLryItemHeight - 1
      //   const ynum = Math.abs(position.y)
      //   const positionIndex = Math.round((ynum / oneLryItemHeight) + ellesCount)
      //   this.lyricMoveIndex = positionIndex
      // })
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
    }
  }

}
</script>

<style lang="scss">
@keyframes changeright {
    0%{-webkit-transform:rotate(0deg);}
    50%{-webkit-transform:rotate(180deg);}

    100%{-webkit-transform:rotate(360deg);}
}
.player-wrap {
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
        @include font_color('font_color1');
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
