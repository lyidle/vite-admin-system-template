interface APIItem {
  url: string
  prefix: string
}
type APIType = APIItem[]
const API: APIType = [
  { url: "http://39.98.123.211", prefix: "/UrlImg" },
  { url: "http://139.198.127.41:9000", prefix: "/ImgUrl" },
]
export function encodeImgURl(ImgURl: APIItem["url"]) {
  if (ImgURl) {
    let result: string = ""
    for (let i = 0; i < API.length; i++) {
      const { url, prefix } = API[i]
      if (ImgURl.includes(url)) {
        result = ImgURl.replace(url, prefix)
      }
    }
    if (!result) result = ImgURl
    return result
  }
}
export function decodeImgUrl(ImgURl: APIItem["url"]) {
  if (ImgURl) {
    let result: string = ""
    for (let i = 0; i < API.length; i++) {
      const { url, prefix } = API[i]
      if (ImgURl.includes(prefix)) {
        result = ImgURl.replace(prefix, url)
      }
    }
    if (!result) result = ImgURl
    return result
  }
}
