<template>
  <div class="feedback">
    <van-nav-bar
      :title="'反馈'"
      :left-text="$t('navigation.goBackText')"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="margin-top padding-lr">
      <van-field v-model="author"  placeholder="输入您的昵称" style="background: #eee;"/>
      <van-field
        style="background: #eee;margin-top: 10px;"
        v-model="message"
        rows="4"
        autosize
        label="留言"
        type="textarea"
        maxlength="100"
        placeholder="请写下您的建议："
        show-word-limit
      />
      <van-button :loading="loading" @click="submit" class="margin-top" type="primary" block>提交</van-button>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      message: '',
      author: ''
    }
  },
  methods: {
    submit() {
      if (!this.message || !this.author) {
        Toast('内容和昵称必填')
        return
      }
      const data = {
        content: this.message,
        author: this.author
      }
      this.loading = true
      axios.post('/api/v2/feedback/add', data).then(() => {
        this.loading = false
        Toast('您的反馈已收到！谢谢')
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      }).catch((err) => {
        this.loading = false
        Toast(err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* .feedback {
  width: 100vh;
  height: 100vh;
  background-color:#eee;
} */
</style>
