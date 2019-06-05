<template>
  <div class="personal_inforpage">
    <!-- <div style="padding-top:10px;color:#fff;font-size: 25px;letter-spacing:5px">
      <span>联系人详情</span>
    </div> -->
    <div>
      <img
        style="margin-top: 40px;width: 100px;height: 100px;background-color: #fff;border-radius: 50%;color: #fff;
               font-size: 32px;font-weight: bold;text-align: center;vertical-align: middle;"
        src="../../../assets/littleimg/yonghu.png" alt>
    </div>
    <div style="margin-top: 25px;color: #fff;font-size: 22px;text-align: center;vertical-align: middle;">{{user_name}}</div>
    <div style="margin-top: 15px;color: #fff;font-size: 20px;text-align: center;vertical-align: middle;">
      {{department}}
      {{position}}
    </div>
    <div style="margin-top: 15px;margin-left: 30px;width: 80%;color: #fff;
               font-size: 18px;text-align: left; display: flex;">
        <div style="width: 15%"><img
        style="width: 20px;height: 20px;"
        src="../../../assets/littleimg/phone.png" alt></div>
       
        <div style="width: 85%">{{phone_number}}</div>
        
    </div>
    <div style="margin-top: 15px;margin-left: 30px;width: 80%;color: #fff;
               font-size: 18px;text-align: left; display: flex;">
        <div style="width: 15%"><img
        style="width: 20px;height: 20px;"
        src="../../../assets/littleimg/email.png" alt></div>
        <div style="width: 85%">{{mail_address}}</div>
        
    </div>
    <div style="margin-top: 15px;margin-left: 30px;width: 80%;color: #fff;
               font-size: 18px;text-align: left; display: flex;">
        <div style="width: 15%"><img
        style="width: 20px;height: 20px;"
        src="../../../assets/littleimg/address.png" alt></div>
        <div style="width: 85%">{{contact_address}}</div>
        
    </div>

    <!-- <div style="color: #fff;background-color: #45d4c1;">
    <div  style="padding:10px;font-size:20px;letter-spacing:5px;">
        <span>外勤打卡</span>
    </div>

    </div>-->

    <div style = "display: flex;" >
        <div style = "width:30%"><img
        style="margin:35px;width: 80px;height: 80px;background-color: #fff;border-radius: 50%;color: #fff;
               font-size: 32px;font-weight: bold;text-align: center;vertical-align: middle;"
        src="../../../assets/littleimg/icon_email_enable.png" alt @click="callPhone(1)"></div>
        <div style = "width:30%">
            <img
        style="margin: 35px;width: 80px;height: 80px;background-color: #fff;border-radius: 50%;color: #fff;
               font-size: 32px;font-weight: bold;text-align: center;vertical-align: middle;"
        src="../../../assets/littleimg/icon_tel_enable.png" alt @click="callPhone(2)">
            
        </div>
        <div style = "width:30%">
            <img
        style="margin: 35px;width: 80px;height: 80px;background-color: #fff;border-radius: 50%;color: #fff;
               font-size: 32px;font-weight: bold;text-align: center;vertical-align: middle;"
        src="../../../assets/littleimg/icon_message_enable.png" alt @click="callPhone(3)">


        </div>
         
         
         
    </div>


  </div>
</template>

<script>
export default {
  name: "personal_inforpage",
  components: {},
  data() {
    return {
      haveicon: "",
      icon_url: "",
      icon_word: "",

      user_name: "",
      department: "",
      position: "",
      phone_number: "",
      mail_address: "",
      contact_address: "",

      userName: "",
      isAdministrator: "",
      userId: "",
    };
  },
  methods: {
    //监听返回按钮
    goBack(){
      this.$router.push({
        path: "/contactpage",
        query: {
        userId: this.userId,
        isAdministrator: this.isAdministrator,
        userName: this.userName,
        }
      });
    },
      callPhone(type){
          switch (type) {
              case 1:
              location.href = 'mailto://'+this.mail_address
              break;
              case 2:
              location.href = 'tel://'+this.phone_number
              break;
              case 3:
              location.href = 'sms://'+this.phone_number
              break;
          }
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
    // console.log("开始");
    var _this = this;
    _this.haveicon = this.$route.query.haveicon;
    _this.icon_url = this.$route.query.icon_url;
    _this.icon_word = this.$route.query.icon_word;

    _this.user_name = this.$route.query.user_name;
    _this.department = this.$route.query.department;
    _this.position = this.$route.query.position;
    _this.phone_number = this.$route.query.phone_number;
    _this.mail_address = this.$route.query.mail_address;
    _this.contact_address = this.$route.query.contact_address;

    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;

    console.log("开始" + _this.position + _this.phone_number);
  }
};
</script>

<style scoped>
.personal_inforpage {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/bigimg/bg_headportrait.png");
  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px;  */
}
.search {
  height: 30px;
  width: 99%;
  font-size: 18px;
  border: 1px solid rgb(214, 213, 213);
}
</style>