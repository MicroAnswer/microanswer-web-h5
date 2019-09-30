<template>
    <div>
        <!-- 顶部ToolBar -->
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">

                <md-button class="md-icon-button md-small-show" @click="$store.commit('makeNav', true)">
                    <md-icon>menu</md-icon>
                </md-button>

                <div class="md-title" style="flex-grow: 1">博客</div>
                <md-button v-show="!searchMode" class="md-icon-button" @click="searchMode=true">
                    <md-icon>search</md-icon>
                </md-button>
                <md-button class="md-icon-button" v-show="searchMode" @click="searchMode=false">
                    <md-icon>cancel</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <!-- 搜索框 -->
        <fold-able v-model="searchMode">
            <md-content style="padding: 8px;display: flex;background-color: rgba(226,226,226,0.82)">
                <input class="searchinput" v-model="searchKey" placeholder="标题、标签、简介">
                <md-button class="md-icon-button" @click="onSearchClick">搜索</md-button>
            </md-content>
        </fold-able>

        <!-- 分类tab -->
        <div style="overflow-x: auto;overflow-y: hidden;padding-bottom: 7px">
        <md-tabs v-if="blogTypes.length > 0" :md-active-tab="0" @md-changed="onTabChange">
            <md-tab v-for="type_ in blogTypes" :id="type_.value" :md-label="type_.name" :key="type_.id"></md-tab>
        </md-tabs>
        </div>

        <list-blog :items="blogList"></list-blog>

    </div>
</template>

<script>
    /* eslint-disable */
    import FoldAble from '../../components/FoldAble'
    import ListBlog from '../../components/List-Blog'

    export default {
        name: "blogs",
        components: {
            FoldAble,
            ListBlog
        },
        created () {
            this.loadBlogTypes();
        },
        methods: {
            onSearchClick () {

            },

            // 加载博客类型。
            loadBlogTypes () {
                this.net("/blogTypes")
                    .then(result => new Promise((resolve, reject) => {
                        this.blogTypes = result.data;
                        this.$nextTick(() => {
                            resolve();
                        });
                    }));
            },

            loadData (pageNum, limit, type, searchKey) {
                this.net("/blogs")
                    .method("post")
                    .param({
                        offset: pageNum * limit,
                        limit, searchKey, type
                    })
                    .then(result => {
                        if (this.lastType === type) {
                            this.blogList = this.blogList.concat(result.data.list);
                        } else {
                            this.blogList = result.data.list;
                        }
                        this.lastType = type;
                        return new Promise(((resolve, reject) => {
                            this.$nextTick(() => {
                                resolve();
                            });
                        }))
                    })
            },

            // 点击分类按钮
            onTabChange (tabid) {
                this.currentType = tabid;
                this.loadData(this.pageNum, this.PAGE_COUNT, this.currentType, this.searchKey);
            }

        },
        data () {
            return {
                PAGE_COUNT: 10,    // 默认每页10条。
                pageNum:    0,     // 标记当前页码。
                searchMode: false, // 标记是否搜索模式。
                searchKey: '',     // 搜索关键字。
                lastType: '',      // 上一次加载数据时使用的类型。
                currentType: '',   // 当前博客类型。

                blogTypes: [],     // 博客类型列表。
                blogList: [],      // 博客列表。

            }
        }
    }
</script>
<style>
    .searchinput {
        border: none;
        width: 100%;
        padding: 0 10px;
        outline: none;
        border-radius: 9999px;
    }
</style>