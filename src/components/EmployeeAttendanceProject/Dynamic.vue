<template>
  <div class="dynamic">
    <div class="footer_guide">
      <tabbardyn :userId="userId" :isAdministrator="isAdministrator" :userName="userName"></tabbardyn>
    </div>
  </div>
</template>
<script>
import Tabbardyn from "./tabbars/Tabbardyn.vue";

export default {
  name: "dynamic",
  components: {
    Tabbardyn
  },
  data: function() {
    return {
      select: "dynamic",
      userName: "",
      isAdministrator: "",
      userId: "",
      clientHeight:"",
    };
  },
  created: function() {
    var _this = this;
    _this.userId = this.$route.query.userId;
    _this.userName = this.$route.query.userName;
    _this.isAdministrator = this.$route.query.isAdministrator;
    // console.log("用户名" + _this.userName);
  },
};
</script>
<style scoped>
.footer_guide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1px;
}
</style>