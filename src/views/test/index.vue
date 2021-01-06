<template>
    <div>
      <van-loading  color="#1989fa" v-show="!played" type="spinner">
        资源加载中
      </van-loading>
      <section v-show="played" :style="containerStyle">
        <div class="view" :style="viewStyle">
          <canvas class="view__canvas" ref="canvas"></canvas>
          <div class="view__mask">
            <p class="zhufu padding text-center">
              嗨起来！！
            </p>
          </div>
        </div>
      </section>
    </div>

</template>

<script>
import Player from 'silent-film-player'
const SOURCE = {
  water: {
    width: 726,
    height: 1280,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.mp4',
      ts: 'https://resource.kaier001.com/yuandanvd.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.jpeg'
    }
  },
  petal: {
    width: 1920,
    height: 1080,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.mp4',
      ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.jpeg'
    }
  },
  'silent-voice': {
    width: 1920,
    height: 1080,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.mp4',
      ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.jpeg'
    }
  },
  firefly: {
    width: 1920,
    height: 1080,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.mp4',
      ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.jpeg'
    }
  },
  fireworks: {
    width: 1920,
    height: 1080,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.mp4',
      ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.jpeg'
    }
  },
  '3-lion': {
    width: 1280,
    height: 720,
    sources: {
      mp4: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.mp4',
      ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.ts',
      poster: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.jpeg'
    }
  }
}
export default {
  data() {
    return {
      played: false,
      container: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      url: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.ts'
    }
  },

  mounted() {
    document.title = '嗨起来'

    const {
      $refs: { canvas }
    } = this
    // https://resource.kaier001.com/longzhuout.ts
    // ./yuandanvd.ts
    window.player = new Player('./longzhuout.ts', {
      canvas,
      loop: true,
      autoplay: true,
      disableWebAssembly: true,
      // 分片大小
      chunkSize: 1 * 1024 * 1024,
      videoBufferSize: 512 * 1024,
      onPlay: () => {
        this.played = true
        console.log('onPlay')
      }
    })
  },
  computed: {
    source() {
      return SOURCE['water']
    },
    viewStyle() {
      const { container, source } = this
      const ratio = container.height / source.height
      const width = (source.width * ratio) | 0
      return {
        top: '0px',
        left: `${-(width - container.width) / 2}px`,
        width: `${width}px`,
        height: `${container.height}px`
      }
    },
    containerStyle() {
      return {
        width: `${this.container.width}px`,
        height: `${this.container.height}px`
      }
    }
  }
}
</script>
<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
html,
body {
    width: 100%;
    height: 100%;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-family: -apple-system;
}
.container {
    position: relative;
    overflow: hidden;
    width: 360px;
    height: 640px;
    &--mobile {
        width: 100%;
        height: 100%;
    }
}
.view {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    background: #000;
    &__bg {
        height: 100%;
    }
    &__video,
    &__canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        &.mix-blend {
             mix-blend-mode: screen;
        }
    }
    &__mask {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        /* display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; */
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: #fff;
    }
}
</style>
