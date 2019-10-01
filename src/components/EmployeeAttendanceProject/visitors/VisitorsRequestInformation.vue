<template>
  <div class="visitorsRequestInformation">
    <template v-if="isEdit">
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
        <button class="sure" @click="sure" type="primary" round>确认修改</button>
      </div>
    </template>
    <template v-else>
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
          <div class="startTime" >{{startTime}}</div>
        </div>
        <div style=" margin: 10px;display: flex;">
          <span style="font-size: 16px;">结束时间：</span>
          <div class="endTime" >{{endTime}}</div>
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
          <textarea type="text" class="leaveReasons" disabled placeholder="请输入来访事由" v-model="theme"></textarea>
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
            disabled
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
        <button class="sure" @click="edit" type="primary" round>编辑</button>
      </div>
    </template>
  </div>
</template>
<script>
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  name: "VisitorsRequestInformation",
  components: {},
  data() {
    return {
      defaultparam: 2,
      opinions: "", //审批意见
      approved: "", //审批状态
      item: "",
      isEdit: false, //是否修改

      visitorsNumber: "", //来访人数
      userInfo_id: "", //来访对象id
      userInfo_name: "", //来访对象姓名
      theme: "", //来访事由
      choseListCC: [], //抄送人
      sheetListsCC: [], //抄送人选择列表
      startTime: "", //开始日期
      endTime: "", //结束日期
      id:""
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      localStorage.setItem("visitorsRequestApproved",false)
      this.$router.push({
        path: "/visitorsPage",
        query: {
          pagename: "visitorsRequestInformation"
        }
      });
    },
    edit(){
      this.isEdit=true
      return
    },
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
      if (this.sheetListsCC.length==0) {
        this.$router.push({
        path: "/selectCCpage",
        query: {
          pagename: "visitorsRequestInformation",
          choseListCC: [],
          sheetListsCC: [],

          leaveReasons: this.theme, //来访事由
          defaultType: this.visitorsNumber, //来访人数
          startTime: this.startTime, //开始时间
          endTime: this.endTime, //结束时间
          id:this.id
        }
      });
        
      }
      else{
        this.$router.push({
        path: "/selectCCpage",
        query: {
          pagename: "visitorsRequestInformation",
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,

          leaveReasons: this.theme, //来访事由
          defaultType: this.visitorsNumber, //来访人数
          startTime: this.startTime, //开始时间
          endTime: this.endTime, //结束时间
          id:this.id
        }
      });

      }
      
    },
    getAttendanceRecord() {
      if (this.choseListCC.length > 0) {
        this.userInfo_id = this.choseListCC[0].userId;
      }
      let signWords = {
        id:this.id,
        user_id: localStorage.getItem("userId"),
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
        "/user/updateVisitorSubscribe.do";
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
          if (returnData.code == 1001) {
            alert("修改成功！");
            _this.goBack();
          } else {
            alert("修该失败，请检查网络！");
            return;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getURL(url) {
      var urlNew = (
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        url
      ).replace(new RegExp(/(\\)/g), "/");
      return urlNew;
    }
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
    if (this.$route.query.pagename=="visitorsPage") {
       _this.item = this.$route.query.item;
    _this.id = _this.item.id;
    _this.visitorsNumber = _this.item.carryingNumber;
    _this.userInfo_id = _this.item.userInfo_id;
    _this.userInfo_name = _this.item.userInfo_name;
    _this.theme = _this.item.theme;
    _this.startTime = _this.item.startDate.substr(0, 10) + " " + _this.item.startTime;
    _this.endTime = _this.item.endDate.substr(0, 10) + " " + _this.item.endTime;
    _this.choseListCC=[{userName:_this.userInfo_name,userId:_this.userInfo_id}]
      
    }else if (this.$route.query.pagename=="selectCCpage") {
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.theme = this.$route.query.leaveReasons;
      _this.visitorsNumber = this.$route.query.defaultType;
      _this.startTime = this.$route.query.startTime;
      _this.endTime = this.$route.query.endTime;
      _this.id = this.$route.query.defaultparam
      _this.isEdit = true
      
    }
   
  }
};
</script>
  <style scoped>
.VisitorsRequestInformation {
  width: 100%;
  background-color: rgb(240, 240, 240);
  text-align: center;
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
.sure {
  width: 55%;
  color: #fff;
  font-size: 28px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: rgb(68, 124, 56); /* 标准的语法 */
  filter: brightness(1.4);
}
</style>