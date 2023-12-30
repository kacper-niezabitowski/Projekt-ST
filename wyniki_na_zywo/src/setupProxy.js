const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v4',
    createProxyMiddleware({
      target: 'https://api.football-data.org',
      changeOrigin: true,
    })
  );
};
