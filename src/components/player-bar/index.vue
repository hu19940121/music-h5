<template>
  <div class="placeholder"  v-show="currentSong.url" >
    <transition name="fade">
      <div v-show="currentSong.url" class="player-bar flex justify-between align-center padding-lr-xs">
        <div class="progress-wrap">
          <van-slider active-color="#d43c33ff" v-model="percent" @drag-end="handleSlideEnd" @input="handleSlideChange" @change="handleSlideEnd">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
        </div>
        <div style="width: 100%;" class="flex justify-between align-center "  @click="jumpToPlayer">
          <div class="left flex align-center" >
            <img class="cover"  :src="getSizeImage(currentSongAlbumImg)" alt="">
            <div class="info padding-left-xs">
              <p class="name"> {{ currentSong.name }} </p>
              <p class="artist"> {{currentSongSingers }} </p>
            </div>
          </div>
          <div class="right flex align-center">
            <div class="time padding-right-sm">
              <span> {{ currentTime | formatMinuteSecond }} </span>/
              <span>{{ currentSong.dt | formatMinuteSecond}} </span>
            </div>
            <van-circle v-if="isPlaying" layer-color="#eeeeee" color="#d43c33ff"   v-model="percent" size="34" :speed="100">
              <svg-icon @click.stop="pause" className="icon" icon-class="pause"  />
            </van-circle>
            <van-circle  v-else color="#666" v-model="currentRate2"  size="34">
              <svg-icon @click.stop="play" className="icon" icon-class="play"   />
            </van-circle>
            <svg-icon  @click.stop="showList = true"  class="list-icon margin-left-xs" icon-class="list"   />
          </div>
        </div>
        <audio @ended="handleEnded" @timeupdate="handleTimeUpdate" @play="setIsplaying(true)" @pause="setIsplaying(false)" ref="audio"></audio>
        <playListCom v-model="showList"/>
      </div>
    </transition>
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getSizeImage, getRandomNumber } from '@/utils'
import playListCom from './playList'
export default {
  data() {
    return {
      list: ['当太阳超长身体而玩儿玩儿撒打算打算呢', '恭喜发财', '自由飞翔', '龙的传人', 'ai', '分手快乐', '秋天不回来', 'hello sfsdf'],
      showList: false,
      getSizeImage,
      duration: 0, // 总时长
      currentTime: 0, // 当前播放的进度
      isChanging: false, // 是否正在更改进度
      percent: 0, // 进度百分比
      currentRate: 0,
      currentRate2: 100
    }
  },
  components: {
    playListCom
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong,
      isPlaying: (state) => state.song.isPlaying,
      lyricList: (state) => state.song.lyricList,
      currentLyricIndex: (state) => state.song.currentLyricIndex,
      playList: (state) => state.song.playList,
      currentSongIndex: (state) => state.song.currentSongIndex,
      currentPlayway: (state) => state.song.currentPlayway,
      currentMoveLyric: (state) => state.song.currentMoveLyric
    }),
    currentSongSingers() {
      if (this.currentSong.ar) {
        return this.currentSong.ar.map((item) => item.name).join('-')
      } else {
        return ''
      }
    },
    currentSongAlbumImg() {
      return this.currentSong.al && this.currentSong.al.picUrl
    }
  },
  watch: {
    currentSong(newValue, oldValue) {
      this.$refs.audio.src = newValue.url
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    currentMoveLyric(newValue, oldValue) {
      console.log('newValue', newValue)
      if (newValue.time !== oldValue.time) {
        this.$refs.audio.currentTime = newValue.time / 1000
      }
    }
  },
  methods: {
    ...mapActions({
      setIsplaying: 'song/setIsplaying',
      setCurrentSong: 'song/setCurrentSong',
      setPlayList: 'song/setPlayList'
    }),
    ...mapMutations({
      SET_CURRENT_LYRIC_INDEX: 'song/SET_CURRENT_LYRIC_INDEX',
      SET_PLAY_LIST: 'song/SET_PLAY_LIST',
      SET_CURRENT_SONG_INDEX: 'song/SET_CURRENT_SONG_INDEX'
    }),
    jumpToPlayer() {
      this.$router.push({
        path: '/player',
        query: {
          id: this.currentSong.id
        }
      })
    },
    play() {
      this.$refs.audio.play()
      this.setIsplaying(true)
    },
    pause() {
      this.$refs.audio.pause()
      this.setIsplaying(false)
    },
    handleTimeUpdate(e) {
      if (!this.isChanging) {
        this.currentTime = e.target.currentTime * 1000
        this.duration = this.currentSong.dt
        this.percent = (this.currentTime / this.duration) * 100
        let i = 0
        for (; i < this.lyricList.length; i++) {
          const lyric = this.lyricList[i]
          if (lyric.time > this.currentTime) {
            break
          }
        }
        if (this.currentLyricIndex !== i - 1) {
          this.SET_CURRENT_LYRIC_INDEX(i - 1)
        }
      }
    },

    // 播放完毕处理
    handleEnded() {
      if (this.playList.length === 0) { // 列表里没有歌直接return
        return
      }
      // eslint-disable-next-line prefer-const
      let { currentPlayway, currentSongIndex, playList } = this
      if (currentPlayway === 1) { // 随机
        const randomNum = getRandomNumber(playList.length)
        this.SET_CURRENT_SONG_INDEX(randomNum)
        this.setCurrentSong({ song: playList[randomNum] })
      } else { // 普通
        currentSongIndex = currentSongIndex + 1
        if (currentSongIndex > playList.length - 1) {
          currentSongIndex = 0
        }
        this.SET_CURRENT_SONG_INDEX(currentSongIndex)
        this.setCurrentSong({ song: playList[currentSongIndex] })
      }
    },

    handleSlideChange() {
      this.isChanging = true
    },
    handleSlideEnd() {
      console.log(this.$refs.audio.currentTime)
      this.$refs.audio.currentTime = ((this.percent / 100) * this.duration) / 1000
      this.isChanging = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateY(100%);
}
.placeholder { height: 50px;}
.player-bar {
  position: fixed;
  height: 50px;
  z-index: 100000000000;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* border-top: 1px solid #eeeeee; */
  @include background_color("player_bar");
  .list-icon {
    font-size: 20px;
  }
  .progress-wrap {
    width: 100%;
    position: absolute;

    top: 0;
    left: 0;
    .custom-button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #d43c33ff;
    }
  }
  .icon {
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    @include font_color('font_color1')
  }
  .left {
    flex:1;
    .cover {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
       font-size: 12px;
      .name {
        @include textoverflow(1);
        @include font_color(font_color1)
      }
      .artist {
        margin-top: 4px;

        color: #666;
        @include textoverflow(1)
      }
    }
  }
  .right {
    flex:1;
    .time {
      font-size: 12px;
      color: #666;
    }
  }
  .list-wrap {
    padding: 20px;
    box-sizing: border-box;
    @include font_color('font_color1');
    @include background_color('background_color1');
    h3>span {
      font-size: 12px;
      color: #666;

    }
    .songList {
      height: 280px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .item {
        .item-left {
          width: 200px;
          @include textoverflow(1);
          &.active {
            color: #ee0a24;
          }
        }
        .item-right {
          width: 75px;
          text-align: right;
        }
      }
    }
  }
}
</style>
