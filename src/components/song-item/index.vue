<template>
  <div class="song-item flex justify-between padding-lr-xs align-center padding-tb-xs">
    <div class="left flex align-center">
      <span v-if="showOrder" :class="['order','padding-right-xs', { 'red': order <=3 } ]"> {{ order }} </span>
      <div>
        <p class="name">
          <span v-html="songInfo.name"></span>
        </p>
        <p class="desc" v-if="isHotSongs">
          <span :key="artist.id" v-for="artist in songInfo.ar">{{ artist.name }} </span> - {{ songInfo.al.name }}
        </p>
        <p class="desc" v-else>
          <span :key="artist.id" v-for="artist in songInfo.song.artists">{{ artist.name }} </span> - {{ songInfo.song.album.name }}
        </p>
      </div>
    </div>
    <div class="right">
      <!-- {{ currentSong.id }}- {{  songInfo.id}} -->
      <!-- <van-icon  name="pause-circle-o"  size="20"  color="#ccc"/> -->
      <svg-icon  v-if="currentSong.id === songInfo.id"  className="icon" icon-class="laba"   />
      <van-icon  @click="play(songInfo)" v-else size="20" name="play-circle-o"  color="#ccc"/>
    </div>
    <!-- <div class="right">
      <van-icon v-if="!isPlaying" @click="play(songInfo)" size="20" name="play-circle-o"  color="#ccc"/>
      <van-icon v-else @click="play(songInfo)" name="pause-circle-o"  size="20"  color="#ccc"/>
    </div>
    <audio @pause="isPlaying = false" @play="isPlaying = true" ref='audio' v-if="currentSong.id === songInfo.id" :src="currentSong.url"></audio> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    playList: {
      type: Array,
      default: () => null
    },
    isHotSongs: {
      type: Boolean,
      default: false
    },
    showOrder: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    songInfo: {
      type: Object,
      default: () => ({
        song: {
          artists: [],
          album: {}
        }
      })
    }
  },
  data() {
    return {
      isPlaying: false
    }
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong
    })
  },
  methods: {
    // play(song) {
    //   if (this.isPlaying) {
    //     this.$refs.audio.pause()
    //   } else {
    //     this.setCurrentSong(song).then(() => {
    //       this.$nextTick(() => {
    //         this.$refs.audio.play()
    //       })
    //     })
    //   }
    // },
    play(song) {
      // this.setCurrentSong(song)
      this.setCurrentSong({ song, playList: this.playList })
    },
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong'
    })
  }
}
</script>

<style lang="scss" scoped>
.song-item {
  border-bottom: 1px solid #eeeeee;
  .left {
    .order {
      font-size: 14px;
      &.red {
        color: red;
      }
    }
    .name {
      @include textoverflow(1);
      @include font_color("font_color1");
    }
    .desc {
      font-size: 12px;
      color: #666666;
      @include textoverflow(1)
    }
  }
}
</style>
