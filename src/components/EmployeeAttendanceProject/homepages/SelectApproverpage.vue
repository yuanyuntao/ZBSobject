<template>
  <div class="selectApproverpage">
    <div class="search_guide">
      <div style="height:7px;background-color: #45d4c1;"></div>
      <div style="height:70px;background-color: #45d4c1;">
        <div
          class="searchdiv"
          round
          style=" height:40px;border-radius:10px;border:1px solid #bbbebe;text-align:left;background-color: #fff;padding:10px;margin: 10px;margin-top:0px;display: flex;"
        >
          <input
            type="text"
            class="search"
            ref="returnsearch"
            placeholder="Search..."
            v-model="searchsth"
            @keyup="dosearch"
          >
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

    <div style="padding-top:78px;padding-bottom:130px">
      <ApproveAndCCList
        v-for="item in displaysheetList"
        :item="item"
        :showSheet="showList"
        v-bind:key="item.id"
        @change="getVal"
      ></ApproveAndCCList>
      <span v-show="shownone" style="color:#6b6869">没有查到相关信息...</span>
    </div>
    <div class="showselected" v-show="ifshowselected">
      <div>
        <span>已选中{{selectednum}}人</span>
        <button class="sure_icon" @click="sureclick" type="primary" round>确定</button>
      </div>
      <div class="sl" style="display:flex;margin-top:10px;overflow: auto">
        <div v-for="(item,index) in choseList" :key="item.id" style="display:flex">
          <div>
            <div class="head_image" v-text="item.substr(item.length-1, 1)"></div>
            
              <p v-text="item" style="font-size: 12px;margin:5px;"></p>

            
          </div>

          <img
            class="arrow"
            v-show="index != (choseList.length-1) "
            src="../../../assets/littleimg/jiantou.png"
            alt
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApproveAndCCList from "../toolsComponent/ApproveAndCCList.vue";
export default {
  name: "selectApproverpage",
  components: {
    ApproveAndCCList
  },
  data() {
    return {
      userId: "",
      isAdministrator: "",
      userName: "",

      searchsth: "",
      shownone: false,
      showList: true,
      ifshowselected: false,
      selectednum: 0, //已选中人数
      sheetLists: [],
      displaysheetList: [],
      choseList: [],
      choseListCC:[],
      sheetListsCC:[],
      address: "", //打卡地点
      outReasons: "", //外出事由
      defaultparam:0,//打卡类型
      imgs:[],//图片
      from:"",//来自哪个页面

      //休假
      defaultType: "",//休假类型
      startTime: "",//开始时间
      endTime: "",//结束时间
      leaveDays:"",//请假天数
      leaveHours:"",//请假小时数
      leaveReasons: "",//休假原因

      outAddress: "",//外出/出差


    };
  },
  computed: {},
  methods: {
    //监听返回按钮
    goBack(){
      this.$router.push({
        path: this.from,
        query: {
          pagename: "selectApproverpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListApprove: this.choseList,
          sheetListsApprove:this.sheetLists,
          choseListCC: this.choseListCC,
          sheetListsCC:this.sheetListsCC,
          address: this.address,
          outReasons:this.outReasons,
          defaultparam:this.defaultparam,
          imgs:this.imgs,

          defaultType:this.defaultType,
          leaveReasons:this.leaveReasons,
          startTime: this.startTime,
          endTime: this.endTime,
          leaveDays:this.leaveDays,
          leaveHours:this.leaveHours,
          outAddress:this.outAddress,
        }
      });
  },
    //修改选中状态
    getVal: function(res) {
      for (let j = 0; j < this.sheetLists.length; j++) {
        for (let f = 0; f < this.sheetLists[j].users.length; f++) {
          if (this.sheetLists[j].users[f].user_name == res) {
            this.sheetLists[j].users[f].chose = !this.sheetLists[j].users[f]
              .chose;
          }
        }
      }

      var have = false;
      for (let i = 0; i < this.choseList.length; i++) {
        if (this.choseList[i] == res) {
          this.choseList.splice(i, 1);
          have = true;
        }
      }
      if (!have) {
        this.choseList.push(res);
      }
      this.selectednum = this.choseList.length;
      if (this.selectednum > 0) {
        this.ifshowselected = true;
      } else {
        this.ifshowselected = false;
      }
      if (this.searchsth != "") {
        this.dosearch()
      }
    },
    //清除搜索框
    inputClear() {
      this.searchsth = "";
      this.displaysheetList = this.sheetLists;
      this.shownone = false;
      this.showList = true;
      return;
    },
    //获取联系人列表
    sureclick() {

      this.$router.push({
        path: this.from,
        query: {
          pagename: "selectApproverpage",
          userId: this.userId,
          isAdministrator: this.isAdministrator,
          userName: this.userName,
          choseListApprove: this.choseList,
          sheetListsApprove:this.sheetLists,
          choseListCC: this.choseListCC,
          sheetListsCC:this.sheetListsCC,
          address: this.address,
          outReasons:this.outReasons,
          defaultparam:this.defaultparam,
          imgs:this.imgs,

          defaultType:this.defaultType,
          leaveReasons:this.leaveReasons,
          startTime: this.startTime,
          endTime: this.endTime,
          leaveDays:this.leaveDays,
          leaveHours:this.leaveHours,
          outAddress:this.outAddress,
        }
      });
    },
    dosearch: function() {
      if (this.searchsth == "") {
        console.log("我没变");
        this.displaysheetList = this.sheetLists;
        this.shownone = false;
        this.showList = false;
        return;
      } else {
        this.displaysheetList = [];
        for (let i = 0; i < this.sheetLists.length; i++) {
          if (this.sheetLists[i].department.search(this.searchsth) != -1) {
            console.log("i：" + i);
            this.displaysheetList.push(this.sheetLists[i]);
          } else {
            if (this.sheetLists[i].department.search(this.searchsth) == -1) {
              var have = false;

              for (let j = 0; j < this.sheetLists[i].users.length; j++) {
                if (
                  this.sheetLists[i].users[j].user_name.search(
                    this.searchsth
                  ) != -1
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
                      this.sheetLists[i].department ==
                      this.displaysheetList[f].department
                    ) {
                      this.displaysheetList[f].users.push({
                        user_name: this.sheetLists[i].users[j].user_name,
                        user_id: this.sheetLists[i].users[j].user_id, //姓名
                        department: this.sheetLists[i].users[j].department, //部门
                        position: this.sheetLists[i].users[j].position, //职位
                        phone_number: this.sheetLists[i].users[j].phone_number, //电话
                        mail_address: this.sheetLists[i].users[j].mail_address, //邮箱
                        contact_address: this.sheetLists[i].users[j]
                          .contact_address, //联系地址
                        icon_url: this.sheetLists[i].users[j].icon_url, //头像
                        haveicon: this.sheetLists[i].users[j].haveicon, //是否有头像
                        icon_word: this.sheetLists[i].users[j].icon_word, //取代头像的字段
                        chose: this.sheetLists[i].users[j].chose
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (this.displaysheetList.length == 0) {
        this.shownone = true;
      } else {
        this.shownone = false;
        this.showList = true;
        for (let v = 0; v < this.displaysheetList.length; v++) {
          this.displaysheetList[v].num = this.displaysheetList[v].users.length;
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
    // this.getcontactlist();
    _this.choseList = this.$route.query.choseListApprove;
    _this.choseListCC = this.$route.query.choseListCC;
    _this.sheetListsCC = this.$route.query.sheetListsCC;
    _this.userId = this.$route.query.userId;
    console.log("id"+_this.userId);
    _this.isAdministrator = this.$route.query.isAdministrator;
    _this.userName = this.$route.query.userName;
    _this.from = this.$route.query.pagename;
    if ( _this.from == "outsignpage" ) {
      _this.address = this.$route.query.address;
      _this.outReasons = this.$route.query.outReasons;
      _this.defaultparam = this.$route.query.defaultparam
      _this.imgs = this.$route.query.imgs;
    }else if ( _this.from == "leaveRequestpage" || _this.from == "overtimeRequestpage" ) {
      _this.defaultType = this.$route.query.defaultType;
      _this.leaveReasons = this.$route.query.leaveReasons;
      _this.startTime = this.$route.query.startTime
      _this.endTime = this.$route.query.endTime;
      _this.leaveDays = this.$route.query.leaveDays;
      _this.leaveHours = this.$route.query.leaveHours;
    }else if ( _this.from == "outRequestpage" || _this.from == "travelRequestpage" ) {
      _this.defaultType = this.$route.query.defaultType;
      _this.leaveReasons = this.$route.query.leaveReasons;
      _this.startTime = this.$route.query.startTime
      _this.endTime = this.$route.query.endTime;
      _this.leaveDays = this.$route.query.leaveDays;
      _this.leaveHours = this.$route.query.leaveHours;
      _this.outAddress = this.$route.query.outAddress;

    }

    

    this.selectednum = _this.choseList.length;
    if (this.selectednum > 0) {
      this.ifshowselected = true;
      _this.sheetLists=this.$route.query.sheetListsApprove;

      
    } else {
      this.ifshowselected = false;
    _this.$http
      .get(
        "http://" +
          this.getSERVER_HOST_MAIN() +
          ":" +
          this.getSERVER_PORT_MAIN() +
          "/ZBSAttendance/user/searchAllUser.do",
        {
          _timeout: 10000,
          onTimeout: request => {
            alert("请求超时");
          }
        }
      )
      .then(function(response) {
        var resultdata = response.data.departmentList;
        for (let i = 0; i < resultdata.length; i++) {
          _this.sheetLists.push({
            department_id: resultdata[i].department_id,
            department: resultdata[i].department, //部门
            num: resultdata[i].users.length, //人数
            users: []
          });
          for (let j = 0; j < resultdata[i].users.length; j++) {
            var icon_word = resultdata[i].users[j].user_name;
            var icon_url = resultdata[i].users[j].icon_url;
            var haveicon = true;
            if (icon_url == "") {
              haveicon = false;
            } else {
              icon_url = (
                "http://" +
                this.getSERVER_HOST_MAIN() +
                ":" +
                this.getSERVER_PORT_MAIN() +
                icon_url
              ).replace(new RegExp(/(\\)/g), "/");
            }

            _this.sheetLists[i].users.push({
              user_id: resultdata[i].users[j].user_id, //姓名
              user_name: resultdata[i].users[j].user_name, //姓名
              department: resultdata[i].users[j].relationship[0].department, //部门
              position: resultdata[i].users[j].relationship[0].position, //职位
              phone_number: resultdata[i].users[j].phone_number, //电话
              mail_address: resultdata[i].users[j].mail_address, //邮箱
              contact_address: resultdata[i].users[j].contact_address, //联系地址
              icon_url: icon_url, //头像
              haveicon: haveicon, //是否有头像
              icon_word: icon_word.substr(icon_word.length - 1, 1), //取代头像的字段
              chose: false
            });
          }
        }
      });
    }

    this.displaysheetList = _this.sheetLists;
  }
};
</script>

<style scoped>
.selectApproverpage {
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
.showselected {
  position: fixed;
  width: 98%;
  height: 130px;
  left: 1%;
  right: 0;
  bottom: 0;
  background-color: antiquewhite;
  z-index: 999;
  border-radius: 5px;
}
.search {
  padding-top: 8px;
  outline: none;
  height: 30px;
  width: 88%;
  font-size: 18px;
  border: 0;
  -webkit-appearance: none;
  /* margin: 5px; */
  /* margin-right: 10px; */
  /* border: 0px solid rgb(214, 213, 213); */
}
.sure_icon {
  width: 20%;
  margin-left: 50%;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 10px;
  background: #078a07;
  color: aliceblue;
}
.head_image {
  /* width: 60px;
  float: left;
  text-align: center; */
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
.arrow {
  margin-top: 20px;
  width: 20px;
  height: 20px;
}
</style>