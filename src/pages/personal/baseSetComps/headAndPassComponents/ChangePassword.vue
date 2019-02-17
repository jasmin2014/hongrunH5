<template>
    <div>
        <div class="form-items">
            <div class="column clear">
                <label class="label">用户名：</label>
                <p class="control">
                    {{messPassForm.authUser.username}}
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="oldPass"><i>*</i>原密码：</label>
                <p class="control" :class="{ 'validated': errors.has('oldpassword') }">
                    <input v-model="messPassForm.oldPass" v-validate="'required'" id="oldPass"
                           :class="{'input': true, 'is-danger': errors.has('oldpassword') }" name="oldpassword"
                           type="password" placeholder="">
                    <span v-show="errors.has('oldpassword')" class="help is-danger">{{ errors.first('oldpassword')}}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="newPass"><i>*</i>新密码：</label>
                <p class="control" :class="{ 'validated': errors.has('newpassword') }">
                    <input v-model="messPassForm.newPass" v-validate="'required'"  id="newPass"
                           :class="{'input': true, 'is-danger': errors.has('newpassword') }" name="newpassword"
                           type="password" placeholder="">
                    <span v-show="errors.has('newpassword')" class="help is-danger">{{ errors.first('newpassword')}}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="reNewPass"><i>*</i>确认新密码：</label>
                <p class="control" :class="{ 'validated': errors.has('renewpassword') || messPassForm.newPass !== messPassForm.reNewPass}">
                    <input v-model="messPassForm.reNewPass" v-validate="'required'" id="reNewPass"
                           :class="{'input': true, 'is-danger': errors.has('renewpassword') }" name="renewpassword"
                           type="password" placeholder="">
                    <span v-if="errors.has('renewpassword')" class="help is-danger">{{ errors.first('renewpassword')}}</span>
                    <span v-else-if="messPassForm.newPass !== messPassForm.reNewPass" class="help is-danger">两次密码输入不一致！</span>
                </p>
            </div>

        </div>
        <div class="form-items-btn">
            <button @click="submitForm()">提交更新</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters,mapActions } from 'vuex';
  import md5 from 'js-md5';
  export default {
    name: 'ChangePassword',
    data () {
      return {
        messPassForm: {
          authUser: JSON.parse(Base64.decode(sessionStorage.getItem('authUser'))),
          oldPass: '',
          newPass: '',
          reNewPass: ''
        }
      }
    },
    created(){
    },
    methods: {
      ...mapActions([
        'modifyPassword'
      ]),
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            let formData = {
              oldPassword: md5(this.messPassForm.oldPass),
              newPassword: md5(this.messPassForm.newPass)
            };
            this.$store.dispatch('modifyPassword', formData)
              .then(response => {
                this.messPassForm.oldPass = '';
                this.messPassForm.newPass = '';
                this.messPassForm.reNewPass = '';
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
    .form-items {
        width: 96%;
        margin: .5rem auto 0 auto;
        background: #fff;
        border-radius: .2rem;
        padding: 1rem .5rem;
        h2 {
            height: 2rem;
            line-height: 2rem;
            border-bottom: 1px solid #f30007;
            font-size: 120%;
            color: #f30007;
        }
        .column {
            line-height: 2rem;
            margin-top: 1rem;
            > label {
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
            width: 100%;
            height: 100%;
            background: #f60005;
            color: #fff;
            border: none;
            outline: none;
        }
    }
</style>
