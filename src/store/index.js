import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import tips from './modules/tips';
import loading from './modules/loading';
import userInfo from './modules/userInfo';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    modules: {
        tips,
        loading,
        userInfo
    },
    strict: debug
})
