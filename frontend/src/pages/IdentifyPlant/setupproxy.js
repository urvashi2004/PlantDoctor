// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the path you will use in your React app
    createProxyMiddleware({
      target: 'https://my-api.plantnet.org/', // Replace with the third-party API URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding to the target
      },
    })
  );
};
  