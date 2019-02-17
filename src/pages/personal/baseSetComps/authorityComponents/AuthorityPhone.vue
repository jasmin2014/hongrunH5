<template>
    <div>
        <section class="clear tips">
            <p v-if="v_mobile"><span class="icon iconfont">&#xe6bc;</span>温馨提示：您好！您已经成功通过手机号验证!</p>
            <p v-else><span class="icon iconfont">&#xe6bc;</span>为了您的充值提现便捷安全操作，请输入真实的手机号码，完成手机验证!</p>
        </section>
        <div class="form-items">
            <h2 v-if="v_mobile">修改绑定手机号</h2>
            <h2 v-else>绑定手机号</h2>
            <p class="auth-txt" v-show="v_mobile">您已经绑定过手机号，如需修改，请完成以下操作</p>
            <div class="column clear">
                <label class="label" for="mobile" v-if="v_mobile"><i>*</i>新手机号：</label>
                <label class="label" for="mobile" v-else><i>*</i>手机号码：</label>
                <div class="control" :class="{ 'validated': errors.has('mobile') }">
                    <p class="clear getcode">
                        <input v-model="mobileForm.mobile" v-validate="'required|mobile'" id="mobile"
                               :class="{'input': true, 'is-danger': errors.has('mobile') }" name="mobile" type="text"
                               placeholder="">

                        <span v-if="mobileForm.sendDisabled" class="disable" style="font-size: 12px;"><i>{{time + 's'}}</i>后重新获取</span>

                        <span @click="senderCode" v-else>获取验证码</span>
                    </p>
                    <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>
                </div>
            </div>
            <div class="column clear">
                <label class="label" for="code" v-if="v_mobile"><i>*</i>手机验证码：</label>
                <label class="label" for="code" v-else><i>*</i>验证码：</label>
                <p class="control" :class="{ 'validated': errors.has('code') }">
                    <input v-model="mobileForm.code" v-validate="'required'" id="code"
                           :class="{'input': true, 'is-danger': errors.has('code') }" name="code"
                           type="text" placeholder="">
                    <span v-show="errors.has('code')" class="help is-danger">{{ errors.first('code')}}</span>
                </p>
            </div>
        </div>
        <div class="form-items-btn">
            <button @click="submitForm()">完成手机验证</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: 'ChangePassword',
    data () {
      return {
        v_mobile: false,
        mobileForm: {
          mobile: '',
          code: '',
          time: 60,
          sendDisabled: false,
          verifySuccess: false
        },
        time: 60,
      }
    },
    computed: mapGetters([
      'userInfo'
    ]),
    created(){
      this.v_mobile = this.userInfo.v_mobile;
    },
    methods: {
      ...mapActions([
        'sendCode','verifyMobile','setUserInfo'
      ]),
      senderCode(){
        let me = this;
        this.$validator.validate('mobile', this.mobileForm.mobile).then((result) => {
          if(result){
            me.mobileForm.sendDisabled = true;
            let interval = window.setInterval(function () {
              if ((me.time--) <= 0) {
                me.time = 60;
                me.mobileForm.sendDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
            me.sendCode({mobile:this.mobileForm.mobile});
          }
        });

      },
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if(result){
            this.verifyMobile({mobile:this.mobileForm.mobile,code:this.mobileForm.code}).then(response => {
              // 手机号验证成功
              this.v_mobile = true;
              this.userInfo.v_mobile = 1;
              this.userInfo.mobile = this.mobileForm.mobile;
              this.setUserInfo(this.userInfo);
              sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(this.userInfo)));
              this.mobileForm.mobile = '';
              this.mobileForm.code = '';
            });
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .tips {
        margin-top: 1rem;
        background: #fff;
        line-height: 2rem;
        padding: 0 1rem;
        font-size: 90%;
        span {
            color: #f30007;
            font-size: 120%;
            margin-right: .5rem;
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
</style>
