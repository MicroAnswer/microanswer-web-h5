import Axios from 'axios'
import Constant from './constant'


class NetUtil {

    // private Str _url;
    // private Str _method;
    // private Bool isShowLoading;
    // private Str loadingMsg;
    // private Any _param;
    // private axios axiosInstance;
    // private [] __transformRequest;

    constructor(url) {
        if (!NetUtil.axios) {

            // 全部请求使用此实例。
            NetUtil.axios = Axios.create({timeout: 1000 * 10, baseURL: "/web"});
        }

        this.__transformRequest = [];

        this.apply(NetUtil.axios);
        this.url(url);
        this.before(true);
        this._transformRequest(function (data/*, headers*/) {
            var formData = new FormData();
            if (data && typeof data === "object" && !(data instanceof FormData)) {
                for (let f in data) {
                    var value = data[f];
                    var type = typeof value;
                    if (type === "string") {
                        formData.set(f, value);
                    } else if (type === "function") {
                        formData.set(f, "javascript:function(" + type.name + ")");
                    } else if (type === "object") {
                        formData.set(f, JSON.stringify(value));
                    } else {
                        throw new Error("不支持此请求数据。");
                    }
                }
            } else {
                return data || "";
            }
            return formData;
        })
    }

    url(url) {
        this._url = url;
        return this;
    }

    // 使用此方法可设置本次请求要使用的axios实例，
    // 你不必使用此方法。除非你有自己独钟的一个实例。
    apply(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    get() {
        return this.method("get");
    }

    post() {
        return this.method("post");
    }

    method(method) {
        this._method = method;
        return this;
    }

    before(msg) {
        if (msg === '' || msg === false) {
            this.isShowLoading = false;
        } else {
            if (typeof msg === "string") {
                this.loadingMsg = msg;
            } else {
                this.loadingMsg = "loading…";
            }
        }
        return this;
    }

    param(param) {
        this._param = param;
        return this;
    }

    // 返回的数据就是服务器返回的数据。 不过针对code不等于200的，已自动判断。
    then(fun) {
        return Promise.resolve()

            // 检查参数。
            .then(() => {
                if (!this._url) return Promise.reject(new Error("请先指定接口url"));
            })

            // 给出提示
            .then(() => {
                if (this.isShowLoading) {
                    window.console.log("axios:" + this.loadingMsg);
                }
            })

            // 执行请求
            .then(() => {
                return this.axiosInstance.request({
                    method: this._method,
                    url: this._url,
                    transformRequest: this.__transformRequest,
                    data: this._param
                });
            })

            // 检查结果。
            .then(function ({data}) {
                let result = data;
                if (result.code === Constant.Code.SUCCESS) {
                    return Promise.resolve(result);
                }
                return Promise.reject(new Error(result.message || result.msg || "出现了问题，请稍后再试！"));
            })

            // 隐藏提示。
            .finally(() => {
                if (this.isShowLoading) {
                    window.console.log("axios:" + this.loadingMsg + ":end.");
                }
            }).then(fun);
    }

    _transformRequest(fun) {
        this.__transformRequest.push(fun);
    }

}


export default {
    install(Vue) {
        Vue.prototype.net = url => new NetUtil(url);
    }
}