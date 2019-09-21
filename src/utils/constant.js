export default {
    Code: {
        SUCCESS: 200,
        ERROR: 500, // 常规错误。
        ERROR_NEED_LOGIN: 501, // 需要登录。
        ERROR_EMAIL_CODE: 502, // 邮箱验证码错误。
        WARN_MANY_ACCOUNT: 503, // 又该邮箱时，找到另一个使用该邮箱的不同账户。
        ERROR_TOKEN_FAIL: 504, // token已失效。
        ERROR_PERMISSION_TOO_LOW: 600,// 权限太低。
    }
}