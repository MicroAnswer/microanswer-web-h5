import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showNav: false, // 标记是否显示侧滑菜单。
    },
    mutations: {
        // 使得侧滑菜单展开或关闭。
        makeNav(state, newval) {
            state.showNav = newval || false;
        },
    }
});

export default store;