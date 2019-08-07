<template>
  <div class="slide">
    <ul>
      <transition-group tag="ul" name="image">
        <li v-for="(img, index) in imgArray" v-show="index===mark" :key="img.id">
          <img :src="img.pictureUrl" @click="changepage(img.addressUrl)">
        </li>
      </transition-group>
      
     
    </ul>
    <div class="bar">
      <span
        v-for="(item, index) in imgArray"
        :class="{ 'active':index===mark }"
        @click="change(index)"
        :key="index"
      ></span>
    </div>
  </div>
</template>
<script>
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  data() {
    return {
      mark: 0, //比对图片索引的变量
      imgArray: [
        // require("../../../assets/oynn/timg1.jpg"),
        // require("../../../assets/oynn/timg2.jpg"),
        // require("../../../assets/oynn/timg3.jpg"),
        // require("../../../assets/oynn/timg4.jpg"),
        // require("../../../assets/oynn/timg5.jpg"),

      ]
    };
  },
  methods: {
    changepage(addressUrl){
      window.location.href = addressUrl

    },

    autoPlay() {
      this.mark++;
      if (this.mark === this.imgArray.length) {
        this.mark = 0;
      }
    },
    play() {
      this.timer = setInterval(this.autoPlay, 2500);
    },
    change(i) {
      this.mark = i;
    },
    stop() {
      clearInterval(this.timer);
    },
    move() {
      this.timer = setInterval(this.autoPlay, 2500);
    }
  },
  created() {
    var _this = this
    var content = {
        companyId: localStorage.getItem("company_id")
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        localStorage.getItem("serverPublicKey")
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/searchHomePagePicture.do";
      this.$ajax
        .post(url, headerAndBody.contentDataByKey, {
          headers: {
            appEncryptedKey: headerAndBody.appEncryptedKey, //使用服务器RSA公钥加密后的AES密钥
            appSignature: headerAndBody.appSignature, //APP使用RSA密钥对请求体的签名
            appPublicKey: headerAndBody.appPublicKey,
            serverPublicKey: headerAndBody.serverPublicKey
          }
        })
        .then(response => {
            
          var returnKey = this.RSAdecrypt(
            response.headers.serverencryptedkey,
            this.getPrivatekey()
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, this.getIV());
          // console.log("returnData....." + returnData);

          var returnData = JSON.parse(returnData);

          if (returnData.code == 1001) {
            _this.imgArray = returnData.data.homePagePictureList;
            for (let i = 0; i < _this.imgArray.length; i++) {
                var url = "http://" + this.getSERVER_HOST_MAIN() + ":" + this.getSERVER_PORT_MAIN()  
                + _this.imgArray[i].pictureUrl.replace(new RegExp(/(\\)/g), "/")
                _this.imgArray[i].pictureUrl= url
                if (_this.imgArray[i].state == 0) {
                  var addressUrl = "http://" + this.getSERVER_HOST_MAIN() + ":" + this.getSERVER_PORT_MAIN() + "/" + this.getPROJECT_MAIN() 
                  + _this.imgArray[i].addressUrl.replace(new RegExp(/(\\)/g), "/")
                  _this.imgArray[i].addressUrl= addressUrl
                }else{
                  if (_this.imgArray[i].addressUrl.search("https://") == -1 && _this.imgArray[i].addressUrl.search("http://") == -1) {
                    _this.imgArray[i].addressUrl= "http://"+_this.imgArray[i].addressUrl
                  }
                }
            }
          } else {
              alert("连接错误，请检查网络！")
            return;
          }
        });


    this.play();
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
} 
.slide {
  height: 220px;
  width: 100%;
  height: 220px;
  margin: 10px auto;
  margin-top: 0px; 
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
  height: 220px;
}
li {
  position: absolute;
}
img {
  width: 100%;
  height: 220px;
}
.bar {
  position: absolute;
  width: 100%;
  bottom: 10px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}
.bar span {
  width: 10px;
  height: 5px;
  border: 1px solid;
  background: white;
  display: inline-block;
  margin-right: 10px;
}
.active {
  background: rgb(197, 52, 52) !important;
}
.image-enter-active {
  transform: translateX(0);
  transition: all 1.5s ease;
}
.image-leave-active {
  transform: translateX(-100%);
  transition: all 1.5s ease;
}
.image-enter {
  transform: translateX(100%);
}
.image-leave {
  transform: translateX(0);
}
</style>

