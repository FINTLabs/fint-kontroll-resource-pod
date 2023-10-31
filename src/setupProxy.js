const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/resources', {
            target: 'http://localhost:8063/beta/fintlabs-no', // API endpoint 1
            changeOrigin: true,
            //pathRewrite: {"^/api1": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/orgunits', {
            target: 'http://localhost:8060/beta/fintlabs-no', // API endpoint 5
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    /*app.use(
        createProxyMiddleware('/api/users', {
            target: 'http://localhost:8080',
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );*/
    app.use(
        createProxyMiddleware('/api/users', {
            target: 'http://localhost:8062/beta/fintlabs-no', // API endpoint 1
            changeOrigin: true,
            //pathRewrite: {"^/api1": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/assignments', {
            target: 'http://localhost:8061/beta/fintlabs-no',
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/roles', {
            target: 'http://localhost:8064/beta/fintlabs-no',
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
}