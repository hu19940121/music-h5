<template>
  <div class="singer flex flex-direction align-center" @click="linkToSingerDetail(info)">
    <van-image
      class="vanimage"
      round
      fit="cover"
      :src="getSizeImage(info.img1v1Url)"
    />
    <p class="margin-top-xs">{{ info.name }}</p>
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
    linkToSingerDetail(info) {
      this.$router.push({
        path: '/singerDetail',
        query: {
          banner: info.picUrl,
          name: info.name,
          id: info.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  width: 100px;
  .vanimage {
    width: 100px;
    height: 100px;
  }
}
</style>
