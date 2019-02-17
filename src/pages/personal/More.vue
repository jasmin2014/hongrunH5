<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
    <div class="base-items">
      <!-- <h2>散标管理</h2> -->
      <section>
        <router-link to="sanbiao">
          <span class="icon iconfont">&#xe737;</span>客服电话
        </router-link>
      </section>
      <div class="service-phone clear">
        <p><span class="icon iconfont">&#xe737;</span></p>
        <p>客服电话：<a href="tel:15868135920">0577-63191188</a></p>
      </div>
      <section>
        <router-link to="sanbiao">
          <span class="icon iconfont">&#xe623;</span>客服QQ
        </router-link>
      </section>
      <div class="service-qqs">
        <p>
          <a href="tencent://message/?uin=2742689774&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2742689774')}}</span> 宏润客服—丹丹</a>
        </p>
        <p>
          <a href="tencent://message/?uin=3305199700&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('3305199700')}}</span> 宏润客服—倩倩 </a>
        </p>
        <p>
          <a href="tencent://message/?uin=2576359642&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2576359642')}}</span> 宏润客服—依伊</a>
        </p>
        <p>
          <a href="tencent://message/?uin=2982653021&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2982653021')}}</span> 宏润客服—安安</a>
        </p>
        <p>
          <a href="tencent://message/?uin=2843885132&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2843885132')}}</span> 宏润客服—晓美</a>
        </p>
        <p>
          <a href="tencent://message/?uin=2080866037&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2080866037')}}</span> 宏润客服—君君</a>
        </p>
        <p>
          <a href="tencent://message/?uin=3078541156&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('3078541156')}}</span> 宏润客服—嗨嗨</a>
        </p>
        <p>
          <a href="tencent://message/?uin=2509303781&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2509303781')}}</span> 宏润客服—边边</a>
        </p>
        <p>
          <a href="tencent://message/?uin=2631627136&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('2631627136')}}</span> 宏润客服—小梅</a>
        </p>
        <p>
          <a href="tencent://message/?uin=1587785839&Site=zjhrgc.com&Menu=yes"><span>{{hideQQ('1587785839')}}</span> 宏润客服—瑶瑶</a>
        </p>
            
      </div>
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
    hideQQ(val){
        if(val){
            return val.replace(/^(.{2}).+(.{3})$/g,"$1**$2");
        }
    }
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
  .service-phone {
    padding: 2rem;
    background: #fff;
    p {
      float: left;
      line-height: 3rem;
      span {
        font-size: 300%;
        color:#f30007;
        margin-right: .5rem;
      }
    }
  }
  .service-qqs {
    padding: 1rem 0;
    background: #fff;
    .lef-arrow {
      color:#f30007;
    }
    p {
      height: 2rem;
      line-height: 2rem;
      padding: 0 1rem .5rem 1rem;
      font-size: 90%;
      border-bottom: 1px dashed #ddd;
      a {
        span {
          color: #666;
          margin-right: .5rem;
        }
      }
    }
  }
}
</style>
