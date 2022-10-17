import request from '@/utils/request'

const api_name = '/admin/user'

export default {
  //用户列表
  getUserList(current, limit, searchObj) {
    return request({
      url: `${api_name}/getuserinfo/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //修改用户信息
  updateUserinfo(id,ClassesUserInfo) {
    return request({
      url: `${api_name}/updateuserinfo/${id}`,
      method: 'post',
      data: ClassesUserInfo
    })
  },
  //获取受检人信息
  getTestuserinfo(id) {
    return request({
      url: `${api_name}/getTestuserinfo/${id}`,
      method: 'get'
    })
  },
  //获取单个用户信息
  getsampleinfo(id) {
    return request({
      url: `${api_name}/getsampleinfo/${id}`,
      method: 'get'
    })
  }
}

