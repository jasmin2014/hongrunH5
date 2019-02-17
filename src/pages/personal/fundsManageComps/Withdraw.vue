<template>
    <div class="content iborrow-apply" v-show="isShown">
        <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab1">马上提现</mt-tab-item>
            <mt-tab-item id="tab2" @click.native="getList">提现记录</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab1">
                <div class="form-items">
                    <div class="column clear withdraw">
                        <label class="label">您的银行账号是：</label>
                        <p class="control">
                            还没有登记您的
                            <router-link to="/">银行账号</router-link>
                        </p>
                    </div>
                    <div class="column clear withdraw">
                        <label class="label">您的真实姓名：</label>
                        <p class="control">
                            （必须和您的银行账户姓名一致）
                        </p>
                    </div>
                    <div class="column clear withdraw">
                        <label class="label">您的手机号码：</label>
                        <p class="control">
                            <router-link to="auth">点此修改</router-link>
                        </p>
                    </div>
                    <div class="column clear withdraw">
                        <label class="label">提款期限：</label>
                        <p class="control">
                            72小时/24小时
                        </p>
                    </div>
                    <div class="column clear withdraw">
                        <label class="label">手续费：</label>
                        <p class="control">
                            1元/每次
                        </p>
                    </div>
                    <div class="column clear withdraw">
                        <label class="label" for="amount"><i>*</i>提现金额：</label>
                        <p class="control" :class="{ 'validated': errors.has('withdrawAmount') }">
                            <input v-model="withdrawForm.amount" v-validate="'required'" id="amount"
                                   :class="{'input': true, 'is-danger': errors.has('withdrawAmount') }"
                                   name="withdrawAmount" type="text" placeholder="">
                            <span v-show="errors.has('withdrawAmount')"
                                  class="help is-danger">{{ errors.first('withdrawAmount') }}</span>
                        </p>
                    </div>
                </div>
                <div class="form-items-btn">
                    <button @click="submitForm()">立即提现</button>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <div class="form-items records clear">
                    <div class="search-items">
                        <div class="column clear">
                            <label class="label" for="gmt_start">时间从</label>
                            <p class="control">
                                <input name="gmt_start" v-model="search.gmt_start" type="text" placeholder="选择时间" id="gmt_start"
                                       @click="openPicker('gmt_start')">
                                <mt-datetime-picker
                                        ref="picker"
                                        type="date"
                                        v-model="pickerStart"
                                        @confirm="handleConfirm('gmt_start')">
                                </mt-datetime-picker>

                            </p>
                        </div>
                        <div class="column clear">
                            <label class="label" for="gmt_end">到</label>
                            <p class="control">
                                <input name="gmt_end" v-model="search.gmt_end" type="text" placeholder="选择时间" id="gmt_end"
                                       @click="openPicker('gmt_end')">
                                <mt-datetime-picker
                                        ref="picker2"
                                        type="date"
                                        v-model="pickerEnd"
                                        @confirm="handleConfirm('gmt_end')">
                                </mt-datetime-picker>
                            </p>
                        </div>
                    </div>
                    <div class="form-items-btn search-btn"  @click="handleSearch">
                        查看
                    </div>
                </div>
                <div class="record-items item-box">
                    <div v-if="tableList.total > 0">
                        <mt-loadmore :bottom-method="loadMore" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                            <section class="records-item" v-for="item in tableList.data">
                                <h3>编号：{{item.code}}</h3>
                                <p>申请时间：{{item.gmt_create}}</p>
                                <p>提现金额：{{item.amount}}元</p>
                                <p>提现手续费：{{item.ips_fee}}</p>
                                <p>提现状态:{{item.status | getFundStatus}}</p>
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
            </mt-tab-container-item>
        </mt-tab-container>

        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../../components/headerComponent';
  import moudleFooter from '../../../components/footerComponent';
  import enums from '../../../utils/enums.js';
  import { mapGetters,mapActions } from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'BaseInfo',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-资金管理-我要提现',
        backUrl: '/personal/funds',
        pageName: 'BaseSet',
        selected: 'tab1',
        withdrawAmount: '',
        bottomStatus: '',
        boxHeight: 0,
        allLoaded: false,
        withdrawForm: {
          amount: ''
        },
        search: {
          gmt_start: '',
          gmt_end: '',
          type: enums.getValue('FUND_TYPE','WITHDRAW'),
          page: 0
        },
        pickerStart: '',
        pickerEnd: '',
        tableList:{
          data: [],
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0
        },
        isShown: false
      }
    },
    created(){
        if(self != top){
            parent.window.location.href = self.location.href;
            return;
        }else{
            this.isShown = true;
        }
    },
    computed: mapGetters([
      'userInfo'
    ]),
    methods: {
      ...mapActions([
        'ipsRegister','ipsWithdraw','queryUserInfo','queryUserFund','setUserInfo'
      ]),
      getList() {
        Indicator.open();
        this.search.page++;
        this.$store.dispatch('queryUserFund',this.search)
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
      openPicker(type) {
        if (type === "gmt_start") {
          this.$refs.picker.open();
        } else {
          this.$refs.picker2.open();
        }
      },
      handleSearch(){
        if(this.search.gmt_start){
          this.search.gmt_start = (new Date(this.search.gmt_start)).toLocaleDateString();
        }
        if(this.search.gmt_end){
          this.search.gmt_end = (new Date(this.search.gmt_end)).toLocaleDateString();
        }
        this.getList();
      },
      handleConfirm(type){
        let _date = '';
        if (type === "gmt_start") {
          _date = new Date(this.pickerStart);
          let year = _date.getFullYear();
          let month = (_date.getMonth() + 1) < 10 ? ("0" + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
          let day = _date.getDate() < 10 ? ("0" + _date.getDate()) : _date.getDate();

          this.search.gmt_start = year + '-' + month + '-' + day;
        } else {
          _date = new Date(this.pickerEnd);
          let year = _date.getFullYear();
          let month = (_date.getMonth() + 1) < 10 ? ("0" + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
          let day = _date.getDate() < 10 ? ("0" + _date.getDate()) : _date.getDate();

          this.search.gmt_end = year + '-' + month + '-' + day;
        }
      },
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.ipsWithdraw(this.withdrawForm).then(response => {
              sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
              sessionStorage.setItem('backUrl','/personal/withdraw');
              this.$router.push({path: '/ips'});
            });
          } else {
            return false;
          }
        });
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
      getFundStatus(val) {
        return enums.getDesc('USER_FUND',val);
      },
      hideMobile(val){
        if(val){
          return val.replace(/^(.{3}).+(.{4})$/g,"$1****$2");
        }
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
        .form-warnmess {
            width: 96%;
            margin: 0 auto;
            padding: 0 0 .5rem 0;
            border-bottom: 1px solid #ddd;
            i {
                font-size: 120%;
                color: #f70005;
                margin-right: .5rem;
            }
        }
        h2 {
            height: 2rem;
            line-height: 2rem;
            border-bottom: 1px dashed #ddd;
            font-size: 120%;
            color: #333;
            font-weight: normal;
        }
        .auth-txt {
            font-size: 90%;
            line-height: 2rem;
            height: 2rem;
            margin-top: 1rem;
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
                .base-pickers {
                    > .picker {
                        width: 50%;
                        float: left;
                    }
                }
                .base-address {
                    position: relative;
                    .iconfont {
                        position: absolute;
                        right: .5rem;
                        top: 50%;
                        margin-top: -1rem;
                    }
                }
                label.radio {
                    width: 30%;
                    float: left;
                    text-align: left;
                    input {
                        width: 16px;
                        height: 16px;
                    }
                }
                label.longradio {
                    width: 100%;
                    display: block;
                    text-align: left;
                    input {
                        width: 16px;
                        height: 16px;
                    }
                }
                textarea {
                    width: 100%;
                    height: 4rem;
                    border: 1px solid #ddd;
                }
            }
            .control.itextarea {
                width: 70%;
            }
            .control.itextarea textarea {
                width: 100%;
                border: 1px solid #ddd;
            }
            .control.award {
                width: 50%;
            }
            .control.btitle {
                width: 70%;
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
                .getcode {
                    input {
                        width: 55%;
                        float: left;
                    }
                    > span {
                        display: inline-block;
                        width: 40%;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        margin-left: 5%;
                        border: 1px solid #ddd;
                        border-radius: .2rem;
                        i {
                            color: #f70005;
                            font-style: normal;
                        }
                    }
                    > span.disable {
                        background: #ccc;
                    }
                }
            }
        }
        .column.withdraw {
            label {
                width: 35%;
            }
            .control {
                width: 65%;
            }
        }
        .search-items {
            width: 74%;
            float: left;
            margin-top: 1rem;
            .column {
                margin-top: .3rem;
                label {
                    text-align: center;
                }
            }
        }
        .search-btn {
            float: left;
            width: 22%;
            height: 3rem;
            line-height: 3rem;
            margin: 1.6rem 0 0 4%;
        }
        .column:first-child {
            margin-top: 0;
        }
    }
    .item-box{
        overflow: scroll;
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
        button {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: #f60005;
            color: #fff;
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
