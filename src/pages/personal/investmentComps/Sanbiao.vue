<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>

        <mt-navbar v-model="selected">
            <mt-tab-item id="tab1">竞标中普通标</mt-tab-item>
            <mt-tab-item id="tab2">回收中普通标</mt-tab-item>
            <mt-tab-item id="tab3">已回收普通标</mt-tab-item>
        </mt-navbar>


        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab1">
                <p class="form-warnmess">
                    您目前竞标中的投资总额是：
                    <span>￥{{tableList.total_amount}}</span>，
                    共<span>{{tableList.total}}</span>笔投标。
                </p>
                <div class="record-items" v-if="tableList.total > 0">
                    <section class="records-item" v-for="(item,index) in tableList.data">
                        <h3>借款标题：{{item.bid.title}}</h3>
                        <p>投标日期：{{item.gmt_create}}</p>
                        <p>借款金额：￥{{item.bid.amount}}</p>
                        <p>年化利率：{{item.bid.loan_rate}}%</p>
                        <p>借款期限: {{item | getRepayLimit}}</p>
                        <p>我的投资金额: ￥{{item.amount}}</p>
                        <!--<p>红包: {{item.redpackage}}</p>-->
                        <!--<p>预期本息: {{item.Money}}</p>-->
                    </section>
                </div>
                <div class="record-blank" v-else>
                    <p>暂无数据</p>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <p class="form-warnmess">
                    您目前回收中的投资总额是：
                    <span>￥{{tableList.total_amount}}</span>，
                    共<span>{{tableList.total}}</span>笔投标。
                </p>
                <div class="record-items" v-if="tableList.total > 0">
                    <section class="records-item" v-for="item in tableList.data">
                        <h3>借款标号：{{item.code}}</h3>
                        <p>借款标题：{{item.bid.title}}</p>
                        <p>投资金额：￥{{item.amount}}</p>
                        <p>借入人：{{item.bid.username}}</p>
                        <p>红包: {{item.redpackage}}</p>
                        <p>年化利率: {{item.bid.loan_rate}}%</p>
                    </section>
                </div>
                <div class="record-blank" v-else>
                    <p>暂无数据</p>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
                <p class="form-warnmess">
                    您目前回收中的投资总额是：
                    <span>￥{{tableList.total_amount}}</span>，
                    共<span>{{tableList.total}}</span>笔投标。
                </p>
                <div class="record-items" v-if="tableList.total > 0">
                    <section class="records-item" v-for="item in tableList.data">
                        <h3>借款标号：{{item.code}}</h3>
                        <p>借款标题：{{item.bid.title}}</p>
                        <p>投资金额：￥{{item.amount}}</p>
                        <p>借入人：{{item.bid.username}}</p>
                        <p>红包: {{item.redpackage}}</p>
                        <p>年化利率: {{item.bid.loan_rate}}%</p>
                    </section>
                </div>
                <div class="record-blank" v-else>
                    <p>暂无数据</p>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>


        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../../components/headerComponent';
  import moudleFooter from '../../../components/footerComponent';
  import {mapGetters, mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'BaseInfo',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-投标管理-竞争中普通标',
        pageName: 'CompetitivePage',
        selected: 'tab1',
        tableList:{
          data: [],
          current_page: 1,
          per_page: 10,
          total: 0,
          total_amount: '0.00'
        },
        search: {
          status: 2
        },
      }
    },
    created(){
      this.getList();
    },
    watch:{
      selected(val){
        if(val == 'tab1'){
          this.search.status = 2;
          this.getList();
        }else if(val == 'tab2'){
          this.search.status = 1;
          this.getList();
        }else if(val == 'tab3'){
          this.search.status = 4;
          this.getList();
        }
      }
    },
    methods: {
      ...mapActions([
        'queryUserBidRecord'
      ]),
      getList() {
        Indicator.open();
        this.$store.dispatch('queryUserBidRecord',this.search)
          .then(response => {
            Indicator.close();
            this.tableList = response;
          });
      },
    },
    filters: {
      getRepayLimit(val) {
        return val.bid.term + val.bid.term_unit;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .iborrow-apply {
        padding-bottom: 3rem;
        .mint-navbar {
            .mint-tab-item {
                .mint-tab-item-label.is-selected {
                    color: #f30007;
                }
            }
        }
    }

    .form-warnmess {
        width: 100%;
        margin: 0 auto;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        background: #fff;
        span {
            font-size: 120%;
            color: #f70005;
            margin: 0 .5rem;
        }
    }

    .records-item {
        width: 96%;
        margin: .5rem auto 0 auto;
        background: #fff;
        padding: .5rem 1rem;
        h3 {
            font-size: 100%;
            font-weight: normal;
            line-height: 2rem;
            border-bottom: 1px dashed #ddd;
        }
        p {
            font-size: 90%;
            line-height: 2rem;
            color: #999;
        }
    }

    .record-blank {
        text-align: center;
        line-height: 2rem;
        margin-top: 1rem;
    }
</style>
