<template>
  <div class="visitorsPage" ref="visitorsPage">
    <div class="footer_guide">
      <tabbarvisit class="tool"></tabbarvisit>
    </div>
    <div class="attendance">
      <div class="pendingTrial" ref="pendingTrial" type="primary" round @click="pendingTrial">
        <span style="vertical-align:middle">新增</span>
      </div>
      <div class="examined" ref="examined" type="primary" round @click="examined">
        <span style="vertical-align:middle">记录</span>
      </div>
    </div>
    <template v-if="isNew">
      <div
        type="primary"
        round
        style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div style=" width: 60%;text-align: left">
          <span style="font-size: 18px;font-weight: bold;">来访时间</span>
        </div>

        <div style=" margin: 10px;display: flex;">
          <span style="font-size: 16px;">开始时间：</span>
          <div class="startTime" @click="showDatePicker(6, 5)">{{startTime}}</div>
        </div>
        <div style=" margin: 10px;display: flex;">
          <span style="font-size: 16px;">结束时间：</span>
          <div class="endTime" @click="showDatePicker(7, 5)">{{endTime}}</div>
        </div>
      </div>

      <div
        type="primary"
        round
        style="border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div>
          <span style="font-size: 18px;font-weight: bold;">来访事由</span>
        </div>
        <div style="padding-top:10px">
          <textarea type="text" class="leaveReasons" placeholder="请输入来访事由" v-model="theme"></textarea>
        </div>
      </div>
      <div
        type="primary"
        round
        style="border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div>
          <span style="font-size: 18px;font-weight: bold;">来访人数</span>
          <input
            type="number"
            v-model="visitorsNumber"
            style="float: right; width: 50px;height: 25px;margin-right:20px;text-align:right"
          />
        </div>
      </div>

      <div
        type="primary"
        round
        style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
      >
        <div>
          <span style="font-size: 18px;font-weight: bold;">来访对象</span>
          <img
            class="imge"
            style="float: right; width: 28px;height: 28px;padding-right:20px"
            src="../../../assets/littleimg/jiahao.png"
            alt
            @click="selectCC"
          />
        </div>
        <div class="showApproveAndCC" v-show="choseListCC.length > 0">
          <div v-for="item in choseListCC" :key="item.id" style="display:flex;padding-right:15px">
            <div>
              <div class="head_image" v-text="item.userName.substr(item.userName.length-1, 1)"></div>
              <p v-text="item.userName" style="font-size: 12px;margin:5px"></p>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:10px">
        <button class="sure" @click="sure" type="primary" round>提交申请</button>
      </div>
    </template>

    <template v-else>
      <div style=" margin-bottom:100px;">
      <div
        class="approvalList"
        v-for="item in approvalList"
        v-bind:key="item.id"
        
        @touchstart="touchin(item)"
        @touchmove="touchmove()"
        @touchend="cleartime(item)"
      >
        <template v-if="item.effective==0">
          <img
            src="../../../assets/littleimg/yishixiao.png"
            style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 50px;"
          />
          </template>
        <!-- 
        <template v-else>
          <template v-if="item.result_id==7">
            <img
              src="../../../assets/littleimg/shenpitongguo.png"
              style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 60px;"
            />
          </template>
          <template v-else-if="item.result_id==8">
            <img
              src="../../../assets/littleimg/butongguo.png"
              style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 60px;"
            />
          </template>
          <template v-else-if="item.result_id==5">
            <img
              src="../../../assets/littleimg/zhengzaishenhe.png"
              style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 52px;"
            />
          </template>
        </template> -->
        <span style="font-size: 14px;font-weight: bold;">{{item.startDate.substr(0, 10)}} 约见{{item.userInfo_name}}</span>
        <br />
        <!-- <span style="font-size: 13px;color:#91918c;">关于 {{item.theme}}</span>
        <br /> -->
        <span style="font-size: 14px;">从{{item.startTime}} 到 {{item.endTime}} 关于 {{item.theme}} 的主题</span>
        <br />
        <span style="font-size: 13px;color:#91918c">{{item.createTime.substr(0, 16)}}</span>
      </div>
      <div v-if="approvalList.length==0">没有查到相关记录</div>
      </div>
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
    </template>
  </div>
</template>
<script>
import Tabbarvisit from "../tabbars/Tabbarvisit.vue";
import { encrypt, decrypt } from "../../js/utils.js";
import dialogBar from "../toolsComponent/dialog";
export default {
  name: "visitorsPage",
  components: {
    Tabbarvisit,
    "dialog-bar": dialogBar
  },
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      //新增
      isNew: true,
      sendVal: false,
      clientHeight: "", //屏幕高度
      totalHeight: "", //总的高度
      nowtime: new Date(), //现在时间                display: flex;
      travelAddress: "", //打卡地点

      leaveReasons: "", //外出事由

      choseListCC: [], //抄送人
      sheetListsCC: [], //抄送人选择列表
      defaultType: 1, //默认休假类型
      startDate: "", //开始日期
      endDate: "", //结束日期

      startTime: "", //开始时间
      endTime: "", //结束时间
      canUseTime: 0, //可调休时间
      time: [2018, 1, 1, 0, 0],
      minTime: [2018, 1, 1, 0, 0],
      maxTime: [],
      showChinese: false,
      resetTime: [],
      type: null,

      leaveDays: "", //请假天数
      leaveHours: "", //请假小时数

      imgs: [], //上传的图片列表
      fileData: [],

      options: [],
      Loop: 0,

      visitorsNumber: "", //来访人数
      userInfo_id: "", //来访对象id
      theme: "" ,//来访事由
      approvalList:[]
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      // this.$defines.setTravelRequestImges([]);
      // this.$defines.setTravelRequestFileData([]);
      // this.$router.push({
      //   path: "/application",
      //   query: {
      //     pagename: "travelRequestpage"
      //   }
      // });
      return;
    },
    touchin(item) {
      var that = this;
      this.Loop = setTimeout(function() {
        that.Loop = 0;
        //执行长按要执行的内容，如弹出菜单
        if (item.effective == 0) {
          alert("该条申请已经失效！");
          return;
        }
        if (item.result_id == 7) {
          alert("该条申请已经审批完，无法撤回！");
          return;
        }
        that.openMask(item);
      }, 500);
      return false;
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    touchmove() {
      clearTimeout(this.Loop); //清除定时器
      this.Loop = 0;
    },
    cleartime(item) {
      var that = this;
      clearTimeout(this.Loop);
      if (that.Loop != 0) {
        that.goLeaveRequestInformation(item);
      }
      return false;
    },
    openMask(item) {
      this.selectedItem = item;
      this.sendVal = true;
    },
    clickCancel() {
      return;
    },
    clickDanger() {
      var _this = this
      var item = this.selectedItem;
      // if (item.effective == 0) {
      //   alert("该条申请已经失效！");
      //   return
      // }
      // if (item.result_id == 7) {
      //   alert("该条申请已经审批完，无法撤回！");
      //   return
      // }
      var content = {
        id: item.id
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
        "/user/deleteVisitorSubscribe.do";
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
          var returnKey = _this.RSAdecrypt(
            response.headers.serverencryptedkey,
            _this.getPrivatekey()
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, this.getIV());
          // console.log("returnData....." + returnData);
          var returnData = JSON.parse(returnData);

          if (returnData.code == 1001) {
            alert("撤销成功！");
            localStorage.setItem("visitorsRequestApproved",true)
            _this.examined();
          } else {
            alert("撤销失败，请稍后再试！");
            return;
          }
        });
    },
    clickConfirm() {
      alert("点击了confirm");
    },

    //新增
    pendingTrial() {
      if (localStorage.getItem("visitorsRequestApproved") == "true") {
        return;
      } else {
        this.$refs.pendingTrial.style.background = "rgb(58, 190, 98)";
        this.$refs.pendingTrial.style.color = "#eee";
        this.$refs.pendingTrial.style.border = "1px solid #fff";

        this.$refs.examined.style.background = "#eee";
        this.$refs.examined.style.color = "rgb(58, 190, 98)";
        this.$refs.examined.style.border = "1px solid rgb(58, 190, 98)";
        localStorage.setItem("visitorsRequestApproved", true);
        this.isNew = true;
        this.getListData();
      }
    },
    examined() {
      if (localStorage.getItem("visitorsRequestApproved") == "false") {
        return;
      } else {
        this.$refs.examined.style.background = "rgb(58, 190, 98)";
        this.$refs.examined.style.color = "#eee";
        this.$refs.examined.style.border = "1px solid #fff";

        this.$refs.pendingTrial.style.background = "#eee";
        this.$refs.pendingTrial.style.color = "rgb(58, 190, 98)";
        this.$refs.pendingTrial.style.border = "1px solid rgb(58, 190, 98)";
        localStorage.setItem("visitorsRequestApproved", false);
        this.isNew = false;
        this.getListData();
      }
    },
    getListData() {
      if (!this.isNew) {
        var _this = this;
        var content = {
          userId: _this.userId,
        };
        var contentData = JSON.stringify(content);
        var headerAndBody = _this.getHeaderAndBody(
          contentData,
           localStorage.getItem("serverPublicKey")
        );
        let urls =
          "http://" +
          _this.getSERVER_HOST_MAIN() +
          ":" +
          _this.getSERVER_PORT_MAIN() +
          "/" +
          _this.getPROJECT_MAIN() +
          "/user/searchVisitorSubscribe.do";
        _this.$ajax
          .post(urls, headerAndBody.contentDataByKey, {
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
              _this.getPrivatekey()
            );
            let returnResponseData = response.data;
            let encrypt = returnResponseData.replace(/[\r\n]/g, "");
            var returnData = decrypt(encrypt, returnKey, _this.getIV());
            var returnData = JSON.parse(returnData);
            if (returnData.code != 1001) {
              alert("连接错误，请检查网络！");
              return;
            }
            _this.approvalList = returnData.data.visitorSubscribeList;
          });
      }
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
    getRecordListData() {},

    // 获取当前时间
    getCurTime(minTime) {
      var date;
      if (minTime) {
        var newMinTime = [];
        minTime.forEach((item, ind) => {
          if (ind < 3) {
            newMinTime.push(item);
          }
        });
        date = new Date(newMinTime.join("/"));
      } else {
        date = new Date();
      }

      var dafultTiemEnd = new Date(date);
      dafultTiemEnd.setDate(date.getDate() + 30);
      var y1 = dafultTiemEnd.getFullYear() + 1;
      var m1 = this.dealTimeFormat(dafultTiemEnd.getMonth() + 1);
      var d1 = this.dealTimeFormat(dafultTiemEnd.getDate());
      var h1 = date.getHours();
      var min1 = date.getMinutes();
      this.maxTime = [y1 * 1, m1 * 1, d1 * 1, h1 * 1, min1 * 1];
    },
    dealTimeFormat(data) {
      return data > 9 ? data : "0" + data;
    },
    showDatePicker(demo, type) {
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
        // if (!this.resetTime[0]) return alert("请先选择开始时间！");
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
          var m = e[1] > 9 ? e[1] : "0" + e[1];
          var d = e[2] > 9 ? e[2] : "0" + e[2];
          var h = e[3] > 9 ? e[3] : "0" + e[3];
          var mm = e[4] > 9 ? e[4] : "0" + e[4];
          if (demo === 6) {
            this.resetTime = e;
            this.startTime = dataObj.showChinese
              ? y + m + d + h + mm
              : y + "-" + m + "-" + d + " " + h + ":" + mm;
            this.endTime = "";
          } else if (demo === 7) {
            this.endTime = dataObj.showChinese
              ? y + m + d + h + mm
              : y + "-" + m + "-" + d + " " + h + ":" + mm;
          }
        })
        .catch(e => {
          // console.log(e)
        });
    },

    selectCC: function() {
      //点击跳转对应的页面
      this.$router.push({
        path: "/selectCCpage",
        query: {
          pagename: "visitorsPage",
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,

          leaveReasons: this.theme, //来访事由
          defaultType: this.visitorsNumber, //来访人数
          startTime: this.startTime, //开始时间
          endTime: this.endTime //结束时间
        }
      });
    },
    getAttendanceRecord() {
      if (this.choseListCC.length > 0) {
        this.userInfo_id = this.choseListCC[0].userId;
      }
      let signWords = {
        user_id: this.userId,
        userInfo_id: this.userInfo_id,
        startDate: this.startTime.substr(0, 10),
        endDate: this.endTime.substr(0, 10),
        startTime: this.startTime.substr(11, 16),
        endTime: this.endTime.substr(11, 16),
        theme: this.theme,
        carryingNumber:this.visitorsNumber

      };
      return signWords;
    },
    sure() {
      if (this.startTime == "") {
        alert("请输入来访开始时间！");
        return;
      }
      if (this.endTime == "") {
        alert("请输入来访结束时间！");
        return;
      }
      if (this.startTime.substr(0, 10) != this.endTime.substr(0, 10)) {
        alert("有效期只有一天，不能隔日！");
        return;
      }
      if (this.choseListCC.length == 0) {
        alert("来访对象不能为空！");
        return;
      }
      var _this = this;
debugger
      var content = _this.getAttendanceRecord();

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
        "/user/addVisitorSubscribe.do";
      this.$ajax
        .post(geturl, headerAndBody.contentDataByKey, {
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
            _this.getPrivatekey()
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, _this.getIV());
          var returnData = JSON.parse(returnData);
          debugger
          if (returnData.code == 1001) {
            alert("申请成功！");
            (_this.leaveReasons = ""), //外出事由
            (_this.choseListCC = []), //抄送人
            (_this.sheetListsCC = []), //抄送人选择列表
            (_this.startTime = ""), //开始时间
            (_this.endTime = ""), //结束时间
            (_this.visitorsNumber = ""), //来访人数
            (_this.userInfo_id = ""), //来访对象id
            (_this.theme = ""); //来访事由
            localStorage.setItem("visitorsRequestApproved",true)
            _this.examined();
          } else {
            alert("申请失败，请检查网络！");
            return;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.visitorsPage.style.height = clientHeight + "px";
    },
    goLeaveRequestInformation(item) {
      this.$router.push({
        path: "/visitorsRequestInformation",
        query: {
          pagename: "visitorsPage",
          item: item
        }
      });
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.totalHeight = this.$refs.visitorsPage.offsetHeight;
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  },
  mounted() {
    if (!this.isNew) {
      this.$refs.examined.style.background = "rgb(58, 190, 98)";
      this.$refs.examined.style.color = "#eee";
      this.$refs.examined.style.border = "1px solid #fff";

      this.$refs.pendingTrial.style.background = "#eee";
      this.$refs.pendingTrial.style.color = "rgb(58, 190, 98)";
      this.$refs.pendingTrial.style.border = "1px solid rgb(58, 190, 98)";
    }
    if (this.$route.query.pagename == "visitorsRequestInformation") {
      this.examined();
    }
    this.getCurTime();
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // console.log(self);
    // window.onresize = function temp() {
    //   this.clientHeight = `${document.documentElement.clientHeight}`;
    // };
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },

  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },

  created: function() {
    // console.log("开始");
    var _this = this;
    _this.userId = localStorage.getItem("userId");
    _this.userName = localStorage.getItem("userName");
    _this.company_id = localStorage.getItem("company_id");
    _this.serverPublicKey = localStorage.getItem("serverPublicKey");
    localStorage.setItem("visitorsRequestApproved",true)
    _this.getListData();

    _this.fileData = this.$defines.travelRequestFileData;
    _this.imgs = this.$defines.travelRequestImges;
    if (this.$route.query.pagename == "selectCCpage") {
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.theme = this.$route.query.leaveReasons;
      _this.visitorsNumber = this.$route.query.defaultType;
      _this.startTime = this.$route.query.startTime;
      _this.endTime = this.$route.query.endTime;
    }
    
  }
};
</script>
<style scoped>
.visitorsPage {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 240, 240);

  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
}
.tool{
  z-index:999
}
.startTime {
  border-radius: 5px;
  text-align: left;
  height: 23px;
  width: 200px;
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
  color: #eee;
  font-size: 28px;
  border-radius: 10px;
  background-color: #149760; /* 标准的语法 */
  margin-bottom: 50px;
  /* filter: brightness(1.4);  */
  /* flex-grow: -999; */
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
.footer_guide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
}
.approvalList{
   
   border-radius: 10px;
   text-align:left;
   background-color: #fff;
    border: 1px solid rgb(83, 83, 83);
   color:#000;
   padding:10px;
   margin: 10px;
  

}
</style>