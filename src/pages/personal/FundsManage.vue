<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>

        <div class="base-items">
            <section>
                <router-link to="recharge">
                    <span class="icon iconfont">&#xe619;</span>我要充值
                    <i class="icon iconfont rig-arrow">&#xe61f;</i>
                </router-link>
            </section>
            <section>
                <router-link to="withdraw">
                    <span class="icon iconfont">&#xe624;</span>我要提现
                    <i class="icon iconfont rig-arrow">&#xe61f;</i>
                </router-link>
            </section>
            <section>
                <router-link to="bankaccount">
                    <span class="icon iconfont">&#xe616;</span>银行账户
                    <i class="icon iconfont rig-arrow">&#xe61f;</i>
                </router-link>
            </section>
            <!-- <section>
              <router-link to="redpackage">
                <span class="icon iconfont">&#xe65b;</span>我的红包
              </router-link>
            </section> -->
        </div>

        <div id="ipsForm" style="border: none;"></div>
        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../components/headerComponent';
  import moudleFooter from '../../components/footerComponent';
  import { mapGetters,mapActions } from 'vuex';
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'BaseSet',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-资金管理',
        backUrl: '/personal/home',
        pageName: 'FundsManage',
        selected: '1'
      }
    },
    computed: mapGetters([
      'userInfo'
    ]),
    created(){
      let _this = this;

      if(this.userInfo.v_mobile && this.userInfo.v_identity && !this.userInfo.ips_acct_no){
        MessageBox.alert('请先开通托管账户').then(action => {
          _this.ipsRegister(null).then(response => {
            $('#ipsForm').html(response);
          });
        });
      }

      // 重新设置用户信息
      this.queryUserInfo(null).then(function(resp){
        _this.setUserInfo(resp.account);
        sessionStorage.setItem('authUser',Base64.encode(JSON.stringify(resp.account)));
      });
    },
    methods: {
      ...mapActions([
        'ipsRegister','queryUserInfo','setUserInfo'
      ]),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .base-items {
        width: 100%;
        section {
            width: 100%;
            text-align: left;
            background: #fff;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding: .6rem 1rem;
            font-size: 90%;
            a {
                position: relative;
                display: block;
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
