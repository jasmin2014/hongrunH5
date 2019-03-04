<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
   <mt-navbar v-model="selected">
      <mt-tab-item id="1">手机认证</mt-tab-item>
      <mt-tab-item id="2">实名认证</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <authority-phone></authority-phone>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <authority-turely></authority-turely>
      </mt-tab-container-item>      
    </mt-tab-container>
      
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../../components/headerComponent';
import moudleFooter from '../../../components/footerComponent';

import AuthorityPhone from './authorityComponents/AuthorityPhone';

import AuthorityTurely from './authorityComponents/AuthorityTurely';
export default {
  name: 'HeadAndPassword',
  components: {moudleHeader,moudleFooter,AuthorityPhone,AuthorityTurely},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-基本设置-头像与密码', 
      pageName:'BaseSet', 
      selected:'1'
      
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
  margin: -100px auto 0 auto;
  padding: 1.5rem;
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
