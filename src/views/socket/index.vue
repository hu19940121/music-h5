<template>
  <div>

    <div>
      <img class="avatar" v-for="item in userList" :src="item.avatarUrl" alt="" :key="item.userId">
    </div>
    <van-button @click="send">jiaru</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      userList: []
    }
  },
  mounted() {

  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo
    })
  },
  sockets: {
    online(data) {
      const list = []
      data.userList.forEach(element => {
        list.push(JSON.parse(element))
      })
      this.userList = list
    },
    connect() {
      console.log('连接成功！')
    },
    disconnect() {
      console.log('断开连接')
    },
    reconnect() {
      console.log('重新连接')
    },
    // 监听、接受消息方法
    notice(data) {
      console.log('notice推送的消息', data)
    },
    leave(data) {
      const list = []
      data.userList.forEach(element => {
        list.push(JSON.parse(element))
      })
      this.userList = list
    }
  },
  methods: {
    send() {
      this.$socket.io.opts.query = { roomId: this.user.userId, user: JSON.stringify(this.user) }
      this.$socket.connect()
      // this.$socket.emit('notice', '发送内容')
    }
  },
  destroyed() {
    console.log('destroyed')
    this.$socket.disconnect()
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
