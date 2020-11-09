<template>
  <div class="singer-detail">
    <van-nav-bar
      ref="vanNavBar"
      fixed
      placeholder
      title="歌手详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="banner-wrapper" ref="bannerWrapper">
      <div
        :style="`background: -webkit-linear-gradient(top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${getSizeImage($route.query.banner,300)}) center center/cover no-repeat;`"
        class="banner"
      >
      <p class="padding">{{ $route.query.name }}</p>
      </div>
    </div>
    <van-tabs v-model="active" sticky :offset-top="offsetTop">
      <van-tab title="热门作品">
        <hot />
      </van-tab>
      <van-tab title="所有专辑">
        <all />
      </van-tab>
      <van-tab title="相关mv">
        <relationMV />
      </van-tab>
      <van-tab title="艺人介绍">
        <introduce />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSizeImage } from '@/utils'
import {
  all,
  hot,
  introduce,
  relationMV
} from './c-views'
export default {
  data() {
    return {
      getSizeImage,
      offsetTop: 0,
      active: 0,
      singerInfo: {}
    }
  },
  components: {
    all,
    hot,
    introduce,
    relationMV
  },
  mounted() {
    this.offsetTop = this.$refs.vanNavBar.height + this.$refs.bannerWrapper.offsetHeight - 2
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  .banner-wrapper {
    position: relative;
    width: 100%;
    min-height: 240px;
    z-index: 1;
    .banner {
      font-weight: 700;
      font-size: 30px;
      color: rgba(255,255,255,0.8);
      position: fixed;
      top: 44px;
      width: 100%;
      min-height: 240px;
    }
  }

}
</style>
