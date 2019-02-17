// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'mint-ui/lib/style.css';
import './assets/style.css';
import './assets/iconfont/iconfont.css';
import Vue from 'vue'
import { Swipe, SwipeItem, Progress, Popup, Picker,Radio, Navbar, TabItem,TabContainer, TabContainerItem, DatetimePicker, Loadmore, Spinner, Button, Checklist } from 'mint-ui';
import App from './App'
import router from './router'
import store from './store/index'
import VeeValidate, { Validator } from 'vee-validate';
import messages from './assets/js/zh_CN';
import 'babel-polyfill';
window.$ = require('zeptojs');
window.Base64 = require('js-base64').Base64;

// 配置中文
Validator.addLocale(messages);

const config = {
  locale: 'zh_CN',
  events: ''
};


// 自定义validate
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field + '!'
      },
      attributes:{
        email:'邮箱',
        password:'登录密码',
        repassword:'确认密码',
        username: '登录账户',
        mobile: '手机号码',
        code: '验证码',
        amount:'信贷总金额',
        interest:'年利率',
        purpose:'借款用途',
        iborrowLimit:'借款期限',
        minimum:'最低投标金额',
        tallest:'最多投标金额',
        validtime:'有效时间',
        repayment:'还款方式',
        award:'是否有投标奖励',
        name:'真实姓名',
        userCode:'身份证号',
        age:'年龄',
        fromCity:'籍贯',
        addressCity:'住址',
        companyname:'单位名称',
        telephone:'电话',
        companyaddress:'单位地址',
        propertyvalues:'房产价值',
        carvalues:'车辆价值',
        oldpassword:'原密码',
        newpassword:'新密码',
        renewpassword:'确认密码',
        phonecode:'手机验证码',
        rechargeAmount:'充值金额',
        withdrawAmount:'提现金额',
      }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('username', {
    messages: {
        zh_CN:field => field + '用户名为4-16位字母或数字'
    },
    validate: value => {
        return /^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(value)
    }
});

Validator.extend('mobile', {
  messages: {
    zh_CN:field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('password', {
  messages: {
    zh_CN:field => field + '请输入6-18位字符！'
  },
  validate: value => {
  	return value.length >= 6 && value.length <=18;
  }
});
Validator.extend('newpassword', {
  messages: {
    zh_CN:field => field + '请输入6-18位字符'
  },
  validate: value => {
    return value.length >= 6 && value.length <=18;
  }
});
Validator.extend('identity', {
  messages: {
    zh_CN:field => field + '身份证号输入有误！'
  },
  validate: value => {
    return value.length ==18 && /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/.test(value);
  }
});


//Vue.use(MintUI);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Progress.name, Progress);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Radio.name, Radio);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button);
Vue.component(Checklist.name, Checklist);


Vue.config.productionTip = false;

Vue.use(VeeValidate,config);
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
