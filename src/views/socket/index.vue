<template>
  <div class="page">

    <div>
      <img class="avatar" @click="giveGift(item)" v-for="item in userList" :src="item.avatarUrl" alt="" :key="item.userId">
    </div>
    <van-button @click="send">jiaru</van-button>
    {{ joinUser }}
    <!-- <van-button @click="giveGift('')"> 发送所有人火箭！！</van-button> -->

    <!-- <van-button @click="giveGift(joinUser.socketId)" v-if="joinUser.socketId"> 给{{ joinUser.nickname }}火箭</van-button> -->
  <!--使用Velocity实现动画-->
  <div class="donghuagouzi">
    <transition
      name="fade"
      @before-enter="handleVeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
    >
      <img v-if="rocketShow" ref="rocket" class="rocket" :src="rocket" alt="">

      <!-- <div v-show="show">hello World</div> -->
    </transition>
    <van-button @click="handleClick">fasne</van-button>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Notify } from 'vant'
import Velocity from 'velocity-animate'
export default {
  data() {
    return {
      show: true,
      rocketShow: false,
      rocket: require('./rocket.png'),
      userList: [],
      joinUser: {
      }
    }
  },
  mounted() {
    this.$route.query.roomId && this.joinOhterRoom()
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo
    })
  },
  sockets: {
    join(data) {
      const list = []
      data.userList.forEach(element => {
        list.push(element)
      })
      this.joinUser = data.joinUser || {}
      this.userList = list
    },
    noticeAll(data) {
      this.rocketShow = true

      Notify({ type: 'primary', message: data })
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
        list.push(element)
      })
      this.userList = list
    }
  },
  methods: {
    send() {
      this.$socket.io.opts.query = { roomId: this.user.userId, user: JSON.stringify(this.user) }
      this.$socket.connect()
      // this.$socket.emit('notice', '发送内容')
    },
    joinOhterRoom() {
      console.log('执行joinOhterRoom')
      this.$socket.io.opts.query = { roomId: this.$route.query.roomId, user: JSON.stringify(this.user) }
      this.$socket.connect()
    },

    // meiyou socketId all
    giveGift(user) {
      this.$socket.emit('giveGift', {
        toUser: user,
        fromUser: this.user
      })
    },
    handleClick() {
      this.rocketShow = true
      // this.show = !this.show
    },
    handleVeforeEnter(el) {
    },
    handleEnter(el, done) {
      Velocity(el, {
        top: -this.$refs.rocket.clientHeight
      }, {
        duration: 1000,
        complete: done
      })
    },
    handleAfterEnter() {
      this.rocketShow = false
      console.log('动画结束')
    }
  },
  destroyed() {
    console.log('destroyed')
    this.$socket.disconnect()
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}
.avatar {
  width: 50px;
  height: 50px;
}
.rocket {
  width: 50px;
  position: fixed;
  bottom: 0;
  right: 10px;
}
</style>
