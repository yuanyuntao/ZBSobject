<template>
  <div class="contactpage">
    <!-- <div style="padding-top:10px;font-weight: bold;color:#fff;font-size: 25px;letter-spacing:5px">
      <span>公司通讯录</span>
    </div>-->
    <!-- <div style="color: #fff;background-color: #45d4c1;">
      <div style="padding:10px;font-size:25px;letter-spacing:5px;">
        <span>公司通讯录</span>
      </div> -->
    <!-- </div> -->
    <div class="search_guide">
    <div style="height:7px;background-color: #45d4c1;">
      </div>
<div style="height:70px;background-color: #45d4c1;">
    <div
      class="searchdiv"
      round
      style=" height:40px;border-radius:10px;border:1px solid #bbbebe;text-align:left;background-color: #fff;padding:10px;margin: 10px;margin-top:0px;display: flex;"
    >
      <input type="text" class="search" ref="returnsearch" placeholder="Search..." v-model="searchsth" @keyup="dosearch">
      <div style="width=10%;padding-top:0px">
          <img
        src="../../../assets/littleimg/cancle.png"
        alt
        style="width:25px;height:25px;margin: 8px;"
        @click="inputClear"
      >
      </div>
     </div> 
    </div>
    </div>
<div style="padding-top:78px">
<contactlist v-for="item in displaysheetList" :item="item" :showSheet="showList"   :userName="userName" :userId="userId" :isAdministrator="isAdministrator" v-bind:key="item.id"></contactlist>
    <span v-show="shownone" style="color:#6b6869">没有查到相关信息...</span>
</div>
    
  </div>
</template>

<script>
import Contactlist from "../toolsComponent/Contactlist.vue";
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  name: "contactpage",
  components: {
    Contactlist
  },
  data() {
    return {
      userName: "",
      isAdministrator: "",
      userId: "",
      company_id: "",
      serverPublicKey:"",

      searchsth: "",
      shownone:false,
      showList:false,
      sheetLists:[],
      displaysheetList:[],
      
    };
  },
  computed: {
   
    
  },
  methods: {
    //监听返回按钮
    goBack(){
      this.$router.push( "/homepage");
    },
    //清除搜索框
    inputClear() {
      this.searchsth = "";
      this.displaysheetList=this.sheetLists
      this.shownone=false
      this.showList=false
      return

    },
    //获取联系人列表
    getcontactlist() {
      
    },
    dosearch: function() {
      if (this.searchsth=="") {
        console.log("我没变")
        this.displaysheetList=this.sheetLists
        this.shownone=false
        this.showList=false
        return
      } else {
        this.displaysheetList = [];
        for (let i = 0; i < this.sheetLists.length; i++) {
          if (this.sheetLists[i].department.search(this.searchsth) != -1) {
            console.log("i：" + i);
            this.displaysheetList.push(this.sheetLists[i]);
          } else{ if (
            this.sheetLists[i].department.search(this.searchsth) == -1
          ) {
            var have = false;

            for (let j = 0; j < this.sheetLists[i].users.length; j++) {
              if (
                this.sheetLists[i].users[j].user_name.search(this.searchsth) !=
                -1
              ) {
                // console.log(this.sheetList[i].users[j].user_name);
                if (!have) {
                  this.displaysheetList.push({
                    department: this.sheetLists[i].department,
                    num: this.sheetLists[i].num,
                    users: []
                  });
                  have = true;
                }
                for (let f = 0; f < this.displaysheetList.length; f++) {
                  if (
                    this.sheetLists[i].department == this.displaysheetList[f].department
                  ) {
                    this.displaysheetList[f].users.push({
                      user_name: this.sheetLists[i].users[j].user_name,
                      user_id:this.sheetLists[i].users[j].user_id,//姓名    
                      department:this.sheetLists[i].users[j].department,//部门
                      position:this.sheetLists[i].users[j].position,//职位
                      phone_number:this.sheetLists[i].users[j].phone_number,//电话
                      mail_address:this.sheetLists[i].users[j].mail_address,//邮箱
                      contact_address:this.sheetLists[i].users[j].contact_address,//联系地址
                      icon_url:this.sheetLists[i].users[j].icon_url,//头像
                      haveicon:this.sheetLists[i].users[j].haveicon,//是否有头像
                      icon_word:this.sheetLists[i].users[j].icon_word//取代头像的字段
                    });
                  }
                }
              }
            }
          }
        }
        }
      }
      
      if ( this.displaysheetList.length==0) {
        this.shownone=true
      }else{
        this.shownone=false
         this.showList=true
        for (let v = 0; v < this.displaysheetList.length; v++) {
          this.displaysheetList[v].num=this.displaysheetList[v].users.length
        
      }


      }
    }
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
     _this.userId = this.$defines.userId;
    _this.userName = this.$defines.userName;
    _this.isAdministrator = this.$defines.isAdministrator;
    _this.company_id = this.$defines.companyId;
    _this.serverPublicKey = this.$defines.serverPublicKey;


    var url = "http://" +
            this.getSERVER_HOST_MAIN() +
            ":" +
            this.getSERVER_PORT_MAIN() +
            "/"+
            this.getPROJECT_MAIN() +"/user/searchAllUser.do"

      var content = {
        companyId: _this.company_id,
        authority: ""
      };
      var contentData = JSON.stringify(content)
      _this.appPrivateKey = this.getPrivatekey();
      var headerAndBody = this.getHeaderAndBody(contentData,_this.serverPublicKey)
      _this.$ajax
        .post(url,headerAndBody.contentDataByKey,
          {
            headers: {
              appEncryptedKey: headerAndBody.appEncryptedKey, //使用服务器RSA公钥加密后的AES密钥
              appSignature: headerAndBody.appSignature, //APP使用RSA密钥对请求体的签名
              appPublicKey: headerAndBody.appPublicKey,
              serverPublicKey: headerAndBody.serverPublicKey
            },
          }
        )
        .then(function(response) {
          var returnKey = _this.RSAdecrypt(response.headers.serverencryptedkey, _this.appPrivateKey)
          let returnResponseData = response.data
          let encrypt = returnResponseData.replace(/[\r\n]/g,"")
          var returnData = decrypt(encrypt,returnKey,_this.getIV())

          var returnData = JSON.parse(returnData);
          debugger

            var resultdata = returnData.data.departmentList
            for (let i = 0; i < resultdata.length; i++) {
               _this.sheetLists.push({
                   department_id:resultdata[i].department_id,
                   department:resultdata[i].department,//部门
                   num:resultdata[i].users.length,//人数
                   users:[]
               })
               for (let j = 0; j < resultdata[i].users.length; j++) {
                   var icon_word = resultdata[i].users[j].user_name
                   var icon_url = resultdata[i].users[j].icon_url
                   var haveicon = true
                   if (icon_url=="") {
                       haveicon = false
                   }else{
                       icon_url = ("http://" + _this.getSERVER_HOST_MAIN() + ":" + _this.getSERVER_PORT_MAIN() + icon_url).replace(new RegExp(/(\\)/g),'/') ;

                   }

                   _this.sheetLists[i].users.push({
                   user_id:resultdata[i].users[j].user_id,//姓名    
                   user_name:resultdata[i].users[j].user_name,//姓名
                   department:resultdata[i].users[j].department,//部门
                   position:resultdata[i].users[j].position,//职位
                   phone_number:resultdata[i].users[j].phone_number,//电话
                   mail_address:resultdata[i].users[j].mail_address,//邮箱
                   contact_address:resultdata[i].users[j].contact_address,//联系地址
                   icon_url:icon_url,//头像
                   haveicon:haveicon,//是否有头像
                   icon_word:icon_word.substr(icon_word.length-1, 1),//取代头像的字段
               })
               }
                
            }



        });
    
    // this.getcontactlist();
     this.displaysheetList = _this.sheetLists
  }
};
</script>

<style scoped>
.contactpage {
  width: 100%;
  height: 100%;
  /* background-image: url("../assets/bigimg/bg_attendance.jpeg"); */
  /* background-size: 100% 100%;
  background-attachment: fixed; */
}
.search_guide {
  position: fixed;
  left: 0;
  right: 0;
  top: 0px;
  z-index: 999;
}
.search {
  padding-top:8px;
  outline: none;
  height: 30px;
  width: 88%;
  font-size: 18px;
  border:0;
  -webkit-appearance: none;
  /* margin: 5px; */
  /* margin-right: 10px; */
  /* border: 0px solid rgb(214, 213, 213); */
}
</style>