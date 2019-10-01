<template>
  <div class="tabbarvisit">
    <div class="warp">
      <itemWarp
        v-for="item in tabbarDes" v-bind:key="item.id"
        @change="getVal"
        :txt="item.txt"
        :page="item.page"
        :sel="selected"
      >
        <img :src="item.activeImg" slot="activeImg">
        <img :src="item.normalImg" slot="normalImg">
      </itemWarp>
    </div>
  </div>
</template>
<script>
import ItemWarp from "./itemWarp.vue";
export default {
  name:"tabbarvisit",
  components: { 
      ItemWarp
       },
  props: {
    // isAdministrator: localStorage.getItem("isAdministrator"),
  },
  
  data: function() {
    return {
      selected: "visitorsPage",
      tabbarDes: [
        {
          txt: "来访申请",
          page: "visitorsPage",
          normalImg: require("../../../assets/congregation_tab_normal.png"),
          activeImg: require("../../../assets/congregation_tab_pressed.png")
        },
        {
          txt: "访客信息",
          page: "VisitorInfoPage",
          normalImg: require("../../../assets/me_tab_normal.png"),
          activeImg: require("../../../assets/me_tab_pressed.png")
        }
      ],
     
    };
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
    }
  }
};
</script>
<style scoped>
.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}
.warp img {
  margin-top: 10px;
  width: 20px;
  height: 20px;
}
.tabber img {
  margin-top: 10px;
  margin-bottom: 5px;
}
.tabber {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
}
</style>
