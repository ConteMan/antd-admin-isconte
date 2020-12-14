import { BASE_URL } from '@/services/api'
import { request, METHOD, removeAuthorization } from '@/utils/request'
import store from '@/store'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(BASE_URL + '/login', METHOD.POST, {
    name: name,
    password: password
  })
}

export async function getRoutesConfig() {
  const user = store.getters['account/user']
  const id = user.id
  return request(BASE_URL + '/users/' + id + '/routes', METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}

/*
 * 修改密码
 */
export async function changePassword(password) {
  const user = store.getters['account/user']
  const id = user.id
  return request(BASE_URL + '/users/' + id + '/password', METHOD.POST, {
    password: password
  })
}

export default {
  login,
  logout,
  getRoutesConfig,
  changePassword
}

