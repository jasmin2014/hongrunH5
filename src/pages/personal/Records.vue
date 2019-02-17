<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <div class="record-items" v-if="tableList.total > 0">
            <section class="records-item" v-for="item in tableList.data">
                <h3>发生日期：{{item.date}}</h3>
                <p>类型：{{item.type}}</p>
                <p>影响金额：{{item.amount}}元</p>
                <p>冻结金额：{{item.fAmount}}</p>
                <p>待收金额：{{item.wAmount}}</p>
                <p>可用金额:{{item.uAmount}}</p>
            </section>
        </div>
        <div class="record-blank" v-else>
            <p>暂无数据</p>
        </div>

        <moudle-footer :active-page="activePage"></moudle-footer>
        <div id="ipsForm" style="border: none;"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../components/headerComponent';
  import moudleFooter from '../../components/footerComponent';
  export default {
    name: 'BaseInfo',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-交易记录',
        pageName: 'RecordsPage',
        tableList: {
          total: 2,
          data: [{
            date: 'BID1184980000487826',
            type: '短期周转',
            amount: '1000.00',
            fAmount: '0',
            wAmount: '0',
            uAmount: '1000.00'
          }, {
            date: 'BID0032040202',
            type: '短期周转',
            amount: '2000.00',
            fAmount: '1000.00',
            wAmount: '0',
            uAmount: '1000.00'
          }]
        }

      }
    },
    created(){
    },
    methods: {}
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
        p.information {
            text-align: center;
            border-top: 1px solid #ddd;
            margin-top: .5rem;
            a {
                color: #f60005;
            }
        }
    }

    .record-blank {
        text-align: center;
        line-height: 2rem;
        margin-top: 1rem;
    }
</style>
