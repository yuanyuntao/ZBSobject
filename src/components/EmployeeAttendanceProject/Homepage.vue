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
        <div class="icon">
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
    };
  },
  methods: {
    changePage: function(page) {
      //点击跳转对应的页面
      var _this = this;
      this.$router.push({
        path: page,
        query: {
        userId: _this.userId,
        isAdministrator: _this.isAdministrator,
        userName: _this.userName,
        company_id: _this.company_id,
        }
      });
    }
  },

  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
    }, 1000);
  },
  created: function() {
    var _this = this;
    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;
    // _this.isAdministrator = true;
    _this.company_id = this.$route.query.company_id;

    // console.log("用户名" + _this.userName);
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