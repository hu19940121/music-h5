<template>
  <div>
    <div class="donghuagouzi">
      <transition
        name="fade"
        @before-enter="handleVeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
      >
        <img v-if="show" ref="rocket" class="pig" :src="img" alt="">

        <!-- <div v-show="show">hello World</div> -->
      </transition>
      <!-- <van-button @click="handleClick">fasne</van-button> -->
    </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      img: require('./pig.png'),
      show: this.value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.show = newValue
      }
    },
    show(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    handleVeforeEnter(el) {
    },
    handleEnter(el, done) {
      Velocity(el, {
        translateX: ['-50%', '-50%'],
        translateY: ['-50%', '-50%'],

        width: '50%'

        // top: -this.$refs.rocket.clientHeight
      }, {
        // easing: 'easeInSine',
        duration: 2000,
        complete: done
      })
    },
    handleAfterEnter() {
      this.show = false
      console.log('动画结束')
    }
  }
}
</script>

<style lang="scss" scoped>
.pig {
  display: block;
  width: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  position: fixed;
}
</style>
