<template>
  <div class="itemWarp flex_mid" @click="changePage">
    <span v-show="!bol">
      <slot name="normalImg"></slot>
    </span>
    <span v-show="bol">
      <slot name="activeImg"></slot>
    </span>
    <span v-text="txt"></span>
  </div>
</template>
<script>
export default {
  name: "itemWarp",
  props: {
    txt: { type: String },
    page: { type: String },
    sel: { type: String },
  },
  computed: {
    bol: function() {
       if (this.sel == this.page) {
        return true;
      }
      return false;
    }
  },
  methods: {
    changePage: function() {
      //点击跳转对应的页面
      this.$router.push({
        path: "/" + this.page,
      });
      
    }
  }
};
</script>
<style scoped>
.itemWarp {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

}
.itemWarp span {
  font-size: 12px;
}
</style>
