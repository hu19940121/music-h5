<template>
  <div class="padding-top-sm">
    <div class="list flex flex-wrap">
      <div  v-for="(album,index) in albumList" :key="album.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
        <playlistItem @click.native="linkToAlbumDetail(album)" :info="album" />
      </div>
    </div>
  </div>
</template>

<script>
import playlistItem from '@/components/playlist-item'
import { getArtistAlbum } from '@/api/singer'

export default {
  data() {
    return {
      albumList: []
    }
  },
  mounted() {
    this.getArtistAlbum()
  },
  components: {
    playlistItem
  },
  methods: {
    linkToAlbumDetail(album) {
      this.$router.push(`/albumDetail?id=${album.id}`)
    },
    getArtistAlbum() {
      getArtistAlbum({ id: this.$route.query.id }).then(res => {
        console.log('res', res)
        this.albumList = res.hotAlbums
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.padding-xxs {

}
.list-item {
  margin-bottom: 10px;
  width: 122px;
}
.margin-right-xxs {
  margin-right: 4px;
}
</style>
