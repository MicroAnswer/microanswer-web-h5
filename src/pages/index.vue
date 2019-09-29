<template>
    <div class="page-container">
        <md-app md-mode="fixed" md-waterfall :style="{maxHeight: maxHeight}">
            <!-- 顶部ToolBar -->
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button md-small-show" @click="showNavigation=true">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">Microanswer的网站</span>
            </md-app-toolbar>

            <!-- 侧边菜单 -->
            <md-app-drawer md-swipeable md-fixed md-permanent="full" :md-active.sync="showNavigation">

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

    export default {
        name: "index",
        methods: {
            onDrawerListItemClick (to) {
                if (to.replace('.', '') !== this.$route.path) {
                    this.$router.push(to);
                }
                this.showNavigation = false;
            }
        },
        data () {
            return {
                showNavigation: false,
                maxHeight: window.innerHeight + 'px',
            }
        }
    }
</script>
<style>
    @media (min-width: 600px) {

        .md-small-show {
            display: none !important;
        }
    }
</style>