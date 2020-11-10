<template>
  <div>
    <van-popup :lazy-render="false" v-model="show" position="bottom" :style="{ minHeight: '30%' }">
      <div class="list-wrap">
        <h3>当前播放<span>({{ playList.length }})</span></h3>
        <div class="control flex justify-between padding-tb-xs">
          <span class="" @click="changePlayway">
            {{ currentPlaywayText }}
            <svg-icon :icon-class="playwayMap[currentPlayway].iconName"   />
          </span>
          <svg-icon @click="SET_PLAY_LIST([])" icon-class="delete"   />
        </div>
        <div class="songList" ref="scroll">
          <div class="scroll-content">
            <div ref="songItemRef" class="item flex justify-between padding-tb-xs" v-for="song in playList" :key="song.id" @click="listPlay(song)" >
              <div class="flex" :class="['item-left', { 'active': currentSong.id === song.id }]">
                <svg-icon  v-if="currentSong.id === song.id" icon-class="laba"   />
                {{ song.name }}
              </div>
              <div class="item-right">
                <van-icon color="#666" @click.stop="deleteInPlaylist( song.id )"  name="cross" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      playwayMap: {
        0: {
          name: '列表循环',
          iconName: 'xunhuan'
        },
        1: {
          name: '随机播放',
          iconName: 'suiji'
        },
        2: {
          name: '单曲循环',
          iconName: 'dqxunhuan'
        }
      },
      show: this.value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.show = newValue
      }
    },
    show(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initScroll()
          this.bs && this.bs.scrollToElement(this.$refs.songItemRef[this.currentSongIndex], 300, false, true)
        })
      }
      this.$emit('input', newValue)
    }
  },
  computed: {
    ...mapState({
      currentSong: (state) => state.song.currentSong,
      playList: (state) => state.song.playList,
      currentPlayway: (state) => state.song.currentPlayway,
      currentSongIndex: (state) => state.song.currentSongIndex
    }),
    currentPlaywayText() {
      return this.playwayMap[this.currentPlayway].name
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      setCurrentSong: 'song/setCurrentSong',
      setPlayList: 'song/setPlayList'
    }),
    ...mapMutations({
      SET_PLAY_LIST: 'song/SET_PLAY_LIST',
      SET_CURRENT_PLAY_WAY: 'song/SET_CURRENT_PLAY_WAY'
    }),
    changePlayway() {
      this.SET_CURRENT_PLAY_WAY(this.currentPlayway + 1)
      if (this.currentPlayway > 2) {
        this.SET_CURRENT_PLAY_WAY(0)
      }
    },
    deleteInPlaylist(id) {
      const newList = this.playList.filter((item) => item.id !== id)
      this.setPlayList(newList)
    },
    // playlist操作
    listPlay(song) {
      this.setCurrentSong({ song })
    },
    initScroll() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true,
        bindToWrapper: true
      })
      this.bs.on('beforeScrollStart', () => {
        console.log('beforeScrollStart')
        this.enableScroll = false
      })
      this.bs.on('scrollEnd', () => {
        console.log('scrollEnd')
        this.enableScroll = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      overflow: hidden;
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
</style>
