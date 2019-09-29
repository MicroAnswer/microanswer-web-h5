<template>
    <div>

        <md-button @click="doAlert">alert</md-button>
        <md-button @click="confirm('em~~~','666666', '还可以')">confirm</md-button>
        <md-button @click="toast('吐司测试~~~', 2000)">toast</md-button>
        <md-button @click="dshowLoading">Loading</md-button>

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
            },
            dshowLoading () {
                var a = this.showLoading();
                setTimeout(() => {
                    a.hide();
                }, 5000)
            }
        },
        data () {
            return {
            }
        }
    }
</script>