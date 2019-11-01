// export function MP(ak) {
//     console.log("进入百度计算地址方法");
//      debugger
//     try {
//         return new Promise(function (resolve, reject) {
//             debugger
//             var script = document.createElement("script");
//             script.type = "text/javascript";
//             script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
//             script.onerror = reject;
//             document.head.appendChild(script);
//              //vue页面跳转的时候不执行onload方法
//             if(typeof BMap !='undefined'){
//                 console.log("BMap !='undefined'");
//                 resolve(BMap);
//                }else{
//                 console.log("BMap =='undefined'");

//                 window.onload = function () {
//                     console.log("BMap ='undefined'");
//                      resolve(BMap)
//                  }
//               }
//         })
//     } catch (error) {
//         console.log("计算错误："+error);
//     }
export function MP(ak) {
     try {
          return new Promise(function (resolve, reject) {
               window.init = function () {
                    resolve(BMap)
               }
               var script = document.createElement("script");
               script.type = "text/javascript";
               script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
               script.onerror = reject;
               document.head.appendChild(script);
          })
     } catch (error) {
          console.log("计算错误：" + error);
          alert("定位失败！")
     }

}

export function AMP() {
     try {
          return new Promise(function (resolve, reject) {
               debugger
               window.init = function () {
                    resolve(AMap)
               }
               var script = document.createElement("script");
               script.type = "text/javascript";
               script.src = "http://webapi.amap.com/maps?v=1.3key=6a137705ea5dfc20c7c5b573765d72ae&plugin=AMap.Geocoder";
               script.onerror = reject;
               document.head.appendChild(script);
          })
     } catch (error) {
          console.log("计算错误：" + error);
          alert("定位失败！")
     }

}

export const location =  {  
     initMap(id){    
          let mapObj = new AMap.Map(id, {})    
          let geolocation;    
          mapObj.plugin(['AMap.Geolocation'], 
          function () {        
               geolocation = new AMap.Geolocation({        
                    enableHighAccuracy: true, //  是否使用高精度定位，默认:true        
                    timeout: 10000, //  超过10秒后停止定位，默认：无穷大        
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0        
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true        
                    showButton: true, //  显示定位按钮，默认：true        
                    buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角        
                    buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)        
                    showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true        
                    showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true        
                    panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true        
                    zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false      
               })      
               mapObj.addControl(geolocation)      
               geolocation.getCurrentPosition()    
          })    
          return geolocation;  
     }}
