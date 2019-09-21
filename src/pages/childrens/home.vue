<template>
    <div style="background-color: white">

        <!-- 顶部banner -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in bannerData" :key="'banner_' + item.createat">
                <div style="margin: 8px">
                    <md-card style="overflow: hidden">
                        <md-card-media>
                            <img :src="item.img + '?imageView2/1/w/860/h/340'" :alt="item.name">
                        </md-card-media>
                        <md-card-content>
                            <div class="md-body-1">{{item.name}}</div>
                            <div class="md-caption">{{item.description}}</div>
                        </md-card-content>
                    </md-card>
                </div>
            </swiper-slide>
        </swiper>

        <md-divider></md-divider>
        <div>
            <md-card style="margin: 8px">
                <md-card-header>
                    <md-card-header-text>
                        <div  class="md-title">热门博客</div>
                    </md-card-header-text>
                </md-card-header>

                <md-list class="md-triple-line md-dense">
                    <md-divider></md-divider>
                    <div v-for="item in hostestblog" :key="'hostestblog_' + item.id">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span class="md-body-1">{{item.title}}</span>
                                <p class="md-caption" style="white-space: normal">{{item.describe}}</p>
                                <span>
                                {{item.createdate|datefmt}}
                                {{item.zanCount}}赞
                                {{item.replyCount}}评
                            </span>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                    </div>
                </md-list>
            </md-card>
            <md-card style="margin: 8px">

                <md-card-header>
                    <md-card-header-text>
                        <div  class="md-title">最新博客</div>
                    </md-card-header-text>
                </md-card-header>

                <md-list class="md-triple-line md-dense">
                    <md-divider></md-divider>
                    <div v-for="item in newestblog" :key="'newestblog_' + item.id">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span class="md-body-1">{{item.title}}</span>
                                <p class="md-caption" style="white-space: normal">{{item.describe}}</p>
                                <span>
                                {{item.createdate|datefmt}}
                                {{item.zanCount}}赞
                                {{item.replyCount}}评
                            </span>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                    </div>
                </md-list>
            </md-card>
        </div>

    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import "swiper/dist/css/swiper.min.css"

    export default {
        name: "home",
        components: {
            swiper,
            swiperSlide
        },
        created() {
            this.loadData();
        },
        filters: {
            datefmt(val) {
                return new Date(val).toLocaleString();
            }
        },
        methods: {

            // 加载页面数据
            loadData() {
                return this.net("/home")
                    .then(result => {
                        this.bannerData = result.data.banners;
                        this.$nextTick(() => {
                            this.hostestblog = result.data.hotestblog;
                        });
                        this.$nextTick(() => {
                            this.newestblog = result.data.newestblog;
                        });
                    })
                    .catch(function (err) {
                        window.alert(err.message);
                    })
            },
        },
        data() {
            return {
                swiperOption: {
                    loop: true,
                    autoplay: {
                        dealy: 4000
                    }
                },

                // banner数据。
                bannerData: [],

                // 最热博客
                hostestblog: [],

                // 最新博客
                newestblog: [],
            }
        }
    }
</script>