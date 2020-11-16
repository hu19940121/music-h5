<template>
  <div>
    <van-popup round  position="bottom" v-model="show">
      <div class="content padding-sm">
        <div class="header">
          <h4>
            回复({{ totalCount }})
          </h4>
          <p>
            {{ ownerComment.content }}
          </p>
        </div>
        <div class="all margin-tb-xs">
          <h4>全部回复</h4>
          <div class="margin-bottom-sm" v-for="item in comments" :key="item.id">
            <commentItem :info="item"  />
          </div>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import { getCommentFloor } from '@/api/song'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    parentCommentId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      comments: [],
      ownerComment: {},
      totalCount: 0,
      show: this.value
    }
  },
  components: {
    commentItem
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        console.log('newValue', newValue)
        this.show = newValue
      }
    },
    parentCommentId(value) {
      console.log('parentCommentId', value)
      this.getCommentFloor()
    },
    show(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    getCommentFloor() {
      const params = {
        parentCommentId: this.parentCommentId,
        id: this.$route.query.id,
        type: 0
      }
      getCommentFloor(params).then((res) => {
        this.ownerComment = res.data.ownerComment
        this.comments = res.data.comments
        this.totalCount = res.data.totalCount
        console.log('楼层评论', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 50px;
}
</style>
