<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>
    
    <div class="base-items">
      <!-- <h2>借款总表</h2> -->
      <section>
        <router-link to="borrowin">
          <span class="icon iconfont">&#xe683;</span>借款总表
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
      <section>
        <router-link to="quato">
          <span class="icon iconfont">&#xe683;</span>额度申请
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
      <section>
        <router-link to="upload">
          <span class="icon iconfont">&#xe683;</span>上传资料
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
      myTitle:'宏润共创-投资管理',
      backUrl: '/personal/home',
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
  width: 100%;
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
