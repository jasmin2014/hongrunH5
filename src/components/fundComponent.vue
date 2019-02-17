<template>
    <section class="gly-item">
        <router-link :to="{name:'FinanceDetail',query: {id: funds.id}}">
            <h2>
                <span>抵•<b style="font-weight: normal;color: #fff;" v-if="funds.is_specify">密•</b></span>
                {{funds.title}}
            </h2>
            <div class="funds-content">
                <p>100.00元起购，{{funds.gmt_start}}开标</p>
                <div class="opt-profit clear">
                    <div class="left opt-amount">
                        <span>项目金额</span>
                        <p class="opt-bigorange">{{funds.amount}}元</p>
                    </div>
                    <div class="left opt-left">
                        <span>预期年化利率</span>
                        <p class="opt-bigorange">{{(parseFloat(funds.loan_rate)).toFixed(2)}}%</p>
                    </div>
                    <div class="left">
                        <span>理财期限</span>
                        <p><span class="opt-bigdays">{{funds.term}}<span v-show="funds.term_unit == '月'">个</span></span>{{funds.term_unit}}
                        </p>
                    </div>
                </div>
                <div class="opt-countdown">
                    <div class="opt-ctdline clear">
                        <div class="left line-left">
                            <mt-progress :value="getPercent(funds.bid_amount,funds.amount)" :bar-height="5"></mt-progress>
                        </div>
                        <div class="left line-right">{{parseFloat((funds.bid_amount / funds.amount * 100).toFixed(2))}}%</div>
                    </div>
                    <div class="opt-cdwrap">
                        <p v-if="showCountDown(funds.status,funds.gmt_start)">开标倒计时</p>
                        <p v-else>{{funds.status | getBtnTips(funds.gmt_start)}}</p>
                        <div class="opt-cdbtn">
                            <count-down :currentTime="startTime" :startTime="startTime" v-if="showCountDown(funds.status,funds.gmt_start)"
                                        :endTime="getBidTime(funds.gmt_start)" :dayTxt="'天'" :hourTxt="'小时'"
                                        :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
                            <div :class="{'count-down-end': true, 'disabled-btn': funds.status !== 2}" v-else>{{funds.status | getBtnTxt(funds.gmt_start)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </section>
</template>

<script type="text/ecmascript-6">
  import CountDown from 'vue2-countdown';
  import enums from '../utils/enums.js';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'fundComponent',
    components: {CountDown},
    props: {
      funds: Object
    },
    data () {
      return {
        startTime: 0,
        test: false
      }
    },
    created(){
      this.startTime = GV.now;
    },
    methods: {
      getPercent(current, total) {
        let result = (current / total) * 100;
        return parseFloat(result.toFixed(2));
      },
      getBidTime(val) {
        if(val){
          return new Date(Date.parse(val.replace(/-/g, "/"))).getTime() / 1000;
        }else{
          return 0;
        }
      },
      showCountDown(status, start){
        if(start){
          let now = this.startTime;
          let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

          if(status == 2 && begin > now) {
            return true
          } else {
            return false;
          }
        }
      }
    },
    filters: {
      getBtnTips(status, start){
        let now = GV.now;

        if(start){
          let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

          if (status == 2 && begin > now) {
            return '倒计时中';
          } else if (status == 2 && begin <= now) {
            return '可以抢标啦！';
          } else if (status == 3) {
            return '正在复审中！';
          } else if (status == 4) {
            return '正在还款中！';
          } else if (status == 5) {
            return '投标已结束！';
          }
        }

      },
      getBtnTxt(status, start){
        let now = GV.now;
        if(start){
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
    section.gly-item {
        width: 94%;
        font-size: 85%;
        margin: 1rem auto 0 auto;
        background: #fff;
        padding: 1.2rem 0 1.2rem 0;
        h2 {
            font-size: 110%;
            height: 2rem;
            line-height: 2rem;
            font-weight: normal;
            span {
                background: url("../assets/images/titbgs/bg1.png") no-repeat left top;
                display: inline-block;
                color: #fff;
                padding: 0 2rem 0 1rem;
                height: 2.2rem;
                line-height: 1.8rem;
                margin-left: -6px;
            }
        }
        .funds-content {
            > p {
                text-align: center;
                padding-left: .6rem;
                margin-top: .5rem;
                color: #fdb563;
            }
            .opt-profit {
                width: 100%;
                margin: 2rem auto 0 auto;
                div {
                    width: 33.33%;
                    text-align: center;
                    border-right: 1px solid #ddd;
                }
                div:last-child {
                    border-right: none;
                }
                .opt-bigorange {
                    color: #fa5e5e;
                    font-size: 140%;
                }
                .opt-bigdays {
                    color: #00d398;
                    font-size: 140%;
                }
            }
        }
        .opt-countdown {
            width: 80%;
            margin: 2rem auto 0 auto;
            .opt-ctdline {
                display: block;
                width: 80%;
                margin: 0 auto;
                .line-left {
                    width: 86%;
                }
                .line-right {
                    width: 12%;
                    margin-left: 2%;
                    margin-top: 3%;
                }
            }
            .opt-cdwrap {
                > p {
                    text-align: center;
                }
                .opt-cdbtn {
                    width: 80%;
                    margin: .5rem auto 0 auto;
                    height: 2.4rem;
                    line-height: 2.4rem;
                    text-align: center;
                    background: #ccc;
                    border-radius: 5px;
                    .count-down-end {
                        background: #f30007;
                        color: #fff;
                    }
                    .disabled-btn{
                        background: #ccc !important;
                    }
                }
            }
        }
    }


</style>
