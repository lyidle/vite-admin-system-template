import { PREFIX } from "@/api/prefixAPI"
const fileUploadValue: any = (PREFIX.MANAGER +
  "/admin/product/fileUpload") as unknown as string
export const API: { fileUpload: string } = {
  fileUpload: fileUploadValue,
}
