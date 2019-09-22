import MdDialog from 'vue-material/dist/components/MdDialog'
import Toast_ from '../components/Toast'
import Vue from 'vue'

const Alert = (title, msg, cancelTxt,confirmTxt, onCancelCallBack, onConfirmCallBack) => {
    return new Vue({
        render (h) {

            let buttons = [];
            if (this.cancelTxt) {
                buttons.push(h("md-button", {
                    on: {
                        click: this.onCancellick
                    }
                }, [this.cancelTxt]));
            }
            buttons.push(h("md-button", {
                'class': 'md-primary',
                on: {
                    click: this.onConfirmClick
                }
            }, [this.comfirmTxt]));

            return h("md-dialog", {
                props: {
                    mdActive: this.mShow,
                    mdFullscreen: false
                }
            },[
                h("md-dialog-title", {}, [this.title]),
                h("md-dialog-content", {}, [this.msg]),
                h("md-dialog-actions", {}, buttons)
            ])
        },
        data: () => ({
            mShow: false,
            title: title || '提示',
            cancelTxt: cancelTxt,
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
                if (onCancelCallBack) {
                    onCancelCallBack();
                }
            },
            onConfirmClick () {
                this.mShow = false;
                if (onConfirmCallBack) {
                    onConfirmCallBack();
                }
            },
            show() {
                this.$nextTick(() => {
                    this.mShow = true;
                });
            }
        }
    });
};
const Toast = (msg, time) => {
    return new Vue({
        render(h) {
            return h("toast", {
                props: {
                    msg, time
                },
                ref: "toast",
                on: {
                    onDismiss: () => {
                        this.$emit("onDismiss");
                    }
                }
            });
        },
        beforeDestroy () {
            this.$refs.toast.$destroy();
        },
        methods: {
            show() {
                this.$refs.toast.show();
            }
        }
    });
};

// mount传入的组件。并在合适的时机调用回调方法，以完成vue对象自身的功能。
const append2Page = (al, cb) => {
    al.$mount();
    document.querySelector("#app").append(al.$el);
    al.$nextTick(function () {
        cb();
    });
};

export default {
    install (Vue) {
        Vue.use(MdDialog);
        Vue.component(Toast_.name, Toast_);

        /**
         * 挂载弹出alert方法。
         * 使用如下：
         * <br>
         *     alert("msg");
         *     alert("title", "msg");
         *     alert("title", "msg", "确定");
         *     alert("title", "msg", "确定", () => {console.log("点击确定了")});
         **/
        Vue.prototype.alert = (title, msg, confirmTxt, onConfirmCallBack) => {
            if (title && !msg) {
                msg = title;
                title = '提示';
            }
            let al = Alert(title, msg, undefined, confirmTxt, undefined, onConfirmCallBack);
            append2Page(al, () => {
                al.show();
            });
            return al;
        };

        /**
         * 挂载弹出confirm方法
         * <br>
         *     confirm("msg");
         *     confirm("title", "msg");
         *     confirm("title", "msg", "确定按钮");
         *     confirm("title", "msg", "确定按钮", ()=> {console.log("点击确定了")});
         *     confirm("title", "msg", "取消按钮", "确定按钮", () => {console.log("取消点击了")}, () => {console.log("确定点击了")});
         */
        Vue.prototype.confirm = (title, msg, cancelTxt, confirmTxt,onCancelCallBack, onConfirmCallBack) => {
            if (title && !msg) {
                msg = title;
                title = '提示';
            }
            if (cancelTxt && !confirmTxt && !onCancelCallBack && !onConfirmCallBack) {
                confirmTxt = cancelTxt;
                cancelTxt = "取消";
            }
            if (cancelTxt && confirmTxt && (confirmTxt instanceof Function) && !onCancelCallBack && !onConfirmCallBack) {
                confirmTxt = cancelTxt;
                cancelTxt = "取消";
                onConfirmCallBack = confirmTxt;
            }
            let al = Alert(title, msg, cancelTxt, confirmTxt, onCancelCallBack, onConfirmCallBack);
            append2Page(al, () => {
                al.show();
            });

            return al;
        }

        /**
         * 弹出吐司。
         *
         */
        Vue.prototype.toast = (msg, time) => {
            let t = Toast(msg, time);
            append2Page(t, () => {
               t.show();
            });
            t.$on("onDismiss", () => {
                t.$destroy();
            });
            return t;
        }
    }
}