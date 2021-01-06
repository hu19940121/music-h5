<template>
  <div class="recommend">
    <div class="title margin-tb-sm flex justify-between">
      <span> {{ $t('home.recommendView.recommendListText') }}</span>
      <p @click="morePlaylist" class="padding-right-sm flex align-center"> 更多 <van-icon name="arrow" /></p>
    </div>
    <div class="list flex flex-wrap">
      <div  v-for="(gedan,index) in gedanList" :key="gedan.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
        <playlistItem :info="gedan" />
      </div>
      <div class="list-item">
        <playlistItem @click.native="jumpLaoliang" :info="laoliang" />
      </div>
    </div>
    <div class="title margin-tb-sm">
      {{$t('home.recommendView.newMusicText')}}
    </div>
    <div class="new-songs-list padding-lr-xs">
      <songItem :playList="songList" :showOrder="false" :songInfo="songInfo" :key="index" v-for="(songInfo,index) in songList"/>
    </div>
    <div class="title margin-tb-sm flex justify-between">
      <span> {{$t('home.recommendView.hotSingersText')}}</span>
      <p @click="more" class="padding-right-sm flex align-center"> 更多 <van-icon name="arrow" /></p>
    </div>
    <div class="hot-singers-list padding-lr-xs flex flex-wrap">
      <div v-for="(singer,index) in hotSingersList" :key="singer.accountId" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-sm'">
        <singerItem :info="singer" />
      </div>
    </div>
  </div>
</template>

<script>
import songItem from '@/components/song-item'
import playlistItem from '@/components/playlist-item'
import singerItem from '../../components/singer-item'
import { getNewsong, personalized } from '@/api/song'
import { getHotArtists } from '@/api/singer'
export default {
  data() {
    return {
      songList: [],
      gedanList: [],
      hotSingersList: [],
      laoliang: {
        'id': 'xxx',
        'type': 0,
        'name': '老梁故事汇 2020',
        'copywriter': '编辑推荐：为音乐人提供了不少灵感',
        'picUrl': 'https://pic.qingting.fm/channel/2020/06/18/e8532125b09aed27dee74393e5b4c425.jpg!400',
        'canDislike': false,
        'trackNumberUpdateTime': 1609863133163,
        'playCount': 280029,
        'trackCount': 27,
        'highQuality': false,
        'alg': 'featured'
      }
    }
  },
  components: {
    songItem,
    playlistItem,
    singerItem
  },
  mounted() {
    this.getNewSong()
    this.getPersonalized()
    this.getHotArtists()
  },
  methods: {
    jumpLaoliang() {
      this.$router.push({
        path: `/laoliang`
      })
    },
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
    getHotArtists() {
      getHotArtists({ offset: 0, limit: 9 }).then(res => {
        console.log(res)
        this.hotSingersList = res.artists
      })
    },
    getPersonalized() {
      personalized({ limit: 5 }).then(res => {
        this.gedanList = res.result
      })
    },
    more() {
      this.$router.push({
        path: '/singerCate'
      })
    },
    morePlaylist() {
      this.$router.push({
        path: '/playList'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.recommend {
  .title {
    font-size: 17px;
    position: relative;
    padding-left:10px;
    @include font_color("font_color1");
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
  .hot-singers-list {
    .list-item {
      margin-bottom: 10px;
    }
  }
}
</style>
