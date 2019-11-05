import wx from 'weixin-js-sdk'//加载微信jssdk

export function wxUtils(url,that) {
  return new Promise((resolve, reject) => {
    // let url =
    // "http://" +
    // that.getSERVER_HOST_MAIN() + ":" +
    // that.getSERVER_PORT_MAIN() + "/" +
    // that.getPROJECT_MAIN() + "/user/jssdkConfig.do"//获取jssdk前端配置信息
    alert(location.href.split('#')[0]);
    var urls = location.href.split('#')[0];
    that.$http
        .get(url, {
          url:location.href.split('#')[0] //向服务端提供授权url参数，并且不需要#后面的部分
       },{
        emulateJSON:true
    })
        .then(res => {
          debugger
          alert(JSON.stringify(res));
          alert(res.data.appId+"--"+res.data.timestamp+"--"+res.data.nonceStr+"--"+res.data.signature)
            //初始化微信前端配置
         　wx.config({
        　　　　debug: false, // 开启调试模式,
        　　　　appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        　　　　timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        　　　　nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        　　　　signature: res.data.signature,// 必填，签名，见附录1
        　　　　jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        　　});
            wx.ready(function(){
              wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  alert(JSON.stringify(res));
                  var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  var speed = res.speed; // 速度，以米/每秒计
                  var accuracy = res.accuracy; // 位置精度
                }
              });
            
            });
       
        })
        .catch(error => {

          reject();
    
          console.log(error+"------jssdk配置报错");
    
        });
        
  })
}
 
// 获取地理位置
// const getLocation = () => {
//   return new Promise((resolve, reject) => {
//     debugger
//     wx.getLocation({
//       type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//       success: res => {
//         resolve(res);
//         debugger
//         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//         var speed = res.speed; // 速度，以米/每秒计
//         var accuracy = res.accuracy; // 位置精度
// alert(JSON.stringify(res));
//       },
//       fail: err => {
//         reject(err);
//       }
//     });
//   });
// };
// export { getLocation, WXinvoke };
// export default wxUtils;
