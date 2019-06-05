export default {
    init: function (){
      const AK = "2Gv5E1lFEeSiQIFhmHO1icVFj6KEtsfp";
      const apiVersion = "2.0";
      const timestamp = new Date().getTime();
      const BMap_URL = "http://api.map.baidu.com/api?v=2.0&ak=2Gv5E1lFEeSiQIFhmHO1icVFj6KEtsfp&callback=init";
      return new Promise((resolve, reject) => {
        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
  
        // 等待页面加载完毕回调
        window.onload = function () {  
           resolve(BMap)  
         } 
      });
    }
  }
  