import MdDialog from 'vue-material/dist/components/MdDialog'
import Vue from 'vue'

const Alert = (title, msg, cancelTxt,confirmTxt) => {
    return new Vue({
        render (h) {
            return h("md-dialog", {
                props: {
                    mdActive: this.mShow,
                    mdFullscreen: false
                }
            },[
                h("md-dialog-title", {}, [this.title]),
                h("md-dialog-content", {}, [this.msg]),
                h("md-dialog-actions", {}, [
                    h("md-button", {
                        on: {
                            click: this.onCancellick
                        }
                    }, [this.cancelTxt]),
                    h("md-button", {
                        'class': 'md-primary',
                        on: {
                            click: this.onConfirmClick
                        }
                    }, [this.comfirmTxt])
                ])
            ])
        },
        data: () => ({
            mShow: false,
            title: title || '提示',
            cancelTxt: cancelTxt || '取消',
            comfirmTxt: confirmTxt || '确定',
            msg: msg || ''
        }),
        watch: {
            mShow (val) {
                if (!val) {
                    this.$destroy();
                }
            }
        },
        methods: {
            onCancellick () {
                this.mShow = false;
            },
            onConfirmClick () {
                this.mShow = false;
            },
            show() {
                this.$nextTick(() => {
                    this.mShow = true;
                });
            }
        }
    });
}

export default {
    install (Vue) {
        Vue.use(MdDialog);

        // 挂载弹出alert方法。alert("你好"), alert("提示你", "你好");
        Vue.prototype.alert = (title, msg, confirmTxt) => {
            if (title && !msg) {
                msg = title;
                title = '提示';
            }
            let al = Alert(title, msg, confirmTxt);
            al.$mount();
            document.querySelector("#app").append(al.$el);
            al.$nextTick(function () {
                al.show();
            });
        }
    }
}