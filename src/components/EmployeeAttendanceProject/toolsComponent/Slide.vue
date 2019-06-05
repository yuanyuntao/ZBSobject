<template>
  <div class="slide">
    <ul>
      <transition-group tag="ul" name="image">
        <li v-for="(img, index) in imgArray" v-show="index===mark" :key="img">
          <img :src="img">
        </li>
      </transition-group>
      
     
    </ul>
    <div class="bar">
      <span
        v-for="(item, index) in imgArray"
        :class="{ 'active':index===mark }"
        @click="change(index)"
        :key="index"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mark: 0, //比对图片索引的变量
      imgArray: [
        require("../../../assets/oynn/timg1.jpg"),
        require("../../../assets/oynn/timg2.jpg"),
        require("../../../assets/oynn/timg3.jpg"),
        require("../../../assets/oynn/timg4.jpg"),
        require("../../../assets/oynn/timg5.jpg"),

      ]
    };
  },
  methods: {
    autoPlay() {
      this.mark++;
      if (this.mark === 5) {
        this.mark = 0;
      }
    },
    play() {
      this.timer = setInterval(this.autoPlay, 2500);
    },
    change(i) {
      this.mark = i;
    },
    stop() {
      clearInterval(this.timer);
    },
    move() {
      this.timer = setInterval(this.autoPlay, 2500);
    }
  },
  created() {
    this.play();
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
} 
.slide {
  height: 220px;
  width: 100%;
  height: 220px;
  margin: 10px auto;
  margin-top: 0px; 
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
  height: 220px;
}
li {
  position: absolute;
}
img {
  width: 100%;
  height: 220px;
}
.bar {
  position: absolute;
  width: 100%;
  bottom: 10px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}
.bar span {
  width: 10px;
  height: 5px;
  border: 1px solid;
  background: white;
  display: inline-block;
  margin-right: 10px;
}
.active {
  background: rgb(197, 52, 52) !important;
}
.image-enter-active {
  transform: translateX(0);
  transition: all 1.5s ease;
}
.image-leave-active {
  transform: translateX(-100%);
  transition: all 1.5s ease;
}
.image-enter {
  transform: translateX(100%);
}
.image-leave {
  transform: translateX(0);
}
</style>

