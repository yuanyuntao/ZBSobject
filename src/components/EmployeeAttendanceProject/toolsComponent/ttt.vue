<template>
  <div class="ttt" id="ttt">
    <div v-longtouch="timeOutEvent" >打开弹窗</div>
    <dialog-bar
      v-model="sendVal"
      type="danger"
      title="提示："
      content="撤销不可恢复，是否确定撤销？"
      v-on:cancel="clickCancel()"
      @danger="clickDanger()"
      @confirm="clickConfirm()"
      dangerText="确定"
    ></dialog-bar>
  </div>
</template>
<script>
import dialogBar from "./dialog";
export default {
  components: { "dialog-bar": dialogBar },
  data() {
    return { sendVal: false };
  },
  methods: {
    openMask(index) {
      this.sendVal = true;
    },
    clickCancel() {
      console.log("点击了取消");
    },
    clickDanger() {
      console.log("这里是danger回调");
    },
    clickConfirm() {
      console.log("点击了confirm");
    }
  }
};
</script>
<style scoped>
</style>
