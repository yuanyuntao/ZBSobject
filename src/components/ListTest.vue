<template>
  <div id="listTest">
    <template>
      <div >
        开始时间:
       
      </div>
      <div>
        结束时间:
        
      </div>
    </template>
  </div>
</template>
<script>
// import { Aes } from "./js/aes.js";

import { encrypt,decrypt } from "./js/utils.js";
export default {
  
  name:"listTest",
  components:{
    

    },
  data() {
    return {
      startTime: "",
      endTime: "",
      startTimeOption: {},
      endTimeOption: {}
    };
  },
  mounted() {
    this.startTime = "2018-08-08 00:00:00";
    this.endTime = "2018-08-11 23:59:59";
    this.onStartTimeChange(this.startTime);
    this.onEndTimeChange(this.endTime);
  },
  created: function() {

console.log(encrypt("123456"));
console.log(decrypt(encrypt("123456")));

  },

  methods: {
    /**
     * 开始时间发生变化时触发,设置结束时间不可选择的日期
     * 结束时间应大于等于开始时间,且小于等于当前时间
     * @param {string} startTime 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) || endTime > Date.now();
        }
      };
    },
    /**
     * 结束时间发生变化时触发,设置开始时间不可选择的日期
     * 开始时间小于等于结束时间,且小于等于当前时间
     * @param {string} date 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onEndTimeChange(endTime, type) {
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now();
        }
      };
    }
  }
};
</script>
<style scoped>
.search {
  padding-top: 5px;
  outline: none;
  height: 30px;
  width: 88%;
  font-size: 18px;
  border: 0;
  -webkit-appearance: none;
  /* margin: 5px; */
  /* margin-right: 10px; */
  /* border: 0px solid rgb(214, 213, 213); */
}
.showselected {
  position: fixed;
  width: 98%;
  height: 100px;
  left: 1%;
  right: 0;
  bottom: 0;
  background-color: antiquewhite;
  z-index: 999;
  border-radius: 5px;
}
.sl {
  display: flex;
}
</style>
