<template>
  <div class="if">
    <van-button @click="jump" v-show="show" type="primary" round class="dian">点我</van-button>
    <div class="layer">
      <iframe  class="ifarme"   frameborder="0" :style="`width:${container.width}px;height:${container.height}px;`" src="http://music.kaier001.com/zhufu/index.html"></iframe>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      container: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  },
  mounted() {
    document.title = '元旦快乐！！！'
    setTimeout(() => {
      this.show = true
    }, 10000)
  },
  methods: {
    jump() {
      console.log('sfsdf')
      this.$router.push('/shipin')
    }
  }
}
</script>

<style lang="scss" scoped>

.dian {
  position: fixed;
  bottom: 80px;
  right: 10px;
  z-index: 999999;
}
.layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.ifarme {

}
</style>
