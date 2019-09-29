import MdDialog from 'vue-material/dist/components/MdDialog'
import Toast_ from '../components/Toast'
import Vue from 'vue'

const Alert = (vmParent, title, msg, cancelTxt,confirmTxt, onCancelCallBack, onConfirmCallBack) => {
    return new Vue({
        parent: vmParent._self,
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
                    mdFullscreen: false,
                    mdClickOutsideToClose: true
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
const Loading = (vmParent, msg) => {
    return new Vue({
        parent: vmParent._self,
        render (h) {
            return h("md-dialog", {
                props: {
                    mdActive: this.mShow,
                    mdFullscreen: false,
                    mdClickOutsideToClose: false
                }
            }, [h("md-dialog-content", {
                style: {
                    display: "flex",
                    padding: "14px"
                }
            }, [
                h("md-progress-spinner", {
                    props: {
                        mdMode: "indeterminate"
                    }
                }), h("div", {
                    style: {
                        alignSelf: "center",
                        marginLeft: "16px"
                    }
                }, [this.msg])])
            ]);
        },
        data: () => ({
            mShow: false,
            msg: msg ||"加载中…"
        }),
        methods: {
            show () {
                this.mShow = true;
            },
            hide () {
                this.mShow = false;
                this.$nextTick(()=> {
                    this.$destroy();
                });
            }
        }
    });
};
const Toast = (vmParent, msg, time) => {
    return new Vue({
        parent: vmParent._self,
        render(h) {
            return h("toast", {
                props: {
                    msg, time, mActive: this.mShow
                },
                on: {
                    "update:mActive": this.onMActiveChange
                }
            });
        },
        methods: {
            show() {
                this.$nextTick(() => {
                    this.mShow = true;
                });
            },
            onMActiveChange (val) {
                if (!val) {
                    this.$destroy();
                }
            }
        },
        data () {
            return {
                mShow: false
            }
        }
    });
};

// mount传入的组件。并在合适的时机调用回调方法，以完成vue对象自身的功能。
const append2Page = (al, cb) => {
    al.$mount();
    // document.body.append(al.$el);
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
        Vue.prototype.alert = function(title, msg, confirmTxt, onConfirmCallBack) {
            if (title && !msg) {
                msg = title;
                title = '提示';
            }
            let al = Alert(this, title, msg, undefined, confirmTxt, undefined, onConfirmCallBack);
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
        Vue.prototype.confirm = function (title, msg, cancelTxt, confirmTxt,onCancelCallBack, onConfirmCallBack) {
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
            let al = Alert(this, title, msg, cancelTxt, confirmTxt, onCancelCallBack, onConfirmCallBack);
            append2Page(al, () => {
                al.show();
            });

            return al;
        };

        /**
         * 弹出吐司。
         *
         */
        Vue.prototype.toast = function(msg, time) {
            let t = Toast(this, msg, time);
            append2Page(t, () => {
               t.show();
            });
            return t;
        };

        // 显示加载框
        Vue.prototype.showLoading = function (msg) {
            var l = Loading(this, msg);
            append2Page(l, () => {
                l.show();
            });
            return l;
        }
    }
}