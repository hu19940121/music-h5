<template>
  <div class="home">
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
    <router-link to="/feedback">
      <div class="feedback">
        <svg-icon  className="icon" icon-class="feedback"   />
      </div>
    </router-link>

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
    this.$share({
      title: `网易云vip音乐随意听！`,
      desc: '想一想你的美丽我的平凡，一次次默默走开',
      imgUrl: 'https://resource.kaier001.com/music.jpeg',
      link: `${location.origin}/#/`
    }, () => {
    })
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
.home {
  /deep/.van-tab--active {
    @include font_color("font_color1");
  }
  /deep/.van-tab {
    @include background_color("background_color1");
  }
  /deep/.van-nav-bar {
    @include background_color('background_color1');
  }
  /deep/.van-nav-bar__title {
    @include font_color('font_color1');
  }
  /deep/[class*=van-hairline]::after {
    border:none;
  }
  .top-banner {
    height: 84px;
    line-height: 84px;
    background-color: #d43c33ff;
    color: #fff;
    font-size: 18px;
  }
  .feedback {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    border: 1px solid #eee;
    position: fixed;
    bottom: 80px;
    right: 20px;
    background-color: #fff;
  }
}

</style>
