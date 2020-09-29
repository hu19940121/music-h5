<template>
  <div class="recommend">
    <div class="title margin-tb-sm">
      {{ $t('home.recommendView.recommendListText') }}
    </div>
    <div class="list flex flex-wrap">
      <div  v-for="(gedan,index) in gedanList" :key="gedan.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
        <playlistItem :info="gedan" />
      </div>
      <!-- <div @click="jumpToPlaylist(gedan)" v-for="(gedan,index) in gedanList" :key="gedan.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
        <div class="cover">
          <div class="num">
            <img src="~assets/images/erji.svg" alt="">
            {{ gedan.playCount | getCount}}
          </div>
          <van-image  :src="gedan.picUrl"  />
        </div>
        <p class="info two-lines">
          {{ gedan.name }}
        </p>
      </div> -->
    </div>
    <div class="title margin-tb-sm">
      {{$t('home.recommendView.newMusicText')}}
    </div>
    <div class="new-songs-list padding-lr-xs">
      <songItem :showOrder="false" :songInfo="songInfo" :key="index" v-for="(songInfo,index) in songList"/>
    </div>
  </div>
</template>

<script>
import songItem from '@/components/song-item'
import playlistItem from '../../components/playlist-item'
import { getNewsong, personalized } from '@/api/song'
export default {
  data() {
    return {
      songList: [],
      gedanList: []
    }
  },
  mounted() {
    this.getNewSong()
    this.getPersonalized()
  },
  methods: {
    jumpToPlaylist(item) {
      this.$router.push({
        path: `/playlist?id=${item.id}`
      })
    },
    getNewSong() {
      getNewsong().then(res => {
        this.songList = res.result
      })
    },
    getPersonalized() {
      personalized({ limit: 6 }).then(res => {
        this.gedanList = res.result
      })
    }
  },
  components: {
    songItem,
    playlistItem
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  .title {
    font-size: 17px;
    position: relative;
    padding-left:10px;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
  .list {
    .margin-right-xxs {
      margin-right: 4px;
    }
    .list-item {
      width: 122px;
      margin-bottom: 10px;
      /* margin-right: 4px; */

    }
  }
}
</style>
