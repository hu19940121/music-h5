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
    <van-notice-bar
      @click.native="gift"
      :scrollable="false"
      left-icon="volume-o"
      text="更多更能正在开发中！"
    />
    <div class="player flex flex-direction align-center">
      <van-image round :class="['cover', { 'donghua': isPlaying } ]" :src=" getSizeImage(currentSong.al && currentSong.al.picUrl,300) " />
      <div class="lrylist" ref="lrylist">
        <p ref="lry"  :class="{ 'redColor':currentLyricIndex === index }" :key="item.time" v-for="(item,index) in lyricList">{{ item.content }}</p>
        <!-- <p ref="p2" class="p2">秋天不回来</p> -->
      </div>
      <div v-show=" lyricList.length === 0 ">
        <p>暂无歌词</p>
      </div>
    </div>
    <van-dialog v-model="show" title="赏杯奶茶？" show-cancel-button>
      <div style="text-align:center;">
      <van-image style="width:80%;" src="./zhifu.jpg" />

      </div>
    </van-dialog>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getSongDetail } from '@/api/song'
import { getSizeImage } from '@/utils'

export default {
  data() {
    return {
      getSizeImage,
      show: false
    }
  },
  watch: {
    currentLyricIndex(value) {
      if (this.$refs.lry[value]) {
        this.judge(this.$refs.lry[value].offsetTop)
      }
    }
  },
  mounted() {
    console.log('mounted')
    this.$route.query.id && this.playMusicByRouterId()
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
    judge(num) {
      if (num > this.$refs.lrylist.clientHeight) {
        this.$refs.lrylist.scrollTop = num
      } else {
        this.$refs.lrylist.scrollTop = 0
      }
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentSong: (state) => state.song.currentSong,
      isPlaying: (state) => state.song.isPlaying,
      lyricList: (state) => state.song.lyricList,
      currentLyricIndex: (state) => state.song.currentLyricIndex
    })
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
      position: relative;
      text-align: center;
      height: 200px;
      overflow-y: scroll;
      p {
        @include font_color('font_color1');
        position: relative;
        padding: 4px 0;
        &.redColor {
          @include font_color('lyric_active_font_color');
        }
      }
    }
  }
}

</style>
