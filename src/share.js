import wx from 'weixin-js-sdk'
import axios from 'axios'
export default function({ imgUrl, link, desc, title }, callback) {
  // /planet/api/weixin/getWxInfo
  const params = { url: location.href.split('#')[0] }
  axios.get('/planet/api/weixin/getWxInfo', { params }).then(res => { // 获取appid secret signature
    if (res.data.code === 0) {
      try {
        const wxData = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wxData.appId, // 必填，公众号的唯一标识
          timestamp: wxData.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
          signature: wxData.signature, // 必填，签名
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'updateTimelineShareData', 'updateAppMessageShareData', 'previewImage'] // 必填，需要使用的JS接口列表
        })
        wx.ready(function(res) {
          const shareData = {
            imgUrl: imgUrl, // 分享显示的缩略图地址
            link: link, // 分享地址
            desc: desc, // 分享描述
            title: title, // 分享标题
            success: function() {
              callback && callback()
            }
          }
          wx.onMenuShareTimeline(shareData)
          // 分享给朋友
          wx.onMenuShareAppMessage(shareData)
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
}
