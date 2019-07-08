<template>

  <div class="fieldRecord" ref="fieldRecord">
    <div style="height:5px"></div>

    <div
      v-for="item in approvalList"
      v-bind:key="item.id"
      style=" border-radius: 10px;text-align:left;background-color: #fff;color:#000;padding:10px;margin: 10px;"
      v-longtouch="item"
      
    >
    <template v-if="item.effective==0">
      <img
          src="../../../../assets/littleimg/yishixiao.png"
          style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 50px;"
        />
    </template>
    <template v-else>

      <template v-if="item.result_id==7">
        <img
          src="../../../../assets/littleimg/shenpitongguo.png"
          style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 60px;"
        />
      </template>
      <template v-else-if="item.result_id==8">
        <img
          src="../../../../assets/littleimg/butongguo.png"
          style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 60px;"
        />
      </template>
      <template v-else-if="item.result_id==5">
        <img
          src="../../../../assets/littleimg/zhengzaishenhe.png"
          style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 52px;"
        />
      </template>
    </template>
      <span style="font-size: 14px;font-weight: bold;">{{item.user_name}}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span
        style="font-size: 13px;color:#91918c;float:right"
      >{{item.type_name}}</span>
      <br />
      <span style="font-size: 14px;">{{item.remarks}}</span>
      <br />
      <span style="font-size: 13px;color:#91918c">{{item.attendance_time.substr(0, 10)}}</span>
    </div>
    <div v-if="approvalList.length==0">没有查到相关记录</div>
    <dialog-bar
      v-model="sendVal"
      type="danger"
      title="提示："
      content="撤销不可恢复，是否确定撤销？"
      v-on:cancel="clickCancel()"
      @danger="clickDanger()"
      @confirm="clickConfirm()"
      dangerText="确定"
    ></dialog-bar>
  </div>
</template>   
<script>
import { encrypt, decrypt } from "../../../js/utils.js";
import dialogBar from "../../toolsComponent/dialog";
import Vue from 'vue'
export default {
  name: "fieldRecord",
  components: { "dialog-bar": dialogBar },
  data() {
    return {
      sendVal: false ,
      userId: "",
      isAdministrator: "",
      userName: "",
      company_id: "",
      serverPublicKey: "",

      bNum: 0, //从第几条开始
      rows: 50, //查询条数
      bt: "", //开始时间
      et: "", //结束时间
      applicatUserId: "",
      approved: false,

      approvalList: [], //审批列表

      clientHeight: "", //屏幕高度
      totalHeight: "", //总的高度
      nowtime: new Date(), //时间
      timeOutEvent:0,
      selectedItem:"",
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/attendanceCard",
        query: {
          pagename: "fieldRecord"
        }
      });
    },
    openMask(item) {
      this.selectedItem = item
      this.sendVal = true;
      
    },
    clickCancel() {
      return;
    },
    clickDanger() {
       var item = this.selectedItem
      // if (item.effective == 0) {
      //   alert("该条申请已经失效！");
      //   return 
      // }
      // if (item.result_id == 7) {
      //   alert("该条申请已经审批完，无法撤回！");
      //   return
      // }
       var content = {
        userId: this.userId,
        id:item.appeal_attendance_id
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        this.serverPublicKey
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/submitRevokeAppealAttendance.do";
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
          debugger
          var returnData = JSON.parse(returnData);

          if (returnData.code == 1001) {
            location.reload()
            alert("撤销成功！")
          } else {
            alert("撤销失败，请稍后再试！")
            return;
          }
        });
    },
    clickConfirm() {
      alert("点击了confirm");
    },
    
    getDay(date, num) {
      var date2 = new Date(date);
      date2.setDate(date.getDate() + num);
      this.select_time = date2;
      this.$defines.setSelect_time(date2);
      var year = date2.getFullYear();
      var month =
        date2.getMonth() + 1 < 10
          ? "0" + (date2.getMonth() + 1)
          : date2.getMonth() + 1;
      var day = date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate();
      return year + "-" + month + "-" + day;
    },
    gotoScreening() {
      this.$router.push({
        path: "/screening",
        query: {
          pagename: "punchInDetails"
        }
      });
    },
    getListData() {
      var content = {
        userId: this.userId,
        bNum: 0, //从第几条开始
        rows: 20, //查询条数
        bt: this.getDay(this.nowtime, -30), //开始时间
        et: this.getTIME(this.nowtime, 4) //结束时间
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        this.serverPublicKey
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/searchApprovalAppealAttendanceRecord.do";
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
            this.approvalList = returnData.data.appealAttendanceInfo;
          } else if (returnData.code == 1014) {
            return;
          } else {
            return;
          }
        });
    },
    goRecordInformation(item) {
      this.$router.push({
        path: "/recordInformation",
        query: {
          pagename: "fieldRecord",
          item: item
        }
      });
    },

    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.fieldRecord.style.height = clientHeight + "px";
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // // console.log(self);
    // window.onresize = function temp() {
    //   this.clientHeight = `${document.documentElement.clientHeight}`;
    // };
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
    var that = this
    Vue.directive("longtouch", function(el, binding) {
  var oDiv = el,
      value = binding.value,
      x = 0,
      y = 0,
      z = 0,
      timer = null;
  
  oDiv.addEventListener("touchstart", function(e) {
      if (e.touches.length > 1) {
          return false;
      }
      z = 0;
      
      timer = setTimeout(function() {
          z = 1;
      if (value.effective == 0) {
        alert("该条申请已经失效！");
        return 
      }
      if (value.result_id == 7) {
        alert("该条申请已经审批完，无法撤回！");
        return
      }
          that.openMask(value)
      }, 500);
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      e.preventDefault();
  }, false);
  document.addEventListener("touchmove", function(e) {
      if (x != e.touches[0].clientX || y != e.touches[0].clientY) {
          clearTimeout(timer);
          return false;
      }
  }, false);
  document.addEventListener("touchend", function(ev) {
      if (z != 1) {
          clearTimeout(timer);
          x = 0;
          y = 0;
          return false;
      } else {
          x = 0;
          y = 0;
          z = 0;
      }
  }, false);
})
  },
  created() {
    var _this = this;
    _this.userId = localStorage.getItem("userId");
    _this.userName = localStorage.getItem("userName");
    _this.isAdministrator = localStorage.getItem("isAdministrator");
    _this.company_id = localStorage.getItem("company_id");
    _this.serverPublicKey = localStorage.getItem("serverPublicKey");

    _this.getListData();
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.totalHeight = this.$refs.fieldRecord.offsetHeight;
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style scoped>
.fieldRecord {
  width: 100%;
  background-color: rgb(240, 240, 240);
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
.approvalStatusIcon {
  float: right;
  z-index: -1;
}
</style>