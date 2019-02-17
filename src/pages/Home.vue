<template>
    <div class="content homepage">
        <moudle-header :my-title="myTitle" :page-name="pageName" :is-login="isLogin"></moudle-header>
        <!-- <header class="topheader">
          <span class="icon iconfont"></span>
          <span></span>
        </header> -->
        <div class="swipe-wraper">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <div class="bnr-pic1">
                        <!-- <img src="../assets/images/bnrs/bnr1.jpg"> -->
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="bnr-pic2">
                        <!-- <img src="../assets/images/bnrs/bnr2.jpg"> -->
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="bnr-pic3">
                        <!-- <img src="../assets/images/bnrs/bnr3.jpg"> -->
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="bnr-pic4">
                        <!-- <img src="../assets/images/bnrs/bnr4.jpg"> -->
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="bnr-pic5">
                        <!-- <img src="../assets/images/bnrs/bnr5.jpg"> -->
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="fundsInfo clear">
            <section>
                <div class="icon-box first"><span class="icon iconfont">&#xe612;</span></div>
                <p>累计交易额</p>
                <p class="money"><span>{{amount}}</span>元</p>
            </section>
            <section>
                <div class="icon-box second"><span class="icon iconfont">&#xe61b;</span></div>
                <p>累计收益金额</p>
                <p class="money"><span>{{profit}}</span>元</p>
            </section>
            <section>
                <div class="icon-box third"><span class="icon iconfont">&#xe65e;</span></div>
                <p>待收总额</p>
                <p class="money"><span>{{total}}</span>元</p>
            </section>
            <section>
                <div class="icon-box forth"><span class="icon iconfont">&#xe60b;</span></div>
                <p>注册用户数</p>
                <p class="money"><span>{{userCnt}}</span>人</p>
            </section>
        </div>
        <div class="fundsitems">
            <moudle-fund :funds="bidList"></moudle-fund>
            <div class="more-funds">
                <router-link to="/finance/list">查看更多></router-link>
            </div>
        </div>
        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../components/headerComponent';
  import moudleFund from '../components/fundComponent';
  import moudleFooter from '../components/footerComponent';
  import {mapGetters, mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'HelloWorld',
    components: {moudleHeader, moudleFund, moudleFooter},
    data () {
      return {
        activePage: '0',
        myTitle: '宏润共创首页',
        isLogin: false,
        pageName: 'homePage',
        amount: 0.00,   // 累计交易额
        profit: 0.00,   // 累计收益金额
        total: 0.00,    // 待收总额
        userCnt: 0,     // 注册用户数
        bidList: {}
      }
    },
    created(){
      Indicator.open();
      this.getStatistics();
      this.getList();
    },
    methods: {
      ...mapActions([
        'queryStatistics'
      ]),
      getStatistics() {
        let _this = this;
        this.queryStatistics(null).then(function(resp){
          _this.amount = resp.amount;
          _this.profit = resp.profit;
          _this.total = resp.total;
          _this.userCnt = resp.userCnt;
        });
      },
      getList(){
        let _this = this;
        _this.$store.dispatch('queryBidList',{pageSize:1,noPage:true})
          .then(response => {
            _this.bidList = response[0];
            Indicator.close();
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .homepage {
        padding-bottom: 5rem;
    }

    .swipe-wraper {
        height: 180px;
        overflow: hidden;
        .mint-swipe {
            height: 100%;
            .mint-swipe-items-wrap {
                height: 100%;
                .mint-swipe-item {
                    height: 100%;
                    div {
                        height: 100%;
                        img {
                            width: 100%;
                        }
                    }
                    .bnr-pic1 {
                        background: url('../assets/images/bnrs/bnr1.jpg') no-repeat center center;
                        background-size: cover;
                    }
                    .bnr-pic2 {
                        background: url('../assets/images/bnrs/bnr2.jpg') no-repeat center center;
                        background-size: cover;
                    }
                    .bnr-pic3 {
                        background: url('../assets/images/bnrs/bnr3.jpg') no-repeat center center;
                        background-size: cover;
                    }
                    .bnr-pic4 {
                        background: url('../assets/images/bnrs/bnr4.jpg') no-repeat center center;
                        background-size: cover;
                    }
                    .bnr-pic5 {
                        background: url('../assets/images/bnrs/bnr5.jpg') no-repeat center center;
                        background-size: cover;
                    }
                }
            }
        }
    }

    .hello {
        h1 {
            color: red;
        }
    }

    .fundsInfo {
        section {
            font-size: 90%;
            width: 50%;
            padding: 1.5rem 0 1.5rem 5em;;
            float: left;
            position: relative;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            background: #fff;
            .icon-box {
                position: absolute;
                left: 1rem;
                top: 50%;
                margin-top: -1.4rem;
                width: 2.8rem;
                height: 2.8rem;
                border-radius: 50%;
                text-align: center;
                line-height: 2.7rem;
                background: #b5b5b5;
                .iconfont {
                    font-size: 150%;
                    color: #fff;
                }
            }
            .icon-box.first {
                background: #ff504e;
            }
            .icon-box.second {
                background: #08d6a5;
            }
            .icon-box.third {
                background: #dfaa7e;
            }
            .icon-box.forth {
                background: #16a6c1;
            }
            .money {
                margin-top: .3rem;
                span {
                    font-size: 120%;
                }
            }

        }
        section:nth-child(2n) {
            border-right: none;
        }
    }

    .more-funds {
        width: 94%;
        margin: 1rem auto 0 auto;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #f30007;
        text-align: center;
        border-top: 1px solid #eee;
        font-size: 90%;
        a {
            color: #fff;
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }

    .myfooter {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        section {
            width: 25%;
            float: left;
            text-align: center;
            background: #fff;
            border-right: 1px solid #ddd;
            padding: .5rem 0;
            p {
                font-size: 90%;
            }
            p.iconfont {
                font-size: 150%;
            }
        }
        section:last-child {
            border-right: none;
        }
    }

    @media screen and (max-width: 376px) {
        .swipe-wraper {
            height: 150px;
        }
    }
</style>
