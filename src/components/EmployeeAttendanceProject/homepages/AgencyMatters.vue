<template>
  <div class="agencyMatters">

    <div class="appfeaturlists">
        <div style="text-align: left;margin:10px">考勤假期</div>
        
      
      <div class="appfeaturlist" ref="appfeaturlist1">
        <div class="icon" @click="changePage('/notificationpage')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/vacation_apply.png">
          </span>
          <br>
          <div class="words">
          <span>休假审批</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/leaveRequestpage')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/overtime_apply.png">
          </span>
          <br>
          <div class="words">
          <span>加班审批</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/overtimeRequestpage')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/outing_apply.png">
          </span>
          <br>
          <div class="words">
          <span>外出审批</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/outRequestpage')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/business_trip_apply.png">
          </span>
          <br>
          <div class="words">
          <span>出差审批</span>
          </div>
        </div>
        

      </div>

      <div class="appfeaturlist" ref="appfeaturlist2">
        
        <div class="icon" @click="changePage('/travelRequestpage')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/sign_appeal_apply.png">
          </span>
          <br>
          <div class="words">
          <span>补卡审批</span>
          </div>
        </div>
        <div class="icon" @click="changePage('/')">
          <span>
            <img class="imgs" src="../../../assets/littleimg/out_sign_approve.png">
          </span>
          <br>
          <div class="words">
          <span>外出考勤</span>
          </div>
        </div>
        <div class="icon">
          <span>
          </span>
          <br>
          <div class="words">
          </div>
        </div>
        <div class="icon">
          <span>
          </span>
          <br>
          <div class="words">
          </div>
        </div>
      </div>
      
        
      
    </div>
  </div>
</template>
<script>
import Tabbarapp from "../tabbars/Tabbarapp.vue";
export default {
  name: "agencyMatters",
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
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);    
      window.addEventListener('popstate', this.goBack, false);  
      }
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
  },



  created: function() {
    var _this = this;
    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;
    console.log("用户名" + _this.userName);
  }
};
</script>
<style scoped>
.agencyMatters{
  color: black;
  font-size: 14px;  

}
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
  
}
.icon {
  width: 25%;
  height: 100%;
  
}
.imgs {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.words{
  padding-bottom:10px;

}
</style>