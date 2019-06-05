<template>
  <div class="outsignpage" ref="outsignpage">
    <div style="padding-top:10px;font-weight: bold;color:#fff;font-size: 25px;letter-spacing:5px">
    </div>
    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;"
    >
      <span style="font-size: 20px;font-weight: bold;">考勤详情</span>
      <br>
      <div style="padding-top:10px;text-align:left">
        <span style="font-size: 15px;color:#91918c">时间：</span>
        <span style="font-size: 15px;font-weight: bold;">{{this.getTIME(nowtime,6)}}</span>
      </div>
      <br>
      <span style="font-size: 15px;color:#91918c">地点：{{address}}</span>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;display: flex;"
      
    >
      <div style=" width: 60%;text-align: left">
        <span style="font-size: 20px;font-weight: bold;">考勤类型</span>
      </div>
      <div style>
        <template v-if="attendanceType==2">
          <input type="radio" name="radios" value="1" v-model="defaultparam" style="vertical-align: middle" disabled>
        </template>
        <template v-else>
          <input
            type="radio"
            name="radios"
            value="1"
            v-model="defaultparam"
            style="vertical-align: middle"
          >
        </template>

        <span style="vertical-align: middle">签到</span>
      </div>
      <div style="padding-left:10px">
        <template v-if="attendanceType==1">
          <input
            type="radio"
            name="radios"
            value="2"
            v-model="defaultparam"
            style="vertical-align: middle"
            disabled
          >
        </template>
        <template v-else>
          <input
            type="radio"
            name="radios"
            value="2"
            v-model="defaultparam"
            style="vertical-align: middle"
          >
        </template>
        <span style="vertical-align: middle">签退</span>
      </div>
    </div>
    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;"
    >
      <div>
        <span style="font-size: 20px;font-weight: bold;">外出事由</span>
        <img
          class="imge"
          style="float: right; width: 20px;height: 20px;padding-right:20px"
          src="../../../assets/littleimg/xiangji.png"
          alt
          @click="imgClick()"
        >
      </div>
      <div>
        <textarea type="text" class="outReasons" placeholder="请输入外出事由" v-model="outReasons"></textarea>
      </div>
      <div class="photos" v-show="imgs.length > 0">
        <!--照片区域-->
        <div
          v-for="(urls, index) in imgs "
          :key="urls.id"
          style=" display: inline-block;
            position: relative;margin-right:10px"
        >
          <img
            src="../../../assets/littleimg/shanchu.png"
            style=" position: absolute;top: 0px;
                right: 0px;
                width: 20px;
                height: 20px;"
            v-on:click="deleteImg(index)"
          >
          <img :src="urls" style="width: 80px;height: 80px;">
        </div>
        <input
          style="float: left;  display: none;"
          type="file"
          id="uploadFile"
          accept="image/*"
          v-on:change="readLocalFile()"
        >
      </div>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">选择审批人</span>
        <img
          class="imge"
          style="float: right; width: 28px;height: 28px;padding-right:20px;"
          src="../../../assets/littleimg/jiahao.png"
          alt
          @click="selectApprover"
        >
      </div>
      <div class="showApproveAndCC" v-show="choseListApprove.length>0">
        <div v-for="(item,index) in choseListApprove" :key="item.id" style="display:flex">
          <div>
            <div class="head_image" v-text="item.substr(item.length-1, 1)"></div>
            <p v-text="item" style="font-size: 12px;margin:5px"></p>
          </div>

          <img
            class="arrow"
            v-show="index != (choseListApprove.length-1) "
            src="../../../assets/littleimg/jiantou.png"
            alt
          >
        </div>
      </div>
    </div>

    <div
      type="primary"
      round
      style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;"
    >
      <div>
        <span style="font-size: 18px;font-weight: bold;">选择抄送人</span>
        <img
          class="imge"
          style="float: right; width: 28px;height: 28px;padding-right:20px"
          src="../../../assets/littleimg/jiahao.png"
          alt
          @click="selectCC"
        >
      </div>
      <div class="showApproveAndCC" v-show="choseListCC.length > 0">
        <div v-for="item in choseListCC" :key="item.id" style="display:flex;padding-right:15px">
          <div>
            <div class="head_image" v-text="item.substr(item.length-1, 1)"></div>
            <p v-text="item" style="font-size: 12px;margin:5px"></p>
          </div>
        </div>
      </div>
    </div>
    <button class="sure" @click="sure" type="primary" round>确定</button>
  </div>
</template>

<script>
export default {
  name: "outsignpage",
  components: {},
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",
      clientHeight: "", //屏幕高度
      totalHeight:"",//总的高度
      nowtime: new Date(), //现在时间
      address: "", //打卡地点
      defaultparam: 1, //默认选择签到类型
      attendanceType: 0, //打卡类型
      outReasons: "", //外出事由
      canIn: true, //是否可以签到
      canOut: true, //是否可以签到
      choseListApprove: [], //审批人
      sheetListsApprove: [], //审批人选择列表
      choseListCC: [], //抄送人
      sheetListsCC: [], //抄送人选择列表
      imgs: [] //上传的图片列表
    };
  },
  methods: {
    //监听返回按钮
    goBack(){
      this.$router.push({
        path: "/signpage",
        query: {
        pagename: "outsignpage",
        userId: this.userId,
        isAdministrator: this.isAdministrator,
        userName: this.userName,
        }
      });
    },
    //删除图片
    deleteImg: function(index) {
      this.imgs.splice(index, 1);
    },
    //图片click
    imgClick: function() {
      document.getElementById("uploadFile").click();
    },
    //点击选中图片
    readLocalFile: function() {
      var localFile = document.getElementById("uploadFile").files[0];
      var reader = new FileReader();
      var content;
      var current = this;
      reader.onload = function(event) {
        content = event.target.result;
        current.imgs.push(content); //获取图片base64代码
      };
      reader.onerror = function(event) {
        alert("error");
      };
      content = reader.readAsDataURL(localFile, "UTF-8");
      var sss = document.getElementById("uploadFile").value;
      console.log(sss);
    },
    selectApprover() {
      this.$router.push({
        path: "/selectApproverpage",
        query: {
          pagename:"outsignpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListApprove: this.choseListApprove,
          sheetListsApprove: this.sheetListsApprove,
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,
          address: this.address,
          outReasons: this.outReasons,
          defaultparam: this.defaultparam,
          imgs: this.imgs
        }
      });
    },
    selectCC: function() {
      //点击跳转对应的页面
      this.$router.push({
        path: "/selectCCpage",
        query: {
          pagename: "outsignpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListCC: this.choseListCC,
          sheetListsCC: this.sheetListsCC,
          choseListApprove: this.choseListApprove,
          sheetListsApprove: this.sheetListsApprove,
          address: this.address,
          outReasons: this.outReasons,
          defaultparam: this.defaultparam,
          imgs: this.imgs
        }
      });
    },
    sure() {},
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.outsignpage.style.height = clientHeight + "px";
    }
  },
  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.nowtime = new Date(); //修改数据date
    }, 1000);
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // console.log(self);
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
      this.totalHeight = this.$refs.outsignpage.offsetHeight
      if (this.totalHeight > this.clientHeight) {
        this.clientHeight = this.totalHeight + 20
      }
      this.changeFixed(this.clientHeight);
    }
  },
  created: function() {
    console.log("开始");
    var _this = this;
    if (this.$route.query.pagename == "signpage") {
      _this.userId = this.$route.query.userId;
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      _this.address = this.$route.query.address;
      _this.defaultparam = this.$route.query.defaultparam;
      _this.attendanceType = this.$route.query.type;
      // console.log("地址是：" + _this.address+_this.attendanceType);
    } else if (this.$route.query.pagename == "selectApproverpage") {
      _this.userId = this.$route.query.userId;
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      _this.choseListApprove = this.$route.query.choseListApprove;
      _this.sheetListsApprove = this.$route.query.sheetListsApprove;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.address = this.$route.query.address;
      _this.outReasons = this.$route.query.outReasons;
      _this.defaultparam = this.$route.query.defaultparam;
      _this.imgs = this.$route.query.imgs;
    } else if (this.$route.query.pagename == "selectCCpage") {
      _this.userId = this.$route.query.userId;
      _this.isAdministrator = this.$route.query.isAdministrator;
      _this.userName = this.$route.query.userName;
      _this.choseListApprove = this.$route.query.choseListApprove;
      _this.sheetListsApprove = this.$route.query.sheetListsApprove;
      _this.choseListCC = this.$route.query.choseListCC;
      _this.sheetListsCC = this.$route.query.sheetListsCC;
      _this.address = this.$route.query.address;
      _this.outReasons = this.$route.query.outReasons;
      _this.defaultparam = this.$route.query.defaultparam;
      _this.imgs = this.$route.query.imgs;
    }
  }
};
</script>

<style scoped>
.outsignpage {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/bigimg/bg_attendance.jpeg");
  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
}
.outReasons {
  height: 50px;

  width: 100%;
  font-size: 15px;

  /* padding: 10px; */

  border: 0;
}
.sure {
  width: 55%;
  font-size: 28px;
  border-radius: 10px;
  background: linear-gradient(to right, #45d4c1, #b1d1cd); /* 标准的语法 */
  filter: brightness(1.4);
}
.head_image {
  margin: 5px;
  width: 35px;
  height: 35px;
  background-color: #4debd0;
  border-radius: 50%;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.showApproveAndCC {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
.photos {
  display: flex;
  margin-top: 10px;
  text-align: center;
  overflow: auto;
}
.arrow {
  margin-top: 20px;
  width: 20px;
  height: 20px;
}
</style>