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
        <fold-able v-model="searchMode" @onEnd="onFold">
            <md-content style="padding: 8px;display: flex;background-color: rgba(226,226,226,0.82)">
                <input class="searchinput" v-model="searchKey" placeholder="标题、标签、简介">
                <md-button class="md-icon-button" @click="onSearchClick">搜索</md-button>
            </md-content>
        </fold-able>

        <div>
            <!-- 分类tab -->
            <div v-show="!searchMode" style="overflow-x: auto;overflow-y: hidden;padding-bottom: 7px">
                <md-tabs v-if="blogTypes.length > 0" :md-active-tab="currentType" @md-changed="onTabChange">
                    <md-tab v-for="type_ in blogTypes" :id="type_.value" :md-label="type_.name"
                            :key="type_.id"></md-tab>
                </md-tabs>
            </div>

            <div v-if="searchMode && blogList" style="color: gray">共找到 <span style="font-weight: bold;">{{blogList.length}}</span> 条数据</div>

            <div v-if="blogList && blogList.length > 0">
                <list-blog :items="blogList"></list-blog>
            </div>
            <div v-else-if="blogList" style="text-align: center;padding-top: 40px">
                <div v-if="!searchMode">暂时还没有相关的内容。</div>
                <div v-else>这里没有你要找的内容。</div>
            </div>
            <div v-else style="text-align: center;padding-top: 40px">
                <div v-if="!searchMode">加载中...</div>
                <div v-else style="color: gray">请输入关键字后点击搜索</div>
            </div>
        </div>

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


            // 点击搜索。
            onSearchClick () {
                if (!this.searchKey) return;
                this.loadData(0, this.PAGE_COUNT, "", this.searchKey);
            },

            // 搜索框、打开关闭完成时此方法调用。
            onFold (status) {},

            // 加载博客类型。
            loadBlogTypes () {
                this.net("/blogTypes")
                    .then(result => new Promise((resolve, reject) => {
                        result.data.unshift({id: "999", name: "全部", value: ""});
                        this.blogTypes = result.data;
                        this.$nextTick(() => {
                            resolve();
                        });
                    }));
            },

            loadData (pageNum, limit, type, searchKey) {
                if (this.isLoading){
                    return;
                }
                this.isLoading = true;

                if (this.lastType !== type) {
                    this.blogList = undefined;
                }
                this.net("/blogs")
                    .method("post")
                    .param({
                        offset: pageNum * limit,
                        limit, searchKey, type
                    })
                    .then(result => {
                        if (this.lastType === type) {
                            if (this.blogList) {
                                this.blogList = this.blogList.concat(result.data.list);
                            } else {
                                this.blogList = result.data.list;
                            }
                        } else {
                            this.blogList = result.data.list;
                        }
                        this.lastType = type;
                        return new Promise(((resolve, reject) => {
                            this.$nextTick(() => {
                                this.isLoading = false;
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
        watch: {
            searchMode (v) {
                this.searchKey = '';

                this.$nextTick(() => {
                    if (v) {
                        // 进入搜索模式，将数据清除。
                        this.blogListBak = [].concat(this.blogList);
                        this.blogList = undefined;
                    } else {
                        // 退出搜索模式，加载出之前的结果。
                        this.blogList = this.blogListBak;
                        // this.loadData(this.pageNum, this.PAGE_COUNT, this.currentType, this.searchKey);
                    }
                });
            },
            searchKey () {
                this.blogList = undefined;
            }
        },
        data () {
            return {
                PAGE_COUNT:     20,        // 默认每页10条。
                pageNum:        0,         // 标记当前页码。

                searchMode:     false,     // 标记是否搜索模式。
                showSearchView: false,     // 标记是否显示搜索结果视图。
                searchKey:      '',        // 搜索关键字。

                lastType:       '',        // 上一次加载数据时使用的类型。
                currentType:    '',        // 当前博客类型。
                blogTypes:      [],        // 博客类型列表。
                blogList:       undefined, // 博客列表。
                blogListBak:    undefined, // 博客列表数据备份， 当进入搜索模式时，原值就会存在这里，退出搜索时又将此值写回、

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