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
