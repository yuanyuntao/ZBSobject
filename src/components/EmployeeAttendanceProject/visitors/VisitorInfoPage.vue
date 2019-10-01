<template>
  <div class="visitorInfoPage">
    <div class="footer_guide">
      <tabbarvisitinfo></tabbarvisitinfo>
    </div>
    <div class="userName">

      <img
        style="margin-top: 40px;width: 100px;height: 100px;background-color: #fff;border-radius: 50%;color: #fff;
               font-size: 32px;font-weight: bold;text-align: center;vertical-align: middle;"
        src="../../../assets/littleimg/yonghu.png" alt>

        <div style="padding:25px;color:#fff;letter-spacing:2px">
          <span>【{{department}}】</span>
          <span>{{userName}}</span>
        </div>
    </div>
    <div class="basicInformation" style="text-align:left;width:100%;">
      <div style="padding:5px;background-color: #fff;">
        基础信息
      </div>
      
      <div class="accountInformation" @click="changepage()" style="width:100%;vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <img class="img" src="../../../assets/littleimg/zhanghao.png" alt="">
        <div class="words">账号信息</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="electronicBusinessCard" @click="changepage('/visitorAddFace')" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <img class="img" src="../../../assets/littleimg/dianzimingpian.png" alt="">
        <div class="words">上传照片</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="languageSetting" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <img class="img" src="../../../assets/littleimg/yuyanshezhi.png" alt="">
        <div class="words">语言设置</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
    </div>

    <div class="versionAndSharing" style="text-align:left;width:100%;padding-top:10px">
      <div style="padding:5px;background-color: #fff;">
        版本与分享
      </div>
      <div class="accountNumber" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <img class="img" src="../../../assets/littleimg/banben.png" alt="">
        <div class="words">版本查看</div>
        
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="electronicBusinessCard" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:2px">
        <img class="img" src="../../../assets/littleimg/banbengengxin.png" alt="">
        <div class="words">版本更新</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
      <div class="languageSetting" style="vertical-align:middle;display:flex;background-color: #fff;margin-bottom:50px">
        <img class="img" src="../../../assets/littleimg/fenxiang.png" alt="">
        <div class="words">分享给他人</div>
        <img class="icon_img" src="../../../assets/littleimg/iconfont.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Tabbarvisitinfo from "../tabbars/Tabbarvisitinfo.vue";
export default {
  name: "visitorInfoPage",
  components: {
    Tabbarvisitinfo
  },
  data() {
    return {
      userName: "",
      department: "",
    };
  },
  methods: {
    changepage(pagename){
       this.$router.push({
        path: pagename,
        query: {
        pagename: "visitorInfoPage",
        }
      });
    }
  },
  created: function() {
    var _this = this;
    _this.userName = localStorage.getItem("userName");
    _this.department = localStorage.getItem("department");
  }
};
</script>
<style scoped>
.visitorInfoPage{
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.footer_guide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
}
.userName{
  
  background-image: url("../../../assets/bigimg/bg_headportrait.png");
  background-size: 100% 100%;
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
  width:80%;
}
</style>