import api from '../api'
import * as types from './mutation-types';
import { Toast,MessageBox } from 'mint-ui';

/**
 * 显示提示信息
 * @param commit
 * @param content
 * @param type
 */
export const showTip = ({ commit }, content, type='error') => {
    commit(types.SHOW_TIP, {msg:content,show:true,type:type,mode:'alert',change:false});
};
export const showText = ({ commit }, content, type='error') => {
    commit(types.SHOW_TIP, {msg:content,show:true,type:type,mode:'text',change:false});
};
export const showAlert = ({ commit }, content, type='success',callback) => {
    if(callback && typeof callback === 'function'){
        MessageBox.alert(content).then(action => {
            callback();
        });
    }else{
        Toast({message: content,className:'toast-box'});
    }
};
/**
 * 隐藏提示信息
 * @param commit
 */
export const hideTip = ({ commit }) => {
    commit(types.HIDE_TIP);
};

/**
 * 改变加载状态
 * @param commit
 * @param flag
 */
export const changeLoading = ({ commit }, flag) => {
    commit(types.CHANGE_LOADING, flag);
};
/**
 * 获取城市列表
 * @param store
 * @param cityId
 */
export const initCityList = (store, cityId) => {
    return new Promise(function(resolve, reject) {
        api.initCityList({id:cityId}).then(response => {
            resolve(response.data)
        }, response => {
        });
    });
};
export const getCityList = (store, cityId) => {
    return new Promise(function(resolve, reject) {
        api.getCityList({id:cityId}).then(response => {
            resolve(response.data)
        }, response => {
        });
    });
};
export const getPopCityList = (store, cityId) => {
  return new Promise(function(resolve, reject) {
    api.getPopCityList(null).then(response => {
      resolve(response.data)
    }, response => {
    });
  });
};
/**
 * 用户信息保存
 * @param commit
 * @param data
 */
export const setUserInfo = ({ commit }, data) => {
    commit(types.USER_INFO, data);
};
/**
 * 获取验证码
 * @param store
 * @returns {Promise}
 */
export const getYzm = (store) => {
    return new Promise(function(resolve, reject) {
        api.getYzm().then(response => {
            resolve(response.data)
        }, response => {
        });
    });
};
/**
 * 用户登陆
 * @param store
 * @param data
 */
export const login = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.login(data).then(response => {
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('authUser',Base64.encode(JSON.stringify(response.data.authUser)));
            resolve(response.data);
        }, response => {
            showAlert(store,response.msg,'error');
            reject(response);
        });
    });
};
/**
 * 用户注册
 * @param store
 * @param data
 */
export const register = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.register(data).then(response => {
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('authUser',Base64.encode(JSON.stringify(response.data.authUser)));
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
            reject(response);
        });
    });
};
/**
 * 开通托管账户
 * @param store
 * @param data
 */
export const ipsRegister = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsRegister(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 登陆托管资金平台
 * @param store
 * @param data
 */
export const ipsLogin = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsLogin(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 资金充值
 * @param store
 * @param data
 */
export const ipsCharge = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsCharge(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 资金提现
 * @param store
 * @param data
 */
export const ipsWithdraw = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsWithdraw(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 查询用户信息
 * @param store
 * @param data
 */
export const queryUserInfo = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryUserInfo(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 修改密码
 * @param store
 * @param data
 */
export const modifyPassword = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.modifyPassword(data).then(response => {
            showAlert(store, response.msg, 'success',function () {
                resolve(response.data);
            });
        }, response => {
            showAlert(store, response.msg, 'error');
            reject(response);
        });
    });
};
/**
 * 找回密码
 * @param store
 * @param data
 */
export const findPassword = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.findPassword(data).then(response => {
            showAlert(store, response.msg, 'success',function () {
                resolve(response.data);
            });
        }, response => {
            showAlert(store, response.msg, 'error');
            reject(response);
        });
    });
};
/**
 * 查询公告信息
 * @param store
 * @param data
 */
export const queryNoticeList = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryNoticeList(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 查询公告详情
 * @param store
 * @param data
 */
export const queryNoticeDetail = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryNoticeDetail(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 查询标列表
 * @param store
 * @param data
 */
export const queryBidList = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryBidList(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 查询标详情
 * @param store
 * @param data
 */
export const queryBidDetail = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryBidDetail(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 完善用户信息
 * @param store
 * @param data
 */
export const supplementInfo = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.supplementInfo(data).then(response => {
            showAlert(store, response.msg, 'success',function () {
                resolve(response.data);
            });
        }, response => {
            reject(response);
        });
    });
};
/**
 * 验证身份证号
 * @param store
 * @param data
 */
export const verifyIdentity = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.verifyIdentity(data).then(response => {
            showAlert(store, '身份证认证成功', 'success',function () {
                resolve(response.data);
            });
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 发送短信验证码
 * @param store
 * @param data
 */
export const sendCode = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.sendCode(data).then(response => {
            resolve(response.data);
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 验证手机号
 * @param store
 * @param data
 */
export const verifyMobile = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.verifyMobile(data).then(response => {
            showAlert(store, '手机号认证成功', 'success',function () {
                resolve(response.data);
            });
        }, response => {
            showAlert(store, response.msg, 'error');
        });
    });
};
/**
 * 获取充值或提现记录
 * @param store
 * @param data
 */
export const queryUserFund = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryUserFund(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取用户红包记录
 * @param store
 * @param data
 */
export const queryUserCoupon = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryUserCoupon(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取用户投标记录
 * @param store
 * @param data
 */
export const queryUserBidRecord = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryUserBidRecord(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取用户借款记录
 * @param store
 * @param data
 */
export const queryUserBid = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryUserBid(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取用户账户详情
 * @param store
 * @param data
 */
export const queryAccount = (store,data) => {
  return new Promise(function(resolve, reject) {
    api.queryAccount(data).then(response => {
      resolve(response.data);
    }, response => {
      reject(response);
    });
  });
};
/**
 * 投标
 * @param store
 * @param data
 */
export const ipsFreeze = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsFreeze(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 投标
 * @param store
 * @param data
 */
export const ipsBid = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsBid(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 还款
 * @param store
 * @param data
 */
export const ipsRepayment = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.ipsRepayment(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取统计信息
 * @param store
 * @param data
 */
export const queryStatistics = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryStatistics(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取排行信息
 * @param store
 * @param data
 */
export const queryRankList = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryRankList(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};
/**
 * 获取投标记录
 * @param store
 * @param data
 */
export const queryBidRecord = (store,data) => {
    return new Promise(function(resolve, reject) {
        api.queryBidRecord(data).then(response => {
            resolve(response.data);
        }, response => {
            reject(response);
        });
    });
};