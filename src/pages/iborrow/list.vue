<template>
  <div class="content iborrowdetail">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    <div class="iborrow-detail">
      <section>
        <div class="iborrow-pic">
          <img src="../../assets/images/iborrows/borrow-typepic01.jpg">
          <div class="iborrow-pictxt">
            <h3>车抵贷</h3>
            <p>解决不时之需　车抵随借随还</p>
          </div>
        </div>
        <div class="iborrow-txt">
          车抵贷标显示标记"车"，是网站运营方经过线下严格核查借款人资产负债,抵押手续（不仅限）、有关政府以及商业银行推荐、优质资产和股权质押，确保风险控制在合理的范围内。 对象一般为地区优质中小微企业，是网站运营方重点发展对象.
        </div>
        <div class="iborrow-btn"><router-link to="apply">立即申请</router-link></div>
      </section>
      <section>
        <div class="iborrow-pic">
          <img src="../../assets/images/iborrows/borrow-typepic02.jpg">
          <div class="iborrow-pictxt">
            <h3>房抵贷</h3>
            <p>解决不时之需　房抵随借随还</p>
          </div>
        </div>
        <div class="iborrow-txt">
          房抵贷标显示标记"房"，是网站运营方经过线下严格核查借款人资产负债,抵押手续（不仅限）、有关政府以及商业银行推荐、优质资产和股权质押，确保风险控制在合理的范围内。 对象一般为地区优质中小微企业，是网站运营方重点发展对象.
        </div>
        <div class="iborrow-btn"><router-link to="apply">立即申请</router-link></div>
      </section>
      <section>
        <div class="iborrow-pic">
          <img src="../../assets/images/iborrows/borrow-typepic03.jpg">
          <div class="iborrow-pictxt">
            <h3>企业贷</h3>
            <p>服务小微企业　践行无微不至</p>
          </div>
        </div>
        <div class="iborrow-txt">
          企业抵押贷款是指企业作为借款人，以不动产抵押作为抵押物，获得贷款的方式。办理不动产抵押贷款的渠道一般是厚银行、信托公司、小额贷款公司。
        </div>
        <div class="iborrow-btn"><router-link to="apply">立即申请</router-link></div>
      </section>
      <section>
        <div class="iborrow-pic">
          <img src="../../assets/images/iborrows/borrow-typepic04.jpg">
          <div class="iborrow-pictxt">
            <h3>信用贷</h3>
            <p>免抵押、免担保、纯信用</p>
          </div>
        </div>
        <div class="iborrow-txt">
          信用借款标显示"信"字标记，是一种免抵押、免担保、纯信用的小额个人信用贷款标，主要面向固定收入群体开放。如借款人到期还款出现困难，逾期约定时间由网站运营方垫付本金息还款， 债权转让为网站运营方所有。
        </div>
        <div class="iborrow-btn"><router-link to="apply">立即申请</router-link></div>
      </section>
    </div>
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../components/headerComponent';
import moudleFooter from '../../components/footerComponent';
export default {
  name: 'HelloWorld',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-我要借款', 
      pageName:'iborrowPage',  
      fundsInfo:{

      }
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
.iborrowdetail {
  padding-bottom: 3.4rem;
}
.iborrow-detail {
  >section {
    width: 98%;
    margin: .5rem auto 0 auto;
    border-radius: .1rem;
    border: 1px solid #eee;
    background: #fff;
    padding: 0 0 1rem 0;
    .iborrow-pic {
      position: relative;
      padding: .8rem .8rem .4rem .8rem;
      img {
        width: 100%;
      }
      .iborrow-pictxt {
        position: absolute;
        left: 10%;
        top: 50%;
        margin-top: -3rem;
        width: 80%;
        height: 6rem;
        padding: .5rem 1.5rem;
        background: rgba(255,255,255,.9);
        border-radius: .3rem;
        h3 {
          font-size: 120%;
          color:#f30007;
          line-height: 2.4rem;
          margin-top: .4rem;
        }
        p {
          font-size: 90%;
        }
      }
      
    }
    .iborrow-txt {
      padding: 0 1rem .5rem 1rem;
      font-size: 85%;
      text-indent: 2em;
      line-height: 1.6rem;
    }
    .iborrow-btn {
      width: 90%;
      margin: 0 auto;
      line-height: 2rem;
      height: 2rem;
      border: 1px solid #f30007;
      text-align: center;
      color: #f30007;
      border-radius: .2rem;
      a {
        color: #f30007;
      }
    }
  }
}
</style>
