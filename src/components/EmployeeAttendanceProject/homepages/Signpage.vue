<template>
  <div class="signpage" ref="sign_page">
    <div
      style="font-size:40px;padding:10px;color: #fff;text-align: left;font-weight: bold;"
    >{{this.getTIME(nowtime,2)}}</div>
    <div
      style="font-size:15px;padding-left:10px;color: #fff;text-align: left"
    >{{this.getTIME(nowtime,1)}}</div>
    <div class="attendance">
      <div class="history" type="primary" round @click="attendanceHistory">
        <img class="imge" src="../../../assets/littleimg/icon_attendance_history.png" alt />
        <span style="vertical-align:middle">考勤记录</span>
      </div>
      <div class="rule" type="primary" round @click="lookrule">
        <img class="imge" src="../../../assets/littleimg/icon_attendance_rule.png" alt />
        <span style="vertical-align:middle">考勤规则</span>
      </div>
      <!-- <div class="signin" style="font-size:30px;"></div>
      <div class="signout" style="font-size:15px;margin:5px"></div>-->
    </div>
    <div class="nowRule" type="primary" round style="text-align: left">
      <span style="font-size:20px;color:#000">当前考勤规则</span>
      <br />
      <span style="font-size:18px;color:#4cb193">{{nowRule}}</span>
      <span style="font-size:18px;color:#4cb193">{{ps}}</span>
      <br />
      <span style="font-size:12px;color:#91918c">注：默认使用距离您最近的考勤点</span>
    </div>

    <div class="signbutton">
      <div style="display: flex;">
        <div style="display: flex;text-align: left;width:40%;margin-left: 20px">
          <div style>
            <img class="signimg" src="../../../assets/littleimg/icon_sun.png" alt />
            <br />
            <span style="color:#000">上班时间</span>
            <br />
            <span style="color:#91918c">{{work}}</span>
            <br />
            <!-- <template v-if="isIn">
            <template v-if="isInNormal">
              <span style="color:#68e948;font-weight: normal;font-size: 15px">{{psIn}}</span>
            </template>
            <template v-else>
              <span style="color:#f72d4e;font-weight: normal;font-size: 15px">{{psIn}}</span>
            </template>
            </template>-->
          </div>

          <div class="signtext">
            <!-- <template v-if="ifInOk">
            <button
              style="width: 80px;height: 80px;background-color: #2f9625;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              @click="signin"
            >签到</button>
          </template>
          <template v-else>
            <template v-if="isIn">
              <button
                style="width: 80px;height: 80px;background-color: #6b6869;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              >已签到</button>
            </template>
            <template v-else>
              <button
                style="width: 80px;height: 80px;background-color: #6b6869;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              >签到</button>
            </template>
            </template>-->
          </div>
        </div>
        <div>
          <template v-if="isSignOk">
            <button
              style="width: 80px;height: 80px;background-color: #2f9625;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              @click="sign"
            >打卡</button>
          </template>
          <template v-else>
            <button
              style="width: 80px;height: 80px;background-color: #6b6869;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
            >打卡</button>
          </template>
        </div>
        <div
          style="display: flex;width: 100%;float: right;text-align: right;width:40%;margin-left: 20px"
        >
          <div style="float: right;text-align: right;">
            <img class="signimg" src="../../../assets/littleimg/icon_moon.png" alt />
            <br />
            <span style="color:#000">下班时间</span>
            <br />
            <span style="color:#91918c">{{offDuty}}</span>
            <br />
            <!-- <template v-if="isOut">
            <template v-if="isOutNormal">
              <span style="color:#68e948;font-weight: normal;font-size: 15px">{{psOut}}</span>
            </template>
            <template v-else>
              <span style="color:#f72d4e;font-weight: normal;font-size: 15px">{{psOut}}</span>
            </template>
            </template>-->
          </div>
          <div class="signtext">
            <!-- <template v-if="ifOutOk">
            <button
              style="width: 80px;height: 80px;background-color: #2f9625;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              @click="signout"
            >签退</button>
          </template>
          <template v-else>
            <template v-if="isOut">
              <button
                style="width: 80px;height: 80px;background-color: #6b6869;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              >已签退</button>
            </template>
            <template v-else>
              <button
                style="width: 80px;height: 80px;background-color: #6b6869;border-radius:50%;color:#fff;font-size: 18px;font-weight: bold;float:right"
              >签退</button>
            </template>
            </template>-->
          </div>
        </div>
      </div>

      <div style="font-size:14px;margin-top: 20px;margin-bottom: 20px">
        <div style="border-bottom: 1px solid rgb(240, 240, 240);">{{psIn}}&ensp;{{psInAddress}}</div>
        <div>{{psOut}}&ensp;{{psOutAddress}}</div>
      </div>

      <div style="display: flex;">
        <div style="font-size:12px;color:#91918c">注：记录只显示当天最早和最晚的信息</div>&ensp;&ensp;
        <div style="font-size:12px;color:rgb(37, 175, 100)">详细记录</div>
      </div>
    </div>

    <div class="out" @click="outSign" aria-disabled="true">
      <img class="out_attendance" src="../../../assets/littleimg/add_out_attendance.png" alt />
      <span style="vertical-align: middle;">外勤打卡</span>
    </div>
    <div style="height:10px"></div>
    <div id="allmap" class="allmap"></div>
  </div>
</template>
<script>
import { MP } from "../../js/Map.js";
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  name: "signpage",
  components: {},
  data() {
    return {
      clientHeight: "", //屏幕高度
      nowtime: new Date(), //时间
      ruledata: [], //考勤规则数据
      work: "", //上班考勤时间
      offDuty: "", //下班考勤时间
      nowRule: "", //现在考勤规则
      ps: "", //注释
      psIn: "",
      psOut: "",
      psInAddress: "",
      psOutAddress: "",
      userId: "",
      userName: "", //用户名
      company_id: "", //公司
      isAdministrator: "", //是否是管理员
      isSignOk: false, //是否可以打卡（进入打卡范围）
      // ifInOk: false, //可以签到判断
      // ifOutOk: false, //可以签退判断
      // isInOk: true, //是否可以签到
      // isOutOk: true, //是否可以签退
      // isIn: false, //是否已签到
      // isOut: false, //是否已签退
      // isInNormal: true, //是否签到正常
      // isOutNormal: true, //是否签退正常
      serverPublicKey: "", //服务端的RSA公钥，提供给服务器判断有没有过期

      signWords: {
        user_id: "",
        user_name: "",
        attendance_type: 0,
        attendance_longitude: "",
        attendance_latitude: "",
        attendance_address: "",
        attendance_time: "",
        out_attendance: "",
        out_attendance_id: "",
        rule_id: ""
      },
      attendance_longitude: 0, //打卡经度
      attendance_latitude: 0, //打卡纬度
      attendance_address: "", //打卡地点
      attendance_time: "", //打卡时间
      rule_id: "",
      a: "",
      ak: "2Gv5E1lFEeSiQIFhmHO1icVFj6KEtsfp"
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/homepage",
        query: {
          pagename: "signpage"
        }
      });
    },
    attendanceHistory() {
      this.$router.push({
        path: "/calendar",
        query: {
          pagename: "signpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName
        }
      });
    },
    /**获取地图定位*/
    getLocations() {
      var _this = this;
      if (typeof BMap != "undefined") {
        MP(_this.ak).then(BMap => {
          _this.getmap(_this);
          return;
        });
        _this.getmap(_this);
      } else {
        MP(_this.ak).then(BMap => {
          _this.getmap(_this);
        });
      }
    },
    /**
     * 百度地图定位
     */
    getmap(_this) {
      // 百度地图API功能
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(120.54406, 31.281494);
      map.centerAndZoom(point, 12);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          _this.attendance_longitude = r.point.lng;
          _this.attendance_latitude = r.point.lat;
          const myGeo = new BMap.Geocoder();
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
            if (data.addressComponents) {
              _this.attendance_address = data.address;
              // const location = {
              //   creditLongitude: r.point.lat, // 经度
              //   creditLatitude: r.point.lng, // 纬度
              //   creditProvince: result.province || '', // 省
              //   creditCity: result.city || '', // 市
              //   creditArea: result.district || '', // 区
              //   creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
              // }
              // _this.location = location
            }
          });
          var content = {
            userId: _this.userId,
            startTime: _this.getTIME(_this.nowtime, 4),
            endTime: _this.getTIME(_this.nowtime, 4),
            companyId: _this.company_id
          };
          var contentData = JSON.stringify(content);
          var headerAndBody = _this.getHeaderAndBody(
            contentData,
            _this.serverPublicKey
          );
          let url =
            "http://" +
            _this.getSERVER_HOST_MAIN() +
            ":" +
            _this.getSERVER_PORT_MAIN() +
            "/" +
            _this.getPROJECT_MAIN() +
            "/user/searchAttendanceRulesAndRecord.do";
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
              debugger;
              if (returnData.code != 1001) {
                alert("连接错误，请检查网络！");
                return;
              }
              _this.ruledata = returnData.data.attendanceRule;
              var record = returnData.data.attendanceRecord;
              if (record.length > 0) {
                var date = record[0].attendance_time.toString().substr(11, 5);
                _this.psIn = date;
                _this.psInAddress = record[0].attendance_address;
                var date = record[record.length - 1].attendance_time
                  .toString()
                  .substr(11, 5);
                _this.psOut = date;
                _this.psOutAddress =
                  record[record.length - 1].attendance_address;
                // _this.isInOk = false;
                // _this.isIn = true;
                // _this.canInField = false;
                // if (record[i].result_id == 3) {
                //   _this.isInNormal = false;
                // } else {
                //   _this.isInNormal = true;
                // }

                // _this.isOutOk = false;
                // _this.isOut = true;
                // if (record[i].result_id == 4) {
                //   _this.isOutNormal = false;
                // } else {
                //   _this.isOutNormal = true;
                // }
              }
              var longitude;
              var latitude;
              var minimumdistance = 1000000000;
              var marking;
              for (let i = 0; i < _this.ruledata.length; i++) {
                longitude = _this.ruledata[i].rule_longitude;
                latitude = _this.ruledata[i].rule_latitude;
                var pointB = new BMap.Point(
                  parseFloat(longitude),
                  parseFloat(latitude)
                );
                var distance =
                  map.getDistance(r.point, pointB) -
                  _this.ruledata[i].rule_radius; // 保留小数点后两位
                if (distance < 0) {
                  _this.nowRule = _this.ruledata[i].rule_address;
                  _this.rule_id = _this.ruledata[i].id;
                  _this.work = _this.ruledata[i].rule_time_work;
                  _this.offDuty = _this.ruledata[i].rule_time_off_work;
                  _this.ps = "（您已进入考勤范围）";
                  _this.isSignOk = true;
                  // var timeNow = new Date();
                  // var hours =
                  //   timeNow.getHours() < 10
                  //     ? "0" + timeNow.getHours()
                  //     : timeNow.getHours();
                  // var minutes =
                  //   timeNow.getMinutes() < 10
                  //     ? "0" + timeNow.getMinutes()
                  //     : timeNow.getMinutes();
                  // timeNow = hours + ":" + minutes;
                  // timeNow = new Date(timeNow).getTime();
                  // var timeruleIn = new Date(_this.offDuty).getTime();
                  // if (timeNow < timeruleIn) {
                  //   _this.isInOk = false;
                  // }
                  // var timeruleOut = new Date(_this.work).getTime();
                  // if (timeNow > timeruleOut) {
                  //   _this.isOutOk = false;
                  // }
                  // if (_this.isInOk == true) {
                  //   _this.ifInOk = true;
                  // } else {
                  //   _this.ifInOk = false;
                  // }
                  // if (_this.isOutOk == true) {
                  //   _this.ifOutOk = true;
                  // } else {
                  //   _this.ifOutOk = false;
                  // }
                  return;
                } else {
                  if (minimumdistance > distance) {
                    minimumdistance = distance;
                    marking = i;
                  }
                }
              }
              _this.nowRule = _this.ruledata[marking].rule_address;
              _this.rule_id = _this.ruledata[marking].id;
              _this.work = _this.ruledata[marking].rule_time_work;
              _this.offDuty = _this.ruledata[marking].rule_time_off_work;
              if (minimumdistance > 1000) {
                _this.ps =
                  "（您距离最近的考勤范围" +
                  (minimumdistance / 1000).toFixed(3) +
                  "km）";
              } else {
                _this.ps =
                  "（您距离最近的考勤范围" + minimumdistance.toFixed(0) + "m）";
              }
              _this.isSignOk = false;
              // _this.isInOk = false;
              // _this.isOutOk = false;
              // if (_this.isInOk == true) {
              //   _this.ifInOk = true;
              // } else {
              //   _this.ifInOk = false;
              // }
              // if (_this.isOutOk == true) {
              //   _this.ifOutOk = true;
              // } else {
              //   _this.ifOutOk = false;
              // }
            });
        } else {
          alert("failed" + this.getStatus());
        }
      });
    },
    /**
     * 打卡
     */
    sign() {
      if (this.isSignOk) {
        var _this = this;
        debugger;
        var information = _this.getAttendanceRecord(1);
        var url =
          "http://" +
          this.getSERVER_HOST_MAIN() +
          ":" +
          this.getSERVER_PORT_MAIN() +
          "/" +
          this.getPROJECT_MAIN() +
          "/user/addAttendanceRecord.do";
        this.$ajax
          .post(url, information, {
            headers: { "Content-type": "multipart/form-data" }
          })
          .then(function(response) {
            debugger;
            if (response.data.code == 1001) {
              alert("打卡成功！");
              _this.getLocations();
            } else {
              alert("打卡失败，请检查网络！");
              return;
            }
          });
      } else {
        alert("不在考勤范围内！");
        return;
      }
    },
    /**
     * 签到
     */
    // signin() {
    //   var _this = this;
    //   var information = _this.getAttendanceRecord(1);
    //   var url =
    //     "http://" +
    //     this.getSERVER_HOST_MAIN() +
    //     ":" +
    //     this.getSERVER_PORT_MAIN() +
    //     "/" +
    //     this.getPROJECT_MAIN() +
    //     "/user/addAttendanceRecord.do";
    //   _this.$ajax
    //     .post(url, information, {
    //       headers: { "Content-type": "multipart/form-data" }
    //     })
    //     .then(function(response) {
    //       if (response.data.code == 1001) {
    //         location.reload();
    //         alert("签到成功！");
    //       } else {
    //         alert("签到失败，请检查网络！");
    //         location.reload();
    //       }
    //     });
    // },
    /**
     * 签退
     */
    // signout() {
    //   var _this = this;
    //   var information = _this.getAttendanceRecord(2);
    //   var url =
    //     "http://" +
    //     this.getSERVER_HOST_MAIN() +
    //     ":" +
    //     this.getSERVER_PORT_MAIN() +
    //     "/" +
    //     this.getPROJECT_MAIN() +
    //     "/user/addAttendanceRecord.do";
    //   _this.$http
    //     .post(url, information, {
    //       headers: { "Content-type": "multipart/form-data" }
    //     })
    //     .then(function(response) {
    //       if (response.data.code == 1001) {
    //         location.reload();
    //         alert("签退成功！");
    //       } else {
    //         alert("签退失败，请检查网络！");
    //         location.reload();
    //       }
    //     });
    // },

    /**
     * 外勤
     */
    outSign() {
      this.$router.push({
        path: "/Outsignpage",
        query: {
          pagename: "signpage",
          // defaultparam: 2,
          // type: 1,
          address: this.attendance_address,
          attendance_longitude: this.attendance_longitude,
          attendance_latitude: this.attendance_latitude
        }
      });
    },

    // outSign() {
    //   var _this = this;
    //   if (_this.isIn && _this.isOut) {
    //     alert("不可重复打卡！");
    //     return;
    //     //   this.$router.push({
    //     //   path: "/Outsignpage",
    //     //   query: {
    //     //     pagename: "signpage",
    //     //     defaultparam:1,
    //     //     type:0,
    //     //     address: _this.attendance_address,
    //     //     attendance_longitude: this.attendance_longitude,
    //     //     attendance_latitude: this.attendance_latitude,
    //     //   }
    //     // });
    //   } else if (_this.isIn && !_this.isOut) {
    //     this.$router.push({
    //       path: "/Outsignpage",
    //       query: {
    //         pagename: "signpage",
    //         defaultparam: 2,
    //         type: 1,
    //         address: _this.attendance_address,
    //         attendance_longitude: this.attendance_longitude,
    //         attendance_latitude: this.attendance_latitude
    //       }
    //     });
    //   } else if (!_this.isIn && _this.isOut) {
    //     this.$router.push({
    //       path: "/Outsignpage",
    //       query: {
    //         pagename: "signpage",
    //         defaultparam: 1,
    //         type: 2,
    //         address: _this.attendance_address,
    //         attendance_longitude: this.attendance_longitude,
    //         attendance_latitude: this.attendance_latitude
    //       }
    //     });
    //   } else if (!_this.isIn && !_this.isOut) {
    //     this.$router.push({
    //       path: "/outsignpage",
    //       query: {
    //         pagename: "signpage",
    //         address: _this.attendance_address,
    //         defaultparam: 1,
    //         type: 0,
    //         attendance_longitude: this.attendance_longitude,
    //         attendance_latitude: this.attendance_latitude
    //       }
    //     });
    //   }
    // },
    /**
     * 获取接口json数据
     */
    getAttendanceRecord(type) {
      let signWords = {
        user_id: parseInt(this.userId),
        user_name: this.userName,
        // attendance_type: type,
        attendance_longitude: parseFloat(this.attendance_longitude),
        attendance_latitude: parseFloat(this.attendance_latitude),
        attendance_address: this.attendance_address,
        attendance_time: this.getTIME(this.nowtime, 3),
        out_attendance: 0,
        out_attendance_id: 0,
        rule_id: this.rule_id
      };
      let fileFormData = new FormData();
      fileFormData.append("information", JSON.stringify(signWords));
      return fileFormData;
    },
    /**
     * 查看签到规则
     */
    lookrule() {
      this.$router.push("/rulespage");
    },
    /**
     * 动态获取高度改变样式
     */
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.sign_page.style.height = clientHeight + "px";
    }
  },
  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.nowtime = new Date(); //修改数据date
    }, 1000);
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    //console.log(self.clientHeight);
    // window.onresize = function temp() {
    //   this.clientHeight = `${document.documentElement.clientHeight}`;
    // };
    //  this.changeFixed(this.clientHeight)
    this.totalHeight = this.$refs.sign_page.offsetHeight;
    if (this.totalHeight > this.clientHeight) {
      this.clientHeight = this.totalHeight + 20;
    }
    this.changeFixed(this.clientHeight);
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
    totalHeight: function() {
      this.totalHeight = this.$refs.sign_page.offsetHeight;
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  },
  created: function() {
    // console.log("开始");
    var _this = this;
    _this.userId = localStorage.getItem("userId");
    _this.userName = localStorage.getItem("userName");
    _this.isAdministrator = localStorage.getItem("isAdministrator");
    _this.company_id = localStorage.getItem("company_id");
    _this.serverPublicKey = localStorage.getItem("serverPublicKey");
    _this.appPrivateKey = this.getPrivatekey();
    this.getLocations();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁前，清除我们的定时器
    }
    if (this.displayer) {
      clearInterval(this.displayer); //在vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<style scoped>
.signpage {
  width: 100%;
  /* height: 100%; */
  position: relative;
  /* height: 560px; */
  background-image: url("../../../assets/bigimg/bg_attendance.jpeg");
  background-size: 100% 100%;
}

.top {
  background-color: rgb(37, 175, 83);
  color: rgb(255, 255, 255);
}
.attendance {
  text-align: center;
  align-items: center;
  margin-top: 20px;
  display: flex;
}
.history {
  padding: 5px;
  margin-left: 10px;
  border: 1px solid #eee;
  width: 100px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
}

.rule {
  padding: 5px;
  margin-left: 10px;
  border: 1px solid rgb(255, 252, 252);
  width: 100px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
}
.nowRule {
  background-color: #fff;
  padding: 5px;
  margin: 10px;
  border: 1px solid rgb(238, 238, 238);
  /* width: 100px; */
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
}
.signbutton {
  background-color: #fff;
  padding: 5px;
  margin: 10px;
  border: 1px solid rgb(238, 238, 238);
  /* width: 100px; */
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
}

.out {
  background-color: #fff;
  padding: 5px;
  margin: 10px;
  border: 1px solid rgb(238, 238, 238);
  /* width: 100px; */
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
}
.signtext {
  /* border-radius: 50%; */
  float: right;
  border-color: #fff;
}
.imge {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.signimg {
  width: 30px;
  height: 30px;
}
.out {
  padding: 5px;
  margin: 10px;
}
.out_attendance {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
</style>