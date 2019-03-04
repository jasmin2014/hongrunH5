<template>
    <div>
        <form>
            <div class="form-items">
                <div class="column clear">
                    <label class="label" for="house"><i>*</i>住房条件：</label>
                    <p class="control">
                        <label class="longradio" v-for="house in house_arr">
                            <input name="house" v-model="financeInfo.house" type="radio" :value="house.value" id="house"/>{{house.label}}
                        </label>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="house_value"><i>*</i>房产价值：</label>
                    <p class="control" :class="{ 'validated': errors.has('house_value') }">
                        <input v-model="financeInfo.house_value" v-validate="'required'" id="house_value"
                               :class="{'input': true, 'is-danger': errors.has('house_value') }"
                               name="house_value" type="text" placeholder="请输入房产价值">
                        <span v-show="errors.has('house_value')"
                              class="help is-danger">{{ errors.first('house_value') }}</span>
                    </p>
                </div>
                <div class="column clear">
                    <label class="label" for="is_car"><i>*</i>是否购车：</label>
                    <div class="control">
                        <label class="radio" v-for="car in car_arr">
                            <input name="is_car" v-model="financeInfo.is_car" type="radio" :value="car.value" id="is_car"/>{{car.label}}
                        </label>
                    </div>
                </div>
                <div class="column clear">
                    <label class="label" for="car_value"><i>*</i>车辆价值：</label>
                    <p class="control" :class="{ 'validated': errors.has('car_value') }">
                        <input v-model="financeInfo.car_value" v-validate="'required'"
                               :class="{'input': true, 'is-danger': errors.has('car_value') }" name="car_value" id="car_value"
                               type="text" placeholder="请输入车辆价值">
                        <span v-show="errors.has('car_value')" class="help is-danger">{{ errors.first('car_value')}}</span>
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
    name: 'baseFinance',
    props: {
      userFinanceInfo: {
        type: Object
      }
    },
    data () {
      return {
        financeInfo: {
          house: '',
          house_value: '',
          is_car: '',
          car_value: ''
        },
        house_arr: [],
        car_arr: [],
      }
    },
    watch: {
      userFinanceInfo(val) {
        this.financeInfo = this.userFinanceInfo;
      }
    },
    created(){
      this.initSelect();
    },
    methods: {
      initSelect(){
        this.house_arr = enums.getItems('HOUSE');
        this.car_arr = enums.getItems('BOOL');
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
