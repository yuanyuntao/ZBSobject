// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import router from './router'
// import VueParticles from 'vue-particles'
// import AMap from 'vue-amap'
// import ListTest from "./components/listTest"
// Vue.use(VueParticles)
// Vue.use(AMap)
//{ path: "/listTest", component: ListTest , meta: { title: '测试'} },



import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import Moment from 'moment'
import datePicker from 'multifunctional-datepicker'
//Userlogin
import Userlogin from "./components/EmployeeAttendanceProject/userlogin"


//homepage
import Homepage from "./components/EmployeeAttendanceProject/homepage"
import Signpage from "./components/EmployeeAttendanceProject/homepages/signpage"
import Rulespage from "./components/EmployeeAttendanceProject/homepages/rulespage"
import Outsignpage from "./components/EmployeeAttendanceProject/homepages/outsignpage"
import Contactpage from "./components/EmployeeAttendanceProject/homepages/contactpage"
import Personal_inforpage from "./components/EmployeeAttendanceProject/homepages/personal_inforpage"
import SelectApproverpage from "./components/EmployeeAttendanceProject/homepages/selectApproverpage"
import SelectCCpage from "./components/EmployeeAttendanceProject/homepages/selectCCpage"
import AgencyMatters from "./components/EmployeeAttendanceProject/homepages/agencyMatters"
import Calendar from "./components/EmployeeAttendanceProject/homepages/calendar"


//application
import Application from "./components/EmployeeAttendanceProject/application"
import Notificationpage from "./components/EmployeeAttendanceProject/applications/notificationpage"
import LeaveRequestpage from "./components/EmployeeAttendanceProject/applications/leaveRequestpage"
import OvertimeRequestpage from "./components/EmployeeAttendanceProject/applications/overtimeRequestpage"
import OutRequestpage from "./components/EmployeeAttendanceProject/applications/outRequestpage"
import TravelRequestpage from "./components/EmployeeAttendanceProject/applications/travelRequestpage"

//management
import Management from "./components/EmployeeAttendanceProject/management"

//dynamic
import Dynamic from "./components/EmployeeAttendanceProject/dynamic"

//myinfor
import Myinfor from "./components/EmployeeAttendanceProject/myinfor"
import Accountinformation from "./components/EmployeeAttendanceProject/myinfor/accountinformation"








Vue.prototype.$datepicker = datePicker
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(Moment)

Vue.filter('dateformat', function(data) {
  if (data==1) {
    return 11
  }else{
    return 22
  }
  
})

Vue.config.productionTip = false

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: "/", component: Userlogin },
    //首页
    { path: "/homepage", component: Homepage , meta: { title: '首页'} },
    { path: "/signpage", component: Signpage , meta: { title: '考勤打卡'} },
    { path:"/rulespage",component:Rulespage , meta: { title: '考勤规则'} },
    { path: "/outsignpage", component: Outsignpage , meta: { title: '外勤打卡'} },
    { path: "/contactpage", component: Contactpage , meta: { title: '公司通讯录'} },
    { path: "/personal_inforpage", component: Personal_inforpage ,meta: { title: '详细信息'} },
    { path: "/selectApproverpage", component: SelectApproverpage , meta: { title: '选择审批人'} },
    { path: "/selectCCpage", component: SelectCCpage ,meta: { title: '选择抄送人'} },
    { path: "/agencyMatters", component: AgencyMatters ,meta: { title: '待办事项'} },
    { path: "/calendar", component: Calendar ,meta: { title: '考勤记录'} },

    //应用中心
    { path: "/application", component: Application , meta: { title: '应用中心'} },
    { path: "/notificationpage", component: Notificationpage ,meta: { title: '公告通知'} },
    { path: "/leaveRequestpage", component: LeaveRequestpage ,meta: { title: '休假申请'} },
    { path: "/overtimeRequestpage", component: OvertimeRequestpage ,meta: { title: '加班申请'} },
    { path: "/outRequestpage", component: OutRequestpage ,meta: { title: '外出申请'} },
    { path: "/travelRequestpage", component: TravelRequestpage ,meta: { title: '出差申请'} },
    
    //管理
    { path: "/management", component: Management , meta: { title: '管理'} },
    
    //动态
    { path: "/dynamic", component: Dynamic , meta: { title: '动态'} },
    
    //个人中心
    { path: "/myinfor", component: Myinfor , meta: { title: '个人中心'} },
    { path: "/accountinformation", component: Accountinformation ,meta: { title: '账号信息'} },

    

    //测试用
    
    // { path: "/simpleindex", component: Simpleindex ,meta: { title: '日历测试2'} },
    // { path: "/listTest", component: ListTest , meta: { title: '测试用'} },

    
    
    

  ]
})

router.beforeEach((to, from, next) => {

  /* 路由发生变化修改页面title */
 
  if (to.meta.title) {
 
  document.title = to.meta.title;
 
  }
 
  next();
 
 })

Vue.http.interceptors.push((request, next) => {
  let timeout;
  // 如果某个请求设置了_timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
  if (request._timeout) {
    timeout = setTimeout(() => {
      if (request.onTimeout) {
        request.onTimeout(request);
        request.abort()
      }
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
    return response;
  })
})

Vue.prototype.getSERVER_HOST_MAIN = function (){
//  return  "47.99.72.90"
 return  "192.168.5.236"
// return  "192.168.2.200"

}
Vue.prototype.getSERVER_PORT_MAIN = function (){
  return  "8080"
 }
 Vue.prototype.getPROJECT_MAIN = function (){
  return  "ZBSAttendance"
 }
//格式化时间
 Vue.prototype.getTIME = function(time, type) {
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
  if (type == 1) {
    return year + "年" + month + "月" + day + "日" + "  " + week;
  } else if (type == 2) {
    return hours + ":" + minutes + ":" + seconds;
  } else if (type == 3) {
    return  year + "-" + month + "-" +day +" " + hours + ":" + minutes + ":" +seconds
  } else if (type == 4) {
    return year + "-" + month + "-" + day;
  } else if(type == 5){
    return year +"-" +month +"-" +day +" " +"  " +week +"   " +hours +":" +minutes +":" +seconds
  } else if(type == 6){
    return year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds
  }
}

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  // router,
  template: "<app/>",
  //   template: `
  //   <div id="app">
  //   <ul>
  //   <li>
  //   <router-link to="/">Users</router-link>
  //   <router-link to="/test">Test</router-link>
  //   </li>
  //   </ul>
  //   <router-view></router-view>
  //   </div>
  //   `,
  // }).$mount("#app")
}).$mount("#app")


