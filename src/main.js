require('es6-promise').polyfill();
require("promise.prototype.finally").shim();

import Vue           from 'vue'
import App           from './App.vue'
import router        from './routers/router'
import store         from './stores/stores'
import componentList from './componentList'
import dialog        from './utils/dialog'
import axiosUtil     from './utils/axios'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;
Vue.use(componentList);
Vue.use(axiosUtil);
Vue.use(dialog);



new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store: store
});

Vue.material = {
    ripple: true,
    theming: {

    },
    locale: {
        dateFormat: 'yyyy-MM-dd',
        firstDayOfAWeek: 1, // `0` stand for Sunday, `1` stand for Monday
        days: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        shorterDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        shorterMonths: ['J', 'F', 'M', 'A', 'M', 'Ju', 'Ju', 'A', 'Se', 'O', 'N', 'D'],
    }
};