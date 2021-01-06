<template>
  <div>
    socket
    <van-button @click="send">发送</van-button>
  </div>
</template>

<script>

export default {
  sockets: {
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
    }
  },
  methods: {
    send() {
      this.$socket.emit('notice', '发送内容')
    }
  }
}
</script>
