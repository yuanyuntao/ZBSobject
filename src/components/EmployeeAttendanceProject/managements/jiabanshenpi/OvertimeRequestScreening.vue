
<template>
  <div class="overtimeRequestScreening" ref="overtimeRequestScreening">
    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;background-color:rgb(250, 250, 250)"
    >
      <div style=" width: 100%;text-align: left;display: flex;">
        <div style="font-size: 18px;font-weight: bold;width: 80%;">
          <span style="font-size: 22px;font-weight: bold;">起止时间</span>
        </div>

        <button class="sure" @click="sure" type="primary" round>完成</button>
      </div>

      <div style=" margin: 10px;display: flex;">
        <span style="font-size: 20px;">开始时间：</span>
        <div
          style="border-radius: 5px;text-align:center;height:30px;width:185px;border: 1px solid rgb(83, 83, 83);font-size: 22px"
          @click="showDatePicker(6, 3)"
        >{{startTime}}</div>
        <!-- <span style="border-radius: 5px;text-align:left;height:40px;width:60px;border: 1px solid rgb(83, 83, 83)" @click="showDatePicker(6, 5)" >{{startTime}}</span> -->
      </div>
      <div style=" margin: 10px;display: flex;">
        <span style="font-size: 20px;">结束时间：</span>
        <div
          style="border-radius: 5px;text-align:center;height:30px;width:185px;border: 1px solid rgb(83, 83, 83);font-size: 22px"
          @click="showDatePicker(7, 3)"
        >{{endTime}}</div>
        <!-- <span style="border-radius: 5px;text-align:left;height:20px;width:60px;border: 1px solid rgb(83, 83, 83)" @click="showDatePicker(7, 5)" >{{endTime}}</span> -->
      </div>

      <div style=" margin: 10px;display: flex;padding-top:10px;font-size: 20px">
        &ensp;申请人&ensp;：
        <input
          v-model="applicantUserId"
          style="border-radius: 5px;text-align:center;height:30px;width:185px;border: 1px solid rgb(83, 83, 83);font-size: 18px"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "overtimeRequestScreening",
  components: {},
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      nowtime: new Date(), //现在时间
      applicantUserId: "",
      startTime: "", //开始时间
      endTime: "", //结束时间
      time: [2018, 1, 1, 0, 0],
      minTime: [2018, 1, 1, 0, 0],
      maxTime: [],
      showChinese: false,
      resetTime: [],
      type: null,
      form: ""
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/" + this.form,
        query: {
          pagename: "overtimeRequestScreening"
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
        if (!this.resetTime[0] && this.startTime == "")
          return alert("请先选择开始时间！");
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
              ? y + m + d
              : y + "-" + m + "-" + d;
            this.endTime = "";
          } else if (demo === 7) {
            this.endTime = dataObj.showChinese
              ? y + m + d
              : y + "-" + m + "-" + d;
          }
        })
        .catch(e => {
          // console.log(e)
        });
    },
    sure() {
      localStorage.setItem("overtimeRequeststartTime", this.startTime);
      localStorage.setItem("overtimeRequestendTime", this.endTime);
      localStorage.setItem(
        "overtimeRequestApplicantUserId",
        this.applicantUserId
      );
      this.$router.push({
        path: "/" + this.form,
        query: {
          pagename: "overtimeRequestScreening"
        }
      });
    }
  },
  mounted() {
    this.getCurTime();
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  watch: {},
  created: function() {
    var _this = this;
    _this.form = this.$route.query.pagename;
    _this.startTime =
      localStorage.getItem("overtimeRequeststartTime") == null
        ? ""
        : localStorage.getItem("overtimeRequeststartTime");
    _this.endTime =
      localStorage.getItem("overtimeRequestendTime") == null
        ? ""
        : localStorage.getItem("overtimeRequestendTime");
    _this.applicantUserId =
      localStorage.getItem("overtimeRequestApplicantUserId") == null
        ? ""
        : localStorage.getItem("overtimeRequestApplicantUserId");
  }
};
</script>
<style scoped>
.overtimeRequestScreening {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment: fixed;
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
  width: 20%;
  font-size: 15px;
  border-radius: 10px;
  font-weight: bold;
  color: #fff;
  background-color: #127433; /* 标准的语法 */
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