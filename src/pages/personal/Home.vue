<template>
    <div class="personalHome">
        <div class="psn-top">
            <header>
                <div class="psn-headicon"><i class="icon iconfont">&#xe614;</i></div>
                <div class="psn-info">
                    <p class="psn-name">{{userInfo.username}}<span>LV1</span></p>
                    <p class="psn-code">邀请码：{{userInfo.invite_code}}</p>
                    <p>
                        <span class="icon iconfont"></span>
                        <span class="icon iconfont"></span>
                    </p>
                </div>
            </header>
            <div class="psn-amounts clear">
                <div class="psn-uamount">
                    <p class="psn-amount-big">{{userInfo.balance}}</p>
                    <p>可用余额（元）</p>
                </div>
                <section>
                    <p>{{parseFloat(userInfo.bonus).toFixed(2)}}</p>
                    <p>可用红包（元）</p>
                </section>
                <section>
                    <p>0</p>
                    <p>可用积分</p>
                </section>
                <section>
                    <p>{{(parseFloat(userInfo.in_capital) + parseFloat(userInfo.in_interest)).toFixed(2)}}</p>
                    <p>待收余额（元）</p>
                </section>
            </div>
        </div>
        <div class="psn-btns clear">
            <div class="psn-btn-recharge" @click="handleCharge">充值</div>
            <div class="psn-btn-withdraw" @click="handleWithdraw">提现</div>
            <div class="psn-btn-withdraw" @click="registerAccount" v-show="!userInfo.ips_acct_no">开通托管账户</div>
            <div class="psn-btn-withdraw" @click="LoginAccount" v-show="userInfo.ips_acct_no">登录环迅</div>
        </div>
        <div class="psn-items clear">
            <section>
                <router-link to="baseset">
                    <p><i class="icon iconfont">&#xe609;</i></p>
                    <p>基本设置</p>
                </router-link>
            </section>
            <section>
                <router-link to="funds">
                    <p><i class="icon iconfont">&#xe78b;</i></p>
                    <p>资金管理</p>
                </router-link>
            </section>
            <section>
                <router-link to="investment">
                    <p><i class="icon iconfont">&#xe61e;</i></p>
                    <p>投资管理</p>
                </router-link>
            </section>
            <section class="nobdr">
                <router-link to="borrow">
                    <p><i class="icon iconfont">&#xe611;</i></p>
                    <p>借款管理</p>
                </router-link>
            </section>
            <section class="nobdr">
                <router-link to="redpackage">
                    <p><i class="icon iconfont">&#xe613;</i></p>
                    <p>我的红包</p>
                </router-link>
            </section>
            <section class="nobdr">
                <router-link to="records">
                    <p><i class="icon iconfont">&#xe608;</i></p>
                    <p>交易记录</p>
                </router-link>
            </section>
        </div>        
        <div class="psn-total">
            <h3>计算公式</h3>
            <section class="clear btmbdr">
                <p>总资产(元)：<span>￥{{(parseFloat(userInfo.balance) + parseFloat(userInfo.in_capital) + parseFloat(userInfo.in_interest) + parseFloat(userInfo.freeze)).toFixed(2)}}</span></p>
                <div>
                    <p class="amount">￥{{userInfo.balance}}</p>
                    <p>可用余额</p>
                </div>
                <div class="plus">+</div>
                <div>
                    <p class="amount">￥{{userInfo.in_capital}}</p>
                    <p>待收本金</p>
                </div>
                <div class="plus">+</div>
                <div>
                    <p class="amount">￥{{userInfo.in_interest}}</p>
                    <p>待收利息</p>
                </div>
                <div class="plus">+</div>
                <div>
                    <p class="amount">￥{{userInfo.freeze}}</p>
                    <p>冻结资金</p>
                </div>
            </section>
            <section class="clear">
                <p>待还总额(元)：<span>￥{{(parseFloat(userInfo.out_capital) + parseFloat(userInfo.out_interest)).toFixed(2)}}</span></p>
                <div>
                    <p class="amount">￥{{userInfo.out_capital}}</p>
                    <p>待还本金</p>
                </div>
                <div class="plus">+</div>
                <div>
                    <p class="amount">￥{{userInfo.out_interest}}</p>
                    <p>待还利息</p>
                </div>
            </section>
        </div>
        <div class="form-items-btn" @click="handleLogout">退出登录</div>
        <moudle-footer :active-page="activePage"></moudle-footer>
        <div id="ipsForm" style="border: none;"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleFooter from '../../components/footerComponent';
  import { mapActions, mapGetters } from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'personalHome',
    components: {moudleFooter},
    data () {
      return {
        activePage: '2',
        isIdentity: true,
        isMobileAuth: false,
        isEmailAuth: true,
      }
    },
    created(){
      this.isMobileAuth = this.userInfo.v_mobile;
      this.isIdentity = this.userInfo.v_identity;
    },
    mounted (){
      let _this = this;
      // 重新设置用户信息
      Indicator.open();
      this.queryUserInfo(null).then(function (resp) {
        Indicator.close();
        _this.setUserInfo(resp.account);
        sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(resp.account)));
      });
    },
    computed: mapGetters([
      'userInfo'
    ]),
    methods: {
      ...mapActions([
        'queryUserInfo', 'setUserInfo','ipsRegister','ipsLogin'
      ]),
      registerAccount(){
        let _this = this;
        if(this.userInfo.v_mobile && this.userInfo.v_identity){
          this.ipsRegister(null).then(response => {
            sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
            this.$router.push({path: '/ips'});
          });
        }else{
          window.vue.$alert('请先实名认证','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
            _this.$router.push({path:'/personal/varification'});
          }});
        }
      },
      LoginAccount(){
        let _this = this;
        if(this.userInfo.v_mobile && this.userInfo.v_identity){
          this.ipsLogin(null).then(response => {
            sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
            this.$router.push({path: '/ipsLogin'});
          });
        }else{
          window.vue.$alert('请先实名认证','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
            _this.$router.push({path:'/personal/varification'});
          }});
        }
      },
      handleCharge() {
        this.$router.push({path: '/personal/recharge'});
      },
      handleWithdraw() {
        this.$router.push({path: '/personal/withdraw'});
      },
      handleLogout(val) {
        sessionStorage.clear();
        this.setUserInfo('');
        this.$router.push({path: '/login'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .personalHome {
        padding-bottom: 3.5rem;
    }

    .psn-top {
        background: url('../../assets/images/personal-bg.jpg') no-repeat center top;
        background-size: 100%;
        padding: 1.5rem 0;
        header {
            width: 60%;
            margin: 0 auto;
            position: relative;
            padding-left: 4rem;
            .psn-headicon {
                position: absolute;
                left: 0;
                top: 0;
                width: 3rem;
                height: 3rem;
                background: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 3rem;
                .iconfont {
                    font-size: 160%;
                }
            }
            .psn-info {
                p {
                    color: #fff;
                }
                .psn-name {
                    margin-top: .3rem;
                    span {
                        background: #ffc6c7;
                        color: #f20007;
                        padding: 0 .5rem;
                        border-radius: 3px;
                        margin-left: .5rem;
                    }
                }
                .psn-code {
                    line-height: 1.6rem;
                }
            }
        }
        .psn-amounts {
            margin-top: 1rem;
            .psn-uamount {
                text-align: center;
                p {
                    color: #fff;
                }
                .psn-amount-big {
                    font-size: 280%;
                }

            }
            > section {
                width: 33%;
                float: left;
                text-align: center;
                margin-top: 1.5rem;
                p {
                    color: #f9c8c9;
                }
            }
        }
    }

    .psn-btns {
        background: #fff;
        padding: .5rem 4%;
        > div {
            width: 32%;
            float:left;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            border: 1px solid #f70005;
            border-radius: 1rem;
            color: #f70005;
            margin-right: 1.33%;
        }
        > div:last-child {
            margin-right: 0;
        }        
    }

    .psn-total {
        background: #fff;
        margin-top: .5rem;
        h3 {
            font-size: 100%;
            color: #333;
            line-height: 2rem;
            padding-left: 1rem;
            border-bottom: 1px solid #ccc;
        }
        > section {
            padding: .5rem 1rem 1rem 1rem;
            font-size: 85%;
            > p {
                text-align: center;
                margin: 1rem 0;
                span {
                    font-size: 120%;
                    color: #f70005;
                }
            }
            > div {
                float: left;
                width: 22%;
                line-height: 1.4rem;
                text-align: center;
                margin-top: .5rem;
                p.amount {
                    color: #f70005;
                }
            }
            > div.plus {
                width: 4%;
                line-height: 2.8rem;
            }
        }
        > section.btmbdr {
            border-bottom: 1px dashed #ddd;
        }
    }

    .psn-items {
        background: #fff;
        margin-top: .5rem;
        > section {
            width: 33.33%;
            float: left;
            padding: 1.5rem 0;
            text-align: center;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            p {
                color: #666;
                .iconfont {
                    font-size: 200%;
                    color: #f70005;
                }
            }
        }
        > section.nobdr {
            border-bottom: none;
        }
        > section:nth-child(3n) {
            border-right: none;
        }
    }
    .form-items-btn {
        width: 90%;
        margin: 1rem auto;
        border: 1px solid #f60005;
        color: #f60005;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 1rem;
        font-size: 90%;
    }
</style>
