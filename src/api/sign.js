import request from '@/utils/request'

export function sign(data) {
  return request({
    url: '/signIn',
    method: 'post',
    data
  })
}
