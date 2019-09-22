<!-- eslint-disable -->
<template>
    <transition name="slide-fade"  v-on:after-leave="afterLeave">
        <div class="md-elevation-3 m-toast" v-if="mShow" v-html="msg||'　'"></div>
    </transition>
</template>

<script>
    export default {
        name: "Toast",
        props: {
            mActive: Boolean,
            time: {
                type: Number,
                default: 4000
            },
            msg: String
        },
        created () {
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
                    this.mShow = false;
                }, this.time);
            },
            show() {
                this.mShow = true;
            },
            afterLeave () {
                this.$emit('onDismiss');
            }
        },
        watch: {
            mActive(val) {
                this.mShow = val;
            },
            mShow (val) {
                if (!val) {
                    this.$emit('update:mActive', false);
                } else {
                    this.planHide();
                }
            }
        },
        data()  {
            return {
                mShow: this.mActive,
                mtimeoutIndex: -1
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

    .slide-fade-enter-active {
        transition: all .3s cubic-bezier(0.6,0.1,0.2,0.7);
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(0.6,0.1,0.2,0.7);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translate(-50%, 20px);
        opacity: 0;
    }

</style>