<template>
  <div class="search">
    <div class="search-wrap padding-tb-xs">
      <van-search @input="handleChange" v-model="keywords" :placeholder=" $t('home.searchView.placeholderText')" />
    </div>
    <div v-if="suggestList.length > 0 && keywords" class="suggest-list padding-xs">
      搜索 {{ keywords  }}
      <div class="suggest">
        <van-cell v-for="(suggest) in suggestList" :key="suggest.id">
          <template #title>
            <div @click="searchSong(suggest.keyword)">
              <van-icon name="search" class="search-icon" />
              <span class="custom-title padding-left-xs">{{ suggest.keyword}}</span>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <div v-else class="hot-search padding-lr-xs">
      <p class="padding-tb-xs">
        {{ $t('home.searchView.hotSearchText') }}
      </p>
      <span @click="hotSearch(item.first)" class="search-item" :key="item.first" v-for="item in hotSearchList"> {{item.first}} </span>
    </div>
    <div v-if="resultList.length && keywords" class="suggest-list padding-xs">
      <div class="suggest">
        <songItem :showOrder="false" isHotSongs :songInfo="result" v-for="(result) in resultList" :key="result.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import { search, getSuggest, getSearchHotList } from '@/api/song'
import songItem from '@/components/song-item'
export default {
  data() {
    return {
      keywords: '',
      suggestList: [],
      resultList: [],
      hotSearchList: []
    }
  },
  components: {
    songItem
  },
  mounted() {
    this.getSearchHotList()
  },
  methods: {
    getSearchHotList() {
      getSearchHotList().then(res => {
        this.hotSearchList = res.result.hots || []
      })
    },
    handleChange() {
      if (this.keywords) {
        const params = {
          keywords: this.keywords,
          type: 'mobile'
        }
        getSuggest(params).then((res) => {
          this.suggestList = res.result.allMatch || []
        })
      }
    },
    searchSong(keyword) {
      // console.log(suggest)
      search(keyword).then((res) => {
        this.suggestList = []
        // this.resultList = res.result.songs
        const songs = res.result.songs
        this.resultList = songs.map((item) => ({
          ...item,
          ar: item.artists,
          al: item.album
        }))
      })
    },
    hotSearch(keyword) {
      this.keywords = keyword
      this.searchSong(keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  border-bottom: 1px solid #eeeeee;

}
.suggest-list {

}
.hot-search {
  p {
    font-size: 12px;
    color: #666666;
  }
  .search-item {
    display: inline-block;
    padding: 8px 10px;
    background-color: #fff;
    border-radius: 20px;
    font-size: 14px;
    border:1px solid #eeeeee;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>
