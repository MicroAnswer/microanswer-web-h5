<template>
    <div class="m-w-container">

        <!-- 顶部ToolBar -->
        <md-toolbar class="md-primary m-w-toolbar">
            <div class="md-toolbar-row">
                <md-button class="md-icon-button" @click="showNavigation=true">
                    <md-icon>menu</md-icon>
                </md-button>

                <h3 class="md-title">Microanswer的网站</h3>
            </div>
        </md-toolbar>

        <router-view/>

        <!-- 侧边菜单 -->
        <md-drawer :md-active.sync="showNavigation" md-swipeable md-fixed>


            <md-content class="md-primary" style="padding-top: 30px;padding-bottom: 20px;">

                <md-avatar class="md-large" style="background-color: wheat;margin-left: 8px">
                    <md-icon>person</md-icon>
                </md-avatar>

                <md-content style="display: inline-block;vertical-align: middle;background-color: transparent">
                <md-button class="md-raised md-accent" to="./login">登录</md-button>
                <md-button class="md-raised" to="./reg">注册</md-button>
                </md-content>

            </md-content>


            <md-list>
                <md-list-item :class="$route.path === '/' && 'router-link-active'" @click="onDrawerListItemClick('./')">
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">首页</span>
                </md-list-item>

                <md-list-item :class="$route.path === '/blogs' && 'router-link-active'" @click="onDrawerListItemClick('./blogs')">
                    <md-icon>description</md-icon>
                    <span class="md-list-item-text">博客</span>
                </md-list-item>

                <md-list-item :class="$route.path === '/albums' && 'router-link-active'" @click="onDrawerListItemClick('./albums')">
                    <md-icon>toys</md-icon>
                    <span class="md-list-item-text">专题</span>
                </md-list-item>

                <md-list-item :class="$route.path === '/apps' && 'router-link-active'" @click="onDrawerListItemClick('./apps')">
                    <md-icon>extension</md-icon>
                    <span class="md-list-item-text">产品</span>
                </md-list-item>

                <md-list-item :class="$route.path === '/about' && 'router-link-active'" @click="onDrawerListItemClick('./about')">
                    <md-icon>info</md-icon>
                    <span class="md-list-item-text">关于</span>
                </md-list-item>
            </md-list>
        </md-drawer>

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
        data() {
            return {
                showNavigation: false
            }
        }
    }
</script>
<style scoped>
    .m-w-container {padding-top: 64px;}
    @media (max-width: 960px) {.m-w-container {padding-top: 48px;}}
    @media (max-width: 600px) {.m-w-container {padding-top: 56px;}}
    .m-w-toolbar {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 3;
        margin: auto;
        max-width: 100%;
    }
</style>