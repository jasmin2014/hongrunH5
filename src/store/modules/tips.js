import {
    SHOW_TIP,HIDE_TIP
} from '../mutation-types'

const state = {
    tip: {
        msg: '',
        show: false,
        type: '',
        change: false,
        mode: ''
    }
};

const getters = {
    tip: (state)=>state.tip
};

const mutations = {
    [SHOW_TIP](state, action){
        state.tip = {...action};
    },
    [HIDE_TIP](state){
        state.tip = {
            msg: '',
            show: false,
            type: '',
            change: false,
            mode: ''
        };
    }
};

export default {
    state,
    getters,
    mutations
};