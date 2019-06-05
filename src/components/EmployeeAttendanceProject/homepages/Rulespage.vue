


<template>

<div class="rules"> 
  <!-- <div style="padding-top:10px;font-weight: bold;color:#fff;font-size: 25px;letter-spacing:5px"><span >考勤规则</span></div> -->
<div style="height:1px"></div>
<!-- <div v-for="item in ruledata" v-bind:key="item.id" type="primary" round style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;" > -->
  
<div v-for="item in ruledata" v-bind:key="item.id" type="primary" round style=" border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin: 10px;" >
  <span style="font-size: 16px;font-weight: bold;">{{item.rule_name}}</span>
    <br/>
    <span style="font-size: 16px;font-weight: bold;">{{item.rule_time}}</span>
    <br>
    <span style="font-size: 13px;color:#91918c">{{item.rule_range}}</span>
    
</div>
</div>

</template>






<script>
import Divtool from "../toolsComponent/Divtool.vue";

export default {
    name: 'rulespage',
    components: { 
      Divtool
       },
    data() {
    return {
      ruledata:[],
    };
  },

 methods: {
 
 },
  created: function() {
    console.log("开始");
    var _this = this;
    _this.$http
      .get(
        "http://"+this.getSERVER_HOST_MAIN()+":" + this.getSERVER_PORT_MAIN()+"/ZBSAttendance/user/searchAttendanceRules.do?manager=0"
      )
      .then(function(response) {
        var total = response.data.attendanceRule
        for (let i = 0; i < total.length; i++) {
              _this.ruledata.push({
                rule_name: total[i].rule_name,
                rule_address: total[i].rule_address,
                rule_time:total[i].rule_time_work+"-"+total[i].rule_time_off_work,
                rule_range: total[i].rule_address+"半径"+parseFloat(total[i].rule_radius).toFixed(0)+"米",
              });
          }
          
        
      });

    console.log("结束");
  },



}




</script>

<style scoped>
.rules{
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/bigimg/bg_attendance.jpeg");
  background-size: 100% 100%;
  background-attachment: fixed;
  /* padding:10px; */
 
}
</style>
