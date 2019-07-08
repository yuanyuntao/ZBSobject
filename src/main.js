// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import router from './router'
// import VueParticles from 'vue-particles'
// import AMap from 'vue-amap'
import FaceDetection from "./components/faceDetection"
// Vue.use(VueParticles)
// Vue.use(AMap)




import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import Moment from 'moment'
import datePicker from 'multifunctional-datepicker'
//Userlogin
import Userlogin from "./components/EmployeeAttendanceProject/userlogin"
import axios from 'axios'
axios.defaults.timeout = 10000;
Vue.prototype.$ajax= axios




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
import AttendanceCard from "./components/EmployeeAttendanceProject/applications/attendanceCard/attendanceCard"
import FieldRecord from "./components/EmployeeAttendanceProject/applications/attendanceCard/fieldRecord"
import RecordInformation from "./components/EmployeeAttendanceProject/applications/attendanceCard/recordInformation"

//management
import Management from "./components/EmployeeAttendanceProject/management"
import PunchInDetails from "./components/EmployeeAttendanceProject/managements/punchInDetails"
import Screening from "./components/EmployeeAttendanceProject/managements/screening"
import FieldApproval from "./components/EmployeeAttendanceProject/managements/fieldApproval"
import MakeUpCardApproval from "./components/EmployeeAttendanceProject/managements/bukashenpi/makeUpCardApproval"
import MakeUpCardScreening from "./components/EmployeeAttendanceProject/managements/bukashenpi/makeUpCardScreening"
import MakeUpCardDetails from "./components/EmployeeAttendanceProject/managements/bukashenpi/makeUpCardDetails"


//dynamic
import Dynamic from "./components/EmployeeAttendanceProject/dynamic"

//myinfor
import Myinfor from "./components/EmployeeAttendanceProject/myinfor"
import Accountinformation from "./components/EmployeeAttendanceProject/myinfor/accountinformation"

import JsEncrypt from 'jsencrypt'
import Jsrsasign from 'jsrsasign'
import { getRandom , encrypt ,decrypt} from "./components/js/utils.js";

Vue.prototype.$jsEncrypt = JsEncrypt

import defines from './components/js/Parameters.js'
Vue.prototype.$defines = defines

//滑动测试
import Refersh from './components/TestProject/refersh'

// Vue.prototype.$RSA = Jsrsasign

import ttt from './components/EmployeeAttendanceProject/toolsComponent/ttt'


/**
 * 公钥和私钥
 */
Vue.prototype.getPublicKey = function () {
let publickey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNtgJEtTkXVxw7bQlCD4Xb0UZi4KNqZV28MQGhH0BHnQqO2czme9LHwZz48qYw31Gu9/Djr4yWI5EIJZCQKcu37SvWhNZ0jj28pT2PtWVhc4MtzRk/NqcEyBlCNFA97Li/q3O+7hopTvaOZNOyM1qexbJJLY9NhwruwDXdMMhTQwIDAQAB"
  return publickey
}
Vue.prototype.getPrivatekey = function () {
  let privatekey = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAI22AkS1ORdXHDttCUIPhdvRRmLgo2plXbwxAaEfQEedCo7ZzOZ70sfBnPjypjDfUa738OOvjJYjkQglkJApy7ftK9aE1nSOPbylPY+1ZWFzgy3NGT82pwTIGUI0UD3suL+rc77uGilO9o5k07IzWp7Fskktj02HCu7ANd0wyFNDAgMBAAECgYEAgjN2RhaTi+RXZio6VV3ZySuwlex7eKgFxYDpVFZYQvQA3VszrZibAznatciL9V9Zt37K7wc+DjxDZs7M0gf0yXpymNj7uXf+ZYvubOAloJK0DsdZq/wUgJmG5WhbbEwPOP/laOlsP7SQ9GAkpt72CwPSUkBobutJxWmjmC+7A6ECQQDVeBmio8XXpL2yBEfLcGilEUMn/1qN9tXBl6B6hSDPibm1KqX5K8+HA83Lq02P+3PpmWTA98eimwPSS95KqBSZAkEAqfHqMHuTqpm4ec0K77hGPeza8UCM+hxmB/8deSIN3syWhoDW+nhXWIFK8ADMftsf1Pl7W6JMl32UPDbFJBC0OwJAcIE3oYwG/TwJ7gRrgkDgJf8PEcl3BFMPHVS4c1oujLLdeSndB5GbcmEC2VCTNEsmL/t0Km9se7qPLQpnQZmMIQI/Go2yCeFFMWLTcDSZgNtKHmLj0s5DONE3IAi8kjC/+g/9dQaskHY9L5cEHnwBd9DFKIHSxH6XeRQmFUJ5iykRAkAQPyw9kFQbek6IQvJOT3w5bnrn+Ug+loQfLqQLoAbMWJmsD75VXYV1b2GQR9r7HWWw5rxECXERDhGHSoAkBJc7"
  

  return privatekey
}



Vue.prototype.jsEncrypt = function (PublicKey,AESkey) {
  let encrypt = new JsEncrypt()
  encrypt.setPublicKey(PublicKey)
  return encrypt.encrypt(AESkey)
}
//加密方法
Vue.prototype.RSAencrypt = function (pas,publicKey){
  let jse = this.$jsEncrypt
    jse.prototype.setPublicKey(publicKey)
    let encrypted = jse.prototype.encrypt(pas)
    // console.log(encrypted)
    return encrypted;
}

//解密方法
Vue.prototype.RSAdecrypt = function(pas,privateKey){
  let jse = this.$jsEncrypt
  // 私钥
  // console.log('解密：'+privateKey)
  jse.prototype.setPrivateKey(privateKey)
  // console.log('解密：'+jse.decrypt(pas))
  let prototype = jse.prototype.decrypt(pas);
  return prototype;
}


/**
 * 签名的公钥必须要加上"-----BEGIN PRIVATE KEY-----"，结尾要加上"-----END PRIVATE KEY-----"
 */
Vue.prototype.getSignsig = function (signData,privateKey) {
  let rsa = new Jsrsasign.RSAKey()
  rsa = Jsrsasign.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----" + privateKey + "-----END PRIVATE KEY-----")
  let sig = new Jsrsasign.KJUR.crypto.Signature({"alg":"MD5withRSA"})
  sig.init(rsa)
  sig.updateString(signData)
  return Jsrsasign.hextob64(sig.sign())
  // return sig.sign()
}



Vue.prototype.$datepicker = datePicker
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(Moment)

Vue.filter('dateformat', function (data) {
  if (data == 1) {
    return 11
  } else {
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
    { path: "/homepage", component: Homepage, meta: { title: '首页' } },
    { path: "/signpage", component: Signpage, meta: { title: '考勤打卡' } },
    { path: "/rulespage", component: Rulespage, meta: { title: '考勤规则' } },
    { path: "/outsignpage", component: Outsignpage, meta: { title: '外勤打卡' } },
    { path: "/contactpage", component: Contactpage, meta: { title: '公司通讯录' } },
    { path: "/personal_inforpage", component: Personal_inforpage, meta: { title: '详细信息' } },
    { path: "/selectApproverpage", component: SelectApproverpage, meta: { title: '选择审批人' } },
    { path: "/selectCCpage", component: SelectCCpage, meta: { title: '选择抄送人' } },
    { path: "/agencyMatters", component: AgencyMatters, meta: { title: '待办事项' } },
    { path: "/calendar", component: Calendar, meta: { title: '考勤记录' } },

    //应用中心
    { path: "/application", component: Application, meta: { title: '应用中心' } },
    { path: "/notificationpage", component: Notificationpage, meta: { title: '公告通知' } },
    { path: "/leaveRequestpage", component: LeaveRequestpage, meta: { title: '休假申请' } },
    { path: "/overtimeRequestpage", component: OvertimeRequestpage, meta: { title: '加班申请' } },
    { path: "/outRequestpage", component: OutRequestpage, meta: { title: '外出申请' } },
    { path: "/travelRequestpage", component: TravelRequestpage, meta: { title: '出差申请' } },
    { path: "/attendanceCard", component: AttendanceCard, meta: { title: '考勤补卡' } },
    { path: "/fieldRecord", component: FieldRecord, meta: { title: '补卡记录' } },
    { path: "/recordInformation", component: RecordInformation, meta: { title: '记录详情' } },

    //管理
    { path: "/management", component: Management, meta: { title: '管理' } },
    { path: "/punchInDetails", component: PunchInDetails, meta: { title: '外勤审批' } },
    { path: "/screening", component: Screening, meta: { title: '筛选条件' } },
    { path: "/fieldApproval", component: FieldApproval, meta: { title: '审批详情' } },

    { path: "/makeUpCardApproval", component: MakeUpCardApproval, meta: { title: '补卡审批' } },
    { path: "/makeUpCardScreening", component: MakeUpCardScreening, meta: { title: '筛选条件' } },
    { path: "/makeUpCardDetails", component: MakeUpCardDetails, meta: { title: '审批详情' } },

    //动态
    { path: "/dynamic", component: Dynamic, meta: { title: '动态' } },

    //个人中心
    { path: "/myinfor", component: Myinfor, meta: { title: '个人中心' } },
    { path: "/accountinformation", component: Accountinformation, meta: { title: '账号信息' } },



    //测试用
    { path: "/refersh", component: Refersh , meta: { title: '人脸识别'} },

    { path: "/ttt", component: ttt , meta: { title: '弹出框测试'} },

    

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


/**
 * 获取header和body
 */
Vue.prototype.getHeaderAndBody = function (contentData,serverPublicKey) {
	let iv = this.getIV()
	let AESKey = getRandom(32);
	let contentDataByKey = encrypt(contentData, AESKey, iv);
	let appPublicKey = this.getPublicKey();
	let appEncryptedKey = this.RSAencrypt(AESKey, serverPublicKey);
	let appSignature = this.getSignsig(contentData, this.getPrivatekey());
	let returnData = {
		appEncryptedKey: appEncryptedKey, //使用服务器RSA公钥加密后的AES密钥
        appSignature: appSignature, //APP使用RSA密钥对请求体的签名
        appPublicKey: appPublicKey,
		serverPublicKey: serverPublicKey,
		contentDataByKey:contentDataByKey,
	}
	return returnData;
}




Vue.prototype.getSERVER_HOST_MAIN = function () {
  //  return  "47.99.72.90"
  return "192.168.5.236"
  // return  "192.168.2.200"

}
Vue.prototype.getSERVER_PORT_MAIN = function () {
  return "8080"
}
Vue.prototype.getPROJECT_MAIN = function () {
  return "ZBSAttendance_v1"
}


Vue.prototype.getIV = function () {
  return "1234567890987654"
}



Vue.prototype.getServerPublicKey = function () {
  // alert("1")
  return new Promise((resolve, reject) => {
    let url =
      "http://" +
      this.getSERVER_HOST_MAIN() + ":" +
      this.getSERVER_PORT_MAIN() + "/" +
      this.getPROJECT_MAIN() + "/user/rsaPublicKey.do"
      // alert(url)
      // this.$ajax.get(
    // // this.$http
    // //   .get(
    //     url, {
    //       headers: {

    //       },
    //       params: {},
    //       _timeout: 10000,
    //       onTimeout: request => {
    //         alert("请求超时");
    //       }
    //     }
    //   )
    this.$http.get(
      url,
      {_timeout: 5000,
        onTimeout: request => {
          alert("请求超时");
          this.getServerPublicKey()
        }}
      
    )
      .then(function (response) {
        // alert("2")
        resolve(response.data.data.rsaPublicKey);
      }).catch(async (err) => {
        reject(err);
      });
  })

}










//格式化时间
Vue.prototype.getTIME = function (time, type) {
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
  var date2 = new Date(date);
  date2.setDate(date.getDate()-7);
  var year2 = date2.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month2 =
  date2.getMonth() + 1 < 10
      ? "0" + (date2.getMonth() + 1)
      : date2.getMonth() + 1;
  var day2 = date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate();
  // 拼接
  if (type == 1) {
    return year + "年" + month + "月" + day + "日" + "  " + week;
  } else if (type == 2) {
    return hours + ":" + minutes + ":" + seconds;
  } else if (type == 3) {
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  } else if (type == 4) {
    return year + "-" + month + "-" + day;
  } else if (type == 5) {
    return year + "-" + month + "-" + day + " " + "  " + week + "   " + hours + ":" + minutes + ":" + seconds
  } else if (type == 6) {
    return year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds
  } else if (type == 7) {
    return year2 + "-" + month2 + "-" + day2
  } else if (type == 8) {
    return year + "年" + month + "月" + day + "日"
  }
}

/* eslint-disable no-new */






new Vue({
  el: '#app',
  router,
  components: { App },
  // router,
  template: "<app/>",
  data: {
    timeOutEvent: 0
       },
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


