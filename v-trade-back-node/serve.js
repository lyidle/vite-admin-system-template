const express = require("express")
const https = require("https")
const app = express()
// 本地模拟https
const fs = require("fs")
var c = require("child_process")
c.exec("start https://127.0.0.1:3986/login")
const options = {
  key: fs.readFileSync("C:\\Run the Program\\liveserver_https\\certkey.pem"),
  cert: fs.readFileSync("C:\\Run the Program\\liveserver_https\\fullchain.pem"),
}
https
  .createServer(options, app)
  .listen(3986, () => console.log(`App listening on port ${3986}!`))

// 处理history
const history = require("connect-history-api-fallback")
app.use(history())
// 反向代理
const { createProxyMiddleware } = require("http-proxy-middleware")
// 静态资源
app.use(express.static(__dirname + "/dist"))

// 反代
app.use(
  "/prod-api/auth",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211:8170",
  })
)
app.use(
  "/prod-api/manager",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211:8510",
  })
)

// 图片资源反代
app.use(
  "/UrlImg",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211",
  })
)

app.use(
  "/ImgUrl",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://139.198.127.41:9000",
  })
)
// 监听3986端口
// app.listen("3986", (err) => {
//   if (err) console.warn(err)
//   console.log("尚品汇后台系统运行成功……")
// })
