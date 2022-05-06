import request from '@/utils/request'

export function sign(data) {
  return request({
    url: '/sign/signIn',
    method: 'post',
    data
  })
}

export function signList(data) {
  return request({
    url: '/sign/signList',
    method: 'post',
    data
  })
}
