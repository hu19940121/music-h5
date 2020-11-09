<template>
  <div class="mvDetail" :key="key">
    <van-nav-bar
      ref="vanNavBar"
      fixed
      placeholder
      title="mv详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <video controls class="video" :poster="info.cover" :src="mvUrl">
    </video>
    <div class="info padding-sm">
      <h4>{{ info.name }} - {{ info.artistName }}</h4>
      <span class="count">{{ info.playCount }}次播放</span>
    </div>
    <div class="line"></div>
    <div class="padding-sm">
      <h4 class="margin-bottom-xs">相关推荐</h4>
      <div class="recommend-list">
        <div class="margin-bottom-xs" v-for="item in simiMvList" :key="item.id">
          <router-link :to="`/mvDetail?id=${ item.id }`">
            <mvItem :info="item" />
          </router-link>
          <van-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mvItem from '@/components/mv-item'
import { getMvDetail, getMvUrl, getSimiMv } from '@/api/singer'
export default {
  data() {
    return {
      key: '',
      info: {},
      mvUrl: '',
      simiMvList: []
    }
  },
  components: {
    mvItem
  },
  mounted() {
    this.initData()
  },
  watch: {
    '$route.query': function(val) {
      this.initData()
    }
  },
  methods: {
    initData() {
      this.getMvDetail()
      this.getSimiMv()
    },
    getMvDetail() {
      const id = this.$route.query.id
      getMvDetail({ mvid: id }).then(async res => {
        this.info = res.data
        const { data } = await getMvUrl({ id })
        this.mvUrl = data.url
      })
    },
    getSimiMv() {
      getSimiMv({ mvid: this.$route.query.id }).then(async res => {
        this.simiMvList = res.mvs
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.count {
  font-size: 12px;
  color:#999 ;
}
.line {
  height: 16px;
  width: 100%;
  background-color: #eee;
}
.mvDetail {
  .video {
    width: 100%;
    height: 220px;
  }
}

</style>
