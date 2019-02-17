<template xmlns="http://www.w3.org/1999/html">
    <div class="content iborrow-apply" v-show="isShown">
        <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab1">发标中借款</mt-tab-item>
            <mt-tab-item id="tab2">尝还中借款</mt-tab-item>
            <mt-tab-item id="tab3">已还请的借款</mt-tab-item>
        </mt-navbar>

        <div class="form-items clear">
            <div class="search-items">
                <div class="column clear chooseDate">
                    <label class="label" for="gmt_start">时间从：</label>
                    <p class="control">
                        <input name="startdate" v-model="search.gmt_start" type="text" placeholder="选择时间"
                               id="gmt_start"
                               @click="openPicker('picker1')">
                        <mt-datetime-picker
                                ref="picker1"
                                type="date"
                                v-model="pickerStart"
                                @confirm="handleConfirm()">
                        </mt-datetime-picker>
                    </p>
                </div>
                <div class="column clear chooseDate">
                    <label class="label" for="gmt_end">到：</label>
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
            <div class=" search-btn">查看</div>
        </div>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab1">
                <div class="record-items" v-if="tableList.total > 0">
                    <section class="records-item" v-for="item in tableList.data">
                        <h3>借款标号：{{item.code}}</h3>
                        <p>还款方式：{{item | getRepayment}}</p>
                        <p>借款金额：￥{{item.amount}}</p>
                        <p>借款进度：{{item | getProgress}}</p>
                        <p>借款时间：{{item.gmt_create}}</p>
                        <p class="information">
                            <router-link :to="{name:'FinanceDetail',query: {id: item.id}}">查看详情</router-link>
                        </p>
                    </section>
                </div>
                <div class="record-blank" v-else>
                    <p>暂无数据</p>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <div class="record-items" v-if="tableList.total > 0">

                    <section class="records-item" v-for="item in tableList.data">
                        <h3>借款标号：{{item.code}}</h3>
                        <p>还款方式：{{item | getRepayment}}</p>
                        <p>借款金额：￥{{item.amount}}</p>
                        <p>已还金额：{{item | getRepayAmount}}</p>
                        <p>年利率：{{item.loan_rate}}%</p>
                        <p>还款期限：{{item | getRepayTerm}}</p>
                        <p class="information">
                            <mt-button size="small" type="danger" style="font-size: 12px;margin-top: 10px;padding:5px;height: 25px;" @click="handleRepayment(item.id)">我要还款</mt-button>
                        </p>
                    </section>
                </div>
                <div class="record-blank" v-else>
                    <p>暂无数据</p>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
                <div class="record-items" v-if="tableList.total > 0">

                    <section class="records-item" v-for="item in tableList.data">
                        <h3>借款标号：{{item.code}}</h3>
                        <p>还款方式：{{item | getRepayment}}</p>
                        <p>借款金额：￥{{item.amount}}</p>
                        <p>借款期限：{{item | getRepayLimit}}</p>
                        <p>借款时间：{{item.gmt_create}}</p>
                        <p>已还本息：{{item.benxi}}</p>
                        <p class="information">
                            <router-link :to="{name:'FinanceDetail',query: {id: item.id}}">查看详情</router-link>
                        </p>
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
    import enums from '../../../utils/enums.js';
    import { Indicator } from 'mint-ui';
    export default {
        name: 'BaseInfo',
        components: {moudleHeader, moudleFooter},
        data () {
            return {
                activePage: '2',
                myTitle: '宏润共创-资金管理-我要提现',
                backUrl: '/personal/borrow',
                pageName: 'BaseSet',
                selected: 'tab1',
                tableList: {
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                search: {
                    status: 0,
                    date_process: '',
                    date_repay: '',
                    date_finish: '',
                    gmt_start: '',
                    gmt_end: ''
                },
                pickerStart: '',
                pickerEnd: '',
                lock: true,
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
            this.getList();
        },
        watch: {
            selected(val){
                if (val == 'tab1') {
                    this.search.status = 2;
                    this.getList();
                } else if (val == 'tab2') {
                    this.search.status = 4;
                    this.getList();
                } else if (val == 'tab3') {
                    this.search.status = 5;
                    this.getList();
                }
            }
        },
        methods: {
            ...mapActions([
                'queryUserBid', 'ipsRepayment'
            ]),
            openPicker() {
                this.$refs.picker1.open();
            },
            handleConfirm(){
                let _date = '';
                _date = new Date(this.pickerStart);
                let year = _date.getFullYear();
                let month = (_date.getMonth() + 1) < 10 ? ("0" + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
                let day = _date.getDate() < 10 ? ("0" + _date.getDate()) : _date.getDate();
                this.search.gmt_start = year + '-' + month + '-' + day;
            },
            getList() {
                Indicator.open();
                this.$store.dispatch('queryUserBid', this.search)
                        .then(response => {
                            Indicator.close();
                            this.tableList = response;
                        });
            },
            handleRepayment(id){
                if (this.lock) {
                    this.lock = false;
                    this.$store.dispatch('ipsRepayment', {id: id})
                            .then(response => {
                                this.lock = true;
                                sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
                                sessionStorage.setItem('backUrl','/personal/borrowin');
                                this.$router.push({path: '/ips'});
                            });
                }
            }
        },
        filters: {
            getRepayment(val) {
                return enums.getDesc('BID_USEAGE', val.useage);
            },
            getProgress(val) {
                return ((val.bid_amount / val.amount) * 100).toFixed(2) + '%';
            },
            getRepayAmount(val) {
                return '0.00';
            },
            getRepayTerm(val) {
                return enums.getDesc('BID_REPAYMENT', val.repayment);
            },
            getRepayLimit(val) {
                return val.term + val.term_unit;
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

    .column {
        line-height: 2rem;
        margin-top: 1rem;

    >
    label {
        width: 30%;
        float: left;
        text-align: right;

    i {
        color: #f50006;
        margin-right: 10px;
    }

    }
    .control {

    .is-danger {
        color: #f50006;
    }

    select {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
    }

    .base-pickers {

    >
    .picker {
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
    }
    >
    p,

    >
    div {
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
    .column.chooseDate {
        width: 95%;
        float: left;
    }

    .search-items {
        width: 80%;
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
        width: 15%;
        height: 3rem;
        line-height: 3rem;
        margin: 1.6rem 0 0 0;
        background: #f60005;
        color: #fff;
        text-align: center;
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
