<template>
    <div>
        <form>
            <div class="form-items">
                <div class="column clear">
                    <label class="label" for="company_name"><i>*</i>单位名称：</label>
                    <p class="control" :class="{ 'validated': errors.has('company_name') }">
                        <input v-model="companyInfo.company_name" v-validate="'required'" id="company_name"
                               :class="{'input': true, 'is-danger': errors.has('company_name') }" name="company_name"
                               type="text" placeholder="请填写单位名称">
                        <span v-show="errors.has('company_name')" class="help is-danger">{{ errors.first('company_name')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="company_tel"><i>*</i>电话：</label>
                    <p class="control" :class="{ 'validated': errors.has('company_tel') }">
                        <input v-model="companyInfo.company_tel" v-validate="'required'" id="company_tel"
                               :class="{'input': true, 'is-danger': errors.has('company_tel') }" name="company_tel"
                               type="text" placeholder="请填写电话">
                        <span v-show="errors.has('company_tel')" class="help is-danger">{{ errors.first('company_tel')}}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="company_address"><i>*</i>地址：</label>
                    <p class="control" :class="{ 'validated': errors.has('company_address') }">
                        <input v-model="companyInfo.company_address" v-validate="'required'" id="company_address"
                               :class="{'input': true, 'is-danger': errors.has('company_address') }"
                               name="company_address" type="text" placeholder="请填写公司地址">
                        <span v-show="errors.has('company_address')"
                              class="help is-danger">{{ errors.first('company_address') }}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="company_year"><i>*</i>工作年限：</label>
                    <p class="control">
                        <select v-model="companyInfo.company_year" name="company_year" id="company_year">
                            <option :value="item.value" v-for="item in year_arr">{{item.label}}</option>
                        </select>
                    </p>
                </div>

            </div>
            <div class="form-items-btn">
                保存并继续
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
  import enums from '../../../../utils/enums.js';
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: 'baseCompany',
    props: {
      userCompanyInfo: {
        type: Object
      }
    },
    data () {
      return {
        companyInfo: {
          company_name: '',
          company_tel: '',
          company_address: '',
          company_year: ''
        },
        year_arr: [],
      }
    },
    watch: {
      userCompanyInfo(val) {
        this.companyInfo = this.userCompanyInfo;
      }
    },
    created(){
      this.initSelect();
    },
    methods: {
      initSelect(){
        this.year_arr = enums.getItems('WORK_YEAR');
      },
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
    }
</style>
