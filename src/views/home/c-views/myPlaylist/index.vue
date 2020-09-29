<template>
  <div class="list flex flex-wrap padding-top-sm">
    <div  v-for="(gedan,index) in gedanList" :key="gedan.id" :class="(index + 1) % 3 === 0 ? 'list-item ' : 'list-item margin-right-xxs'">
      <playlistItem :info="gedan" />
    </div>
  </div>
</template>

<script>
import { getPlaylist } from '@/api/user'
import playlistItem from '../../components/playlist-item'
export default {

  data() {
    return {
      gedanList: []
    }
  },
  mounted() {
    this.getPlaylist()
  },
  components: {
    playlistItem
  },
  methods: {
    getPlaylist() {
      getPlaylist({ uid: this.userId }).then((res) => {
        this.gedanList = res.playlist
        // console.log('gggg', res)
      })
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .margin-right-xxs {
    margin-right: 2px;
  }
  .list-item {
    width: 122px;
    margin-bottom: 10px;
    /* margin-right: 4px; */

  }
}
</style>
