<template>
  <div class="recordInformation">
    <div class="moduls">
      <div class="words">申请人</div>
      <div class="information">{{item.user_name}}</div>
    </div>
    <div class="moduls">
      <div class="words">补卡类型</div>
      <div class="information">{{item.type_name}}</div>
    </div>
    <!-- <div class="moduls">
      <div class="words">
        <p style=" margin: 10px 0px;">打卡地址</p>
      </div>
      <div class="information" style="display: flex;">
        <div>{{item.attendance_address}}</div>
        
        <div><img class="dingwei" style="height:30px;width:30px" src="../../../assets/littleimg/dingwei.png"></div>
        
        </div>
    </div> -->
    <div class="moduls">
      <div class="words">补卡日期</div>
      <div class="information">{{item.appeal_time}}</div>
    </div>
    <div class="moduls">
      <div class="words">补卡事由</div>
      <div class="information">
        <div class="outRemarks">{{item.remarks}}</div>
        <div class="outPics" style="display: flex;">
          <div class="sheeImage" v-for="i in item.appealAttendanceRecordPic" v-bind:key="i.id">
            <img class="image" :src="getURL(i.url)">
          </div>
        </div>
      </div>
    </div>
    <div class="moduls">
      <div class="words">申请时间</div>
      <div class="information">{{item.attendance_time}}</div>
    </div>
    <div class="moduls">
      <div class="words">
        <p style=" margin: 25px 0px;">审批流程</p>
      </div>
      <div class="information">
        <div v-for="i in item.appealAttendanceInfoAuditRecord" :key="i.id">
          <div class="auditRecord">
            {{i.user_name}}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            <template v-if="i.audit_status==0">待审批</template>
            <template v-else-if="i.audit_status==1">审批中</template>
            <template v-else-if="i.audit_status==2">审批通过</template>
            <template v-else-if="i.audit_status==3">审批不通过</template>
            <br>
            审批意见：{{i.audit_remarks}}
            <br>
            审批时间：{{i.audit_time}}
          </div>
        </div>
      </div>
    </div>
    <div class="moduls">
      <div class="words">审批结果</div>
      <div class="information">{{item.result}}</div>
    </div>
    
    
  </div>
</template>
<script>
import { encrypt, decrypt } from "../../js/utils.js";
export default {
  name: "recordInformation",
  components: {},
  data() {
    return {
      defaultparam:2,
      opinions:"",//审批意见
      approved:"",//审批状态

      item: "",
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/fieldRecord",
        query: {
          pagename: "recordInformation"
        }
      });
    },
    getURL(url) {
      
      var urlNew = (
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        url
      ).replace(new RegExp(/(\\)/g), "/");
      return urlNew;
    },
    sure(){
      console.log("this.item"+this.item)
      debugger
      var content = {
        userId: localStorage.getItem("userId"),
        resultId: this.item.result_id,
        remarks: this.opinions, //查询条数
        auditStatus: this.defaultparam,
        outAttendanceId: this.item.out_attendance_id,
        outAttendanceRecordAuditId: this.item.outAttendanceRecordAudit_id,
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        localStorage.getItem("serverPublicKey")
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/submitApprovalOutAttendance.do";
      this.$ajax
        .post(url, headerAndBody.contentDataByKey, {
          headers: {
            appEncryptedKey: headerAndBody.appEncryptedKey, //使用服务器RSA公钥加密后的AES密钥
            appSignature: headerAndBody.appSignature, //APP使用RSA密钥对请求体的签名
            appPublicKey: headerAndBody.appPublicKey,
            serverPublicKey: headerAndBody.serverPublicKey
          }
        })
        .then(response => {
          var returnKey = this.RSAdecrypt(
            response.headers.serverencryptedkey,
            this.getPrivatekey()
          );
          let returnResponseData = response.data;
          let encrypt = returnResponseData.replace(/[\r\n]/g, "");
          var returnData = decrypt(encrypt, returnKey, this.getIV());

          var returnData = JSON.parse(returnData);

          if (returnData.code == 1001) {
            alert("审批成功！")
            this.goBack();

          } else if (returnData.code == 1014) {
            alert("审批失败！")
            return;
          } else {
            alert("审批失败，请稍后再试！")
            return;
          }
        });


    },
  },
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }

  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  created: function() {
    var _this = this;
    _this.item = this.$route.query.item;
    debugger
    

    // console.log("用户名" + _this.userName);
  }
};
</script>
  <style scoped>
.recordInformation {
  width: 100%;
  background-color: rgb(240, 240, 240);
  text-align: center;
}
.img {
  width: 20px;
  height: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.icon_img {
  width: 20px;
  height: 20px;
  margin: 19px;
}
.words {
  margin-left: 10px;
  /* margin-right:18px; */
  margin-top: 18px;
  margin-bottom: 18px;
  text-align: left;
  vertical-align: middle;
  font-size: 18px;
  color: #000;
  width: 25%;
  /* position: absolute; */
}
.information {
  margin-top: 18px;
  margin-bottom: 18px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: right;
  width: 75%;
  
}
.auditRecord {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid rgb(240, 240, 240);
}
.outRemarks {
  text-align: left;
}
.image {
  width: 50px;
  height: 50px;
  margin: 6px;
  
  background-color: #4debd0;
  color: #fff;
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.moduls {
  width: 100%;
  vertical-align: middle;
  display: flex;
  background-color: #fff;
  margin-bottom: 2px;
  
}
.surediv {
  vertical-align: middle;
  background-color: #fff;
  margin-bottom: 20px;
  
}
.Opinions {
  height: 60px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid rgb(240, 240, 240);
}
.sure {
  width: 55%;
  color: #fff;
  font-size: 28px;
  margin-top: 20px ;
  border-radius: 10px;
  background-color: rgb(68, 124, 56); /* 标准的语法 */
  filter: brightness(1.4);
}
</style>