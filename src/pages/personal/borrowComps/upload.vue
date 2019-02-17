<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
    <div class="base-items">
     <!-- 功能正在开发中...  -->
    </div>
      
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../../components/headerComponent';

import moudleFooter from '../../../components/footerComponent';
export default {
  name: 'BaseSet',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-上传资料', 
      pageName:'InvestmentPage'
      
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
  width:96%;
  position: absolute;
  top: 50%;
  left: 2%;
  margin: -180px auto 0 auto;
  padding: 1.5rem;
  h2 {
    font-size: 110%;
    font-weight: normal;
    color: #f30007;
    text-align: center;
    line-height: 2rem;
    border-bottom: 1px solid #f30007;
  }
  section {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align:left;
    background: #fff;
    color: #333;
    margin-top: 1rem;
    border:1px solid #ddd;
    border-radius: .2rem;
    padding-left: 1rem;
    a {
      display:block;
      width: 100%;
      height: 100%;
    }
    span {
      color: #f30007;
      font-size: 120%;
      margin-right: .5rem;
    }
  }
}
</style>
