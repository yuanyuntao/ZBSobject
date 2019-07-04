


<template>
  <div class="rules">
    <!-- <div style="padding-top:10px;font-weight: bold;color:#fff;font-size: 25px;letter-spacing:5px"><span >考勤规则</span></div> -->
    <div style="height:1px"></div>
    <!-- <div v-for="item in ruledata" v-bind:key="item.id" type="primary" round style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;" > -->

    <div
      v-for="item in ruledata"
      v-bind:key="item.id"
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;"
    >
      <span style="font-size: 16px;font-weight: bold;">{{item.rule_name}}</span>
      <br>
      <span style="font-size: 16px;font-weight: bold;">{{item.rule_time}}</span>
      <br>
      <span style="font-size: 13px;color:#91918c">{{item.rule_range}}</span>
    </div>
  </div>
</template>






<script>
import Divtool from "../toolsComponent/Divtool.vue";
import { encrypt, decrypt } from "../../js/utils.js";

export default {
  name: "rulespage",
  components: {
    Divtool
  },
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      company_id: "",
      appPrivateKey: "",
      serverPublicKey: "",
      ruledata: []
    };
  },

  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/signpage",
        query: {
          pagename: "outsignpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          company_id: this.company_id,
          serverPublicKey: this.serverPublicKey
        }
      });
    },
    creatData(_this) {
      var content = {
        manager: this.isAdministrator ? 1 : 0,
        companyId: this.company_id
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        _this.serverPublicKey
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/searchAttendanceRules.do";

      _this.$ajax
        .post(url, headerAndBody.contentDataByKey, {
          headers: {
            appEncryptedKey: headerAndBody.appEncryptedKey, //使用服务器RSA公钥加密后的AES密钥
            appSignature: headerAndBody.appSignature, //APP使用RSA密钥对请求体的签名
            appPublicKey: headerAndBody.appPublicKey,
            serverPublicKey: headerAndBody.serverPublicKey
          }
        })
        .then(function(response) {
          var returnKey = _this.RSAdecrypt(
            response.headers.serverencryptedkey,
            _this.appPrivateKey
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, _this.getIV());
          var returnData = JSON.parse(returnData);

          var total = returnData.data.attendanceRule;
          for (let i = 0; i < total.length; i++) {
            _this.ruledata.push({
              rule_name: total[i].rule_name,
              rule_address: total[i].rule_address,
              rule_time:
                total[i].rule_time_work + "-" + total[i].rule_time_off_work,
              rule_range:
                total[i].rule_address +
                "半径" +
                parseFloat(total[i].rule_radius).toFixed(0) +
                "米"
            });
          }
        });
    }
  },
  created: function() {
    var _this = this;
    // _this.userId = this.$defines.userId;
    // _this.userName = this.$defines.userName;
    // _this.isAdministrator = this.$defines.isAdministrator;
    // _this.company_id = this.$defines.companyId;
    // _this.serverPublicKey = this.$defines.serverPublicKey;
    _this.userId = localStorage.getItem("userId");
    _this.userName = localStorage.getItem("userName");
    _this.isAdministrator = localStorage.getItem("isAdministrator");
    _this.company_id = localStorage.getItem("company_id");
    _this.serverPublicKey = localStorage.getItem("serverPublicKey");

    _this.appPrivateKey = this.getPrivatekey();
    _this.creatData(_this);
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
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.totalHeight = this.$refs.outsignpage.offsetHeight;
      debugger
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>

<style scoped>
.rules {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/bigimg/bg_attendance.jpeg");
  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
}
</style>
