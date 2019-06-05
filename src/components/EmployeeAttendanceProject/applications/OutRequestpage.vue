
<template>
  <div class="outRequestpage">
    <div style="padding-top:10px;font-weight: bold;color:#fff;font-size: 18px;letter-spacing:5px;"></div>
    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <span style="font-size: 18px;font-weight: bold;">外出类型</span>
      <div style="float: right;padding-right:20px">
        <select v-model="defaultType" style="width:70px;height:30px;">
          <option v-for="item in options" :value="item.value" :key="item.id">{{item.name}}</option>
        </select>
      </div>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div style=" width: 60%;text-align: left">
        <span style="font-size: 18px;font-weight: bold;">起止时间</span>
      </div>

      <div style=" margin: 10px;display: flex;">
        <span style="font-size: 16px;">开始时间：</span>
        <div
          style="border-radius: 5px;text-align:left;height:23px;width:185px;border: 1px solid rgb(83, 83, 83)"
          @click="showDatePicker(6, 5)"
        >{{startTime}}</div>
        <!-- <span style="border-radius: 5px;text-align:left;height:40px;width:60px;border: 1px solid rgb(83, 83, 83)" @click="showDatePicker(6, 5)" >{{startTime}}</span> -->
      </div>
      <div style=" margin: 10px;display: flex;">
        <span style="font-size: 16px;">结束时间：</span>
        <div
          style="border-radius: 5px;text-align:left;height:23px;width:185px;border: 1px solid rgb(83, 83, 83)"
          @click="showDatePicker(7, 5)"
        >{{endTime}}</div>
        <!-- <span style="border-radius: 5px;text-align:left;height:20px;width:60px;border: 1px solid rgb(83, 83, 83)" @click="showDatePicker(7, 5)" >{{endTime}}</span> -->
      </div>

      <div style=" margin: 10px;display: flex;padding-top:10px">
        共&nbsp;
        <input
          v-model="leaveDays"
          type="number"
          style="height:23px;width:55px;font-size: 18px;text-align: right;padding-right:5px"
        >
        &nbsp;天&nbsp;
        <input
          v-model="leaveHours"
          type="number"
          style="height:23px;width:55px;font-size: 18px;text-align: right;padding-right:5px"
        >

        &nbsp;小时
      </div>
    </div>

    <div
      type="primary"
      round
      style="border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">外出地点</span>
      </div>
      <div style="padding-top:10px">
        <textarea type="text" class="outAddress" placeholder="请输入外出地点" v-model="outAddress"></textarea>
      </div>
    </div>

    <div
      type="primary"
      round
      style="border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">外出事由</span>
      </div>
      <div style="padding-top:10px">
        <textarea type="text" class="leaveReasons" placeholder="请输入外出事由" v-model="leaveReasons"></textarea>
      </div>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">选择审批人</span>
        <img
          class="imge"
          style="float: right; width: 28px;height: 28px;padding-right:20px;"
          src="../../../assets/littleimg/jiahao.png"
          alt
          @click="selectApprover"
        >
      </div>
      <div class="showApproveAndCC" v-show="choseListApprove.length>0">
        <div v-for="(item,index) in choseListApprove" :key="item.id" style="display:flex">
          <div>
            <div class="head_image" v-text="item.substr(item.length-1, 1)"></div>
            <p v-text="item" style="font-size: 12px;margin:5px"></p>
          </div>

          <img
            class="arrow"
            v-show="index != (choseListApprove.length-1) "
            src="../../../assets/littleimg/jiantou.png"
            alt
          >
        </div>
      </div>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">选择抄送人</span>
        <img
          class="imge"
          style="float: right; width: 28px;height: 28px;padding-right:20px"
          src="../../../assets/littleimg/jiahao.png"
          alt
          @click="selectCC"
        >
      </div>
      <div class="showApproveAndCC" v-show="choseListCC.length > 0">
        <div v-for="item in choseListCC" :key="item.id" style="display:flex;padding-right:15px">
          <div>
            <div class="head_image" v-text="item.substr(item.length-1, 1)"></div>
            <p v-text="item" style="font-size: 12px;margin:5px"></p>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:10px">
      <button class="sure" @click="sure" type="primary" round>确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "outRequestpage",
  components: {},
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      clientHeight: "", //屏幕高度
      totalHeight: "", //总的高度
      nowtime: new Date(), //现在时间                display: flex;
      outAddress: "", //打卡地点

      leaveReasons: "", //外出事由

      choseListApprove: [], //审批人
      sheetListsApprove: [], //审批人选择列表
      choseListCC: [], //抄送人
      sheetListsCC: [], //抄送人选择列表
      defaultType: 0, //默认加班类型

      startTime: "", //开始时间
      endTime: "", //结束时间
      time: [2018, 1, 1, 0, 0],
      minTime: [2018, 1, 1, 0, 0],
      maxTime: [],
      showChinese: false,
      resetTime: [],
      type: null,

      leaveDays: "", //加班天数
      leaveHours: "", //加班小时数

      options: [
        {
          name: "apple",
          value: 0
        },
        {
          name: "banana",
          value: 1
        },
        {
          name: "orange",
          value: 2
        }
      ]
    };
  },
  methods: {
     //监听返回按钮
    goBack(){
      this.$router.push({
        path: "/application",
        query: {
        pagename: "outRequestpage",
        userId: this.userId,
        isAdministrator: this.isAdministrator,
        userName: this.userName,
        }
      });
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
          var m = e[1];
          var d = e[2];
          var h = e[3];
          var mm = e[4];
          if (demo === 6) {
            this.resetTime = e;
            this.startTime = dataObj.showChinese
              ? y + m + d + h + mm
              : y + "年" + m + "月" + d + "日 " + h + "时" + mm + "分";
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

    selectApprover() {
      this.$router.push({
        path: "/selectApproverpage",
        query: {
          pagename: "outRequestpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListApprove: this.choseListApprove,
          sheetListsApprove: this.sheetListsApprove,
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,
          leaveReasons: this.leaveReasons,//加班原因
          defaultType: this.defaultType, //加班类型
          startTime: this.startTime, //开始时间
          endTime: this.endTime, //结束时间
          leaveDays: this.leaveDays, //加班天数
          leaveHours: this.leaveHours, //加班小时数
          outAddress: this.outAddress
        }
      });
    },
    selectCC: function() {
      //点击跳转对应的页面
      this.$router.push({
        path: "/selectCCpage",
        query: {
          pagename: "outRequestpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,
          choseListApprove: this.choseListApprove,
          sheetListsApprove: this.sheetListsApprove,

          leaveReasons: this.leaveReasons, //加班那原因
          defaultType: this.defaultType, //加班类型
          startTime: this.startTime, //开始时间
          endTime: this.endTime, //开始时间
          leaveDays: this.leaveDays, //加班天数
          leaveHours: this.leaveHours, //加班小时数
          outAddress: this.outAddress
        }
      });
    },
    sure() {}
  },
  mounted() {
    this.getCurTime();
    if (window.history && window.history.pushState) {   
      history.pushState(null, null, document.URL);    
      window.addEventListener('popstate', this.goBack, false);  
      }
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
  },
  created: function() {
    console.log("开始");
    var _this = this;
    if (this.$route.query.pagename == "application") {
      _this.userId = this.$route.query.userId;
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      // console.log("地址是：" + _this.address+_this.attendanceType);
    } else if (this.$route.query.pagename == "selectApproverpage") {
      _this.userId = this.$route.query.userId;
      console.log("ID：" + _this.userId);
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      _this.choseListApprove = this.$route.query.choseListApprove;
      _this.sheetListsApprove = this.$route.query.sheetListsApprove;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.leaveReasons = this.$route.query.leaveReasons;
      _this.defaultType = this.$route.query.defaultType;
      _this.startTime = this.$route.query.startTime;
      _this.endTime = this.$route.query.endTime;
      _this.leaveDays = this.$route.query.leaveDays;
      _this.leaveHours = this.$route.query.leaveHours;
      _this.outAddress = this.$route.query.outAddress;
    } else if (this.$route.query.pagename == "selectCCpage") {
      _this.userId = this.$route.query.userId;
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      _this.choseListApprove = this.$route.query.choseListApprove;
      _this.sheetListsApprove = this.$route.query.sheetListsApprove;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.leaveReasons = this.$route.query.leaveReasons;
      _this.defaultType = this.$route.query.defaultType;
      _this.startTime = this.$route.query.startTime;
      _this.endTime = this.$route.query.endTime;
      _this.leaveDays = this.$route.query.leaveDays;
      _this.leaveHours = this.$route.query.leaveHours;
      _this.outAddress = this.$route.query.outAddress;
    }
  }
};
</script>
<style scoped>
.outRequestpage {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 240, 240);

  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
}
.outAddress {
  height: 40px;
  width: 100%;
  font-size: 15px;
  border: 0;
}
.leaveReasons {
  height: 80px;
  width: 100%;
  font-size: 15px;
  border: 0;
}
.sure {
  width: 55%;
  font-size: 28px;
  border-radius: 10px;
  background: linear-gradient(to right, #45d4c1, #b1d1cd); /* 标准的语法 */
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
</style>