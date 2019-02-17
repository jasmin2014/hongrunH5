import { Validator } from 'vee-validate';
import messages from '../assets/js/zh_CN';
// 配置中文
Validator.addLocale(messages);

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
      phone: '手机号码',
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
      trueName:'真实姓名',
      IDnumber:'身份证号',
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
      phonecode:'手机验证码'
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
  messages: {
    zh_CN:field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('password', {
  messages: {
    zh_CN:field => field + '必须是6-18位数字和字符！'
  },
  validate: value => {
    return value.length >= 6 && value.length <=18 && /^[A-Za-z0-9]+$/.test(value);
  }
});
Validator.extend('newpassword', {
  messages: {
    zh_CN:field => field + '必须是6-18位数字和字符！'
  },
  validate: value => {
    return value.length >= 6 && value.length <=18 && /^[A-Za-z0-9]+$/.test(value);
  }
});
Validator.extend('IDnumber', {
  messages: {
    zh_CN:field => field + '身份证号输入有误！'
  },
  validate: value => {
    return value.length ==18 && /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/.test(value);
  }
});

export default {
  Validator: Validator
}