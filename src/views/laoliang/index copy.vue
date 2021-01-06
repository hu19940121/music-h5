<template>
  <div >
    <p v-for="(item, index) in list" :key="index">
      <a  :href="item.url" > {{item.name}} </a>
   </p>
  </div>

</template>

<script>
import { laoliangList } from '@/api/laoliang'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getLaoliang()
  },
  methods: {
    getLaoliang() {
      laoliangList().then(res => {
        this.list = res.data
        // console.log('res', res.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
