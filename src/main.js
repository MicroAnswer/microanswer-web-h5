import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './stores/stores'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app');
