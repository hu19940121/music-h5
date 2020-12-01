<template>
  <div class="playlist">
    <van-nav-bar
      ref="navBar"
      z-index="100"
      fixed
      placeholder
      title="歌单广场"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div :style="{height: tabsOffsetTop + 'px'}">
      <div class="tabs-container flex justify-between align-center" :style="{top: tabsOffsetTop + 'px'}">
        <div class="left">
          <van-tabs v-model="active" @change="handleChange">
            <van-tab name="全部" :title="active"></van-tab>
            <van-tab name="华语" title="华语"></van-tab>
            <van-tab name="流行" title="流行"></van-tab>
            <van-tab name="清晨" title="清晨"></van-tab>
            <van-tab name="怀旧" title="怀旧"></van-tab>
            <van-tab name="综艺" title="综艺"></van-tab>
          </van-tabs>
        </div>
        <div class="right">
          <svg-icon class="icon" icon-class="siye" @click="more"   />
        </div>
      </div>
    </div>

    <div class="padding-top-xs" >
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  ref="listContainer">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
          :immediate-check="false"
        >
          <div class="van-clearfix">
            <div class="list flex flex-wrap">
              <div v-for="(gedan,index) in list" :key="gedan.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
                <playlistItem :info="gedan" />
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup :close-on-click-overlay="false" v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        z-index="101"
        fixed
        placeholder
        title="歌单标签"
        left-text="返回"
        left-arrow
        @click-left="show =false"
      >
      </van-nav-bar>
      <div class="cate-list padding-top-sm" v-for="(cate,index) in cateList" :key="index">
        <p class="cate-list-name padding-left-xs">
          {{ cate.cateName }}
        </p>
        <div class="cate-list-box flex flex-wrap">
          <div @click="chooseTag(tag)" class="cate-item" v-for=" tag in cate.list" :key="tag.id">{{ tag.name }}</div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { getPlaylist, getPlaylistCatlist } from '@/api/playlist'
import playlistItem from '@/components/playlist-item'
const initPageSize = 21
const initPageNum = 1
export default {
  data() {
    return {
      cateList: [],
      show: false,
      tabsOffsetTop: 0,

      active: '全部',
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      pageNum: initPageNum,
      pageSize: initPageSize
    }
  },
  components: {
    playlistItem
  },
  mounted() {
    this.tabsOffsetTop = this.$refs.navBar.height
    console.log('tabsOffsetTop', this.tabsOffsetTop)
    this.getPlaylist()
  },
  methods: {
    initParams() {
      this.pageSize = initPageSize
      this.pageNum = initPageNum
      this.list = []
    },
    onLoad() {
      console.log('onlaod')
      this.pageNum = this.pageNum + 1
      this.getPlaylist()
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.pageNum = 1
      this.list = []
      this.getPlaylist()
    },
    handleChange() {
      this.initParams()
      this.getPlaylist()
    },
    getPlaylist() {
      const params = {
        cat: this.active,
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize
      }
      this.loading = true
      getPlaylist(params).then((res) => {
        this.loading = false
        this.refreshing = false
        this.list = this.list.concat(res.playlists)
        this.finished = !res.more
        console.log(res)
      })
    },
    hanleData(categories, subs) {
      const finalList = []
      Object.keys(categories).forEach((key) => {
        finalList.push({
          cateName: categories[key],
          list: subs.filter((sub) => sub.category === ~~key)
        })
      })
      return finalList
    },
    getPlaylistCatlist() {
      getPlaylistCatlist().then((res) => {
        const { categories, sub } = res
        this.cateList = this.hanleData(categories, sub)
      })
    },
    chooseTag(tag) {
      console.log('chooseTag')
      this.show = false
      this.active = tag.name
      this.initParams()
      this.getPlaylist()
    },
    more() {
      this.show = true
      this.getPlaylistCatlist()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .margin-right-xxs {
    margin-right: 4px;
  }
  .list-item {
    width: 122px;
    margin-bottom: 10px;
  }
}
.tabs-container {
  width: 100%;
  position: fixed;
  z-index: 999;
  background-color: #fff;
  .icon {
    font-size: 22px;
  }
  .left {
    width: 90%;
  }
  .right {
    width: 10%;
    text-align: center;
  }
}
.cate-list {
  .cate-list-box {
    .cate-item {
      width: 25%;
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
