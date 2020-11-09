<template>
  <div class="page">
    <van-nav-bar
      fixed
      placeholder
      title="分类列表"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-cell-group class="margin-top-sm" v-for="(cateItem,index)  in cateList " :key="index">
      <van-cell :title="item.name" is-link  v-for="(item,indey) in cateItem.list" :key="indey" :to="`/singerList?type=${item.type}&area=${ item.area }`"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [
        {
          cateName: '华语',
          list: [
            { name: '华语男歌手', area: 7, type: 1 },
            { name: '华语女歌手', area: 7, type: 2 },
            { name: '华语组合/乐队', area: 7, type: 3 }
          ]
        },
        {
          cateName: '欧美',
          list: [
            { name: '欧美男歌手', area: 96, type: 1 },
            { name: '欧美女歌手', area: 96, type: 2 },
            { name: '欧美组合/乐队', area: 96, type: 3 }
          ]
        },
        {
          cateName: '日本',
          list: [
            { name: '日本男歌手', area: 8, type: 1 },
            { name: '日本女歌手', area: 8, type: 2 },
            { name: '日本组合/乐队', area: 8, type: 3 }
          ]
        },
        {
          cateName: '韩国',
          list: [

            { name: '韩国男歌手', area: 16, type: 1 },
            { name: '韩国女歌手', area: 16, type: 2 },
            { name: '韩国组合/乐队', area: 16, type: 3 }
          ]
        },
        {
          cateName: '其他',
          list: [

            { name: '其他男歌手', area: 0, type: 1 },
            { name: '其他女歌手', area: 0, type: 2 },
            { name: '其他组合/乐队', area: 0, type: 3 }
          ]
        }

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #eee;
}
</style>
