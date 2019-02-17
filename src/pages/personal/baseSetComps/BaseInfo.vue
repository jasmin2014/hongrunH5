<template>
    <div class="content iborrow-apply">
        <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="tab1">个人资料</mt-tab-item>
            <mt-tab-item id="tab2">单位资料</mt-tab-item>
            <mt-tab-item id="tab3">财务状况</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="tab1">
                <base-personal :userInfo="basicInfo"></base-personal>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <base-company :userCompanyInfo="companyInfo"></base-company>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
                <base-finance :userFinanceInfo="financeInfo"></base-finance>
            </mt-tab-container-item>
        </mt-tab-container>


        <moudle-footer :active-page="activePage"></moudle-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from '../../../components/headerComponent';
  import basePersonal from './baseComponents/basePersonal';
  import baseCompany from './baseComponents/baseCompany';
  import baseFinance from './baseComponents/baseFinance';
  import moudleFooter from '../../../components/footerComponent';
  import {mapGetters, mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';

  export default {
    name: 'BaseInfo',
    components: {moudleHeader, basePersonal, baseCompany, baseFinance, moudleFooter},
    data () {
      return {
        activePage: '2',
        myTitle: '宏润共创-基本设置-基本资料',
        pageName: 'BaseSet',
        selected: 'tab1',
        basicInfo: {},
        companyInfo: {},
        financeInfo: {}
      }
    },
    created(){
      this.getUserInfo();
    },
    methods: {
      ...mapActions([
        'queryUserInfo'
      ]),
      getUserInfo() {
        let _this = this;
        Indicator.open();
        this.queryUserInfo(null).then(function(resp){
          Indicator.close();
          _this.basicInfo = {
            name: resp.name,
            identity: resp.identity,
            mobile: resp.mobile,
            age: resp.age,
            native_place: resp.native_place,
            live_place: resp.live_place,
            sex: resp.sex,
            is_marry: resp.is_marry,
            education: resp.education,
            income: resp.income,
            desc: resp.desc
          };
          _this.companyInfo = {
            company_name: resp.company_name,
            company_tel: resp.company_tel,
            company_address: resp.company_address,
            company_year: resp.company_year
          };
          _this.financeInfo = {
            house: resp.house,
            house_value: resp.house_value,
            is_car: resp.is_car,
            car_value: resp.car_value
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .iborrow-apply {
        padding-bottom: 3rem;
        .mint-navbar {
            .mint-tab-item {
                .mint-tab-item-label.is-selected {
                    color: #f30007;
                }
            }
        }
    }

</style>
