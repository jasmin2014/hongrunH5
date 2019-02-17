<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>

        <div class="base-items">
            <section>
                <div class="step-txt">
                    <h3>step1:注册成为我们的新用户</h3>
                    <p class="first">根据要求填写好注册信息，并同意《用户服务协议》，最后点击“立即注册”按钮。</p>
                    <router-link to="/reg" class="step-button step-button1">去注册</router-link>
                </div>
                <div class="step1">step1</div>
            </section>
            <section>
                <div class="step-txt step-txt2">
                    <h3>step2:开通环迅支付第三方资金托管账户</h3>
                    <p class="first">注册成功后，进入我的账户进行第三方支付账户的开通，通过真实姓名、身份证号以及手机验证码提交开通，成功开通后不可修改。</p>
                    <a href="http://www.ips.com/" class="step-button step-button2">了解环迅</a>
                </div>
                <div class="step2">step1</div>
            </section>
            <section>
                <div class="step-txt">
                    <h3>step3:完成绑定银行卡</h3>
                    <p class="first">在我的账户-资金管理菜单下进行银行卡绑定，完成绑定后即可通过成功绑定的银行卡进行快捷充值，取现操作.</p>
                </div>
                <div class="step3">step1</div>
            </section>
            <section>
                <div class="step-txt step-txt2">
                    <h3>step4:账户充值</h3>
                    <p class="first">进入个人中心，在左侧的“资金管理”的选项下面选择“我要充值”，然后选择充值方式，输入需要充值的金额以及支付的银行，提交后即可成功充值</p>
                </div>
                <div class="step4">step1</div>
            </section>
            <section>
                <div class="step-txt">
                    <h3>step5:选择合适的项目进行投资</h3>
                    <p class="first">进入我要投资页面，选择您想要的投资项目，进入详情页输入您的投资金额，点击确认按钮后，即完成投资。</p>
                    <router-link to="/finance/list" class="step-button step-button3">查看投资列表</router-link>
                </div>
                <div class="step5">step1</div>
            </section>
            <section>
                <div class="step-txt step-txt2">
                    <h3>step6:账户提现</h3>
                    <p class="first">进入个人中心，在左侧的“资金管理”的选项下面选择“我要提现”，然后在对应框中输入要提现的金额，提交后即可提现成功</p>
                    <router-link to="/login" class="step-button step-button4">立即加入我们</router-link>
                </div>
                <div class="step6">step1</div>
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
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '3',
        myTitle: '宏润共创-帮助中心',
        pageName: 'InvestmentPage'

      }
    },
    created(){
    },
    methods: {
      hideQQ(val){
        if (val) {
          return val.replace(/^(.{2}).+(.{3})$/g, "$1**$2");
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .iborrow-apply {
        padding-bottom: 4rem;
    }

    .base-items {
        width: 100%;
        section {
            position: relative;
            width: 100%;
            background: #fff;
            color: #333;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 90%;
            .step-txt {
                h3 {
                    color: #333;
                }
                > p {
                    font-size: 90%;
                    line-height: 1.5rem;
                    color: #666;
                }
                > p.first {
                    margin-top: .8rem;
                }
                .step-button {
                    display: block;
                    width: 7rem;
                    heigh: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    color: #fff;
                    border-radius: 5px;
                    margin-top: .5rem;
                }
                .step-button1 {
                    background: #f74a4d;
                }
                .step-button2 {
                    background: #ffba43;
                }
                .step-button3 {
                    background: #4e95b2;
                }
                .step-button4 {
                    background: #595a56;
                }
            }
            .step1, .step2, .step3, .step4, .step5, .step6 {
                position: absolute;
                top: 0;
                width: 5rem;
                height: 4rem;
                text-indent: -999rem;
                overflow: hidden;
            }
            .step1 {
                right: 0;
                background: url("../../assets/images/guide/step01.png") no-repeat top center;
                background-size: 100%;
            }
            .step2 {
                left: 0;
                background: url("../../assets/images/guide/step02.png") no-repeat top center;
                background-size: 100%;
            }
            .step3 {
                right: 0;
                background: url("../../assets/images/guide/step03.png") no-repeat top center;
                background-size: 100%;
            }
            .step4 {
                left: 0;
                background: url("../../assets/images/guide/step04.png") no-repeat top center;
                background-size: 100%;
            }
            .step5 {
                right: 0;
                background: url("../../assets/images/guide/step05.png") no-repeat top center;
                background-size: 100%;
            }
            .step6 {
                left: 0;
                background: url("../../assets/images/guide/step06.png") no-repeat top center;
                background-size: 100%;
            }
            .step-txt2 {
                padding-left: 4rem;
            }
            span {
                color: #f30007;
                font-size: 120%;
                margin-right: .5rem;
            }
        }
    }
</style>
