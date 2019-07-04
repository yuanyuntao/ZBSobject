<template>
  <div class="contactlist">
    <div class="sheet-header" @click="toggleSheet">
      <img
        class="icon iconfont icon-enter"
        ref="toggleicon"
        src="../../../assets/littleimg/iconfont.png"
        alt
      >
      <span class="sheet-header-span">
        {{data_item.department}}
        <span>({{data_item.num}})</span>
      </span>
    </div>
    <div v-if="showSheets">
      <div
        class="sheet-content"
        v-for="i in data_item.users"
        v-bind:key="i.id"
        @click="gotoPersonalInfor(i)"
      >
        <div class="sheet-content-image-air">
          <template v-if="i.haveicon">
            <img  class="sheet-content-image" :src="i.icon_url">
          </template>
          <template v-else>
            <div class="sheet-content-image">{{i.icon_word}}</div>
          </template>
        </div>
        <div class="sheet-content-middle">
          <p>{{i.user_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contactlist",
  components: {},
  props: {
    showSheet:Boolean,
    userName: "",
    isAdministrator: "",
    userId: "",
    item: {
      type: Object
    }
  },
  data() {
    return {
      showSheets: false,
      data_item: {}
    };
  },
  methods: {
    gotoPersonalInfor: function(i) {
      //点击跳转对应的页面
      this.$router.push({
              path: "/personal_inforpage",

              query: {
                haveicon: i.haveicon,
                icon_url: i.icon_url,
                icon_word: i.icon_word,
                user_name: i.user_name,
                department:i.department,
                position:i.position,
                phone_number:i.phone_number,
                mail_address:i.mail_address,
                contact_address:i.contact_address,
              }
            });
    },
    //向右的小图标动画
    toggleSheet: function(index) {
      // console.log(this.$refs);
      this.$refs.toggleicon.style.transform = !this.showSheets
        ? "rotate(90deg)"
        : "rotate(0)";
      this.showSheets = !this.showSheets;
    }
  },
  created: function() {
    this.data_item = this.item;
    this.showSheets = this.showSheet

  },

//   mounted() {
// console.log('父传过来的数据'+this.data_item)
//     this.data_item=this.item
//   },
  watch: {
    item: {
      immediate: true,    // 这句重要
      handler (val) {
          this.data_item=val
      }
    },
    showSheet: {
      immediate: true,    // 这句重要
      handler (val) {
          this.showSheets=val
      }
    }
  }


};
</script>
<style scoped>
.contactlist {
  clear: both;
}
.sheet-header {
  height: 50px;
  background: #e4eaeb9c;
  position: relative;
  border: 1px solid rgb(221, 224, 224);
}
/* .sheet-header i:nth-child(1) {
  line-height: 50px;
  position: absolute;
  left: 10px;
  color: #666;
  transition: all 0.5s;
} */
.icon {
  line-height: 50px;
  position: absolute;
  margin: 15px;
  left: 0px;
  /*top:20px; */
  color: #666;
  transition: all 0.5s;
  height: 15px;
  width: 15px;
}
/* .sheet-header-i {
  line-height: 50px;
  position: absolute;
  right: 10px;
} */
.sheet-header-span {
  left: 40px;
  font-size: 18px;
  position: absolute;
  line-height: 50px;
}
.sheet-content {
  position: relative;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}
.sheet-content i {
  font-size: 26px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
.sheet-content-image {
  /* width: 60px;
  float: left;
  text-align: center; */
  margin: 6px;
  width: 50px;
  height: 50px;
  background-color: #4debd0;
  border-radius: 50%;
  color: #fff;
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}
.sheet-content-image_text {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* overflow: hidden; */
  /* margin:20px; */
  /* padding-bottom:10px; */
  /* margin-left: 10px; */
  /* vertical-align: middle; */
}

.sheet-content-middle {
  position: relative;
  width: 100%;
  text-align: left;

  padding-left: 10px;
  vertical-align: middle;
  /* margin-top: 10px;
  margin-left: 10px; */
}
.sheet-content-middle p {
  font-size: 16px;
  width: 70%;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 20px;
  margin-left: 10px;
  /* vertical-align: middle; */
}
</style>
