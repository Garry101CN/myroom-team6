const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: " http://localhost:3000",

      secure: false,

      changeOrigin: true,
    })
  );
};
