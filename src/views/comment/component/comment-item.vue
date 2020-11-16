<template>
  <div class="comment">
    <div class="comment-author flex justify-between align-center">
      <div class="comment-author-left flex align-center">
        <van-image
          class="avatar"
          lazy-load
          round
          :src="info.user.avatarUrl"
        />
        <!-- <img class="left-avatar" src="" alt=""> -->
        <div class="left-info padding-left-xs">
          <span>{{ info.user.nickname }}</span>
          <p class="left-time">
            {{ info.time | formatDate( 'yyyy-MM-dd hh:mm:ss')}}
          </p>
        </div>
      </div>
      <div class="comment-author-right flex align-center">
        <span class="margin-right-xs">{{ info.likedCount }}</span>
        <van-icon name="good-job-o" />
      </div>
    </div>
    <div class="comment-content padding-top-xs">
      <p>{{ info.content }}</p>
      <!-- <div class="comment-huifu flex align-center" v-show="info.beReplied.length > 0" @click="emit(info)">
        {{ info.beReplied.length }}条回复 <van-icon name="arrow" />
      </div> -->
    </div>
    <van-divider />
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
    emit(info) {
      console.log('emit')
      this.$emit('showreply', info)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .comment-author {
    .comment-author-left {
      .avatar {
        width: 40px;
        height: 40px;
      }
      .left-info {
        font-size: 12px;
        .left-time{

          color: #E2E3E4;
        }

      }
      /* .left-avatar {
        width: 40px;
        height: 40px;
      } */
    }
  }
  .comment-content {
    /* text-indent: 2em; */
    padding-left: 50px;
    color: #666;
  }
  .comment-huifu {
    color: #97B8C8;
    font-size: 12px;
  }
}
</style>
