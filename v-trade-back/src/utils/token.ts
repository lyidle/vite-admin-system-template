export const SET_TOKEN = (tokenName: string, token: string) => {
  localStorage.setItem(tokenName, token)
}
export const GET_TOKEN = (tokenName: string) => {
  return localStorage.getItem(tokenName) as string
}
export const REMOVE_TOKEN = (tokenName: string) => {
  localStorage.removeItem(tokenName)
}
