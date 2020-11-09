<template>
  <div>
    <div class="list">
      <songItem isHotSongs :songInfo="songInfo" :key="songInfo.id" :order="index + 1"  v-for="(songInfo,index) in list"/>
    </div>
  </div>
</template>

<script>
import songItem from '@/components/song-item'
import { getArtistTopSongs } from '@/api/singer'
export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    songItem
  },
  mounted() {
    this.getArtistTopSongs()
  },
  methods: {
    getArtistTopSongs() {
      getArtistTopSongs({ id: this.$route.query.id }).then((res) => {
        this.list = res.songs || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
