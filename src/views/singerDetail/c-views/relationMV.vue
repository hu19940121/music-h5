<template>
  <div>
    <div class="list padding-xs ">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
          :immediate-check="false"
        >
          <div class="van-clearfix">
            <div @click="linkToMvDetail(item)" class="list-item margin-bottom-xs flex " v-for="item in list" :key="item.id">
              <div class="left">
                <van-image class="img" fit="cover" :src="item.imgurl" />
              </div>
              <div class="right margin-left-xs">
                <p class="song-name padding-top-xs">
                  {{ item.name }}
                </p>
                <p class="singer-name">
                  {{ item.artistName }}
                </p>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

    </div>
  </div>
</template>

<script>
import { getArtistMv } from '@/api/singer'

export default {
  data() {
    return {
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.getArtistMv()
  },
  methods: {
    linkToMvDetail(info) {
      this.$router.push(`/mvDetail?id=${info.id}`)
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.pageNum = 1
      this.list = []
      this.getArtistMv()
    },
    onLoad() {
      console.log('onlaod')
      this.pageNum = this.pageNum + 1
      this.getArtistMv()
    },
    getArtistMv(offset) {
      this.loading = true
      getArtistMv({ id: this.$route.query.id, offset: (this.pageNum - 1) * this.pageSize, limit: this.pageSize }).then((res) => {
        this.loading = false
        this.refreshing = false
        this.list = this.list.concat(res.mvs)
        this.finished = !res.hasMore
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .list-item {
    .left {
      width: 94px;
      height: 60px;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      .song-name{
        font-size: 16px;
        @include textoverflow(1)
      }
      .singer-name {
        font-size: 14px;
        color: #666;
      }
      width: 100%;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
