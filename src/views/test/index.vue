<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  created() {

  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.loadScript('https://lib.baomitu.com/zepto/1.2.0/zepto.min.js')
      console.log('wanle', window)
    },
    loadScript(url) {
      return new Promise((resolve, reject) => {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.onload = function() {
          resolve()
        }
        document.head.appendChild(script)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
