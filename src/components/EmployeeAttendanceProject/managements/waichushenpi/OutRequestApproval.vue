<template>
  <div class="outRequestApproval" ref="outRequestApproval">
    <div class="attendance">
      <div class="pendingTrial" ref="pendingTrial" type="primary" round @click="pendingTrial">
        <span style="vertical-align:middle">待审批</span>
      </div>
      <div class="examined" ref="examined" type="primary" round @click="examined">
        <span style="vertical-align:middle">已审批</span>
      </div>
    </div>
    <div>
      <p style="color:blue;text-decoration: underline" @click="gotoScreening">筛选</p>
    </div>
    <div
      v-for="item in approvalList"
      v-bind:key="item.id"
      style=" border-radius: 10px;text-align:left;background-color: #fff;color:#000;padding:10px;margin: 10px;"
      @click="outsignApproval(item)"
    >
      <!-- <span style="font-size: 14px;font-weight: bold;">{{item.user_name}}</span>
      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span
        style="font-size: 13px;color:#91918c;float:right;"
      >{{item.type_name}}</span>
      <br>
      <span style="font-size: 14px;">{{item.remarks}}</span>
      <br>
      <span style="font-size: 13px;color:#91918c">{{item.attendance_time}}</span> -->
      <template v-if="item.effective==0">
          <img
            src="../../../../assets/littleimg/yishixiao.png"
            style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 50px;"
          />
        </template>
        <template v-else>
          <template v-if="item.result_id==7">
            <img
              src="../../../../assets/littleimg/shenpitongguo.png"
              style=" position: absolute;padding:5px;right:10px;
                width: 60px;
                height: 60px;"
            />
          </template>
          <template v-else-if="item.result_id==8">
            <img
              src="../../../../assets/littleimg/butongguo.png"
              style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 60px;"
            />
          </template>
          <template v-else-if="item.result_id==5">
            <img
              src="../../../../assets/littleimg/zhengzaishenhe.png"
              style=" position: absolute;padding:10px;right:10px;
                width: 60px;
                height: 52px;"
            />
          </template>
        </template>
        <span style="font-size: 14px;font-weight: bold;">{{item.user_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          style="font-size: 13px;color:#91918c;float:right"
        >{{item.vacation_type_name}}</span>
        <br />
        <span style="font-size: 14px;">{{item.start_time}} ~ {{item.start_time}}</span>
        <br>
        <span style="font-size: 14px;">共{{item.day}}天{{item.hour}}小时</span>

        <br />
        <span style="font-size: 13px;color:#91918c">{{item.createTime}}</span>
      </div>
      <div v-if="approvalList.length==0">没有查到相关记录</div>
  </div>
</template>   
<script>
import { encrypt, decrypt } from "../../../js/utils.js";
export default {
  name: "overtimRequestApproval",
  components: {},
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      company_id: "",
      serverPublicKey: "",

      bNum: 0, //从第几条开始
      rows: 20, //查询条数
      bt: "", //开始时间
      et: "", //结束时间
      applicantUserId: "",
      approved: false,

      approvalList: [], //审批列表

      clientHeight: "", //屏幕高度
      totalHeight: "", //总的高度
      nowtime: new Date() //时间
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      localStorage.setItem("outRequeststartTime", "");
      localStorage.setItem("outRequestendTime", "");
      localStorage.setItem("outRequestApplicantUserId", "");
      this.$router.push({
        path: "/management",
        query: {
          pagename: "outRequestApproval"
        }
      });
    },
    //待审批
    pendingTrial() {
      if (localStorage.getItem("outRequestapproved") == "false") {
        return;
      } else {
        this.$refs.pendingTrial.style.background = "rgb(58, 190, 98)";
        this.$refs.pendingTrial.style.color = "#eee";
        this.$refs.pendingTrial.style.border = "1px solid #fff";

        this.$refs.examined.style.background = "#eee";
        this.$refs.examined.style.color = "rgb(58, 190, 98)";
        this.$refs.examined.style.border = "1px solid rgb(58, 190, 98)";
        localStorage.setItem("outRequestapproved", false);
        this.getListData();
      }
    },
    //已审批
    examined() {
      if (localStorage.getItem("outRequestapproved") == "true") {
        return;
      } else {
        this.$refs.examined.style.background = "rgb(58, 190, 98)";
        this.$refs.examined.style.color = "#eee";
        this.$refs.examined.style.border = "1px solid #fff";

        this.$refs.pendingTrial.style.background = "#eee";
        this.$refs.pendingTrial.style.color = "rgb(58, 190, 98)";
        this.$refs.pendingTrial.style.border = "1px solid rgb(58, 190, 98)";
        localStorage.setItem("outRequestapproved", true);
        this.getListData();
      }
    },
    gotoScreening() {
      this.$router.push({
        path: "/outRequestScreening",
        query: {
          pagename: "outRequestApproval",
        }
      });
    },
    getListData() {
      var content = {
        userId: this.userId,
        bNum: 0, //从第几条开始
        rows: 20, //查询条数
        bt: localStorage.getItem("outRequeststartTime")==null||localStorage.getItem("outRequeststartTime")==""?this.getTIME(this.nowtime, 7):localStorage.getItem("outRequeststartTime"), //开始时间
        et: localStorage.getItem("outRequestendTime")==null||localStorage.getItem("outRequestendTime")==""?this.getTIME(this.nowtime, 4):localStorage.getItem("outRequestendTime"), //结束时间
        applicantUserId: localStorage.getItem("outRequestApplicantUserId")==null?"":localStorage.getItem("outRequestApplicantUserId"),
        approved: localStorage.getItem("outRequestapproved")=="true"?true:false
      };
      var contentData = JSON.stringify(content);
      var headerAndBody = this.getHeaderAndBody(
        contentData,
        this.serverPublicKey
      );
      let url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/searchOutGoing.do";
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
          // console.log("returnData....." + returnData);

          var returnData = JSON.parse(returnData);

          if (returnData.code == 1001) {
            this.approvalList = returnData.data.outGoingRecordList;
          } else {
              alert("连接错误，请检查网络！")
            return;
          }
        });
    },
    outsignApproval(item){
      this.$router.push({
        path: "/outRequestDetails",
        query: {
          pagename: "outRequestApproval",
          item:item
        }
      });



    },

    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.outRequestApproval.style.height = clientHeight + "px";
    }
  },
  mounted() {
     if (localStorage.getItem("outRequestapproved") == "true") {
        this.$refs.examined.style.background = "rgb(58, 190, 98)";
        this.$refs.examined.style.color = "#eee";
        this.$refs.examined.style.border = "1px solid #fff";

        this.$refs.pendingTrial.style.background = "#eee";
        this.$refs.pendingTrial.style.color = "rgb(58, 190, 98)";
        this.$refs.pendingTrial.style.border = "1px solid rgb(58, 190, 98)";
      }
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // console.log(self);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  created() {
    var _this = this;
    _this.userId = localStorage.getItem("userId");
    _this.userName = localStorage.getItem("userName");
    _this.isAdministrator = localStorage.getItem("isAdministrator");
    _this.company_id = localStorage.getItem("company_id");
    _this.serverPublicKey = localStorage.getItem("serverPublicKey");
    if (this.$route.query.pagename == "outRequestDetails") {
      localStorage.setItem("outRequestApproved", false);
    }
   
    _this.getListData();
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.totalHeight = this.$refs.outRequestApproval.offsetHeight;
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20;
      }
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style scoped>
.outRequestApproval {
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.attendance {
  padding-top: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10px;
  align-items: center;
  /* margin-top: 10px; */
  display: flex;
  text-align: center;
}
.pendingTrial {
  padding: 5px;
  /* margin-left: 10px; */
  border: 1px solid #fff;
  width: 100px;
  font-size: 18px;
  color: #eee;
  font-weight: bold;
  border-radius: 20px;
  background-color: rgb(58, 190, 98);
}
.examined {
  padding: 5px;
  /* margin-left: 10px; */
  border: 1px solid rgb(58, 190, 98);
  width: 100px;
  font-size: 18px;
  color: rgb(58, 190, 98);
  font-weight: bold;
  border-radius: 20px;
  background-color: #eee;
}
</style>