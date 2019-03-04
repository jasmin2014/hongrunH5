<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
    <div class="base-items">
      <!-- <h2>散标管理</h2> -->
      <section>
        <router-link to="sanbiao">
          <span class="icon iconfont">&#xe683;</span>散标管理
          <i class="icon iconfont rig-arrow">&#xe61f;</i>
        </router-link>
      </section>
      <!-- <section>
        <router-link to="recycle">
          <span class="icon iconfont">&#xe683;</span>回收中普通标
        </router-link>
      </section>
      <section>
        <router-link to="recycled">
          <span class="icon iconfont">&#xe683;</span>已回收普通标
        </router-link>
      </section> -->      
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
  width:100%;
  section {
    width: 100%;
    text-align:left;
    background: #fff;
    color: #333;
    border:1px solid #ddd;
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
