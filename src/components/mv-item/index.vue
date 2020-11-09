<template>
  <div class="mv-item flex align-center">
    <div class="left">
      <p>{{ info.name }} - {{ info.artistName }} </p>
      <span class="count">{{ info.playCount }}次播放</span>
    </div>
    <div class="right">
      <van-image class="img" :src="info.cover"  />
    </div>

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
    linkToMvDetail() {
      this.$router.push({
        path: '/mvDetail',
        query: {
          id: this.info.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.count {
  font-size: 12px;
  color: #999;
}
.mv-item {
  .left {
    width: 210px;
  }
  .right {
    width: 120px;
    .img {
      width: 100%;
    }
  }
}
</style>
