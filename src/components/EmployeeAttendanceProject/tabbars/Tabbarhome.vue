<template>
  <div class="tabbarhome">
    <div class="warp">
      <template v-if="isAdministrator">
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
      </template>
      <template v-else>
      <itemWarp
        v-for="item in tabbarDe" v-bind:key="item.id"
        @change="getVal"
        :txt="item.txt"
        :page="item.page"
        :sel="selected"
      >
        <img :src="item.activeImg" slot="activeImg">
        <img :src="item.normalImg" slot="normalImg">
      </itemWarp>
      </template>

    </div>
  </div>
</template>
<script>
import ItemWarp from "./itemWarp.vue";
export default {
  name:"tabbarhome",
  components: { 
      ItemWarp
       },
  props: {
    // isAdministrator:localStorage.getItem("isAdministrator"),
  },
  
  data: function() {
    return {
      selected: "homepage",
      isAdministrator:localStorage.getItem("isAdministrator")=="false"?false:true,
      
      tabbarDes: [
        {
          txt: "首页",
          page: "homepage",
          normalImg: require("../../../assets/home_tab_normal.png"),
          activeImg: require("../../../assets/home_tab_pressed.png")
        },
        {
          txt: "应用",
          page: "application",
          normalImg: require("../../../assets/congregation_tab_normal.png"),
          activeImg: require("../../../assets/congregation_tab_pressed.png")
        },
        {
          txt: "管理",
          page: "management",
          normalImg: require("../../../assets/admin_normal.png"),
          activeImg: require("../../../assets/admin_pressed.png")
        },
        {
          txt: "动态",
          page: "dynamic",
          normalImg: require("../../../assets/dynamic_normal.png"),
          activeImg: require("../../../assets/dynamic_pressed.png")
        },
        {
          txt: "我的",
          page: "myinfor",
          normalImg: require("../../../assets/me_tab_normal.png"),
          activeImg: require("../../../assets/me_tab_pressed.png")
        }
      ],
      tabbarDe: [
        {
          txt: "首页",
          page: "homepage",
          normalImg: require("../../../assets/home_tab_normal.png"),
          activeImg: require("../../../assets/home_tab_pressed.png")
        },
        {
          txt: "应用",
          page: "application",
          normalImg: require("../../../assets/congregation_tab_normal.png"),
          activeImg: require("../../../assets/congregation_tab_pressed.png")
        },
        {
          txt: "动态",
          page: "dynamic",
          normalImg: require("../../../assets/dynamic_normal.png"),
          activeImg: require("../../../assets/dynamic_pressed.png")
        },
        {
          txt: "我的",
          page: "myinfor",
          normalImg: require("../../../assets/me_tab_normal.png"),
          activeImg: require("../../../assets/me_tab_pressed.png")
        }
      ]
    };
  },
  methods: {
    getVal: function(res) {
      this.selected = res;
      console.log("res:"+res)
      
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
