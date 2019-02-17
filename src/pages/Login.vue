<template>
    <div class="content">        
        <div class="loginpage">
            <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
            <div class="logo"><img src="../assets/images/logo.jpg"></div>
            <div class="login-content">
                <div class="login-tit">
                    <span class="icon iconfont">&#xe7a8;</span>登录宏润共创
                    <router-link to="setpass">忘记密码？</router-link>
                </div>

                <div class="column clear">
                    <label class="label" for="username"><i>*</i>登录账户：</label>
                    <p class="control" :class="{ 'validated': errors.has('username') }">
                        <input v-model="loginForm.username" v-validate="'required'" id="username"
                               :class="{'input': true, 'is-danger': errors.has('username') }" name="username"
                               type="text" placeholder="">
                        <span v-show="errors.has('username')"
                              class="help is-danger">{{ errors.first('username')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="password"><i>*</i>登录密码：</label>
                    <p class="control" :class="{ 'validated': errors.has('password') }">
                        <input v-model="loginForm.password" v-validate="'required|password'" id="password"
                               :class="{'input': true, 'is-danger': errors.has('password') }" name="password"
                               type="password">
                        <span v-show="errors.has('password')"
                              class="help is-danger">{{ errors.first('password')}}</span>
                    </p>
                </div>
                <div class="column clear controlcode" :class="{ 'validated': errors.has('code') }">
                    <label class="label" for="code"><i>*</i>验证码：</label>
                    <p class="control-code">
                        <input v-model="loginForm.code" v-validate="'required'" id="code"
                               :class="{'input': true, 'is-danger': errors.has('code') }" name="code" type="text">
                    </p>
                    <p class="control-code-pic"><img :src="yzmStr" @click="getCheckCode" style="height: 100%;"></p>
                    <span v-show="errors.has('code')" class="code help is-danger">{{ errors.first('code') }}</span>
                </div>
                <div class="column column-txt">
                    还没有账号？
                    <router-link to="/reg">立即注册</router-link>
                </div>
                <button class="column column-btn" @click="submitForm('loginForm')" v-bind:disabled="!btnStatus"
                        :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">&#xe607;</i>{{btnTxt}}</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../components/headerComponent';
  import { mapGetters,mapActions } from 'vuex';
  import md5 from 'js-md5';
  export default {
    name: 'LoginPage',
    components: {moudleHeader},
    data () {
      return {
        myTitle: "登录",
        pageName: "LoginPage",
        btnStatus: true,
        btnTxt: '立即登录',
        yzmStr: '',
        loginForm: {
          username: '',
          password: '',
          code: ''
        },
      }
    },
    created() {
      this.getCheckCode();
    },
    methods: {
      ...mapActions([
        'login','getYzm'
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
              username: this.loginForm.username,
              password: md5(this.loginForm.password),
              code: this.loginForm.code
            };
            this.btnStatus = false;
            this.btnTxt = '正在登录中';
            this.$store.dispatch('login', formData)
              .then(response => {
                this.btnStatus = true;
                this.btnTxt = '立即登录';
                this.$router.push({path: '/personal/home'})
              }, response => {
                this.btnStatus = true;
                this.btnTxt = '立即登录';
              });
          }
        });
      }
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
                .control-code-pic {
                    height: 2rem;
                    overflow: hidden;
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
            .disabled{
                background: #ccc !important;
            }
        }
    }

</style>
