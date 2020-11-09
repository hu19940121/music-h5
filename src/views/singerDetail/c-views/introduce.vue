<template>
  <div>
    <p class="padding-sm" v-html="singerInfo.briefDesc"></p>
  </div>
</template>

<script>
import { getArtistDetail } from '@/api/singer'

export default {
  data() {
    return {
      singerInfo: {}
    }
  },
  mounted() {
    this.getArtistDetail()
  },
  methods: {
    getArtistDetail() {
      getArtistDetail({ id: this.$route.query.id }).then((res) => {
        this.singerInfo = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
