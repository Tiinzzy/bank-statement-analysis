const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 4000;
const HOST = "localhost";

const backendProxy = createProxyMiddleware({
    target: "http://localhost:8888",
    changeOrigin: true,
    pathRewrite: {'^/backend' : ''}
});

app.use('/backend', backendProxy);

app.use(express.static('/home/tina/Documents/projects/bank-statement-analysis/front-end/build/'))

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});