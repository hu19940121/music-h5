<template>
  <div @click="jumpToPlaylist(info)">
    <div class="cover">
      <div class="num">
        <img src="~assets/images/erji.svg" alt="">
        {{ info.playCount | getCount}}
      </div>
      <van-image style="width:100%;height:100%;"  :src="info.picUrl || info.coverImgUrl"  />
      <!-- <img :src="gedan.picUrl" alt=""> -->
    </div>
    <p class="info two-lines">
      {{ info.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    jumpToPlaylist(item) {
      this.$router.push({
        path: `/playlist?id=${item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  width: 122px;
  height: 122px;
  position: relative;
  .num {
    position: absolute;
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
  @include textoverflow(2)
}
</style>
