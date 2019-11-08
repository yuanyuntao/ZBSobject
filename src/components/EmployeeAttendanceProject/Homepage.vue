<template>
  <div class="homepage">
    <slide></slide>
    <div class="footer_guide">
      <tabbarhome :userId="userId" :userName="userName" :isAdministrator="isAdministrator"></tabbarhome>
    </div>
    <div id="timedisplay" style="margin:20px;font-size:20px;">
      <!-- <span>{{dateFormat(date)}}</span> -->
      <span>{{this.getTIME(date,5)}}</span>
      
    </div>
    <div id="allmap" class="allmap" style="width:100%,height:300px"></div>

    <div id="featurlist " class="featurlist">
      <div class="featurlist1">
        <div class="icon" @click="changePage('/signpage')">
          <span>
            <img class="iconImg" src="../../assets/usedimg/sign_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
            <span >考勤打卡</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/iosTest')">
          <span>
            <img class="iconImg" src="../../assets/usedimg/mymessage_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
            <span>我的消息</span>
          </div>
          
        </div>
        <div class="icon" @click="changePage('/agencyMatters')">
          <span>
            <img class="iconImg" src="../../assets/usedimg/daiban_menu_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>待办事项</span>
          </div>
        </div>
      </div>

      <div class="featurlist2">
        <div class="icon">
          <span>
            <img class="iconImg" src="../../assets/usedimg/team_sign_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>团队考勤</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/contactpage')">
          <span>
            <img class="iconImg" src="../../assets/usedimg/contact_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>公司通讯录</span>
          </div>
        </div>
        <div class="icon">
          <span>
            <img class="iconImg" src="../../assets/usedimg/reward_rank_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>小红花榜</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tabbarhome from "./tabbars/Tabbarhome.vue";
import Slide from "./toolsComponent/Slide.vue";
import { MP } from "../js/Map.js";
import { wxUtils } from "../js/WXUntil.js";
export default {
  name: "homepage",
  components: {
    Tabbarhome,
    Slide
  },
  data() {
    return {
      date: new Date(),
      userName: "",
      userId: "",
      isAdministrator:"",
      company_id:"",
      serverPublicKey:"",

    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      debugger
      window.close()
      
      return
    },
    changePage: function(page) {
      //点击跳转对应的页面
      var _this = this;
      this.$router.push( page);
    }
  },

  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
    }, 1000);
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  created: function() {
    var _this = this;
    // _this.userId = this.$defines.userId;
    // _this.userName = this.$defines.userName;
    // _this.isAdministrator = this.$defines.isAdministrator;
    // _this.company_id = this.$defines.companyId;
    // _this.serverPublicKey = this.$defines.serverPublicKey;
    _this.userId = localStorage.getItem("userId")
    _this.userName = localStorage.getItem("userName")
    _this.isAdministrator = localStorage.getItem("isAdministrator")
    _this.company_id = localStorage.getItem("company_id")
    _this.serverPublicKey = localStorage.getItem("serverPublicKey")





     var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      // console.log("我是苹果")
      // alert("ios")
      localStorage.setItem("phoneType","ios")
    }else{
      // console.log("我是安卓")
      // alert("andorid")
      localStorage.setItem("phoneType","andorid")
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/jssdkConfig.do"; //获取jssdk前端配置信息
      wxUtils(url, this);
    }

  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
    if (this.displayer) {
      clearInterval(this.displayer); //在vue实例销毁钱，清除我们的定时器
    }
  }
};
</script>
<style scoped>
.featurlist1 {
  margin-top: 20px;
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 15px;
}
.featurlist2 {
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 15px;
}
.icon {
  width: 33%;
  height: 100%;
  border-right: 1px solid #eee;
}
.iconImg {
  width: 25px;
  height: 25px;
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
}

/* .tabber img {
  margin-top: 10px;
  margin-bottom: 5px;
}
.tabber {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
} */
.footer_guide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1px;
}
</style>