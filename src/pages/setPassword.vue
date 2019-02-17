<template>
    <div class="content">
        <div class="loginpage">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <div class="logo"><img src="../assets/images/logo.jpg"></div>
            <div class="login-content">
                <div class="login-tit">
                    <span class="icon iconfont">&#xe7a8;</span>找回密码
                    <router-link to="login">去登陆</router-link>
                </div>

                <div class="column clear">
                    <label class="label" for="mobile"><i>*</i>手机号：</label>
                    <p class="control" :class="{ 'validated': errors.has('mobile') }">
                        <input v-model="findPassForm.mobile" v-validate="'required|mobile'" id="mobile"
                               :class="{'input': true, 'is-danger': errors.has('mobile') }" name="mobile"
                               type="text" placeholder="">
                        <span v-show="errors.has('mobile')"
                              class="help is-danger">{{ errors.first('mobile')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="code"><i>*</i>验证码：</label>
                    <div class="control" :class="{ 'validated': errors.has('code') }">
                        <p class="clear getcode">
                            <input v-model="findPassForm.code" v-validate="'required'" id="code"
                                   :class="{'input': true, 'is-danger': errors.has('code') }" name="code"
                                   type="text" placeholder="">
                            <span v-if="errors.has('code')" class="disable">获取验证码</span>
                            <span v-else-if="findPassForm.sendDisabled" class="disable"><i>{{time + 's'}}</i>后重新获取</span>
                            <span @click="senderCode" v-else>获取验证码</span>
                        </p>
                        <span v-show="errors.has('code')" class="help is-danger">{{ errors.first('code')}}</span>
                    </div>
                </div>
                <div class="column clear">
                    <label class="label" for="password"><i>*</i>新密码：</label>
                    <p class="control" :class="{ 'validated': errors.has('password') }">
                        <input v-model="findPassForm.password" v-validate="'required|password'" id="password"
                               :class="{'input': true, 'is-danger': errors.has('password') }" name="password"
                               type="password">
                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="repassword"><i>*</i>确认新密码：</label>
                    <p class="control" :class="{ 'validated': errors.has('repassword') || findPassForm.repassword!=findPassForm.password }">
                        <input v-model="findPassForm.repassword" v-validate="'required|password'" id="repassword"
                               :class="{'input': true, 'is-danger': errors.has('repassword')||findPassForm.repassword!=findPassForm.password }"
                               name="repassword" type="password">
                        <span v-if="errors.has('repassword')" class="help is-danger">{{ errors.first('repassword')}}</span>
                        <span v-else-if="findPassForm.repassword!=findPassForm.password"
                              class="help is-danger">两次密码不一致</span>
                    </p>
                </div>
                <div class="column column-txt">
                    还没有账号？
                    <router-link to="/reg">立即注册</router-link>
                </div>
                <button class="column column-btn" v-bind:disabled="!btnStatus" @click="submitForm()"
                        :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">&#xe607;</i>{{btnTxt}}
                </button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../components/headerComponent';
  import { mapGetters, mapActions } from 'vuex';
  import md5 from 'js-md5';
  export default {
    name: 'setPasswordPage',
    components: {moudleHeader},
    data () {
      return {
        myTitle: "找回密码",
        pageName: "setPasswordPage",
        btnStatus: true,
        btnTxt: '立即找回密码',
        time: 60,
        findPassForm: {
          mobile: '',
          code: '',
          password: '',
          repassword: '',
          sendDisabled: false,
          verifyMobileSuccess:false,
          time: 60
        }
      }
    },
    created() {

    },
    methods: {
      ...mapActions([
        'sendCode','findPassword'
      ]),
      senderCode(){
        let me = this;
        this.$validator.validate('mobile', this.findPassForm.mobile).then((result) => {
          if(result){
            me.findPassForm.sendDisabled = true;
            let interval = window.setInterval(function () {
              if ((me.time--) <= 0) {
                me.time = 60;
                me.findPassForm.sendDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
            me.sendCode({mobile:this.findPassForm.mobile});
          }
        });
      },
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            let formData = {
              mobile:this.findPassForm.mobile,
              code:this.findPassForm.code,
              password: md5(this.findPassForm.password)
            };

            this.btnStatus = false;
            this.btnTxt = '找回密码中';
            this.$store.dispatch('findPassword',formData).then(response => {
              this.btnStatus = true;
              this.btnTxt = '立即找回';
              this.$router.push({path:'login'})
            });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .loginpage {
        width: 100%;
        height: 100vh;
        border-radius: 8px;
        background: #fff;
        .logo {
            width: 50%;
            margin: 1rem auto 0 auto;
            img {
                width: 100%;
            }
        }
        .login-content {
            width: 92%;
            font-size: 90%;
            margin: 1rem auto 0 auto;
            padding: 1.5rem .8rem;
            border-radius: .4rem;
            .login-tit {
                height: 2.2rem;
                line-height: 2.2rem;
                position: relative;
                font-size: 120%;
                padding-left: 2rem;
                border-bottom: 1px solid #ddd;
                .iconfont {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    font-size: 120%;
                    color: #f50006;
                    font-weight: bold;
                    margin-right: 6px;
                    margin-top: -1rem;
                }
                a {
                    float: right;
                    font-size: 85%;
                    color: #f50006;
                }
            }
            .column {
                line-height: 2rem;
                margin-top: 1rem;
                .label {
                    width: 35%;
                    float: left;
                    text-align: right;
                    i {
                        color: #f50006;
                        margin-right: 10px;
                    }
                }
                .control, .control-code, .control-code-pic {
                    height: 100%;
                    float: left;
                    input {
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;
                    }
                }
                .control-code-pic {
                    height: 2rem;
                    overflow: hidden;
                }
                .control {
                    width: 65%;
                    input {
                        height: 2rem;
                    }
                }
                .control.validated {
                    input.is-danger {
                        border: 1px solid red;
                    }
                    .is-danger {
                        color: red;
                    }
                }

                .control-code {
                    width: 40%;
                    input {
                        height: 2rem;
                    }
                }
                .control-code-pic {
                    width: 28%;
                    margin-left: 2%;
                    img {
                        width: 100%;
                    }
                }
                .getcode {
                    input {
                        width: 45%;
                        float: left;
                    }
                    > span {
                        display: inline-block;
                        width: 50%;
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
            .controlcode.validated {
                .code.is-danger {
                    margin-left: 30%;
                    color: red;
                }
                input {
                    border: 1px solid red;
                }
            }
            .column-txt {
                text-align: center;
                font-size: 90%;
                a {
                    color: #f30007;
                }
            }
            .column-btn {
                text-align: center;
                background: #f30007;
                color: #fff;
                border-radius: .3rem;
                outline: none;
                border: none;
                width: 100%;
                i {
                    color: #fff;
                    font-weight: bold;
                    margin-right: .5rem;
                    font-size: 120%;
                }
            }
            .disabled {
                background: #ccc !important;
            }
        }
    }

</style>
