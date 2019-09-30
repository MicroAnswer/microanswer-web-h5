import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: "/login", component: () => import("../pages/login")},
        {path: "/reg",   component: () => import("../pages/reg")},
        {path: "/",      component: () => import("../pages/index"), children: [
                {path: "/",       component: () => import('../pages/childrens/home'),   meta: {title: "Microanswer.cn"}},
                {path: "/albums", component: () => import("../pages/childrens/albums"), meta: {title: "专题"}},
                {path: "/blogs",  component: () => import("../pages/childrens/blogs"),  meta: {title: "博客"}},
                {path: "/apps",   component: () => import("../pages/childrens/apps"),   meta: {title: "产品"}},
                {path: "/about",  component: () => import("../pages/childrens/about"),  meta: {title: "关于"}},
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
        delete to.meta.loadDialog;
    }
});

export default router;