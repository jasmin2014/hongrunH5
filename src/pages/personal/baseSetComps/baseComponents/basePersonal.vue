<template>
    <div>
        <div class="form-items">
            <div class="column clear">
                <label class="label" for="name"><i>*</i>真实姓名：</label>
                <p class="control" :class="{ 'validated': errors.has('name') }">
                    <input v-model="basicInfo.name" v-validate="'required'" id="name"
                           :class="{'input': true, 'is-danger': errors.has('name') }" name="name"
                           type="text" placeholder="请输入真实姓名" readonly="readonly">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name')}}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="identity"><i>*</i>身份证号：</label>
                <p class="control" :class="{ 'validated': errors.has('identity') }">
                    <input v-model="basicInfo.identity" v-validate="'required'" id="identity"
                           :class="{'input': true, 'is-danger': errors.has('identity') }" name="identity"
                           type="text" placeholder="请输入身份证号" readonly="readonly">
                    <span v-show="errors.has('identity')" class="help is-danger">{{ errors.first('identity')}}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="mobile"><i>*</i>手机号码：</label>
                <p class="control" :class="{ 'validated': errors.has('mobile') }">
                    <input v-model="basicInfo.mobile" v-validate="'required'" id="mobile"
                           :class="{'input': true, 'is-danger': errors.has('mobile') }" name="mobile" type="text"
                           placeholder="请输入手机号码" readonly="readonly">
                    <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="age"><i>*</i>年龄：</label>
                <p class="control" :class="{ 'validated': errors.has('age') }">
                    <input v-model="basicInfo.age" v-validate="'required'" id="age"
                           :class="{'input': true, 'is-danger': errors.has('age') }" name="age" type="text"
                           placeholder="请输入年龄">
                    <span v-show="errors.has('age')" class="help is-danger">{{ errors.first('age') }}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label"><i>*</i>籍贯：</label>
                <div class="control">
                    <native-place @setNativeId="setNativeId" ref="live_place"></native-place>
                </div>
            </div>
            <div class="column clear">
                <label class="label"><i>*</i>住址：</label>
                <div class="control" :class="{ 'validated': errors.has('age') }">
                    <live-place @setLiveId="setLiveId" ref="live_place"></live-place>
                </div>
            </div>
            <div class="column clear">
                <label class="label"><i>*</i>性别：</label>
                <div class="control" :class="{ 'validated': errors.has('sex') }">
                    <label class="radio" v-for="sex in sex_arr"><input name="sex" v-model="basicInfo.sex" type="radio" :value="sex.value"/>{{sex.label}}</label>
                    <span v-show="errors.has('sex')" class="help is-danger">{{ errors.first('sex') }}</span>
                </div>
            </div>
            <div class="column clear">
                <label class="label"><i>*</i>婚姻状况：</label>
                <div class="control" :class="{ 'validated': errors.has('marry') }">
                    <label class="radio" v-for="marry in marry_arr"><input name="marry" v-model="basicInfo.is_marry" type="radio"
                                                :value="marry.value"/>{{marry.label}}</label>
                    <span v-show="errors.has('marry')" class="help is-danger">{{ errors.first('marry') }}</span>
                </div>
            </div>

            <div class="column clear">
                <label class="label"><i>*</i>最高学历：</label>
                <p class="control" :class="{ 'validated': errors.has('education') }">
                    <label class="longradio" v-for="education in education_arr"><input name="education" v-model="basicInfo.education"
                                                    type="radio" :value="education.value"/>{{education.label}}</label>
                    <span v-show="errors.has('education')" class="help is-danger">{{ errors.first('education') }}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label"><i>*</i>月收入：</label>
                <p class="control" :class="{ 'validated': errors.has('income') }">
                    <label class="longradio" v-for="income in income_arr"><input name="income" v-model="basicInfo.income" type="radio"
                                                    :value="income.value"/>{{income.label}} </label>
                    <span v-show="errors.has('income')" class="help is-danger">{{ errors.first('income') }}</span>
                </p>
            </div>
            <div class="column clear">
                <label class="label" for="desc"><i>*</i>个人描述：</label>
                <p class="control">
                    <textarea name="desc" id="desc" v-model="basicInfo.desc" placeholder="请输入内容"></textarea>
                </p>
            </div>
        </div>
        <div class="form-items-btn">
            <button @click="submitForm()">保存并继续</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import enums from '../../../../utils/enums.js';
  import { mapGetters,mapActions } from 'vuex';
  import LivePlace from '../../../../components/LivePlace.vue';
  import NativePlace from '../../../../components/NativePlace.vue';

  export default {
    name: 'basePersonal',
    props: {
      userInfo: {
        type: Object
      }
    },
    components :{
      LivePlace,NativePlace
    },
    data () {
      return {
        basicInfo: {
          name: '',
          identity: '',
          mobile: '',
          age: '',
          native_place: '',
          live_place: '',
          sex: '',
          is_marry: '',
          education: '',
          income: '',
          desc: ''
        },
        show_native: false,
        show_live: false,
        native_name: '',
        live_name: '',
        sex_arr:[],
        marry_arr:[],
        education_arr: [],
        income_arr: []
      }
    },
    watch: {
      userInfo(val) {
        this.basicInfo = this.userInfo;
      }
    },
    created(){
      this.initSelect();
    },
    methods: {
      ...mapActions([
        'ipsRegister','supplementInfo'
      ]),
      initSelect(){
        this.sex_arr = enums.getItems('SEX');
        this.marry_arr = enums.getItems('MARRY');
        this.education_arr = enums.getItems('EDUCATION');
        this.income_arr = enums.getItems('INCOME');
      },
      submitForm(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('supplementInfo', this.basicInfo)
              .then(response => {

              });
          } else {
            return false;
          }
        });
      },
      setNativeId: function (cityId) {
        this.basicInfo.native_place  = cityId;
      },
      setLiveId: function (cityId) {
        this.basicInfo.live_place  = cityId;
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
            outline: none;
            border: none;
            width: 100%;
            height: 100%;
            background: #f60005;
            color: #fff;
        }
    }
</style>
