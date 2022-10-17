import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: `/admin/user/login/${username}/${password}`,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return request({
    url: `/admin/user/info/${username}`,
    method: 'get',
    parms: { username }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
