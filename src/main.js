require('es6-promise').polyfill();
require("promise.prototype.finally").shim();

import Vue           from 'vue'
import App           from './App.vue'
import router        from './routers/router'
import store         from './stores/stores'
import componentList from './componentList'
import axiosUtil     from './utils/axios'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;
Vue.use(componentList);
Vue.use(axiosUtil);

new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app');
