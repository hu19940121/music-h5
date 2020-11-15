<template>
  <div class="home">
    <van-nav-bar ref="navBar" fixed z-index="100" placeholder :title="$t('home.appTitle')">
      <template #left>
        <van-icon @click.native="show = !show" name="wap-nav" />
      </template>
    </van-nav-bar>
    <swipe />
    <van-tabs v-model="active" sticky :offset-top="tabsOffsetTop">
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
    <div class="feedback" @click="linkToFeedback">
      <svg-icon  className="icon" icon-class="feedback"   />
    </div>
    <footer class="m-homeft" v-if="!isInApp">
      <div class="ftwrap">
        <div class="logo flex align-center justify-center">
           <img class="img" src="./logo.png" alt="">
           <span class="text padding-left-sm">云音乐</span>
        </div>
        <div class="openapp" @click="linkToDownload">
          打开APP，发现更多好音乐 >
        </div>
        <p class="copyright">
          kaier版权所有©2020 673822024
        </p>
      </div>
    </footer>
    <van-overlay z-index="10001" :show="showDownLoadTip" @click="showDownLoadTip = false">
      <div class="content" @click.stop>
        <div class="padding-right padding-top-sm" style="text-align:right;">
            <p>链接打不开？</p>
            <p>请点击右上角···</p>
            <p>选择在<span class="red">“浏览器”</span>中打开</p>
        </div>
      </div>
    </van-overlay>

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
      showDownLoadTip: false,
      tabsOffsetTop: 0,
      active: 0,
      show: false
    }
  },
  // metaInfo: {
  //   title: '云音乐(破解，vip，网易云)',
  //   meta: [
  //     { name: 'Keywords', content: '免费，破解，vip免费，网易云音乐，音乐，播放器，网易，下载，播放，DJ，免费，明星，精选，歌单，识别音乐，收藏，分享音乐，音乐互动，高音质，320K，音乐社交，官网，music.kaier001.com' },
  //     { name: 'description', content: '云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活。' }
  //   ]
  // },
  mounted() {
    window.scanCallback = function(data) {
      console.log('扫码结果---------' + JSON.stringify(data))
    }
    console.log('window.scanCallback', window.scanCallback)
    this.tabsOffsetTop = this.$refs.navBar.height
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
      token: (state) => state.user.token,
      isInApp: (state) => state.app.isInApp
    })
  },
  methods: {
    onClickRight() {
      // eslint-disable-next-line no-undef
      uni.postMessage({
        data: {
          action: 'scan'
        }
      })
    },
    linkToDownload() {
      var ua = navigator.userAgent.toLowerCase()
      // eslint-disable-next-line eqeqeq
      if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == 'qq') {
        this.showDownLoadTip = true
      } else {
        this.$router.push('/download')
      }
    },
    linkToFeedback() {
      console.log('跳转到feedback')
      this.$router.push({
        path: '/feedback'
      })
    }

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
  .red {
    color: red;
  }
  .content {
    width: 90%;
    height: 100px;
    background-color: #fff;
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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
  .m-homeft{
    position: relative;
    padding-top: 53.3%;
    margin-top: 4px;
    background: url(//s3.music.126.net/mobile-new/img/recommand_bg_2x.png?d045faf…=) no-repeat;
    background-size: contain;
    .ftwrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      text-align: center;
    }
    .logo {
      padding-top: 16.9%;
      .text {
        font-size: 28px;
        color: #d33a31;
      }
    }
    .img {
      width: 55px;
      height: 55px;
    }
    .openapp {
      line-height: 38px;
      border: 1px solid #d33a31;
      border-radius: 38px;
      font-size: 16px;
      color: #d33a31;
      margin: 15px 37px 5px;
    }
    .copyright {
      color: #888;
      font-size: 12px;
      line-height: 16px;
      -webkit-transform: scale(.75);
      -ms-transform: scale(.75);
      transform: scale(.75);
    }
  }
}

</style>
