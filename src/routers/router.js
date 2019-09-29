import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: "/login", component: () => import("../pages/login")},
        {path: "/reg",   component: () => import("../pages/reg")},
        {path: "/",     component: ()=> import("../pages/index"), children: [
                {path: "/", component: () => import('../pages/childrens/home')},
                {path: "/albums", component: () => import("../pages/childrens/albums")},
                {path: "/blogs", component: () => import("../pages/childrens/blogs")},
                {path: "/apps", component: () => import("../pages/childrens/apps")},
                {path: "/about", component: () => import("../pages/childrens/about")},
        ]}
    ]
});


router.beforeEach((to, from, next) => {
    to.meta.loadDialog = Vue.prototype.showLoading("页面加载中...");
    next();
});

router.afterEach((to, from) => {
    if (to.meta.loadDialog) {
        to.meta.loadDialog.hide();
    }
});

export default router;