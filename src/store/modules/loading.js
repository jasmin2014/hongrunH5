import {
    CHANGE_LOADING
} from '../mutation-types'

const state = {
    loading: false
};

const getters = {
    loading: (state)=>state.loading
};

const mutations = {
    [CHANGE_LOADING](state, data){
        state.loading = data;
    }
};

export default {
    state,
    getters,
    mutations
}