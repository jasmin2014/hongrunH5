import {
    USER_INFO
} from '../mutation-types'

const state = {
    userInfo: {}
};

const getters = {
    userInfo: (state)=>state.userInfo
};

const mutations = {
    [USER_INFO](state, action){
        state.userInfo = {...action};
    }
};

export default {
    state,
    getters,
    mutations
};