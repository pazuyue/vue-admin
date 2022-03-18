import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/LoginByUserAndPassword',
    method: 'post',
    data
  })
}

export function getInfo(token, username) {
  return request({
    url: '/user/info',
    method: 'post',
    username
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
