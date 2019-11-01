<template>
  <div class="visitorRegistration" ref="visitorRegistration">
    <template v-if="!ifShow">
     子曰：有朋自远方来，不亦乐乎！
      </template>
        <template v-else>
          <template v-if="isResquest">
      <div
        type="primary"
        round
        style=" display: flex;width: 100%;border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div style="width: 30%;">
          <span style="font-size: 18px;font-weight: bold;">公司名称:</span>
        </div>

        <div class="startTime">
          <input
            type="text"
            v-model="companyName"
            style="text-align:right;border: 0;outline: none;-webkit-appearance: none;height:20px;width: 93%;padding-right:5px"
          />
        </div>
      </div>
      <div
        type="primary"
        round
        style=" display: flex;width: 100%;border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div style="width: 30%;">
          <span style="font-size: 18px;font-weight: bold;">姓名:</span>
        </div>

        <div class="startTime">
          <input
            type="text"
            v-model="userName"
            style="text-align:right;border: 0;outline: none;-webkit-appearance: none;height:20px;width: 93%;padding-right:5px"
          />
        </div>
      </div>
      <div
        type="primary"
        round
        style=" display: flex;width: 100%;border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div style="width: 30%;">
          <span style="font-size: 18px;font-weight: bold;">职务:</span>
        </div>

        <div class="startTime">
          <input
            type="text"
            v-model="opsition"
            style="text-align:right;border: 0;outline: none;-webkit-appearance: none;height:20px;width: 93%;padding-right:5px"
          />
        </div>
      </div>
      <div
        type="primary"
        round
        style=" display: flex;width: 100%;border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div style="width: 30%;">
          <span style="font-size: 18px;font-weight: bold;">电话:</span>
        </div>

        <div class="startTime">
          <input
            type="text"
            v-model="phoneNumber"
            style="text-align:right;border: 0;outline: none;-webkit-appearance: none;height:20px;width: 93%;padding-right:5px"
          />
        </div>
      </div>

      <div style="padding:10px">
        <button class="sure" @click="sure" type="primary" round>提交申请</button>
      </div>
    </template>
    <template v-else>申请提交成功，请耐心等待审核！</template>
          </template>


    
  </div>
</template>
<script>
import { encrypt, decrypt } from "../../js/utils.js";
import Vue from "vue";
export default {
  name: "visitorRegistration",
  data() {
    return {
      userId: "",
      userName: "", //姓名
      companyName: "", //公司
      opsition: "", //职位
      openId: "",
      phoneNumber: "", //电话
      imgs: "",
      isResquest: true,
      ifShow:false
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      return;
    },

    sure() {
      if (this.userName == "") {
        alert("请输入姓名！");
        return;
      }
      if (this.companyName == "") {
        alert("请输入公司名称！");
        return;
      }
      if (this.opsition == "") {
        alert("请输入职位！");
        return;
      }
      if (this.phoneNumber == "") {
        alert("电话号码不能为空！");
        return;
      }
      debugger
      var _this = this;
      var content = {
        user_name: this.userName, //姓名
        company: this.companyName, //公司
        position: this.opsition, //职位
        open_id: this.openId,
        phone: this.phoneNumber //电话
      };

      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        localStorage.getItem("serverPublicKey")
      );
      let geturl =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/addVisitorInfo.do";
      // this.getPROJECT_MAIN() + "/user/login.do?content=" +
      // encodeURIComponent(contentData);
      this.$ajax
        .post(geturl, headerAndBody.contentDataByKey, {
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
            this.appPrivateKey
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, this.getIV());
          // console.log("returnData....." + returnData);

          var returnData = JSON.parse(returnData);
          debugger;
          if (returnData.code == 1001) {
            _this.isResquest = false;
             
              localStorage.setItem(
                "userId",
                returnData.data.visitorInfo.user_id
              );
              localStorage.setItem(
                "userName",
                returnData.data.visitorInfo.user_name
              );
              localStorage.setItem(
                "company_id",
                returnData.data.visitorInfo.company_id
              );
              localStorage.setItem("serverPublicKey", this.serverPublicKey);
              localStorage.setItem(
                "department",
                returnData.data.visitorInfo.department
              );
              this.$router.push("/visitorsPage");
            
          } else {
            alert("申请失败，请稍后重试！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  created: function() {
    var _this = this;
    _this.appPrivateKey = this.getPrivatekey();
     _this.getServerPublicKey().then(function(response) {
        localStorage.setItem("serverPublicKey", response);
      });

    if (typeof this.$route.query.code == "undefined") {
     

      let url = "www.zhongbenshuo.com/visitor";
      // let url = "nnpqz2.natappfree.cc/static";

      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbd38640dfe24b6d5&redirect_uri=http%3A%2F%2F" +
        url +
        "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    } else {
      var content = {
        code: this.$route.query.code,
        type: "visitor"//staff
      };

      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        localStorage.getItem("serverPublicKey")
      );
      let geturl =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/access_token.do";
      // this.getPROJECT_MAIN() + "/user/login.do?content=" +
      // encodeURIComponent(contentData);
      this.$ajax
        .post(geturl, headerAndBody.contentDataByKey, {
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
            this.appPrivateKey
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, this.getIV());
          // console.log("returnData....." + returnData);

          var returnData = JSON.parse(returnData);
          if (returnData.code == 1001) {
            debugger
            if (returnData.data.visitorInfo.length > 0) {
             
              localStorage.setItem(
                "userId",
                returnData.data.visitorInfo[0].user_id
              );
              localStorage.setItem(
                "userName",
                returnData.data.visitorInfo[0].user_name
              );
              localStorage.setItem(
                "company_id",
                returnData.data.visitorInfo[0].company_id
              );
              localStorage.setItem(
                "department",
                returnData.data.visitorInfo[0].position
              );
              localStorage.setItem(
                "url",
                returnData.data.visitorInfo[0].url
              );
              this.$router.push("/visitorsPage");
            } else {
              _this.openId = returnData.data.openId;
              _this.ifShow = true
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.visitorRegistration {
  width: 100%;
  height: 100%;
  /* background-color: rgb(240, 240, 240);
  background-size: 100% 100%;
  background-attachment: fixed; */
  /* padding:10px; */
}
.startTime {
  float: right;
  border-radius: 5px;
  text-align: right;
  height: 25px;
  width: 50%;
  border: 1px solid rgb(83, 83, 83);
  font-size: 18px;
}
.endTime {
  border-radius: 5px;
  text-align: left;
  height: 23px;
  width: 200px;
  border: 1px solid rgb(83, 83, 83);
  font-size: 18px;
}
.inputTime {
  height: 23px;
  width: 55px;
  font-size: 18px;
  text-align: right;
  padding-right: 5px;
}
.leaveReasons {
  height: 50px;
  width: 100%;
  font-size: 15px;
  border: 0;
}
.sure {
  width: 55%;
  font-size: 28px;
  border-radius: 10px;
  background-color: #149760; /* 标准的语法 */
  filter: brightness(1.4);
}
.showApproveAndCC {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
.head_image {
  margin: 5px;
  width: 35px;
  height: 35px;
  background-color: #4debd0;
  border-radius: 50%;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.arrow {
  margin-top: 20px;
  width: 20px;
  height: 20px;
}
.attendance {
  padding-top: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10px;
  align-items: center;
  /* margin-top: 10px; */
  display: flex;
  text-align: center;
}
.pendingTrial {
  padding: 5px;
  /* margin-left: 10px; */
  border: 1px solid #fff;
  width: 100px;
  font-size: 18px;
  color: #eee;
  font-weight: bold;
  border-radius: 20px;
  background-color: rgb(58, 190, 98);
}
.examined {
  padding: 5px;
  /* margin-left: 10px; */
  border: 1px solid rgb(58, 190, 98);
  width: 100px;
  font-size: 18px;
  color: rgb(58, 190, 98);
  font-weight: bold;
  border-radius: 20px;
  background-color: #eee;
}
.photos {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
</style>