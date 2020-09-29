<template>
  <div>
    <van-nav-bar :title="$t('home.appTitle')">
      <template #left>
        <van-icon @click.native="show = !show" name="wap-nav" />
      </template>
    </van-nav-bar>
    <swipe />
    <van-tabs v-model="active">
      <van-tab :title="$t('home.recommendText')">
        <recommend />
      </van-tab>
      <van-tab :title="$t('home.hotText')">
        <hotsongs />
      </van-tab>
      <van-tab v-if="token" :title="$t('home.myPlaylistText')">
        <myPlaylist />
      </van-tab>
      <van-tab :title="$t('home.searchText')">
        <search />
      </van-tab>
    </van-tabs>
    <leftNav v-model="show" />
    <!-- <van-popup v-model="show" position="left" :style="{ width: '60%',height:'100%' }" /> -->
  </div>
</template>

<script>
import recommend from './c-views/recommend' // 推荐
import hotsongs from './c-views/hotsongs' // 热歌
import search from './c-views/search' // 搜索
import myPlaylist from './c-views/myPlaylist' // 我的歌单

import leftNav from '@/components/left-nav'
import swipe from './components/swipe'
import { mapState } from 'vuex'
export default {
  name: 'Home',

  data() {
    return {
      active: 0,
      show: false
    }
  },
  mounted() {
    console.log('home mounted')
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token
    })
  },
  components: {
    recommend,
    hotsongs,
    search,
    myPlaylist,
    leftNav,
    swipe
  }
}
</script>

<style lang="scss" scoped>
.top-banner {
  height: 84px;
  line-height: 84px;
  background-color: #d43c33ff;
  color: #fff;
  font-size: 18px;
}
</style>
