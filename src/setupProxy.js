const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: " http://180.184.74.25:80",
      secure: false,
      changeOrigin: true,
    }),
    createProxyMiddleware("/user", {
      target: "http://180.184.74.25:80",
      secure: false,
      changeOrigin: true,
    }),
    createProxyMiddleware("/upload", {
      target: "http://180.184.74.25:80",
      secure: false,
      changeOrigin: true,
    })
  );
};
