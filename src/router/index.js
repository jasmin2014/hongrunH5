import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import FinanceList from '@/pages/finance/List';
import FinanceDetail from '@/pages/finance/Detail';
import RichesList from '@/pages/riches/list';
import Login from '@/pages/Login';
import Register from '@/pages/Reg';
import IborrowList from '@/pages/iborrow/list';
import IborrowApply from '@/pages/iborrow/apply';
import PersonalHome from '@/pages/personal/Home';

//基本设置
import baseSet from '@/pages/personal/BaseSet';
import baseInfo from '@/pages/personal/baseSetComps/BaseInfo';
import HeadAndPassword from '@/pages/personal/baseSetComps/HeadAndPass';
import Authority from '@/pages/personal/baseSetComps/Authority';

//资金管理
import FundsManage from '@/pages/personal/FundsManage';
import Recharge from '@/pages/personal/fundsManageComps/Recharge';
import Withdraw from '@/pages/personal/fundsManageComps/Withdraw';
import BankAccount from '@/pages/personal/fundsManageComps/BankAccount';
import Redpackage from '@/pages/personal/fundsManageComps/RedPackage';

//投资管理
import InvestMent from '@/pages/personal/Investment';
import Sanbiao from '@/pages/personal/investmentComps/Sanbiao';

//借款管理
import Borrow from '@/pages/personal/Borrow';
import BorrowTable from '@/pages/personal/borrowComps/borrowTable';
import QuatoApplication from '@/pages/personal/borrowComps/quotaApplication';
import Upload from '@/pages/personal/borrowComps/upload'

import Service from '@/pages/more/Service';
import Guide from '@/pages/more/Guide';
import Aboutus from '@/pages/more/Aboutus';

//交易金额
import Records from '@/pages/personal/Records';

//忘记密码
import SetPassword from '@/pages/setPassword';

import Ips from '@/components/Ips';
import IpsLogin from '@/components/IpsLogin';

Vue.use(Router)
import { MessageBox } from 'mint-ui';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/reg',
      name: 'Register',
      component: Register
    },{
      path: '/setpass',
      name: 'SetPassword',
      component: SetPassword
    },{
      path: '/iborrow/list',
      name: 'IborrowList',
      component: IborrowList
    },{
      path: '/iborrow/apply',
      name: 'IborrowApply',
      component: IborrowApply
    },{
      path: '/finance/list',
      name: 'FinanceList',
      component: FinanceList
    },{
      path: '/invest/detail',
      name: 'FinanceDetail',
      component: FinanceDetail,
      beforeEnter: requireCheck
    },{
      path: '/riches/list',
      name: 'RichesList',
      component: RichesList
    },{
      path: '/personal/home',
      name: 'PersonalHome',
      component: PersonalHome,
      beforeEnter: requireAuth
    },{
      path: '/personal/baseinfo',
      name: 'baseInfo',
      component: baseInfo,
      beforeEnter: requireAuth
    },{
      path: '/personal/baseset',
      name: 'baseSet',
      component: baseSet,
      beforeEnter: requireAuth
    },{
      path: '/personal/pass',
      name: 'HeadAndPassword',
      component: HeadAndPassword,
      beforeEnter: requireAuth
    },{
      path: '/personal/auth',
      name: 'Authority',
      component: Authority,
      beforeEnter: requireAuth
    },
    {
      path: '/personal/funds',
      name: 'FundsManage',
      component: FundsManage,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/recharge',
      name: 'Recharge',
      component: Recharge,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/withdraw',
      name: 'Withdraw',
      component: Withdraw,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/bankaccount',
      name: 'BankAccount',
      component: BankAccount,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/redpackage',
      name: 'Redpackage',
      component: Redpackage,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/investment',
      name: 'InvestMent',
      component: InvestMent,
      beforeEnter: authAndCheck
    },
    {
      path: '/personal/sanbiao',
      name: 'Sanbiao',
      component: Sanbiao,
      beforeEnter: authAndCheck
    },
    {
      path: '/ips',
      name: 'Ips',
      component: Ips,
      beforeEnter: authAndCheck
    },
    {
      path: '/ipsLogin',
      name: 'IpsLogin',
      component: IpsLogin,
      beforeEnter: authAndCheck
    },
    {
      path: '/more/service',
      name: 'Service',
      component: Service
    },
    {
      path: '/more/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/more/aboutus',
      name: 'Aboutus',
      component: Aboutus
    },
    {
      path: '/personal/borrow',
      name: 'Borrow',
      component: Borrow
    },
    {
      path: '/personal/borrowin',
      name: 'BorrowTable',
      component: BorrowTable
    },
    {
      path: '/personal/quato',
      name: 'QuatoApplication',
      component: QuatoApplication
    },
    {
      path: '/personal/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/personal/records',
      name: 'Records',
      component: Records
    }

  ]
})

function authAndCheck (to, from, next) {
  requireAuth(to,from,next)
  requireCheck(to,from,next)
}

function requireAuth(to, from, next) {
  let authUser = sessionStorage.getItem('authUser');
  if (authUser) {
    return next();
  } else {
    return next('/login');
  }
}

function requireCheck(to, from, next) {
  let authUser = sessionStorage.getItem('authUser');
  if (authUser) {
    let authUser = JSON.parse(Base64.decode(sessionStorage.getItem('authUser')));

    if(authUser.v_mobile != 1){
      MessageBox.alert('请先完成手机号认证', '提示信息', {
        confirmButtonText: '确定', type: 'error', callback: action => {
          return next('/personal/auth');
        }
      });
    }

    if(authUser.v_identity != 1){
      MessageBox.alert('请先完成身份证实名认证', '提示信息', {
        confirmButtonText: '确定', type: 'error', callback: action => {
          return next('/personal/auth');
        }
      });
    }

    return next();
  }else{
    return next();
  }
}
