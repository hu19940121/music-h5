<template>
  <div>
     <van-nav-bar
      z-index="100"
      ref="vanNavBar"
      fixed
      placeholder
      title="歌手列表"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-index-bar :sticky-offset-top="stickyOffsetTop" highlight-color="#d43c33ff">
      <div v-for="(letterItem, index) in handledList" :key="index">
        <van-index-anchor :index="letterItem.letter" />
        <van-cell :title="singer.name"  v-for="(singer) in letterItem.singerList" :key="singer.id" :to="`/singerDetail?id=${singer.id}&banner=${ singer.picUrl }&name=${ singer.name }`">
            <template #title>
              <div class="flex align-center">
                <van-image lazy-load round class="avatar" :src="getSizeImage(singer.picUrl)" fit="cover" />
                <span class="custom-title padding-left-xs">{{ singer.name }}</span>
              </div>
          </template>
        </van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getArtists } from '@/api/singer'
import { getSizeImage } from '@/utils'

// eslint-disable-next-line no-unused-vars
import cnchar from 'cnchar'
const letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export default {
  data() {
    return {
      stickyOffsetTop: 0,
      getSizeImage,
      singerList: [],
      handledList: [
        {
          letter: 'A',
          singerList: [
            {
            }

          ]
        }
      ]
    }
  },
  mounted() {
    this.stickyOffsetTop = this.$refs.vanNavBar.height
    this.getArtists()
  },
  methods: {
    getArtists() {
      const { type, area } = this.$route.query
      getArtists({ type, area, limit: 100 }).then(res => {
        this.singerList = res.artists || []
        const tempList = [] // 临时数组
        letterList.map(letter => {
          const tempObj = {
            letter: letter,
            singerList: this.singerList.filter(singer => singer.name.spell('array', 'first', 'up')[0] === letter)
          }
          tempList.push(tempObj)
        })
        this.handledList = tempList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 30px;
  height: 30px;
}
</style>
