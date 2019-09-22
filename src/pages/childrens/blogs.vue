<template>
    <div>

        <md-button @click="doAlert">alert</md-button>
        <md-button @click="confirm('em~~~','你好吗？', '还可以')">confirm</md-button>
        <md-button @click="toast('吐司测试~~~', 2000)">toast</md-button>

    </div>
</template>

<script>

    export default {
        name: "blogs",
        components: {
        },
        methods: {
            doAlert () {
                this.alert("Hello world.");
            }
        },
        data () {
            return {
            }
        }
    }
</script>