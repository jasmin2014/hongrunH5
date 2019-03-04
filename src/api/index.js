import axios from 'axios'
import { Toast, Indicator } from 'mint-ui'
const instance = axios.create({
  baseURL: 'http://www.wealth.com/api',
  //   baseURL: "http://test.zjhrgc.com/api",
  //timeout: 10000,
})
// 接口请求拦截
instance.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + `${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 接口返回拦截
instance.interceptors.response.use(function (response) {
  let authorization = response.headers.authorization
  if (authorization) {
    let token = authorization.split(' ')[1]
    sessionStorage.setItem('token', token)
  }
  return response
}, function (error) {
  let authorization = response.headers.authorization
  if (authorization) {
    let token = authorization.split(' ')[1]
    sessionStorage.setItem('token', token)
  }
  //MessageBox.alert("接口调用失败,请尝试刷新", "提示");
  //return Promise.reject(error);
})

/**
 * 解析接口请求结果
 * @param data
 *
 * @param resolve
 * @param reject
 */
export const parseResult = (data, resolve, reject) => {
  let resData = data
  if (resData.code && resData.code == 200) {
    resolve(resData)
  } else {
    if (resData.code != 'undefined' && (resData.code == 403 || resData.code == 0)) {
      sessionStorage.clear()
      window.location.href = '/login'
    } else {
      reject(resData)
    }
  }
}

export default {
  initCityList: (data) => {
    return new Promise((resolve, reject) => {
      instance.get('initCityList', {
        params: data
      }).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  getCityList: (data) => {
    return new Promise((resolve, reject) => {
      instance.get('getCityList', {
        params: data
      }).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  getPopCityList: (data) => {
    return new Promise((resolve, reject) => {
      instance.get('getPopCityList', {
        params: data
      }).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 用户登陆
  getYzm: (data) => {
    return new Promise((resolve, reject) => {
      instance.get('getYzm').then(response => {
        resolve(response)
      })
    })
  },
  // 用户登陆
  login: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('login', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 用户注册
  register: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('register', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 开通托管账户
  ipsRegister: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/register', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 登陆资金平台
  ipsLogin: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/login', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 资金充值
  ipsCharge: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/charge', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 资金提现
  ipsWithdraw: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/withdraw', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取用户信息
  queryUserInfo: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryUserInfo', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 修改密码
  modifyPassword: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('modifyPassword', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 找回密码
  findPassword: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('findPassword', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 发送验证码
  sendCode: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('sendCode', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 验证用户手机号
  verifyMobile: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('verifyMobile', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 验证用户身份证
  verifyIdentity: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('verifyIdentity', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 完善用户信息
  supplementInfo: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('supplementInfo', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取公告列表
  queryNoticeList: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryNoticeList', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取公告详情
  queryNoticeDetail: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryNoticeDetail', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取标列表
  queryBidList: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryBidList', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取标详情
  queryBidDetail: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryBidDetail', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取充值或提现记录
  queryUserFund: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryUserFund', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取用户红包记录
  queryUserCoupon: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryUserCoupon', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取用户投标记录
  queryUserBidRecord: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryUserBidRecord', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取用户账户详情
  queryAccount: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/queryAccount', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取用户借款记录
  queryUserBid: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryUserBid', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 冻结资金
  ipsFreeze: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/freeze', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 投标
  ipsBid: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/bid', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 还款
  ipsRepayment: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('ips/repayment', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取统计信息
  queryStatistics: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryStatistics', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取排行信息
  queryRankList: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryRankList', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  },
  // 获取投标记录
  queryBidRecord: (data) => {
    return new Promise((resolve, reject) => {
      instance.post('queryBidRecord', data).then(response => {
        parseResult(response.data, resolve, reject)
      })
    })
  }
}