<template>
    <div class="content">        
        <div class="regpage">
            <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
            <div class="logo"><img src="../assets/images/logo.jpg"></div>
            <div class="login-content">
                <div class="login-tit">
                    <span class="icon iconfont">&#xe7a8;</span>注册宏润共创
                    <router-link :to="{name:'Login'}">去登录</router-link>
                </div>
                <div class="column clear">
                    <label class="label" for="username"><i>*</i>用户昵称：</label>
                    <p class="control" :class="{ 'validated': errors.has('username') }">
                        <input v-model="RegisterForm.username" v-validate="'required|username'" id="username"
                               :class="{'input': true, 'is-danger': errors.has('username') }" name="username"
                               type="text" placeholder="请输入用户昵称">
                        <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="mobile"><i>*</i>手机号码：</label>
                    <p class="control" :class="{ 'validated': errors.has('mobile') }">
                        <input v-model="RegisterForm.mobile" v-validate="'required|mobile'" id="mobile"
                               :class="{'input': true, 'is-danger': errors.has('mobile') }" name="mobile" type="text"
                               placeholder="请输入手机号码">
                        <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="password"><i>*</i>登录密码：</label>
                    <p class="control" :class="{ 'validated': errors.has('password') }">
                        <input v-model="RegisterForm.password" v-validate="'required|password'" id="password"
                               :class="{'input': true, 'is-danger': errors.has('password') }" name="password"
                               type="password" placeholder="请输入登录密码">
                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label">密码强度：</label>
                    <p v-if="isWeak" class="control control-stronge control-isweak clear">
                        <span>弱</span>
                        <span>中</span>
                        <span>强</span>
                    </p>
                    <p v-else-if="isMiddle" class="control control-stronge control-ismiddle clear">
                        <span>弱</span>
                        <span>中</span>
                        <span>强</span>
                    </p>
                    <p v-else-if="isStrong" class="control control-stronge control-isstronge clear">
                        <span>弱</span>
                        <span>中</span>
                        <span>强</span>
                    </p>
                    <p v-else class="control control-stronge clear">
                        <span>弱</span>
                        <span>中</span>
                        <span>强</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="repassword"><i>*</i>确认密码：</label>
                    <p class="control" :class="{ 'validated': errors.has('repassword') || RegisterForm.password !== RegisterForm.repassword }">
                        <input v-model="RegisterForm.repassword" v-validate="'required'" id="repassword"
                               :class="{'input': true, 'is-danger': errors.has('repassword') }" name="repassword"
                               type="password" placeholder="请输入确认密码">
                        <span v-if="errors.has('repassword')" class="help is-danger">{{ errors.first('repassword')}}</span>
                        <span v-else-if="RegisterForm.password !== RegisterForm.repassword" class="help is-danger">两次密码输入不一致！</span>
                    </p>
                </div>
                <div class="column clear controlcode" :class="{ 'validated': errors.has('code') }">
                    <label class="label" for="code"><i>*</i>验证码：</label>
                    <p class="control-code">
                        <input v-model="RegisterForm.code" v-validate="'required'" id="code"
                               :class="{'input': true, 'is-danger': errors.has('code') }" name="code" type="text">
                    </p>
                    <p class="control-code-pic"><img src="../assets/images/code.jpg"></p>
                    <span v-show="errors.has('code')" class="code help is-danger">{{ errors.first('code') }}</span>
                </div>
                <div class="column clear">
                    <label class="label" for="invite_code">邀请码：</label>
                    <p class="control" :class="{ 'validated': errors.has('invite_code') }">
                        <input v-model="RegisterForm.invite_code" v-validate="'invite_code'" id="invite_code"
                               :class="{'input': true, 'is-danger': errors.has('invite_code') }" name="invite_code"
                               type="password" placeholder="请输入用户邀请码">
                        <span v-show="errors.has('invite_code')" class="help is-danger">{{ errors.first('invite_code')}}</span>
                    </p>
                </div>
                <div class="column column-txt clear">
                    <input name="protocol" type="checkbox" value="" checked disabled="disabled"/>
                    <p>同意注册服务协议</p>
                </div>
                <button class="column column-btn"  @click="submitForm()" v-bind:disabled="!btnStatus"
                        :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">&#xe606;</i>立即注册</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../components/headerComponent';
  import { mapGetters,mapActions } from 'vuex';
  import md5 from 'js-md5';
  export default {
    name: 'RegPage',
    components: {moudleHeader},
    data () {
      return {
        myTitle: "注册",
        pageName: "RegPage",
        btnStatus: true,
        btnTxt: '立即注册',
        RegisterForm: {
          username: '',
          mobile: '',
          password: '',
          repassword: '',
          code: '',
          invite_code: '',
          passwordWeal: false,
          passwordMiddle: false,
          passwordStrength: false,
          referrerName: '',
          agreeChecked: true
        },
        isWeak: false,
        isMiddle: false,
        isStrong: false
      }
    },
    watch: {
      password: function (val, oldval) {
        if (val.length >= 6 && val.length <= 10) {
          this.isWeak = true;
          this.isMiddle = false;
          this.isStrong = false;
        } else if (val.length >= 11 && val.length <= 14) {
          this.isWeak = false;
          this.isMiddle = true;
          this.isStrong = false;
        } else if (val.length >= 15 && val.length <= 18) {
          this.isWeak = false;
          this.isMiddle = false;
          this.isStrong = true;
        } else {
          return false;
        }
      }
    },
    methods: {
      ...mapActions([
        'register','getYzm'
      ]),
      getCheckCode(){
        let _this = this;
        this.getYzm().then(function (resp) {
          _this.yzmStr = resp;
        });
      },
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            let formData = {
              username: this.RegisterForm.username,
              password: md5(this.RegisterForm.password),
              mobile: this.RegisterForm.mobile,
              invite_code: this.RegisterForm.invite_code
            };
            this.btnStatus = false;
            this.btnTxt = '正在注册中';
            this.$store.dispatch('register',formData)
              .then(response => {
                this.btnStatus = true;
                this.btnTxt = '立即注册';
                this.$router.push({path:'/personal/home'})
              }, response => {
                this.btnStatus = true;
                this.btnTxt = '立即注册';
              });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .regpage {
        width: 100%;
        min-height: 100vh;
        max-height: 120vh;
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
                    width: 30%;
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
                .control {
                    width: 70%;
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
                .control-stronge span {
                    width: 33.33%;
                    float: left;
                    display: block;
                    height: 1rem;
                    line-height: 1rem;
                    background: #ddd;
                    margin-top: .55rem;
                }
                .control.control-isweak span:first-child {
                    background: #f50006;
                }
                .control.control-ismiddle span {
                    background: #fdb563;
                }
                .control.control-ismiddle span:last-child {
                    background: #ddd;
                }
                .control.control-isstronge span {
                    background: #40b60b;
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
                width: 40%;
                margin: 0 auto;
                text-align: center;
                font-size: 90%;
                input {
                    width: 1rem;
                    height: 1rem;
                    margin-top: .5rem;
                    float: left;
                }
                span {
                    float: left;
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
            .disabled{
                background: #ccc !important;
            }
        }
    }

</style>
