<template>
  <div class="d">
    <div class="main">
      <div class="m-uvl">
        <p class="tip f-tc">
          若您已安装了云音乐，<br />
          <span class="f-ff1">↑↑</span>请下拉并点击<span class="f-ff1">“</span>打开<span class="f-ff1">”</span>按钮<span
            class="f-ff1"
            >↑↑</span
          >
        </p>
        <p class="sub f-tc">(若无打开按钮，则 <a class="f-tdu s-fc4" href="yunmusic://">点此打开</a> )</p>
        <div class="wrap f-vhc">
          <div class="logo"></div>
          <a href="https://music.kaier001.com/yunmusic.apk" download="" class="btn f-tc">立即下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CallApp from 'callapp-lib'
export default {
  methods: {
    openapp() {
    }
  }
}
</script>

<style lang="scss" scoped>
a, a:visited {
    color: #333;
}
a {
  text-decoration: none;
}
.main {
  width: 100vw;
  height: 100vh;
  .s-fc4 {
    color: #999;
    text-decoration: underline;
  }
  .f-ff1 {
    font-family: 'simsun', '\5b8b\4f53', sans-serif;
  }
  .f-tc {
    text-align: center;
  }
  .f-vhc {
    position: absolute !important;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .m-uvl {
    width: 100%;
    height: 100%;
    background: url(//p3.music.126.net/3PJacreCq-eDuVDU4RFTQA==/18935789253812331.jpg) no-repeat 0 center;
    background-size: cover;
    .tip {
      padding-top: 16px;
      font-size: 13px;
      color: #fff;
    }
    .sub {
      padding-top: 16px;
      font-size: 12px;
      color: #999;
    }
    .wrap {
      margin-top: -40px;
    }
    .btn {
      margin-top: 40px;
      display: block;
      width: 188px;
      height: 46px;
      line-height: 46px;
      background: #311412;
      border: 1px solid #7c6a69;
      border-radius: 4px;
      color: #fff;
      font-size: 24px;
    }
    .logo {
      margin: 0 auto;
      width: 108px;
      height: 108px;
      background: url(https://resource.kaier001.com/logo.jpg) no-repeat 0 0;
      background-size: 100% auto;
    }
  }
}
</style>
