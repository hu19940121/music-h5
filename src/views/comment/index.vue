<template>
  <div class="comment">
    <van-nav-bar
      fixed
      z-index="100"
      placeholder
      :left-text="`评论（${total}）`"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <!-- <template #right v-if="isInApp">
        <svg-icon style="color:#d43c33ff;font-size:18px;" icon-class="share" @click="share"   />
      </template> -->
    </van-nav-bar>
    <div class="main">
      <div class="main-top padding-sm">
        <div @click="$router.go(-1)" class="flex align-center justify-between">
          <div class="flex align-center ">
            <img class="song-pic" :src=" getSizeImage(currentSong.al && currentSong.al.picUrl,300) " alt="">
            <div class="padding-left-xs">
              <p class="">{{ currentSong.name }}</p>
              <span class="margin-top-xs"> {{ currentSongSingers }}</span>
            </div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="main-bottom padding-sm">
        <div class="main-bottom-title padding-tb-sm flex justify-between align-center">
          <div class="title-left font-blod">
            评论区
          </div>
          <!-- <div class="title-right">
            <span class="margin-right-xs font-blod">推荐</span>
            <span class="margin-right-xs">最热</span>
            <span>最新</span>
          </div> -->
        </div>
        <div class="main-bottom-comment">
          <div>
            <p class="padding-bottom-sm">精彩评论</p>
            <div class="margin-bottom-sm" v-for="item in hotComments" :key="item.id">
              <commentItem :info="item"  />
            </div>
          </div>
          <div class="margin-top">
            <p class="padding-bottom-sm">最新评论</p>
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
                  <div class="margin-bottom-sm" v-for="item in list" :key="item.id">
                    <commentItem @showreply="handleShowReply" :info="item"/>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>

        </div>
      </div>
    </div>
    <reply :parentCommentId="currentParentCommentId" v-model="replyVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getComment } from '@/api/song'
import { getSizeImage } from '@/utils'
import commentItem from './component/comment-item'
import reply from './component/reply'

export default {
  data() {
    return {
      currentParentCommentId: null,
      replyVisible: false,
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getSizeImage,
      hotComments: []
    }
  },
  components: {
    commentItem,
    reply
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentSong: (state) => state.song.currentSong

    }),
    currentSongSingers() {
      if (this.currentSong.ar) {
        return this.currentSong.ar.map((item) => item.name).join('-')
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    onRefresh() {
      this.finished = false
      this.loading = true
      this.pageNum = 1
      this.list = []
      this.getComment()
    },
    onLoad() {
      console.log('onlaod')
      this.pageNum = this.pageNum + 1
      this.getComment()
    },
    getComment(offset) {
      this.loading = true
      getComment({ id: this.$route.query.id, offset: (this.pageNum - 1) * this.pageSize, limit: this.pageSize }).then((res) => {
        this.loading = false
        this.refreshing = false
        this.list = this.list.concat(res.comments)
        this.finished = !res.more
        this.total = res.total
        if (this.hotComments.length === 0 && res.hotComments) {
          this.hotComments = res.hotComments
        }
      })
    },
    handleShowReply(info) {
      console.log('info', info)
      this.currentParentCommentId = info.commentId
      this.replyVisible = true
    },
    share() {
      // eslint-disable-next-line no-undef
      uni.postMessage({
        data: {
          action: 'sharePlayList'
          // text: `分享歌曲：${this.currentSong.name}`,
          // href: `${location.href}?id=${this.currentSong.id}`
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.font-blod {
  font-weight: bold;
}
.main {
  .main-top {
    .song-pic {
      display: block;
      width: 60px;
      height: 60px;
      background-color: red;
    }
  }
}
</style>
