<template>
    <div>

        <md-button @click="alert('em~~~','你好')">alert</md-button>
        <md-button @click="confirm('em~~~','你好吗？', '还可以')">confirm</md-button>
        <md-button @click="toast('吐司测试~~~', 5000)">toast</md-button>

    </div>
</template>

<script>

    export default {
        name: "blogs",
        components: {
        },
        data () {
            return {
            }
        }
    }
</script>