
<template>
  <div>
    <div class="userlogin">
      <img class="inner_label login_logo" src="../../assets/logo.png">
    </div>
    <div class="login_form">
      <input type="text" class="qxs-ic_user qxs-icon" placeholder="用户名" v-model="userId">
      <input type="password" class="qxs-ic_password qxs-icon" placeholder="密码" v-model="password">
      <!-- <button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button> -->
      <button class="login_btn" @click="login" type="primary" round :loading="isBtnLoading">登录</button>
      <div style="margin-top: 10px">
        <span style="color: #000099;">注册</span>
        <span>&nbsp; &nbsp;</span>
        <span style="color: #A9A9AB">忘记密码？</span>
      </div>
    </div>
  </div>
</template>
<script>
import { encrypt,decrypt } from "../js/utils.js";
export default {
  name: "userlogin",
  data() {
    return {
      userId: "",
      password: "",
      isBtnLoading: false
    };
  },
  created() {
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).userId
    ) {
      this.userId = JSON.parse(localStorage.getItem("user")).userId;
      this.password = JSON.parse(localStorage.getItem("user")).password;
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return "登录中...";
      return "登录";
    }
  },
  methods: {
    login() {
      if (!this.userId) {
        alert("请输入用户名");
        return;
      }
      if (!this.password) {
        alert("请输入密码");
        return;
      }

      var content = {
        userId:this.userId,
        password:this.password,
      }
      var contentData = encrypt(JSON.stringify(content)); 
      
      let url =
        "http://" + 
        this.getSERVER_HOST_MAIN() + ":" + 
        this.getSERVER_PORT_MAIN()+"/"+ 
        this.getPROJECT_MAIN() + "/user/login.do?content=" + 
        encodeURIComponent(contentData);
      this.$http
        .get(url, {
          params: {},
          _timeout: 10000,
          onTimeout: request => {
            alert("请求超时");
          }
        })
        .then(function(response) {
          var returnData =  JSON.parse(decrypt(response.bodyText))
          if (returnData.result == "success") {
            var isAdministrator =false
            if (returnData.user.company_id == 0 || returnData.user.role == 1) {
              isAdministrator = true
            }
            this.$router.push({
              path: "/homepage",
              query: {
                userId: returnData.user.user_id,
                userName:returnData.user.user_name,
                isAdministrator:isAdministrator,
              }
            });
          } else if (returnData.result == "fail") {
            alert("用户名或密码不正确！");
          } else {
            alert("连接错误！");
          }
        });

      // this.$router.push("/loginsuccess");
      // console.log("pressed.....");
    }
  }
};
</script>
<style scoped>

#login {
  background-color: #cfb0ab;
  padding: 0;
  margin: 0;
}
.inner_label {
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding-top: 20%;
  margin: auto;
  width: 30%;
  height: 30%;
}

.qxs-icon {
  height: 40px;
  width: 100%;
  margin-bottom: 50x;
  padding-left: 20%;
  border: 0;
  border-bottom: solid 1px lavender;
}
.outer_label {
  position: relative;
  left: 10;
  top: 0;
  width: 100%;
  height: 220px;
  background: -webkit-linear-gradient(
    left,
    #000099,
    #2154fa
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #000099,
    #2154fa
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #000099,
    #2154fa
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #000099,
    #2154fa
  ); /* 标准的语法 */ /*background-color: #000099;*/
  text-align: center;
  filter: brightness(1.4);
}

.login_form {
  padding-top: 10%;
  padding-left: 10%;
  padding-right: 10%;
}

.qxs-ic_user {
  width: 80%;
  height: 40px;
  font-size: 20px;
  size: medium;
  background: url("../../assets/ic_user.png") no-repeat;
  background-size: 30px 30px;
  background-position: 3%;
}
.qxs-ic_password {
  width: 80%;
  height: 40px;
  font-size: 20px;
  background: url("../../assets/ic_password.png") no-repeat;
  background-size: 30px 30px;
  background-position: 3%;
  margin-bottom: 20px;
}
.login_logo {
  height: 100%;
}
.login_btn {
  width: 80%;
  font-size: 30px;
  border-radius: 10px;

  background: -webkit-linear-gradient(
    left,
    #1c1c97,
    #2154fa
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #1c1c97,
    #2154fa
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #1c1c97,
    #2154fa
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #5c5cdd, #9aa8d6); /* 标准的语法 */
  filter: brightness(1.4);
}
</style>



