<template>
  <div class="accountinformation">
      <div class="headimg" style="width:100%;vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        
        <div class="words">头像</div>
        <div style="width:60%;">
          <img class="" style="width:30px;height:30px;float:right;margin-top:15px;margin-bottom:15px;" src="../../../assets/littleimg/yonghu.png" alt="">
        </div>
        
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="name" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">姓名</div>
        <div class="information">{{userName}}</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="gender" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">性别</div>
        <div class="information">男</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="unit" style="width:100%;vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        
        <div class="words">单位</div>
        <div class="information">中本硕机电工程有限公司</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="position" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">职务</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="workNO" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">工号</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="phoneNO" style="width:100%;vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        
        <div class="words">电话号码</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="email" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">电子邮箱</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="comtactAddress" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">联系地址</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="emergencyContact" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">紧急联系人</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="passwordSetting" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <div class="words">密码修改</div>
        <div class="information"></div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>




  </div>
</template>
<script>
export default {
  name: "accountinformation",
  components: {
  },
  data() {
    return {
      userName: "",
      isAdministrator: "",
      userId: "",
      gender:"",//性别
      unit:"",//单位
      position:"",//职务
      workNO:"",//工号
      phoneNO:"",//电话号码
      email:"",//电子邮箱
      comtactAddress:"",//联系地址
      emergencyContact:"",//紧急联系人









    };
  },
    created: function() {
    var _this = this;
    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;
    // console.log("用户名" + _this.userName);
  }
}
  </script>
  <style scoped>
.accountinformation{
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.img{
  width: 20px;
  height:20px;
  margin-top:20px;
  margin-bottom:20px;
  margin-left:20px;
  
}
.icon_img{
  width: 20px;
  height:20px;
  margin:19px;
}
.words{
  margin-left:10px;
  margin-right:18px;
  margin-top:18px;
  margin-bottom:18px;
  text-align: left;
  width:20%;
}
.information{
  margin-top:18px;
  margin-bottom:18px;
  text-align: right;
  width:60%;

}
</style>