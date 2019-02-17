<template>
    <div>
        <div v-if="!v_identity">
            <section class="clear tips small">
                <p>
                    <span class="icon iconfont">&#xe6bc;</span>为了您能顺利通过验证，请填写您真实的姓名和身份证号码
                </p>
            </section>
            <div class="form-items">
                <div class="column clear">
                    <label class="label" for="trueName"><i>*</i>真实姓名：</label>
                    <div class="control" :class="{ 'validated': errors.has('trueName') }">
                        <p class="clear">
                            <input v-model="CertificationForm.trueName" v-validate="'required'" id="trueName"
                                   :class="{'input': true, 'is-danger': errors.has('trueName') }"
                                   name="trueName" type="text" placeholder="">
                        </p>
                        <span v-show="errors.has('trueName')" class="help is-danger">{{ errors.first('trueName')}}</span>
                    </div>
                </div>
                <div class="column clear">
                    <label class="label" for="userCode"><i>*</i>身份证号：</label>
                    <p class="control" :class="{ 'validated': errors.has('userCode') }">
                        <input v-model="CertificationForm.userCode" v-validate="'required|identity'" id="userCode"
                               :class="{'input': true, 'is-danger': errors.has('userCode') }" name="userCode"
                               type="text" placeholder="">
                        <span v-show="errors.has('userCode')" class="help is-danger">{{ errors.first('userCode')}}</span>
                    </p>
                </div>
            </div>
            <div class="form-items-btn">
                <button @click="submitForm()">完成身份证验证</button>
            </div>
        </div>
        <section class="clear tips validated" v-else>
            <span class="icon iconfont">&#xe61a;</span>
            <div>
                <p class="red">温馨提示：您已验证过手机号码！</p>
                <p>真实姓名：{{userInfo.name}}</p>
                <p>身份证号：{{userInfo.identity | hideIdentity}}</p>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: 'AuthorityTurely',
    data () {
      return {
        v_identity: false,
        CertificationForm: {
          trueName: '',
          userCode: ''
        }
      }
    },
    created(){
      this.v_identity = this.userInfo.v_identity;
    },
    computed: mapGetters([
      'userInfo'
    ]),
    methods: {
      ...mapActions([
        'sendCode','verifyIdentity','setUserInfo'
      ]),
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if(result){
            this.verifyIdentity({name:this.CertificationForm.trueName,identity:this.CertificationForm.userCode}).then(response => {
              // 身份证验证成功
              this.v_identity = true;
              this.userInfo.v_identity = 1;
              this.userInfo.identity = this.CertificationForm.userCode;
              this.userInfo.name = this.CertificationForm.trueName;
              this.setUserInfo(this.userInfo);
              sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(this.userInfo)));
            });
          }
        });
      }
    },
    filters: {
      hideIdentity(val){
        if(val){
          return val.replace(/^(.{3}).+(.{4})$/g,"$1***********$2");
        }
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
        .iconfont {
            border: none;
        }
        p {
            line-height: 2rem;
        }
    }

    .tips.validated {
        margin-top: 1rem;
        background: #fff;
        line-height: 2rem;
        padding: 1rem;
        font-size: 90%;
        display: flex;
        span {
            width: 20%;
            line-height: 6rem;
            text-align: center;
            color: #f30007;
            font-size: 260%;
            border: 1px solid #ddd;
            margin-right: 0;
        }
        > span, > div {
            float: left;
        }
        > div {
            width: 79%;
            border: 1px solid #ddd;
            border-left: none;
            padding-left: 1rem;
            p.red {
                color: #f70005;
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
