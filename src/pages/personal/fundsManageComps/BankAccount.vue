<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab1">银行账户</mt-tab-item>
            <!--<mt-tab-item id="2">线下银行卡</mt-tab-item>-->
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab1">
                <div v-if="bankInfo">
                    <div class="form-items">
                        <div class="column clear withdraw">
                            <label class="label">您当前的银行名称：</label>
                            <p class="control">
                                {{bankInfo.bankName}}
                            </p>
                        </div>
                        <div class="column clear withdraw">
                            <label class="label">您当前的银行账号：</label>
                            <p class="control">
                                **************{{bankInfo.bankCard}}
                            </p>
                        </div>
                    </div>
                    <div class="form-items-btn" @click="LoginAccount">
                        更换提现银行卡
                    </div>
                </div>
                <div v-else class="form-items">
                    <p style="text-align: center;">您还未绑定任何银行卡</p>
                </div>
            </mt-tab-container-item>
            <!--<mt-tab-container-item id="2">-->
                <!--<div class="form-items clear">-->
                    <!--<section class="tips">-->
                        <!--<p><i class="icon iconfont">&#xe6b5;</i>请注意以下事项</p>-->
                        <!--<p>1、支持农行、建行、工行、中国银行等较大银行账号</p>-->
                        <!--<p>2、确保信息真实无误</p>-->
                    <!--</section>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="bankAccount"><i>*</i>银行账户户主姓名：</label>-->
                        <!--<p class="control" :class="{ 'validated': errors.has('bankAccount') }">-->
                            <!--<input v-model="bankAccount" v-validate="'required|bankAccount'"-->
                                   <!--:class="{'input': true, 'is-danger': errors.has('bankAccount') }" name="bankAccount"-->
                                   <!--type="text" placeholder="">-->
                            <!--<span v-show="errors.has('bankAccount')"-->
                                  <!--class="help is-danger">{{ errors.first('bankAccount') }}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="bankName"><i>*</i>账户的银行名称：</label>-->
                        <!--<p class="control" :class="{ 'validated': errors.has('bankName') }">-->
                            <!--<input v-model="bankName" v-validate="'required|bankName'"-->
                                   <!--:class="{'input': true, 'is-danger': errors.has('bankName') }" name="bankName"-->
                                   <!--type="text" placeholder="">-->
                            <!--<span v-show="errors.has('bankName')" class="help is-danger">{{ errors.first('bankName')-->
                                <!--}}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="bankNumber"><i>*</i>银行账号号码：</label>-->
                        <!--<p class="control" :class="{ 'validated': errors.has('bankNumber') }">-->
                            <!--<input v-model="bankNumber" v-validate="'required|bankNumber'"-->
                                   <!--:class="{'input': true, 'is-danger': errors.has('bankNumber') }" name="bankNumber"-->
                                   <!--type="text" placeholder="">-->
                            <!--<span v-show="errors.has('bankNumber')" class="help is-danger">{{ errors.first('bankNumber')-->
                                <!--}}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="reBankNumber"><i>*</i>确认银行账号：</label>-->
                        <!--<p class="control" :class="{ 'validated': errors.has('reBankNumber') }">-->
                            <!--<input v-model="reBankNumber" v-validate="'required|reBankNumber'"-->
                                   <!--:class="{'input': true, 'is-danger': errors.has('reBankNumber') && reBankNumber!=bankNumber }"-->
                                   <!--name="reBankNumber" type="text" placeholder="">-->
                            <!--<span v-if="errors.has('reBankNumber')"-->
                                  <!--class="help is-danger">{{ errors.first('reBankNumber') }}</span>-->
                            <!--<span v-else-if="reBankNumber!=bankNumber" class="help is-danger">两次输入不一致！</span>-->
                            <!--<span v-else></span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="province"><i>*</i>开户银行所在省份：</label>-->
                        <!--<p class="control">-->
                            <!--<select v-model="province" name="province">-->
                                <!--<option value="1">浙江省</option>-->
                                <!--<option value="3">湖北省</option>-->
                                <!--<option value="5">广东省</option>-->
                            <!--</select>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="city"><i>*</i>开户银行所在城市：</label>-->
                        <!--<p class="control">-->
                            <!--<select v-model="city" name="city">-->
                                <!--<option value="1">杭州市</option>-->
                                <!--<option value="3">嘉兴市</option>-->
                                <!--<option value="5">湖州市</option>-->
                            <!--</select>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="column clear withdraw">-->
                        <!--<label class="label" for="subbranch"><i>*</i>输入开户行支行名称：</label>-->
                        <!--<p class="control" :class="{ 'validated': errors.has('subbranch') }">-->
                            <!--<input v-model="subbranch" v-validate="'required|subbranch'"-->
                                   <!--:class="{'input': true, 'is-danger': errors.has('subbranch') }" name="subbranch"-->
                                   <!--type="text" placeholder="">-->
                            <!--<span v-show="errors.has('subbranch')" class="help is-danger">{{ errors.first('subbranch')-->
                                <!--}}</span>-->
                        <!--</p>-->
                    <!--</div>-->

                <!--</div>-->
                <!--<div class="form-items-btn">-->
                    <!--提交更新-->
                <!--</div>-->

            <!--</mt-tab-container-item>-->
        </mt-tab-container>

        <div id="ipsForm" style="border: none;"></div>
        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../../components/headerComponent';
  import moudleFooter from '../../../components/footerComponent';
  import { mapGetters,mapActions } from 'vuex';
  import { MessageBox,Indicator } from 'mint-ui';
  export default {
    name: 'BaseInfo',
    components: {moudleHeader, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-资金管理-银行账户',
        pageName: 'BaseSet',
        selected: 'tab1',
        bankInfo: '',
        bankAccount: '',
        bankName: '',
        bankNumber: '',
        reBankNumber: '',
        province: '',
        city: '',
        subbranch: ''
      }
    },
    computed: mapGetters([
      'userInfo'
    ]),
    mounted (){
      let _this = this;
      // 查询用户银行卡信息
      Indicator.open();
      this.queryAccount({type:'01'}).then(function(resp){
        Indicator.close();
        if(resp){
          _this.bankInfo = resp;
        }
      });
    },
    methods: {
      ...mapActions([
        'ipsRegister','ipsLogin','queryAccount'
      ]),
      LoginAccount(){
        let _this = this;
        if(this.userInfo.v_mobile && this.userInfo.v_identity && this.userInfo.ips_acct_no){
          this.ipsLogin(null).then(response => {
            $('#ipsForm').html(response);
          });
        }else{
          if(!this.userInfo.v_mobile || !this.userInfo.v_identity){
            MessageBox.alert('请先实名认证').then(action => {
              _this.$router.push({path:'/personal/auth'});
            });
          }
          if(!this.userInfo.ips_acct_no){
            MessageBox.alert('请先开通托管账户').then(action => {
              _this.ipsRegister(null).then(response => {
                $('#ipsForm').html(response);
              });
            });
          }
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
            .control {
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
        .column.withdraw {
            label {
                width: 45%;
            }
            .control {
                width: 55%;
            }
        }
        .column:first-child {
            margin-top: 0;
        }
        .tips {
            > p {
                line-height: 2rem;
                padding-left: 1rem;
                .iconfont {
                    color: #f70005;
                    font-size: 120%;
                    margin-right: .5rem;
                }
            }
            > p:first-child {
                color: #f70005;
            }
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
    }

</style>
