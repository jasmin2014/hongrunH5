<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
    <div class="base-items">
      <section>
        <router-link to="baseinfo">
          <span class="icon iconfont">&#xe853;</span>基本资料
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
      <section>
        <router-link to="pass">
          <span class="icon iconfont">&#xe63a;</span>头像与密码
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
      <section>
        <router-link to="auth">
          <span class="icon iconfont">&#xe6bc;</span>认证中心
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
    </div>
      
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../components/headerComponent';

import moudleFooter from '../../components/footerComponent';
export default {
  name: 'BaseSet',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-基本设置', 
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
  width:100%;  
  section {
    width: 100%;
    text-align:left;
    background: #fff;
    color: #333;
    border-bottom:1px solid #ddd;
    padding:.6rem 1rem;
    font-size: 90%;
    a {
      position: relative;
      display:block;
      width: 100%;
      height: 100%;
      .rig-arrow {
        position: absolute;
        right: -5px;
        top: 50%;
        margin-top: -.3rem;
        font-size: 90%;
      }
    }
    span {
      color: #f30007;
      font-size: 120%;
      margin-right: .5rem;
    }
  }
}
</style>
