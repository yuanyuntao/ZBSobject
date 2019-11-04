<template>
<div id="isios">
    <button @click="getLocationNow">测试</button>
    <div id="allmap" class="allmap" style=" width: 20px;height: 20px;"></div>
</div>   

</template>
<script>
import { MP,AMP,location } from "../js/Map.js";
import { wxUtils,getLocation } from "../js/wxUntil.js";

export default {
  name: "iosTest",
  components: {},
  data() {
    return {
     
    };
  },
  mounted() {
    // wxUtils
      let url =
    "http://" +
    this.getSERVER_HOST_MAIN() + ":" +
    this.getSERVER_PORT_MAIN() + "/" +
    this.getPROJECT_MAIN() + "/user/jssdkConfig.do"//获取jssdk前端配置信息
           wxUtils(url,this)
  },
  created: function() {
  },

  methods: {
    getweizhi(){
      //getCurrentPosition与定时器setInterval类似多次请求，因为位置需要不间断的获取
      //直接navigator.geolocation表示单次获取位置
      navigator.geolocation.getCurrentPosition(function (position) {
        debugger
        let a= "经度" + position.coords.longitude;
        let b= "纬度" + position.coords.latitude;
        // box.innerHTML += "准确度" + position.coords.accuracy;
        // box.innerHTML += "海拔" + position.coords.altitude;
        // box.innerHTML += "海拔准确度" + position.coords.altitudeAcuracy;
        // box.innerHTML += "行进方向" + position.coords.heading;
        // box.innerHTML += "地面速度" + position.coords.speed;
        // box.innerHTML += "请求的时间" + new Date(position.timestamp);
      }, function (err) {
        debugger
        alert(err.code);
// code：返回获取位置的状态
//          0  :  不包括其他错误编号中的错误
// ​		     1  :  用户拒绝浏览器获取位置信息
// ​		     2  :  尝试获取用户信息，但失败了
// ​		     3  :   设置了timeout值，获取位置超时了
      }, {
          enableHighAcuracy: false, //位置是否精确获取
          timeout: 5000,            //获取位置允许的最长时间
          maximumAge: 1000          //多久更新获取一次位置
        })
    },
      test(){

          const u = navigator.userAgent;
			const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isiOS) {
                alert("ios")
			} else {
                alert("andriod")
                 this.getLocation()
			}
      },
       /**gaode获取地图定位*/
       getLocationNow() {
           debugger
         
          getLocation()
           
      // var _this = this;
      // if (typeof AMap != "undefined") {
      //   AMP().then(AMap => {
      //     debugger
      //     _this.qwe();
      //     return;
      //   });
      //   _this.qwe();
      // } else {
      //   AMP().then(AMap => {
      //       debugger
      //       alert("haha")
      //     _this.qwe();
      //   });
      // }
    },
     qwe(){
         debugger
        let that = this
        var map = new AMap.Map('allmap', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function() {
            debugger
            var geolocation = new AMap.Geolocation({
                
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                debugger
                if(status=='complete'){
                  debugger
                    that.onComplete(result)
                }else{
                    that.onError(result)
                }
            });
        });
      },
      
      //解析定位结果
      onComplete(data) {
          // document.getElementById('status').innerHTML='定位成功'
          var str = [];
          str.push('定位结果：' + data.position);
          str.push('定位类别：' + data.location_type);
          if(data.accuracy){
              str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
          console.log(str)
          alert('定位成功'+str)
          // document.getElementById('result').innerHTML = str.join('<br>');
      },
      //解析定位错误信息
      onError(data) {
        console.log('定位失败')
        console.log(data.message)
        alert('定位失败'+data.message)
          // document.getElementById('status').innerHTML='定位失败'
          // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
      },

  },
     
}

</script>
<style scoped>
</style>

