module.exports = {
    baseUrl: "http://127.0.0.1:8080",
    devServer: {
        proxy: {
            '/web': {
                target: 'http://127.0.0.1:8002',
                ws: false,
            }
        }
    }
};