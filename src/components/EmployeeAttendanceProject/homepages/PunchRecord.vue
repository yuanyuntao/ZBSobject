<template>
  <div class="punchRecord" ref="punchRecord">
    <div style="height:20px"></div>
    
    <div class="top">
      <div type="primary" round class="dateSelect" @click="dayBefore">
        <img class="arrowIcon" src="../../../assets/littleimg/left.png" alt />
        <p>前一天</p>
      </div>
      <div type="primary" round class="selectedData" @click="showDatePicker(6, 3)">{{selectTime}}</div>
      <div type="primary" round class="dateSelect" @click="dayAfter">
        <p style="margin-left:10px">后一天</p>
        <img class="arrowIcon" src="../../../assets/littleimg/right.png" alt />
      </div>
    </div>
    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;display:flex;"
    >
      <div>
        <span class="words">考勤记录</span>
      </div>
      <div style>
        <div
          v-for="i in cardRecord"
          :key="i.id"
          style="margin-left:40px;padding:5px;border-bottom: 1px solid rgb(240, 240, 240);"
        >
          {{i.attendance_type==1?"签到":"签退"}}：{{(i.attendance_time).substr(11,5)}} &ensp; {{i.result}}
          <div class="cardRecord"></div>
        </div>
      </div>
    </div>
   
    
    
   
  </div>
</template>
<script>
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  name: "punchRecord",
  components: {},
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      company_id: "",
      serverPublicKey: "",
      cardRecord: [], //考勤记录
      select_time: "",
      clientHeight: "", //屏幕高度
      totalHeight: "", //总的高度
      selectTime: "",
      nowtime: new Date(), //现在时间
      address: "", //打卡地点
      defaultparam: 1, //默认选择签到类型
      attendanceType: 0, //打卡类型
      outReasons: "", //外出事由
      canIn: true, //是否可以签到
      canOut: true, //是否可以签到
      choseListApprove: [], //审批人
      sheetListsApprove: [], //审批人选择列表
      imgs: [], //上传的图片列表
      fileData: []
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$defines.setSelect_time(new Date());
      this.$router.push({
        path: "/signpage",
        query: {
          pagename: "punchRecord"
        }
      });
    },

    dayBefore() {
      this.selectTime = this.getDay(this.select_time, -1);
      this.getRecordData(this);
    },
    dayAfter() {
      this.selectTime = this.getDay(this.select_time, 1);
      this.getRecordData(this);
    },
    dayNow(){
      this.getRecordData(this);

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
      return year + "年" + month + "月" + day + "日";
    },
    getRecordData(_this) {
      var selectedTime = _this.selectTime
        .replace("年", "-")
        .replace("月", "-")
        .replace("日", "");
      var content = {
        userId: localStorage.getItem("userId"),
        companyId: localStorage.getItem("company_id"),
        startTime: selectedTime, //开始时间
        endTime: selectedTime //结束时间
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
        "/user/searchAttendanceRecord.do";
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
          var returnData = JSON.parse(returnData);
          if (returnData.code == 1001) {
            this.cardRecord = returnData.data.attendanceRecord;
          } else if (returnData.code == 1014) {
            alert("网络有问题！");
            return;
          } else {
            alert("网络有问题！");
            return;
          }
        });
    },
   
    showDatePicker(demo, type) {
      var _this = this;
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      this.time = this.showChinese
        ? [y + "年", m + "月", d + "日", h + "时", min + "分"]
        : [y * 1, m * 1, d * 1, h * 1, min * 1];
      var dataObj = {};
      if (demo === 6) {
        this.minTime = [2019, 1, 1, 0, 0];
      }
      if (demo === 7) {
        if (!this.resetTime[0]) return alert("请先选择开始时间！");
        var resetTime = [];
        if (this.showChinese) {
          this.resetTime.forEach((item, index) => {
            resetTime.push(item.substr(0, item.length - 1) * 1);
          });
        }
        this.time = this.resetTime;
        this.minTime = this.showChinese ? resetTime : this.resetTime;
        this.getCurTime(this.minTime);
      }
      dataObj = {
        type: type,
        min: this.minTime,
        max: this.maxTime,
        showChinese: this.showChinese
      };

      let init = JSON.parse(JSON.stringify(this.time));
      dataObj.value = init;
      this.$datepicker(dataObj)
        .then(e => {
          var y = e[0];
          var m = e[1] < 10 ? "0" + e[1] : e[1];
          var d = e[2] < 10 ? "0" + e[2] : e[2];
          var h = e[3];
          var mm = e[4];
          if (demo === 6) {
            this.resetTime = e;
            this.selectTime = dataObj.showChinese
              ? y + m + d
              : y + "年" + m + "月" + d + "日";
            var a = y + "-" + m + "-" + d;
            this.select_time = new Date(a);
            _this.dayNow()
            this.$defines.setSelect_time(select_time);
            this.endTime = "";
          } else if (demo === 7) {
            this.endTime = dataObj.showChinese
              ? y + m + d + h + mm
              : y + "年" + m + "月" + d + "日 " + h + "时" + mm + "分";
          }
          
        })
        .catch(e => {
          // console.log(e)
        });
    },
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.punchRecord.style.height = clientHeight + "px";
    }
  },
  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.nowtime = new Date(); //修改数据date
    }, 1000);
    this.clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
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
      this.totalHeight = this.$refs.punchRecord.offsetHeight;
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  },
  created: function() {
    var _this = this;
    
    if (this.$defines.select_time == "") {
      this.$defines.setSelect_time(new Date());
    }
    _this.select_time = this.$defines.select_time;
    _this.selectTime = this.getTIME(_this.select_time, 8);
    // _this.selectTime = this.getTIME(_this.nowtime, 8);
    _this.getRecordData(_this);
  }
};
</script>

<style scoped>
.punchRecord {
  width: 100%;
  height: 100%;
  background-color: #e3e9e7;
  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
}
.outReasons {
  height: 50px;
  width: 100%;
  font-size: 15px;
  /* padding: 10px; */
  border: 0;
}
.sure {
  width: 55%;
  font-size: 28px;
  border-radius: 10px;
  background-color: #37b897; /* 标准的语法 */
  filter: brightness(1.4);
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
.showApproveAndCC {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
.photos {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
.arrowIcon {
  margin: 2px 0;
  width: 25px;
  height: 25px;
}
.words {
  font-size: 18px;
  font-weight: bold;
}
.dateSelect {
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  padding: 10px 0;
  margin: 10px 5px;
  display: flex;
  width: 25%;
}
.selectedData {
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  padding: 10px 0;
  margin: 10px 0;
  letter-spacing: 0px;
  width: 45%;
}
.top {
  padding-top: 10px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  text-align: center;
}
.arrow {
  margin-top: 20px;
  width: 20px;
  height: 20px;
}
.lookRecords {
  font-size: 18px;
  border-radius: 15px;
  background-color: rgb(18, 31, 214);
  padding: 10px;
  margin-left: 10px;
  display: flex;
  width: 100px;
  color: antiquewhite;
  /* float: right; */
}
.iconRecord {
  width: 25px;
  height: 25px;
}
</style>