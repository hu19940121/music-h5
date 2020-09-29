<template>
  <div class="player-bar flex justify-between align-center padding-lr-xs">
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
      <div class="right">
        <van-circle v-if="isPlaying" layer-color="#eeeeee" color="#d43c33ff"   v-model="percent" size="34" :speed="100">
          <svg-icon @click.stop="pause" className="icon" icon-class="pause"  />
        </van-circle>
        <van-circle  v-else color="#666" v-model="currentRate2"  size="34">
          <svg-icon @click.stop="play" className="icon" icon-class="play"   />
        </van-circle>
      </div>
    </div>
    <audio @timeupdate="handleTimeUpdate" @play="setIsplaying(true)" @pause="setIsplaying(false)" ref="audio"></audio>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getSizeImage } from '@/utils'
export default {
  data() {
    return {
      getSizeImage,
      duration: 0, // 总时长
      currentTime: 0, // 当前播放的进度
      isChanging: false, // 是否正在更改进度
      // slideValue: 0,
      percent: 0, // 进度百分比
      // isPlaying: false,
      currentRate: 0,
      currentRate2: 100,
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601184512597&di=2c7719222da00151ac8446d890586412&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn19%2F0%2Fw400h400%2F20180910%2F3391-hiycyfw5413589.jpg'
    }
  },
  watch: {
    currentSong(newValue, oldValue) {
      this.$refs.audio.src = newValue.url
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  },
  methods: {
    ...mapActions({
      setIsplaying: 'song/setIsplaying'
    }),
    ...mapMutations({
      SET_CURRENT_LYRIC_INDEX: 'song/SET_CURRENT_LYRIC_INDEX'
    }),

    jumpToPlayer() {
      this.$router.push({
        path: '/player'
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
        // const currentTime = e.target.currentTime * 1000
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
    handleSlideChange() {
      this.isChanging = true
    },
    handleSlideEnd() {
      console.log('sdfs')
      this.$refs.audio.currentTime = ((this.percent / 100) * this.duration) / 1000
      this.isChanging = false
    }
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong,
      isPlaying: (state) => state.song.isPlaying,
      lyricList: (state) => state.song.lyricList,
      currentLyricIndex: (state) => state.song.currentLyricIndex
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
  }
}
</script>

<style lang="scss" scoped>
.player-bar {
  position: fixed;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #eeeeee;
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
  }
  .left {
    .cover {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
       font-size: 12px;
      .name {
        @include textoverflow(1)
      }
      .artist {
        margin-top: 4px;

        color: #666;
        @include textoverflow(1)
      }
    }
  }
}
</style>
