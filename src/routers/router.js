import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../pages/index'
import HomePage from '../pages/childrens/home'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: "/login", component: () => import("../pages/login")},
        {path: "/reg",   component: () => import("../pages/reg")},
        {path: "/",     component: IndexPage, children: [
                {path: "/", component: HomePage},
                {path: "/albums", component: () => import("../pages/childrens/albums")},
                {path: "/blogs", component: () => import("../pages/childrens/blogs")},
                {path: "/apps", component: () => import("../pages/childrens/apps")},
                {path: "/about", component: () => import("../pages/childrens/about")},
        ]}
    ]
});

export default router;