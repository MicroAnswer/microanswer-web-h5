<template>
    <div class="page-container">
        <md-app md-mode="fixed" md-waterfall :style="{maxHeight: maxHeight}">

            <!-- 侧边菜单 -->
            <md-app-drawer md-swipeable md-fixed md-permanent="full" :md-active.sync="$store.state.showNav">

                <md-card class="md-elevation-0">
                    <md-card-content>

                        <!-- 头像 -->
                        <md-avatar class="md-avatar-icon md-large">
                            <md-icon>person</md-icon>
                        </md-avatar>
                    </md-card-content>
                    <md-card-actions md-alignment="left">


                        <md-menu md-full-width>

                            <div>Microanswer</div>
                            <md-ripple>
                                <span md-menu-trigger class="md-caption">
                                    microanswer@outlook.com
                                    <md-icon>arrow_drop_down</md-icon>
                                </span>
                            </md-ripple>

                            <md-menu-content>
                                <md-menu-item>修改密码</md-menu-item>
                                <md-menu-item>退出登录</md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-card-actions>
                </md-card>

                <md-divider></md-divider>


                <md-list>
                    <md-list-item :class="$route.path === '/' && 'router-link-active'"
                                  @click="onDrawerListItemClick('./')">
                        <md-icon>home</md-icon>
                        <span class="md-list-item-text">首页</span>
                    </md-list-item>

                    <md-list-item :class="$route.path === '/blogs' && 'router-link-active'"
                                  @click="onDrawerListItemClick('./blogs')">
                        <md-icon>description</md-icon>
                        <span class="md-list-item-text">博客</span>
                    </md-list-item>

                    <md-list-item :class="$route.path === '/albums' && 'router-link-active'"
                                  @click="onDrawerListItemClick('./albums')">
                        <md-icon>toys</md-icon>
                        <span class="md-list-item-text">专题</span>
                    </md-list-item>

                    <md-list-item :class="$route.path === '/apps' && 'router-link-active'"
                                  @click="onDrawerListItemClick('./apps')">
                        <md-icon>extension</md-icon>
                        <span class="md-list-item-text">产品</span>
                    </md-list-item>

                    <md-list-item :class="$route.path === '/about' && 'router-link-active'"
                                  @click="onDrawerListItemClick('./about')">
                        <md-icon>info</md-icon>
                        <span class="md-list-item-text">关于</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <!-- 内容区域 -->
            <md-app-content style="padding: 0">
                <router-view/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "index",
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            window.console.log("beforeRouteEnter");
            next();
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            window.console.log("beforeRouteUpdate");
            next();
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            window.console.log("beforeRouteLeave");
            next();
        },
        created () {},
        methods: {
            onDrawerListItemClick (to) {
                if (to.replace('.', '') !== this.$route.path) {
                    this.$router.push(to);
                }
                this.$store.commit("makeNav", false);
            }
        },
        data () {
            return {
                maxHeight: window.innerHeight + 'px'
            }
        }
    }
</script>
<style lang="scss">
    @media (min-width: 600px) {

        .md-small-show {
            display: none !important;
        }
    }
</style>