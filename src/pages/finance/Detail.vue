<template>
    <div class="detail" v-show="isShown">
        <moudle-header :my-title="funds.title" :page-name="pageName" :back-url="backUrl"></moudle-header>
        <div class="detail-content">
            <div class="detail-top">
                <p class="detail-txt">{{funds.low_money}}元起购，{{funds.gmt_start}}开标</p>
                <div class="detail-interest">
                    <p>预期年化收益率</p>
                    <p class="detail-itr"><span>{{funds.loan_rate}}</span>%</p>
                    <div class="detail-progress clear">
                        <div class="myprogress">
                            <mt-progress :value="getPercent(funds.bid_amount,funds.amount)"
                                         :bar-height="5"></mt-progress>
                        </div>
                        <div class="mypercent">
                            {{funds.bid_amount | getPercent(funds.amount)}}%
                        </div>
                    </div>
                </div>
                <div class="detail-items clear">
                    <div>
                        <p>项目期限</p>
                        <p><span v-if="funds.term_unit == '月'">{{funds.term}}个</span><span
                                v-else>{{funds.term}}</span>{{funds.term_unit}}</p>
                    </div>
                    <div>
                        <p>项目总额</p>
                        <p><span>{{funds.amount}}</span>元</p>
                    </div>
                    <div>
                        <p>项目奖励</p>
                        <p><span>1.00</span>%</p>
                    </div>
                </div>
            </div>
            <div class="detail-main">
                <div class="clear">
                    <div class="detail-mitem">
                        <p>剩余可投</p>
                        <p>￥<span>{{(funds.amount - funds.bid_amount).toFixed(2)}}</span>元</p>
                    </div>
                    <div class="detail-mitem">
                        <p>账户余额</p>
                        <p v-if="true">￥<span>0.00</span>元</p>
                        <p v-else>￥<span>{{userInfo.balance}}</span>元</p>
                    </div>
                </div>
                <div class="detail-mainitem">
                    预期收益：<span>0.00</span>元
                </div>
                <div class="detail-unlogin" v-if="!isLogin">
                    还未登录？请先
                    <router-link to="/login">登录</router-link>
                </div>
                <div v-else>
                    <div class="detail-login" v-if="!showCountDown(funds.status,funds.gmt_start)">
                        <div v-if="showBidInput(funds.status,funds.gmt_start)">
                            <div class="column clear">
                                <label class="label" for="amount"><i>*</i>输入投标金额：</label>
                                <p class="control" :class="{ 'validated': errors.has('amount') }">
                                    <input v-model="amountForm.amount" v-validate="'required'" id="amount"
                                           :class="{'input': true, 'is-danger': errors.has('amount') }" name="amount"
                                           type="text" placeholder="请输入投资金额">
                                    <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount')}}</span>
                                </p>
                            </div>
                            <div class="column clear" v-if="funds.is_specify">
                                <label class="label" for="password"><i>*</i>输入定向密码：</label>
                                <p class="control" :class="{ 'validated': errors.has('password') }">
                                    <input v-model="amountForm.password" v-validate="'required'" id="password"
                                           :class="{'input': true, 'is-danger': errors.has('password') }"
                                           name="password"
                                           type="text" placeholder="输入定向密码">
                                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password')}}</span>
                                </p>
                            </div>
                            <div class="column redpackage">
                                <input name="redpackage" type="checkbox" v-model="useBonus"/>使用红包<span
                                    class="red">（选中红包金额：{{selectAmount}}）</span>
                                <span class="icon iconfont" @click="handleShowCoupon">&#xe64a;</span>
                            </div>
                            <p style="color:red;height: 30px;line-height: 30px;font-size: 12px;margin-top: 10px;"
                               v-show="amountForm.shorError">{{amountForm.ErrorMsg}}</p>
                            <div class="column tender" @click="handleBid">立即投标</div>
                        </div>
                        <div v-else>
                            <div class="column tender" style="background: rgb(153,153,153);">{{funds.status | getBtnTxt(funds.gmt_start)}}</div>
                        </div>
                    </div>
                    <div class="countdown" v-else>
                        <p>开标倒计时</p>
                        <count-down :currentTime="startTime" :startTime="startTime"
                                    :endTime="getBidTime(funds.gmt_start)" :dayTxt="'天'" :hourTxt="'小时'"
                                    :minutesTxt="'分钟'" :secondsTxt="'秒'"
                                    v-on:end_callback="countDownEnd"></count-down>
                    </div>
                </div>
            </div>
            <div class="detail-seeInfo" @click="showInfoFn">查看详情</div>
            <div v-show="showInfo">
                <div class="detail-info">
                    <div class="clear"><label>还款方式 :</label>
                        <p>{{funds.useage | getBidRepayment}}</p></div>
                    <div class="clear"><label>起投金额 :</label>
                        <p>￥{{funds.low_money}}</p></div>
                    <div class="clear"><label>借款用途 :</label>
                        <p>{{funds.useage | getBidUseage}}</p></div>
                    <div class="clear"><label>开标时间 :</label>
                        <p>{{funds.gmt_start}}</p></div>
                </div>
                <div class="detail-info">
                    <div class="clear"><label>真实姓名 :</label>
                        <p>{{funds.user.name | hideName}}</p></div>
                    <div class="clear"><label>性别 :</label>
                        <p>{{funds.user.sex | getSex}}</p></div>
                    <div class="clear"><label>婚姻状况 :</label>
                        <p>{{funds.user.is_marry | getMarry}}</p></div>
                    <div class="clear"><label>月收入(元):</label>
                        <p>{{funds.user.income | getIncome}}</p></div>
                    <div class="clear"><label>年龄 :</label>
                        <p>{{funds.user.age}}</p></div>
                    <div class="clear"><label>户籍地 :</label>
                        <p>{{funds.native_place}}</p></div>
                    <div class="clear"><label>是否购车 :</label>
                        <p>{{funds.user.is_car | getBool}}</p></div>
                    <div class="clear"><label>学历 :</label>
                        <p>{{funds.user.education | getEducation}}</p></div>
                </div>
                <div class="information">
                    <mt-navbar v-model="selected">
                        <mt-tab-item id="tab1">借款详情</mt-tab-item>
                        <mt-tab-item id="tab2">安全审核</mt-tab-item>
                        <mt-tab-item id="tab3">投资记录</mt-tab-item>
                    </mt-navbar>
                    <!-- tab-container -->
                    <mt-tab-container v-model="selected">
                        <mt-tab-container-item id="tab1">
                            <div class="mypics">                                
                                <div v-for="(image,index) in funds.images">
                                    <p class="smallpic" @click="showPoup(index)"><img :src="image"></p>
                                </div>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab2">
                            <p class="tabtxt">经平台风控部检验并商议审核通过同意其借款申请。</p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab3">
                            <div class="record-items" v-if="funds.bid_record.length > 0">
                                <section class="records-item" v-for="(item,index) in funds.bid_record">
                                    <h3>序号：{{index + 1}}</h3>
                                    <p>投资人：{{item.username | hideName}}</p>
                                    <p>投资金额：{{item.amount}}元</p>
                                    <p>投资时间：{{item.gmt_create}}</p>
                                    <p>投资方式：{{item.bid_type}}</p>
                                </section>
                            </div>
                            <div v-else>
                                <p style="text-align: center;height: 40px;line-height: 40px;">暂无投资记录</p>
                            </div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </div>

        </div>
        <div id="ipsForm" style="border: none;"></div>
        <moudle-footer :active-page="activePage"></moudle-footer>
        <mt-popup
                v-model="popupVisible"
                position="right">
            <div class="poupbox">
                <div class="bigpic"><img :src="curPic"></div>
                <div class="closepoup" @click="popupVisible=false"><i class="icon iconfont">&#xe662;</i></div>
            </div>
        </mt-popup>
        <mt-popup
                v-model="showCoupDialog"
                position="right">
            <div class="poupbox">
                <mt-checklist
                        title="红包列表"
                        v-model="checkedCoupons"
                        :options="couponOptions">
                </mt-checklist>
                <div class="btns">
                    <mt-button type="danger" size="small" @click="handleOkCoupon" style="margin-right:.5rem;">确定
                    </mt-button>
                    <mt-button type="default" size="small" @click="handleCancelCoupon">取消</mt-button>
                </div>
                <div class="closepoup redpackage" @click="handleCancelCoupon"><i class="icon iconfont">&#xe662;</i>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import moudleHeader from '../../components/headerComponent';
    import moudleFooter from '../../components/footerComponent';
    import CountDown from 'vue2-countdown';
    import enums from '../../utils/enums.js';
    import { mapGetters, mapActions } from 'vuex';
    import { Indicator,MessageBox } from 'mint-ui';
    export default {
        name: 'InvestDetail',
        components: {moudleHeader, moudleFooter, CountDown},
        data () {
            return {
                showInfo: false,
                startTime: 0,
                pageName: 'detail',
                backUrl: '/finance/list',
                activePage: '1',
                amount: '',
                isLogin: false,
                popupVisible: false,
                poupRedPackage: false,
                curPic: '',
                amountForm: {
                    amount: '',
                    password: '',
                    shorError: false,
                    ErrorMsg: ''
                },
                funds: {
                    user: {},
                    bid_record: []
                },
                selected: 'tab1',
                hasBonus: true,
                useBonus: false,
                showCoupDialog: false,
                checkedCoupons: [],
                couponList:[],
                couponOptions:[],
                selectAmount: '0.00',
                isShown: false
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        beforeCreate(){
        },
        created(){
            if(self != top){
                parent.window.location.href = self.location.href;
                return;
            }else{
                this.isShown = true;
            }
            this.startTime = GV.now;
            this.getDetail();

            let authUser = sessionStorage.getItem('authUser');
            if (authUser) {
                let authUser = JSON.parse(Base64.decode(sessionStorage.getItem('authUser')));
                this.setUserInfo(authUser);
            }
        },
        watch:{
            checkedCoupons(val){
                this.handleCheckedCouponsChange(val);
            },
            showInfo(val){
                if(val){
                    setTimeout(function () {
                      window.scrollTo(0,$('.detail-seeInfo').offset().top);
                    },30)
                }
            }
        },
        mounted (){
            let _this = this;
            if (this.userInfo.bonus) {
                this.hasBonus = true;
            }

            if (JSON.stringify(this.userInfo) !== '{}') {
                this.isLogin = true;
                if (this.userInfo.v_mobile && this.userInfo.v_identity && !this.userInfo.ips_acct_no) {
                    MessageBox.alert('请先开通托管账户', '提示信息', {
                        confirmButtonText: '确定', type: 'error', callback: action => {
                            _this.ipsRegister(null).then(response => {
                                $('#ipsForm').html(response);
                            });
                        }
                    });
                }
                // 重新设置用户信息
                this.queryUserInfo(null).then(function (resp) {
                    _this.setUserInfo(resp.account);
                    sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(resp.account)));
                });
            }
        },
        methods: {
            ...mapActions([
                'ipsRegister', 'queryUserInfo', 'queryBidDetail', 'ipsFreeze', 'ipsBid', 'setUserInfo', 'queryUserCoupon'
            ]),
            chooseRedpackage(){
                this.poupRedPackage = false;
            },
            showPoup(index){
                this.popupVisible = true;
                this.curPic = this.funds.images[index];
            },
            getDetail(){
                let _this = this;
                Indicator.open();
                this.$store.dispatch('queryBidDetail', {id: this.$route.query.id})
                        .then(response => {
                            Indicator.close();
                            _this.funds = response;
//            _this.getBidStatus(response);
                        });
            },
            showInfoFn(){
                if (this.showInfo) {
                    this.showInfo = false
                } else {
                    this.showInfo = true;
                }
            },
            countDownEnd: function (x) {
                this.funds.endCountDown = true;
            },
            getPercent(current, total) {
                let result = (current / total) * 100;
                return parseFloat(result.toFixed(2));
            },
            getBidTime: function (val) {
                if (val) {
                    return new Date(Date.parse(val.replace(/-/g, "/"))).getTime() / 1000;
                } else {
                    return 0;
                }
            },
            showCountDown(status, start){
                if (start) {
                    let now = this.startTime;
                    let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

                    if (status == 2 && begin > now) {
                        return true
                    } else {
                        return false;
                    }
                }
            },
            handleBid(){
                let me = this;

                if (me.funds.is_specify && !me.amountForm.password) {
                    me.amountForm.shorError = true;
                    me.amountForm.ErrorMsg = '请输入定向标密码';
                    return;
                }

                if (me.amountForm.amount >= parseFloat(me.funds.low_money) && me.amountForm.amount <= (me.funds.amount - me.funds.bid_amount)) {
                    me.amountForm.shorError = false;

                    if (!this.userInfo.v_mobile || !this.userInfo.v_identity) {
                        MessageBox.alert('请先完成实名认证', '提示信息', {
                            confirmButtonText: '确定', type: 'error', callback: action => {
                                return next('/personal/auth');
                            }
                        });
                    }

                    if (me.amountForm.amount > parseFloat(this.userInfo.balance)) {
                        MessageBox.alert('余额不足，请先去充值', '提示信息', {
                            confirmButtonText: '确定', type: 'error', callback: action => {
                                return next('/personal/recharge');
                            }
                        });
                    } else {
                        if (this.useBonus) {
                            // 使用红包
                            if (me.amountForm.amount < 10000) {
                                me.amountForm.shorError = true;
                                me.amountForm.ErrorMsg = '投标金额大于10000才可使用红包';
                                return;
                            }
                            if (this.selectAmount > 0) {
                                this.ipsBid({
                                    id: this.funds.id,
                                    amount: (this.amountForm.amount - this.selectAmount),
                                    bonus: this.selectAmount,
                                    password: this.amountForm.password,
                                    coupon_ids: this.checkedCoupons
                                }).then(response => {
                                   sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
                                   this.$router.push({path: '/ips'});
                                });
                            } else {
                                me.amountForm.shorError = true;
                                me.amountForm.ErrorMsg = '请选择需要使用的红包';
                                return;
                            }
                        } else {
                            // 不使用红包
                            this.ipsFreeze({
                                id: this.funds.id,
                                amount: this.amountForm.amount,
                                password: this.amountForm.password
                            }).then(response => {
                               sessionStorage.setItem('ips',Base64.encode(JSON.stringify(response)));
                               this.$router.push({path: '/ips'});
                            });
                        }
                    }
                } else {
                    me.amountForm.amount = '';
                    me.amountForm.shorError = true;
                    me.amountForm.ErrorMsg = me.funds.low_money + '元起投，不高于剩余可投金额，请重新输入！'
                }
            },
            handleShowCoupon(){
                let _this = this;
                // type 1:虚拟红包 status:未使用
                this.queryUserCoupon({noPage:true,type:1,status:2}).then(response => {
                    _this.couponList = response;
                    if(response.length){
                        _this.couponOptions = [];
                        for(let i in _this.couponList){
                            _this.couponOptions.push({
                                label: _this.getCouponCategory(_this.couponList[i].category) + "(¥" + _this.couponList[i].amount + ")",
                                value: (String)(_this.couponList[i].id)
                            });
                        }
                        this.showCoupDialog = true;
                    }else{
                        MessageBox.alert('您没有可以使用的红包', '提示信息', {confirmButtonText: '确定', type: 'error', callback: action => {}});
                    }
                });
            },
            showBidInput(status, start){
                if (start) {
                    let now = this.startTime;
                    let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

                    if (status == 2 && begin <= now) {
                        return true
                    } else {
                        return false;
                    }
                }
            },
            getCouponCategory(val) {
                return enums.getDesc('COUPON_CATEGORY', val);
            },
            handleCheckedCouponsChange(val){
                let couponAmount = 0;
                $.each(this.couponList,function (idx, item) {
                    if($.inArray((String)(item.id),val) !== -1){
                        couponAmount += parseFloat(item.amount);
                    }
                });
                this.selectAmount = couponAmount.toFixed(2);
            },
            handleOkCoupon(){
                this.showCoupDialog = false;
                this.useBonus = true;
            },
            handleCancelCoupon(){
                this.showCoupDialog = false;
                this.useBonus = false;
                this.selectAmount = '0.00';
            }
        },
        filters: {
            getBool(val) {
                return enums.getDesc('BOOL', val);
            },
            getSex(val) {
                return enums.getDesc('SEX', val);
            },
            getEducation(val) {
                return enums.getDesc('EDUCATION', val);
            },
            getIncome(val) {
                return enums.getDesc('INCOME', val);
            },
            getHouse(val) {
                return enums.getDesc('HOUSE', val);
            },
            getBidUseage(val) {
                return enums.getDesc('BID_USEAGE', val);
            },
            getBidType(val) {
                return enums.getDesc('BID_TYPE', val);
            },
            getBidRepayment(val) {
                return enums.getDesc('BID_REPAYMENT', val);
            },
            getMarry(val) {
                return enums.getDesc('MARRY', val);
            },
            hideName(val){
                if (val) {
                    return val.replace(/^(.).+$/g, "$1*");
                }
            },
            getPercent(current, total) {
                if (total) {
                    let result = (current / total) * 100;
                    return Number.parseFloat(result.toFixed(2));
                }
            },
            getBtnTxt(status, start){
                if (start) {
                    let now = GV.now;
                    let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

                    if (status == 2 && begin > now) {
                        return '倒计时中';
                    } else if (status == 2 && begin <= now) {
                        return '进行中';
                    } else if (status == 3) {
                        return '复审中';
                    } else if (status == 4) {
                        return '还款中';
                    } else if (status == 5) {
                        return '已还款';
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .detail {
        padding-bottom: 3.5rem;

    .v-modal {
        background: rgba(0, 0, 0, .8);
    }

    }

    .detail-content {
        font-size: 90%;

    .detail-top {
        padding: 1.5rem 0 0 0;
        background: #fff;

    .detail-txt {
        text-align: center;
        color: #fdb563;
    }

    .detail-interest {
        text-align: center;
        margin: 2.5rem 0;

    .detail-itr {
        color: #f50006;
        font-size: 150%;
        margin: .5rem auto;

    span {
        font-size: 180%;
        color: #f50006;
    }

    }
    .detail-progress {
        width: 58%;
        margin: 0 auto;

    .myprogress {
        width: 80%;
        float: left;
    }

    .mypercent {
        width: 16%;
        margin-left: 4%;
        float: left;
        line-height: 2rem;
    }

    }
    }
    .detail-items {
        display: flex;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;

    >
    div {
        float: left;
        border-right: 1px solid #eee;
        text-align: center;
        padding: .8rem 0;

    span {
        font-size: 120%;
        color: #000;
        margin-top: .5rem;
    }

    p:nth-child(2) {
        margin-top: .5rem;
    }

    }
    >
    div:first-child {
        width: 30%;
    }

    >
    div:nth-child(2) {
        width: 40%;
    }

    >
    div:last-child {
        width: 30%;
        border-right: none;
    }

    }
    }
    .detail-main {
        padding: 1.5rem 0;
        background: #fff;
        margin-top: .3rem;

    div.detail-mitem {
        width: 50%;
        float: left;
        text-align: center;
        border-right: 1px solid #eee;

    span {
        font-size: 150%;
        color: #f50006;
    }

    p:last-child {
        margin-top: .3rem;
    }

    }
    >
    div:last-child {
        /*border-right: none;*/
    }

    .detail-mainitem {
        font-size: 140%;
        line-height: 2rem;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        text-align: center;
        border-top: 1px solid #eee;

    span {
        font-size: 160%;
        color: #f50006;
    }

    }
    .detail-unlogin {
        width: 70%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        color: #999;
        margin: 1rem auto 0 auto;
        border: 1px solid #ddd;
        border-radius: 5px;

    a {
        color: #333;
    }

    }
    .detail-login {
        width: 90%;
        margin: 0 auto;

    .column {
        line-height: 2rem;
        margin-top: 1rem;

    label {
        width: 35%;
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

    p {
        width: 65%;
        float: left;
        height: 100%;

    input {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
    }

    }
    }
    .column.tender {
        background-color: #ff4949;
        border-color: #ff4949;
        color: #fff;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        border-radius: 4px;
    }

    .column.redpackage {
        position: relative;
        border: 1px dashed #ddd;
        padding: .2rem .6rem .2rem 1rem;

    input {
        margin-right: .5rem;
        width: 1rem;
        height: 1rem;
        background: #fff;
        border: 1px solid #ddd;
    }

    span {
        color: #f50006;
    }

    span.iconfont {
        position: absolute;
        right: .5rem;
        top: 50%;
        margin-top: -1rem;
        font-size: 140%;
    }

    }
    }
    .countdown {
        width: 90%;
        margin: 1rem auto;
        line-height: 2rem;
        text-align: center;
        font-style: normal;

    >
    div {
        background: #ccc;
    }

    }
    }
    .detail-seeInfo {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background: #fff;
        color: #999;
        margin-top: .3rem;
    }

    .detail-info {
        padding: 1rem 1.5rem;
        background: #fff;
        margin-top: .3rem;

    >
    div {
        line-height: 2rem;

    label, p {
        float: left;
    }

    label {
        width: 22%;
        color: #999;
        text-align: right;
    }

    span {
        color: #333;
    }

    }
    }
    .poupCenter.mint-popup-right {
        width: 90%;
        right: 5%;
    }

    }
    .information {
        margin-top: .5rem;
        background: #fff;

    .mypics {
        width: 96%;
        margin: 1rem auto;

    >div {
        width: 32%;
        height: 8rem;
        overflow: hidden;
        float: left;
        margin-right: 2%;
        margin-top: .5rem;

        .smallpic {

            img {
                width: 100%;
            }

        }
    }
    >div:nth-child(3n) {
        margin-right: 0;
    }

    }
    .tabtxt {
        width: 96%;
        margin: 1rem auto;
    }

    }
    .mint-popup.mint-popup-right {
        width: 90%;
        right: 5%;

    .btns {
        text-align: center;
        padding: 1rem 0;
    }

    }
    .poupbox {
        width: 100%;
        position: relative;

    .bigpic {
        padding: 1rem;

    img {
        width: 100%;
    }

    }
    .closepoup {
        position: absolute;
        right: .5rem;
        top: .5rem;
        border-radius: 50%;
        color: #fff;
        width: 3rem;
        height: 3rem;
        background: rgba(0, 0, 0, .7);
        text-align: center;
        line-height: 3rem;

    i {
        color: #fff;
    }

    }
    .closepoup.redpackage {
        width: 1.5rem;
        height: 1.5rem;
        background: none;
        line-height: 1.5rem;
        top: -.3rem;

    i {
        color: #333;
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

    }

    .record-blank {
        text-align: center;
        line-height: 2rem;
        margin-top: 1rem;
    }
</style>
