<template>
  <div id="shiyebu" style="width:100%;height:100%;">
    <div id="frist">
      <table border="0px " style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#f07768;padding:5px"> -->
        <th style="padding:5px">
          <label>【总经理】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <!-- <tr style="background:#a2a2ff">
          <th width="25%"></th>
          <th width="50%"></th>
          <th width="25%"></th>
        </tr>-->
        <!-- <td v-for="it in datas.columnList" v-bind:key="it.id" style="background:#edf3f3;padding:5px">
            <div v-if="item[it.dataItem].length<14">{{item[it.dataItem]}}</div>
            <div v-else>
              <marquee>{{item[it.dataItem]}}</marquee>
            </div>
        </td>-->
        <tr v-for="(item,index) in datas.dismanager" v-bind:key="item.id" style="width:100%">
          <template v-if="datas.dismanager[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.dismanager[index].status=='外出'||'出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px " style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#f3b838;padding:5px"> -->
        <th style="padding:5px">
          <label>【统括部长】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.distkbz" v-bind:key="item.id">
          <template v-if="datas.distkbz[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template
            v-else-if="datas.distkbz[index].status=='外出'||datas.distkbz[index].status=='出差'"
          >
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px " style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#d7f338;padding:5px"> -->
        <th style="padding:5px">
          <label>【部长】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disbz" v-bind:key="item.id">
          <template v-if="datas.disbz[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.disbz[index].status=='外出'||datas.disbz[index].status=='出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#2ce014;padding:5px"> -->
        <th style="padding:5px">
          <label>【安全部】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disaqb" v-bind:key="item.id">
          <template v-if="datas.disaqb[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.disaqb[index].status=='外出'||datas.disaqb[index].status=='出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#6876f0;padding:5px"> -->
        <th style="padding:5px">
          <label>【事务部】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disswb" v-bind:key="item.id">
          <template v-if="datas.disswb[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.disswb[index].status=='外出'||datas.disswb[index].status=='出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div id="second">
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#f338ca;padding:5px"> -->
        <th style="padding:5px">
          <label>【采购部】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.discgb" v-bind:key="item.id">
          <template v-if="datas.discgb[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.discgb[index].status=='外出'||datas.discgb[index].status=='出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#14e0c5;padding:5px"> -->
        <th style="padding:5px">
          <label>【PLC部】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.displc" v-bind:key="item.id">
          <template v-if="datas.displc[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else-if="datas.displc[index].status=='外出'||datas.displc[index].status=='出差'">
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#409aee;padding:5px"> -->
        <th style="padding:5px">
          <label>【项目部—广州丘比】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disgzqb" v-bind:key="item.id">
          <template v-if="datas.disgzqb[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template
            v-else-if="datas.disgzqb[index].status=='外出'||datas.disgzqb[index].status=='出差'"
          >
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div id="third">
      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#a840ee;padding:5px"> -->
        <th style="padding:5px">
          <label>【项目部—东莞理光】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disdglg" v-bind:key="item.id">
          <template v-if="datas.disdglg[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template
            v-else-if="datas.disdglg[index].status=='外出'||datas.disdglg[index].status=='出差'"
          >
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div id="fourth">
      <div v-if="datas.disdglg2.length>0">
        <table border="1px" style="width:96%;margin-left:2%;margin-top:20px;font-size:28px">
          <tr v-for="(item,index) in datas.disdglg2" v-bind:key="item.id">
            <template v-if="datas.disdglg2[index].status=='工作中'">
              <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
              <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
              <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
            </template>
            <template
              v-else-if="datas.disdglg2[index].status=='外出'||datas.disdglg2[index].status=='出差'"
            >
              <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
              <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
              <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
            </template>
            <template v-else>
              <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
              <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
              <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
            </template>
          </tr>
        </table>
      </div>

      <table border="0px" style="margin-left:2%;margin-top:20px;font-size:35px">
        <!-- <th style="background:#40eeab;padding:5px"> -->
        <th style="padding:5px">
          <label>【项目部—昆山牧野】</label>
        </th>
      </table>
      <table border="1px" style="width:96%;margin-left:2%;font-size:28px">
        <tr v-for="(item,index) in datas.disksmy" v-bind:key="item.id">
          <template v-if="datas.disksmy[index].status=='工作中'">
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#bcf0b5;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#bcf0b5;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template
            v-else-if="datas.disksmy[index].status=='外出'||datas.disksmy[index].status=='出差'"
          >
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#e8ee97;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#e8ee97;padding:5px;width:25%;">{{item.status}}</td>
          </template>
          <template v-else>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.user_name}}</td>
            <td style="background:#f1cac4;padding:5px;width:50%;">{{item.office}}</td>
            <td style="background:#f1cac4;padding:5px;width:25%;">{{item.status}}</td>
          </template>
        </tr>
      </table>
      <div id="biaoti">
        <img src="../../assets/logo.png" alt="logo" style="width:50px;height:50px;vertical-align:middle">
        <span style="font-size:30px;vertical-align:middle;font-style:bold">
          {{title}}&nbsp; &nbsp;
          <template style="font-size:20px">{{dateFormat(date)}}</template>
        </span>
        <!-- <span style="font-size:30px;vertical-align:middle">{{dateFormat(date)}}</span> -->
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "shiyebu",
  data() {
    return {
      title: "苏州中本硕机电工程有限公司",
      date: new Date(),
      displayedata: "",

      datas: {
        columnList: [
          {
            dataItem: "user_name",
            dataName: "姓名"
          },
          {
            dataItem: "office",
            dataName: "地址"
          },
          {
            dataItem: "status",
            dataName: "状态"
          }
        ], //字段
        total: [], //所有信息合集
        dismanager: [], //总经理显示用
        manager: [], //总经理刷新用
        distkbz: [], //统括部长显示用
        tkbz: [], //统括部长刷新用
        disbz: [], //部长显示用
        bz: [], //部长刷新用
        disaqb: [], //安全部显示用
        aqb: [], //安全部刷新用
        disswb: [], //事务部显示用
        swb: [], //事务部刷新用
        discgb: [], //采购部显示用
        cgb: [], //采购部刷新用
        displc: [], //PLC部显示用
        plc: [], //PLC部刷新用

        disgzqb: [], //广州丘比显示用
        gzqb: [], //广州丘比刷新用
        disdglg: [], //东莞理光显示用
        disdglg2: [], //如果东莞理光数据太多时显示用
        dglg: [], //东莞理光刷新用
        dglgxiangmu: [], //东莞理光接收数据用

        disksmy: [], //昆山牧野项目显示用
        ksmy: [] //昆山牧野项目刷新用
      }
    };
  },
  methods: {
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var week = "星期" + "日一二三四五六".charAt(date.getDay());
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        "  " +
        week +
        "   " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  },

  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
    }, 1000);
    this.displayer = setInterval(function() {
      (_this.datas.manager = []),
        (_this.datas.tkbz = []),
        (_this.datas.bz = []),
        (_this.datas.aqb = []),
        (_this.datas.swb = []),
        (_this.datas.cgb = []),
        (_this.datas.plc = []),
        (_this.datas.gzqb = []),
        (_this.datas.dglg = []),
        (_this.datas.ksmy = []),
        _this.$http
          .get(
            "http://192.168.2.200:8080/ZBSAttendance/user/searchUserStatus.do"
            // ,
            // {},
            // {
            //   headers: {},
            //   emulateJSON: true
            // }
          )
          .then(function(response) {
            _this.total = response.data.department;

            for (let i = 0; i < _this.total.length; i++) {
              if (_this.total[i].department == "总经理") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.manager.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.dismanager = _this.datas.manager;
              }
              if (_this.total[i].department == "统括部长") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.tkbz.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.distkbz = _this.datas.tkbz;
              }
              if (_this.total[i].department == "部长") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.bz.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disbz = _this.datas.bz;
              }
              if (_this.total[i].department == "安全部") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.aqb.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disaqb = _this.datas.aqb;
              }
              if (_this.total[i].department == "事务部") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.swb.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disswb = _this.datas.swb;
              }
              if (_this.total[i].department == "采购部") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.cgb.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.discgb = _this.datas.cgb;
              }
              if (_this.total[i].department == "PLC部") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.plc.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.displc = _this.datas.plc;
              }
              if (_this.total[i].department == "项目部—广州丘比") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.gzqb.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disgzqb = _this.datas.gzqb;
              }
              if (_this.total[i].department == "项目部—东莞理光") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.dglg.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disdglg = _this.datas.dglg;
              }
              if (_this.total[i].department == "项目部—昆山牧野") {
                for (let j = 0; j < _this.total[i].realStatus.length; j++) {
                  _this.datas.ksmy.push({
                    user_name: _this.total[i].realStatus[j].user_name,
                    office: _this.total[i].realStatus[j].office,
                    status: _this.total[i].realStatus[j].status
                  });
                }
                _this.datas.disksmy = _this.datas.ksmy;
              }
            }
          });
      // console.log(_this.datas.dglgxiangmu.length);
      // _this.datas.disdglg = [];
      // _this.datas.disdglg2 = [];
      // if (_this.datas.dglgxiangmu.length > 20) {
      //   for (let i = 0; i < 20; i++) {
      //     _this.datas.disdglg.push(_this.datas.dglgxiangmu[i]);
      //   }
      //   for (let j = 20; j < _this.datas.dglgxiangmu.length; j++) {
      //     _this.datas.disdglg2.push(_this.datas.dglgxiangmu[j]);
      //   }
      // } else {
      //   _this.datas.disdglg = _this.datas.dglgxiangmu;
      //   _this.datas.disdglg2 = [];
      // }

      // console.log("disdglg" + _this.datas.disdglg.length);
      // console.log("dglgxiangmu" + _this.datas.dglgxiangmu.length);
    }, 5 * 1000);
  },
  created: function() {
    var _this = this;
    _this.$http
      .get(
        "http://192.168.2.200:8080/ZBSAttendance/user/searchAttendanceRecord.do"
      )
      .then(function(response) {
        _this.total = response.data.department;

        for (let i = 0; i < _this.total.length; i++) {
          if (_this.total[i].department == "【总经理】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.manager.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.dismanager = _this.datas.manager;
          }
          if (_this.total[i].department == "【统括部长】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.tkbz.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.distkbz = _this.datas.tkbz;
          }
          if (_this.total[i].department == "【部长】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.bz.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disbz = _this.datas.bz;
          }
          if (_this.total[i].department == "【安全部】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.aqb.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disaqb = _this.datas.aqb;
          }
          if (_this.total[i].department == "【事务部】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.swb.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disswb = _this.datas.swb;
          }
          if (_this.total[i].department == "【采购部】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.cgb.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.discgb = _this.datas.cgb;
          }
          if (_this.total[i].department == "【PLC部】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.plc.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.displc = _this.datas.plc;
          }
          if (_this.total[i].department == "【项目部—广州丘比】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.gzqb.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disgzqb = _this.datas.gzqb;
          }
          if (_this.total[i].department == "【项目部—东莞理光】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.dglg.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disdglg = _this.datas.dglg;
          }
          if (_this.total[i].department == "【项目部—昆山牧野】") {
            for (let j = 0; j < _this.total[i].realStatus.length; j++) {
              _this.datas.ksmy.push({
                user_name: _this.total[i].realStatus[j].user_name,
                office: _this.total[i].realStatus[j].office,
                status: _this.total[i].realStatus[j].status
              });
            }
            _this.datas.disksmy = _this.datas.ksmy;
          }
        }
      });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
    if (this.displayer) {
      clearInterval(this.displayer); //在vue实例销毁钱，清除我们的定时器
    }
  }
};
</script>

<style scoped>
#biaoti {
  /* border: 1px solid #f5f2d4; */
  float: right;
  margin-top: 450px;

  /* background-image: url("bbaacckk.jpg");  */
}
#frist {
  float: left;
  width: 25%;
  height: 1060px;
  text-align: center;
  background-color: #c5c5c5;
  /* background-image: url("../../static/bbaacckk.jpg"); */
  /* background-image: url("back.jpg"); */
  /* border: 1px solid #000000;   */
  /* margin-top: 10px; */
  /* margin-right: 8px;
  margin-left: 5px; */
}
#second {
  float: left;
  width: 25%;
  height: 1060px;
  text-align: center;
  background-color: #c5c5c5;
  /* background-image: url("../../static/bbaacckk.jpg"); */
  /* background-image: url("back.jpg"); */
  /* border: 1px solid #000000;  */
  /* margin-top: 10px; */
  /* margin-right: 8px;
  margin-left: 5px; */
}
#third {
  float: left;
  width: 25%;
  height: 1060px;
  text-align: center;
  background-color: #c5c5c5;
  /* background-image: url("../../static/bbaacckk.jpg"); */
  /* background-image: url("back.jpg"); */
  /* border: 1px solid #000000;   */
  /* margin-top: 10px; */
  /* margin-right: 5px;
  margin-left: 5px;
   */
}
#fourth {
  float: right;
  width: 25%;
  height: 1060px;
  text-align: center;
  background-color: #c5c5c5;
  /* background-image: url("../../static/bbaacckk.jpg"); */
  /* background-image: url("back.jpg"); */
  /* border: 1px solid #000000;   */
  /* margin-top: 10px; */
  /* margin-right: 5px;
  margin-left: 5px;
   */
}

.mytest {
  max-height: 30px;
  text-overflow: ellipsis;
}
#jz {
  text-align: center;
}
</style>