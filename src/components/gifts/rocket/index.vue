<template>
  <div>
    <div class="donghuagouzi">
      <transition
        name="fade"
        @before-enter="handleVeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
      >
        <img v-if="show" ref="rocket" class="rocket" :src="rocket" alt="">

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
      rocket: require('./rocket.png'),
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
        top: -this.$refs.rocket.clientHeight
      }, {
        duration: 1000,
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
.rocket {
  width: 50px;
  position: fixed;
  bottom: 0;
  right: 10px;
}
</style>
