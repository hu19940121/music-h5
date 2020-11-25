<template>
  <div @click="jumpToPlaylist(info)">
    <div class="cover">
      <div class="num">
        <img src="~assets/images/erji.svg" alt="">
        {{ info.playCount | getCount}}
      </div>
      <van-image style="width:100%;height:100%;" radius="8" fit="cover" lazy-load  :src="getSizeImage(info.picUrl || info.coverImgUrl,200)"  />
    </div>
    <p class="info two-lines">
      {{ info.name }}
    </p>
  </div>
</template>

<script>
import { getSizeImage } from '@/utils'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      getSizeImage
    }
  },
  methods: {
    jumpToPlaylist(item) {
      this.$router.push({
        path: `/playlistDetail?id=${item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  width: 122px;
  height: 122px;
  border-radius: 4px;
  position: relative;
  .num {
    position: absolute;
    z-index: 10;
    right: 4px;
    top:2px;
    font-size: 12px;
    color: #fff;
    img {
      width: 10px;
      height: 10px;
    }
  }
  img { width: 100%;height: 100%; }
}
.info {
  font-size: 12px;
  padding: 0 4px;
  @include textoverflow(2);
  @include font_color("font_color1");
}
</style>
