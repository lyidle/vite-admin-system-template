import type { UploadProps } from "element-plus"
export default function useElUpload() {
  // 上传图片之前触发的钩子函数
  const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (
      rawFile.type === "image/png" ||
      rawFile.type === "image/jpeg" ||
      rawFile.type === "image/gif"
    ) {
      if (rawFile.size / 1024 / 1024 < 4) {
        return true
      } else {
        ElMessage.error("上传文件大小需要小于4M~")
        return false
      }
    } else {
      ElMessage.error("上传文件格式需要是PNG|JPG|GIF~")
      return false
    }
  }
  return {
    beforeUpload,
  }
}
