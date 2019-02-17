<template>
<div class="linkage-wrap">
    <div class="address-wrap">
        <input class="input" :value="address" readonly="readonly" type="text" placeholder="请选择住址" @click="showCity = !showCity">
    </div>
    <div class="pick-mark" v-show="showCity">
        <div class="btn-wrap">
            <a class="btn-cancel" @click="showCity = !showCity">取消</a>
            <a class="btn-sure" @click="fillAddress">确定</a>
        </div>
        <mt-picker class="select" :slots="slots" value-key="title" @change="onValuesChange"></mt-picker>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        showCity: false,
        slots: [
          {
            flex: 1,
            values: [],
            defaultIndex: 2,
            className: 'slot1',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: [],
            className: 'slot2',
            textAlign: 'center'
          }
        ],
        address: '',
        addressArr: '',
        cityId: '',
        temp_addr: ''
      };
    },
    mounted () {
//      this.$nextTick(() => {
//          // 利用索引初始化默认选中的省份和城市
//          this.slots[0].defaultIndex = 2 // Number类型
//          this.slots[1].defaultIndex = 2
//      })
    },
    methods: {
      ...mapActions([
        'getPopCityList'
      ]),
      fillAddress() {
        // 填入省市区
        this.address = this.temp_addr;
        this.showCity = !this.showCity;
        this.$emit('setLiveId',this.cityId);
      },
      initAddress() {
        this.slots[0].values = this.addressArr.filter((item, index) => {
          if (item.parent === 0) {
            return item;
          }
        });
      },
      onValuesChange(picker, values) {
        // 防止没有省份时报错
        if (values[0]) {
          this.slots[1].values = this.addressArr.filter((item, index) => {
            if (item.parent === values[0].id) {
              return item;
            }
          });
        }
        // 防止没有市时报错
//        if (values[1]) {
//          this.slots[2].values = address.filter((item, index) => {
//            if (item.apid === values[1].aid) {
//              return item;
//            }
//          });
//        }
        // 防止没有区时报错
        if (values[1]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.temp_addr = values[0].title + '/' + values[1].title;
          this.cityId = values[1].id;
        }
      }
    },
    mounted() {
      let _this = this;
      this.getPopCityList(null).then(function(resp){
        _this.addressArr = resp;
        _this.initAddress();
        _this.slots[0].defaultIndex = 0
        _this.slots[1].defaultIndex = 1
      });
    }
  };
</script>

<style lang="scss">
    .linkage-wrap {
        position: relative;
        .address-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            font-size: 14px;
            color: #333;
            .input {
                display: flex;
                align-items: center;
                flex: 1;
                height: 100%;
                padding: 0;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
            .btn {
                flex: 0 0 80px;
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ccc;
                border-left: 0 none;
                box-sizing: border-box;
            }
        }
        .pick-mark {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 999;
            .btn-wrap {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 180px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                padding: 0 20px;
                font-size: 16px;
                background: #fff;
                border-bottom: 1px solid #eaeaea;
                .btn-cancel {
                    color: #26a2ff;
                }
                .btn-sure {
                    color: #26a2ff;
                }
            }
            .select {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
            }
            .picker-items {
                background: #fff;
                .picker-slot {
                    font-size: 14px;
                }
                .picker-item {
                    &.picker-selected {
                        color: #333;
                    }
                }
                .picker-center-highlight {
                    &:after, &:before {
                        background: #eaeaea;
                    }
                }
            }
        }
    }
</style>