module.exports = {
    devServer: {
        proxy: {
            '/web': {
                // target: 'https://www.microanswer.cn/',
                target: 'http://127.0.0.1:9000/',
                ws: false,
            }
        }
    },
    publicPath: "./"
};