<template>

  <!-- <div id="app">
  <users></users> -->
    <!-- <test msg="这是新的属性值"></test> -->
    <div id="app">
      <!-- <shiyebu></shiyebu>  -->
      <!-- <transition>
       <keep-alive>
        <router-view></router-view>
    </keep-alive>
    </transition> -->
    <router-view></router-view>
       <!-- <vue-particles
        color="#03030f"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="edge"
        :particleSize="4"
        linesColor="#03030f"
        opacity="1"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi" >
      </vue-particles> -->
    <!-- <shiyebu></shiyebu> -->
    <!-- <users></users> -->
    
    
    </div> 
    
   
    <!-- <router-view/>  -->


   <!-- </div> -->

</template>






<script>
import Homepage from './components/EmployeeAttendanceProject/homepage'
import Userlogin from './components/EmployeeAttendanceProject/userlogin'
import Shiyebu from './components/EmployeeStatusProject/shiyebu'
// import Tabbar from './components/tabbar'


export default {
  name: 'app',
 
  
  components:{
    Userlogin,Shiyebu,Homepage
    }
  

}




</script>

<style>
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 10px; */
  text-align: center;
  /* margin-top: 0px; */
    color: #6b6869;  
  /* width: 30%; */
} 
* {
  margin: 0;
  padding: 0;
} 





</style>
