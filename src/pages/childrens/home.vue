<template>
    <transition name="fade">
        <md-content v-show="loaded">
            <!-- 顶部banner -->
            <swiper :global-options="swiperOption">
                <swiper-slide v-for="item in bannerData" :key="'banner_' + item.createat">
                    <md-card style="margin: 8px">
                        <md-card-media>
                            <img :src="item.img + '?imageView2/1/w/860/h/340'" :alt="item.name">
                        </md-card-media>
                        <md-card-content>
                            <div class="md-body-1">{{item.name}}</div>
                            <div class="md-caption">{{item.description}}</div>
                        </md-card-content>
                    </md-card>
                </swiper-slide>
            </swiper>

            <md-divider></md-divider>

            <md-tabs :md-active-tab="0" @md-changed="onTabChange" md-alignment="fixed">
                <md-tab id="hotblog" md-label="热门博客"></md-tab>
                <md-tab id="newblog" md-label="最新博客"></md-tab>
                <md-tab id="historytoday" md-label="历史上的今天"></md-tab>
            </md-tabs>


            <div v-if="activeTab === 'hotblog'">
                <list-blog :items="hostestblog"/>
            </div>
            <div v-else-if="activeTab === 'newblog'">
                <list-blog :items="newestblog"/>
            </div>
            <div v-else-if="activeTab === 'historytoday'">
                <md-list>
                    <md-list-item v-for="item in histortoday" :key="'histortoday_' + item.id" :href="item.url"
                                  target="_blank">
                        <md-avatar>
                            <img :src="item.pic" alt="...">
                        </md-avatar>
                        <div class="md-list-item-text">
                            <span>{{item.title}}</span>
                            <span>{{item.year}}年{{item.month}}月{{item.day}}日</span>
                        </div>
                    </md-list-item>
                </md-list>
            </div>
            <div v-else>
                未知tab。
            </div>

        </md-content>
    </transition>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import "swiper/dist/css/swiper.min.css"
    import ListBlog from '../../components/List-Blog'

    export default {
        name: "home",
        components: {
            swiper,
            swiperSlide,
            ListBlog
        },
        created () {
            this.loadData();
        },
        filters: {
            datefmt (val) {
                return new Date(val).toLocaleString();
            }
        },
        methods: {

            // 加载页面数据
            loadData () {
                return this.net("/home")
                    .then(result => {
                        this.bannerData = result.data.banners;
                        this.$nextTick(() => {
                            this.hostestblog = result.data.hotestblog;
                        });
                        this.$nextTick(() => {
                            this.newestblog = result.data.newestblog;
                        });
                        this.$nextTick(() => {
                            this.histortoday = result.data.historyTodyList;
                        });
                        this.$nextTick(() => {
                            this.loaded = true;
                        })
                    })
                    .catch(function (err) {
                        window.alert(err.message);
                    })
            },

            // tab变化
            onTabChange (val) {
                this.activeTab = val;
            },

            // 点击item博客
            onBlogItemClick (val) {
                console.log(val);
            }
        },
        data () {
            return {

                loaded: false,

                swiperOption: {
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    }
                },
                activeTab: 0, // 当前选择的tab

                // banner数据。
                bannerData: [],

                // 最热博客
                hostestblog: [],

                // 最新博客
                newestblog: [],

                // 历史上的今天
                histortoday: [],
            }
        }
    }
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>