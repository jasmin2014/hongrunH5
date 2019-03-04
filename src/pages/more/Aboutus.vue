<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
    <div class="base-items">
      <img src="../../assets/images/indroduce/introduce_01.jpg">
      <img src="../../assets/images/indroduce/introduce_02.jpg">
      <img src="../../assets/images/indroduce/introduce_03.jpg">
      <img src="../../assets/images/indroduce/introduce_04.jpg">
      <img src="../../assets/images/indroduce/introduce_05.jpg">
      <img src="../../assets/images/indroduce/introduce_06.jpg">
      <img src="../../assets/images/indroduce/introduce_07.jpg">
      <img src="../../assets/images/indroduce/introduce_08.jpg">
      <img src="../../assets/images/indroduce/introduce_09.jpg">
      <img src="../../assets/images/indroduce/introduce_10.jpg">
      <img src="../../assets/images/indroduce/introduce_11.jpg">
      <img src="../../assets/images/indroduce/introduce_12.jpg">
      <img src="../../assets/images/indroduce/introduce_13.jpg">
      <img src="../../assets/images/indroduce/introduce_14.jpg">
      <img src="../../assets/images/indroduce/introduce_15.jpg">
      <img src="../../assets/images/indroduce/introduce_16.jpg">
      <img src="../../assets/images/indroduce/introduce_17.jpg">
      <img src="../../assets/images/indroduce/introduce_18.jpg">
      <img src="../../assets/images/indroduce/introduce_19.jpg">
    </div>
      
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../components/headerComponent';

import moudleFooter from '../../components/footerComponent';
export default {
  name: 'Aboutus',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'3',  
      myTitle:'宏润共创-关于我们', 
      pageName:'AboutusPage'
      
    }
  },
  created(){
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.base-items {
  width:100%;
  img {
    width: 100%;
    display:block;
    margin:0;
    padding:0;
  }
}
</style>
