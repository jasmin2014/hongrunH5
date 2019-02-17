<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <div class="form-items clear">
            <h2>我的红包</h2>
            <div class="column clear reditem">
                <label class="label"><i>*</i>类型：</label>
                <p class="control">
                    <select v-model="search.type" name="type">
                        <option value="0" selected="selected">全部</option>
                        <option :value="item.value" v-for="item in type_arr">{{item.label}}</option>
                    </select>
                </p>
            </div>
            <div class="column clear reditem">
                <label class="label"><i>*</i>分类：</label>
                <p class="control">
                    <select v-model="search.category" name="category">
                        <option value="0" selected="selected">全部</option>
                        <option :value="item.value" v-for="item in category_arr">{{item.label}}</option>
                    </select>
                </p>
            </div>
            <div class="column clear reditem">
                <label class="label"><i>*</i>状态：</label>
                <p class="control">
                    <select v-model="search.status" name="status">
                        <option value="0" selected="selected">全部</option>
                        <option :value="item.value" v-for="item in status_arr">{{item.label}}</option>
                    </select>
                </p>
            </div>
            <div class="form-items-btn reditem">
                <button @click="handleSearch">搜索</button>
            </div>
        </div>
        <div class="record-items item-box">
            <div v-if="tableList.total > 0">
                <mt-loadmore :bottom-method="loadMore" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <section class="records-item" v-for="item in tableList.data">
                        <p>红包种类：{{item.category | getCouponCategory}}</p>
                        <p>金额：{{item.amount}}</p>
                        <p>类型：{{item.type | getCouponType}}</p>
                        <p>发放时间:{{item.gmt_receive}}</p>
                        <p>状态:{{item.status | getCouponStatus}}</p>
                    </section>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                        <span v-show="bottomStatus === 'loading'">
                            <mt-spinner type="snake" class="loading"></mt-spinner>
                        </span>
                    </div>
                </mt-loadmore>
            </div>
            <div class="record-blank" v-else>
                <p>暂无数据</p>
            </div>
        </div>
        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../../components/headerComponent';
  import moudleFooter from '../../../components/footerComponent';
  import enums from '../../../utils/enums.js';
  import {mapGetters, mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';

  export default {
    name: 'BaseInfo',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-资金管理-我的红包',
        pageName: 'BaseSet',
        selected: '1',
        bottomStatus: '',
        boxHeight: 0,
        allLoaded: false,
        search: {
          type: 0,
          category: 0,
          status: 0,
          page: 0
        },
        type_arr:[],
        category_arr:[],
        status_arr: [],
        tableList:{
          data: [],
          current_page: 1,
          per_page: 10,
          total: 0
        },
      }
    },
    created () {
      this.initSelect();
      this.getList();
    },
    methods: {
      ...mapActions([
        'queryUserCoupon'
      ]),
      initSelect(){
        this.type_arr = enums.getItems('COUPON_TYPE');
        this.category_arr = enums.getItems('COUPON_CATEGORY');
        this.status_arr = enums.getItems('COUPON_STATUS');
      },
      getList() {
        Indicator.open();
        this.search.page++;
        this.$store.dispatch('queryUserCoupon',this.search)
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
            Indicator.close();
          });
      },
      handleSearch(){
        this.getList();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadMore(){
        this.getList();
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    filters: {
      getCouponType(val) {
        return enums.getDesc('COUPON_TYPE', val);
      },
      getCouponCategory(val) {
        return enums.getDesc('COUPON_CATEGORY', val);
      },
      getCouponStatus(val) {
        return enums.getDesc('COUPON_STATUS', val);
      }
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

    .form-items {
        width: 96%;
        margin: .5rem auto 0 auto;
        background: #fff;
        border-radius: .2rem;
        padding: 1rem .5rem;
        font-size: 90%;
        h2 {
            height: 2rem;
            line-height: 2rem;
            border-bottom: 1px dashed #ddd;
            font-size: 120%;
            color: #333;
            font-weight: normal;
        }
        .column {
            line-height: 2rem;
            margin-top: 1rem;
            > label {
                width: 30%;
                float: left;
                text-align: right;
                i {
                    color: #f50006;
                    margin-right: 10px;
                }
            }
            label.btitle {
                width: 30%;
            }
            label.award {
                width: 50%;
            }
            .control {
                .byday {
                    input {
                        width: 16px;
                        height: 16px;
                        float: left;
                        margin: .5rem .5rem 0 0;
                    }
                    span {
                        float: left;
                    }
                }
                .is-danger {
                    color: #f50006;
                }
                select {
                    width: 100%;
                    height: 2rem;
                    border: 1px solid #ddd;
                }
            }
            > p, > div {
                width: 70%;
                float: left;
                height: 100%;
                input {
                    width: 100%;
                    height: 2rem;
                    border: 1px solid #ddd;
                }
            }
        }
        .reditem {
            width: 50%;
            float: left;
            label {
                width: 40%;
            }
            .control {
                width: 60%;
            }
        }
        .form-items-btn.reditem {
            width: 30%;
            margin-left: 20%;
        }
        .column:first-child {
            margin-top: 0;
        }
    }

    .form-items-btn {
        width: 90%;
        margin: 1rem auto;
        background: #f60005;
        color: #fff;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 4px;
        font-size: 90%;
        button{
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            background: #f60005;
            color: #fff;
        }
    }
    .item-box{
        overflow: scroll;
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
