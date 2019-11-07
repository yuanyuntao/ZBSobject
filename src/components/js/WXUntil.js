import wx from 'weixin-js-sdk';//加载微信jssdk


export function wxUtils(url,that) {
  return new Promise((resolve, reject) => {
    // var url =
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
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  alert(JSON.stringify(res));
                  var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  var speed = res.speed; // 速度，以米/每秒计
                  var accuracy = res.accuracy; // 位置精度
                  alert("lat:"+latitude+";lng:"+longitude);
                  var bdLogAndLat = gcj02tobd09(longitude,latitude);//火星坐标转换成百度坐标
                  alert(JSON.stringify(bdLogAndLat));
                  localStorage.setItem("latitude",bdLogAndLat[0]);
                  localStorage.setItem("longitude",bdLogAndLat[1]);
                  alert("经度"+localStorage.setItem("latitude"))

                }
              }).catch(error => {

                reject();
          
                console.log(error+"------jssdk获取位子报错");
          
              });;
            
            });
       
        })
        .catch(error => {

          reject();
    
          console.log(error+"------jssdk配置报错");
    
        });
        
  })
}
/**
 * Created by Wandergis on 2015/7/8.
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
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
