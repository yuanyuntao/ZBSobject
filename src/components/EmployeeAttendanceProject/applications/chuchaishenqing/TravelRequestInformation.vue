<template>
  <div class="travelRequestInformation">
    <div class="moduls">
      <div class="words">申请人</div>
      <div class="information">{{item.user_name}}</div>
    </div>
    <div class="moduls">
      <div class="words">开始时间</div>
      <div class="information">{{item.start_time}}</div>
    </div>
    <div class="moduls">
      <div class="words">结束时间</div>
      <div class="information">{{item.stop_time}}</div>
    </div>
    <div class="moduls">
      <div class="words">出差时长</div>
      <div class="information">{{item.day}}天{{item.hour}}小时</div>
    </div>
    <div class="moduls">
      <div class="words">出差地点</div>
      <div class="information">{{item.address}}</div>
    </div>
    <div class="moduls">
      <div class="words">出差事由</div>
      <div class="information">
        <div class="outRemarks">{{item.remarks}}</div>
        <div class="outPics" style="display: flex;">
          <div class="sheeImage" v-for="i in item.businessTraveIRecordPic" v-bind:key="i.id">
            <img class="image" :src="getURL(i.url)" />
          </div>
        </div>
      </div>
    </div>
    <div class="moduls">
      <div class="words">申请时间</div>
      <div class="information">{{item.createTime}}</div>
    </div>
    <div class="moduls">
      <div class="words">
        <p style=" margin: 25px 0px;">审批流程</p>
      </div>
      <div class="information">
        <div v-for="i in item.businessTraveIAuditRecord" :key="i.id">
          <div class="auditRecord">
            {{i.user_name}}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            <template
              v-if="i.audit_status==0"
            >待审批</template>
            <template v-else-if="i.audit_status==1">审批中</template>
            <template v-else-if="i.audit_status==2">审批通过</template>
            <template v-else-if="i.audit_status==3">审批不通过</template>
            <br />
            审批意见：{{i.audit_remarks}}
            <br />
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
import { encrypt, decrypt } from "../../../js/utils.js";
export default {
  name: "travelRequestInformation",
  components: {},
  data() {
    return {
      defaultparam: 2,
      opinions: "", //审批意见
      approved: "", //审批状态
      item: ""
    };
  },
  methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/travelRequestpage",
        query: {
          pagename: "travelRequestInformation"
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
    }
  },
  mounted() {
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
  }
};
</script>
  <style scoped>
.travelRequestInformation {
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
  margin-top: 20px;
  border-radius: 10px;
  background-color: rgb(68, 124, 56); /* 标准的语法 */
  filter: brightness(1.4);
}
</style>