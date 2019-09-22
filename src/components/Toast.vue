<!-- eslint-disable -->
<template>
    <md-portal class="aaa">
        <transition name="m-toast">
            <div class="m-toast md-elevation-3" v-if="mShow" v-html="msg||'　'"></div>
        </transition>
    </md-portal>
</template>

<script>

    import MdPortal from 'vue-material/src/components/MdPortal/MdPortal'

    export default {
        name: "Toast",
        components: {
            MdPortal
        },
        props: {
            mActive: Boolean,
            time: {
                type: Number,
                default: 4000
            },
            msg: String
        },
        created() {
            if (this.mActive) {
                this.planHide();
            }
        },
        methods: {
            planHide() {
                if (this.mtimeoutIndex !== -1) {
                    clearTimeout(this.mtimeoutIndex);
                }
                this.mtimeoutIndex = setTimeout(() => {
                    this.$emit('update:mActive', false);
                    this.mShow = false;
                }, this.time);
            }
        },
        watch: {
            mActive(val) {
                this.mShow = val;
                if (val) {
                    this.planHide();
                }
            }
        },
        data() {
            return {
                mtimeoutIndex: -1,
                mShow: this.mActive
            }
        }
    }
</script>

<style>
    .m-toast {
        padding: 8px 12px;
        line-height: 18px;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;

        bottom: 20%;
        left: 50%;
        z-index: 111;
        border-radius: 2px;
        backface-visibility: hidden;
        pointer-events: auto;
        transform: translate(-50%, 0);
        transform-origin: center center;
    }

    .m-toast-enter-active {
        transition: all .3s cubic-bezier(0.6, 0.1, 0.2, 0.7);
    }

    .m-toast-leave-active {
        transition: all .3s cubic-bezier(0.6, 0.1, 0.2, 0.7);
    }

    .m-toast-enter, .m-toast-leave-to {
        transform: translate(-50%, 20px);
        opacity: 0;
    }

</style>