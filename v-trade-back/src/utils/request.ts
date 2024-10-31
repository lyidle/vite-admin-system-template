import axios from "axios"
import { GET_TOKEN } from "@/utils/token"
// 第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
const request = axios.create({
  timeout: 5000,
})
// 第二步：req实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  const token = GET_TOKEN("TOKEN") || undefined
  // 存在token 就携带token发起信息
  if (token) {
    config.headers.token = token
  }
  //返回配置对象
  return config
})
request.interceptors.response.use(
  (response) => {
    // 简化数据 直接得到data
    // 还可以判断一下返回码是否正确，不正确进一步的阻止，并提示等
    return response.data
  },
  (error) => {
    // 错误信息
    let message = ""
    // 状态码
    const status = error.status
    // 根据状态码返回信息
    switch (status) {
      case 401:
        message = "TOKEN过期"
        break
      case 403:
        message = "没有权限访问"
        break
      case 404:
        message = "请求地址错误"
        break

      case 500:
        message = "服务器出现问题"
        break
      default:
        message = "网络出现问题"
        break
    }
    // 错误提示信息
    ElMessage({
      type: "error",
      message,
    })
    return Promise.reject(new Error(error.message || "Error"))
  }
)
// 对外暴露
export default request
