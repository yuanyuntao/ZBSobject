<template>
  <div class="application">
    <div class="footer_guide">
      <Tabbarapp 
        :userId="userId"
        :isAdministrator="isAdministrator"
        :userName="userName"></Tabbarapp>
    </div>
    <div class="appfeaturlists">
      
      <div class="appfeaturlist" ref="appfeaturlist1">
        <div class="icon" @click="changePage('/notificationpage')">
          <span>
            <img class="imgs" src="../../assets/usedimg/gonggao.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>公告通知</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/leaveRequestpage')">
          <span>
            <img class="imgs" src="../../assets/usedimg/xiujiashenqing.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>休假申请</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/overtimeRequestpage')">
          <span>
            <img class="imgs" src="../../assets/usedimg/jiabanshenqing.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>加班申请</span>
          </div>
        </div>
      </div>

      <div class="appfeaturlist" ref="appfeaturlist2">
        <div class="icon" @click="changePage('/outRequestpage')">
          <span>
            <img class="imgs" src="../../assets/usedimg/waichushenqing.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>外出申请</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/travelRequestpage')">
          <span>
            <img class="imgs" src="../../assets/usedimg/chuchaishenqing.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>出差申请</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/')">
          <span>
            <img class="imgs" src="../../assets/usedimg/kaoqinbuka.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>考勤补卡</span>
          </div>
        </div>
      </div>
      <div class="appfeaturlist" ref="appfeaturlist3">
        <div class="icon" @click="changePage('/')">
          <span>
            <img class="imgs" src="../../assets/usedimg/salary_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>我的薪资</span>
          </div>
        </div>
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/question_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>调查问卷</span>
          </div>
        </div>
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/huiyi.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>我的会议</span>
          </div>
        </div>
      </div>

      <div class="appfeaturlist" ref="appfeaturlist4">
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/work_report_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>工作汇报</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/')">
          <span>
            <img class="imgs" src="../../assets/usedimg/wenjianjia.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>文件夹</span>
          </div>
        </div>
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/huamingce_normal.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>员工花名册</span>
          </div>
        </div>
      </div>
      <div class="appfeaturlist"  ref="appfeaturlist5">
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/zhengjianzhao.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>证件照</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/')">
          <span>
            <img class="imgs" src="../../assets/usedimg/mingpianjia.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>名片夹</span>
          </div>
        </div>
        <div class="icon">
          <span>
            <img class="imgs" src="../../assets/usedimg/youjian.png">
          </span>
          <br>
          <div style="padding-bottom:20px;">
          <span>我的邮箱</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tabbarapp from "./tabbars/Tabbarapp.vue";
export default {
  name: "application",
  components: {
    Tabbarapp
  },
  data: function() {
    return {
      userName: "",
      isAdministrator: "",
      userId: "",
      clientHeight:"",
    };
  },
  methods: {
    goBack(){
      this.$router.push({
        path: "/homepage",
        query: {
        pagename: "application",
        userId: this.userId,
        isAdministrator: this.isAdministrator,
        userName: this.userName,
        }
      });
    },
    changePage: function(page) {
      //点击跳转对应的页面
      this.$router.push({
        path: page,
        query: {
          pagename:"application",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName
        }
      });
    },
    /**
     * 动态获取高度改变样式
     */
    changeFixed(height) {
      //动态修改样式
      this.$refs.appfeaturlist1.style.height = height + "px";
      this.$refs.appfeaturlist2.style.height = height + "px";
      this.$refs.appfeaturlist3.style.height = height + "px";
      this.$refs.appfeaturlist4.style.height = height + "px";
      this.$refs.appfeaturlist5.style.height = height + "px";
    },
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };


    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);    
      window.addEventListener('popstate', this.goBack, false);  
      }
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed((this.clientHeight-50)/5);
    }
  },



  created: function() {
    var _this = this;
    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;
    // console.log("用户名" + _this.userName);
  }
};
</script>
<style scoped>
.footer_guide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1px;
}
.appfeaturlist {
  width: 100%;
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
.imgs {
  width: 25px;
  height: 25px;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
}
</style>