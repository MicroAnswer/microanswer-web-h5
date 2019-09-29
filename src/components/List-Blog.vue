<template>
    <md-list class="md-triple-line">
        <md-list-item v-for="item in items" :key="'blog_' + item.id" @click="onBlogItemClick(item)">
            <div class="md-list-item-text">
                <span>{{item.title}}</span>
                <span>{{item.describe}}</span>
                <span>{{item.typeName}} · {{item.createdate|datefmt}}</span>
            </div>
            <div class="md-list-action" style="align-self: center">
                <span class="md-caption"><md-icon style="font-size: 20px;!important;">thumb_up</md-icon>({{item.zanCount}})</span>
            </div>
        </md-list-item>
    </md-list>
</template>

<script>
    /* eslint-disable */
    /* created by Microanswer at 2019-9-29 15:31 microanswer.cn */
    export default {
        name: 'ListItem-Blog',
        props: {
            items: Array
        },
        components: {},
        filters: {
            datefmt (val) {
                return new Date(val).toLocaleString();
            }
        },
        created () {},
        mounted () {},
        beforeDestroy () {},
        methods: {
            onBlogItemClick (item) {

            }
        },
        watch: {},
        computed: {},
        data () {
            return {}
        }
    }
</script>

<style scoped lang=less></style>