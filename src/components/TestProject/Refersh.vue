<template>
<div class="refersh" ref="foodsWrapper">
  <ul class="ul">    
    <li v-for="item in goods" :key="item.id" ></li>
 </ul>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: "refersh",
  data() {
    return {
        goods:[1,2,3,4,5,6,7,8,9,10],
      options: {
          pullDownRefresh: {
            threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
            stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
          },
          pullUpLoad: {
            threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
//          pullDownRefresh: false, //关闭下拉
//          pullUpLoad: false, // 关闭上拉
          click: true,
          probeType: 3,
          startY: 0,
          scrollbar: false
        }
    };
  },
  methods:{
      _initScroll () {
  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, this.options)
  // 下拉
  this.foodsScroll.on('pullingDown', () => {
    // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
    this.goods = [] // 重置数据
    this.searchCondition.pageNo = 1 // 重置分页数
    this.setData() //获取数据方法   
  })
  // 上拉
  this.foodsScroll.on('pullingUp', () => {
    if (this.curPage < this.totalPage) { //判断是否继续上拉刷新
      this.setData() //获取数据方法   
    }
  })
},
pullingDownUp () {
  this.foodsScroll.finishPullDown()
  this.foodsScroll.finishPullUp()
  this.foodsScroll.refresh() //重新计算元素高度
},
setData () {
//   this.$http.post(url).then(
//     this.goods = data,
//     this.$nextTick(() => {       
//     this.pullingDownUp()
//     })

//   )
    this.goods = [11,23]
  
}




  },
  created () {
  this.$nextTick(() => {
    this._initScroll()
    this.setData()
  })
}
}
</script>
<style scoped>
.foods-wrapper {
  background-color: #cfb0ab;
  padding: 0;
  margin: 0;
}
</style>
