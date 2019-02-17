<template>
    <div class="fund-items">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <!-- <div class="fund-pic"><img src="../../assets/images/bnrs/reg-bg.jpg"></div> -->
        <div class="item-box" ref="pageBox" :style="{ height: boxHeight + 'px'}">
            <mt-loadmore :bottom-method="loadMore" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <moudle-fund v-for="(item,index) in tableList.data" :key="index" :funds="item"></moudle-fund>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake" class="loading"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../components/headerComponent';
  import moudleFund from '../../components/fundComponent';
  import moudleFooter from '../../components/footerComponent';
  import { mapGetters, mapActions } from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'InvestList',
    components: {moudleHeader, moudleFund, moudleFooter},
    data () {
      return {
        myTitle: "我要投资",
        pageName: 'List',
        activePage: "1",
        bottomStatus: '',
        boxHeight: 0,
        allLoaded: false,
        tableList: {
          data: [],
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0
        },
        search: {
          category: 1,
          type: 0,
          status: 0,
          rate: 0,
          term: 0,
          page: 0
        }
      }
    },
    created(){
      this.getList();
    },
    mounted() {
      this.boxHeight = document.documentElement.clientHeight - this.$refs.pageBox.getBoundingClientRect().top;
    },
    methods: {
      ...mapActions([
        'queryBidList'
      ]),
      getList(){
        Indicator.open();
        this.search.page++;
        this.$store.dispatch('queryBidList', this.search)
          .then(response => {
            this.tableList.current_page = response.current_page;
            this.tableList.last_page = response.last_page;
            this.tableList.per_page = response.per_page;
            this.tableList.total = response.total;
            for(let i in response.data){
              this.tableList.data.push(response.data[i]);
            }

            if(this.tableList.current_page !== this.tableList.last_page){
                this.allLoaded = false;
            }else{
                this.allLoaded = true;
            }
            this.$refs.loadmore.onBottomLoaded();
            Indicator.close();
          });
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadMore(){
        this.getList();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .fund-items {
        padding-bottom: 4rem;
        .item-box{
            overflow: scroll;
        }
        .fund-pic {
            img {
                width: 100%;
            }
        }
    }
</style>
