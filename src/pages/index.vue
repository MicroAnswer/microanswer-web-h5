<template>
    <div>

        <!-- 顶部ToolBar -->
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <md-button class="md-icon-button" @click="showNavigation=true">
                    <md-icon>menu</md-icon>
                </md-button>

                <h3 class="md-title">Microanswer的网站</h3>
            </div>
        </md-toolbar>

        <router-view/>

        <!-- 侧边菜单 -->
        <md-drawer :md-active.sync="showNavigation" md-swipeable>


            <md-content class="md-primary">

                <md-avatar class="md-large">
                    <md-icon>home</md-icon>
                </md-avatar>

                <router-link style="color: wheat" to="./login">登录</router-link>
                /
                <router-link style="color: wheat" to="./reg">注册</router-link>

            </md-content>


            <md-list>
                <md-list-item to="./">
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">首页</span>
                </md-list-item>

                <md-list-item to="./albums">
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">专题</span>
                </md-list-item>

                <md-list-item to="./blogs">
                    <md-icon>delete</md-icon>
                    <span class="md-list-item-text">博客</span>
                </md-list-item>

                <md-list-item to="./apps">
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">产品</span>
                </md-list-item>

                <md-list-item to="./about">
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">关于</span>
                </md-list-item>
            </md-list>
        </md-drawer>

    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                showNavigation: false
            }
        }
    }
</script>