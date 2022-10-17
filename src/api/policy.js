import request from '@/utils/request'

const api_name = '/admin/policy'

export default {
  //政策列表
  getpolicyinfo(current, limit) {
    return request({
      url: `${api_name}/getpolicyinfo/${current}/${limit}`,
      method: 'post',
    })
  },
  getpolicyinfobyid(id) {
    return request({
      url: `${api_name}/getpolicyinfobyid/${id}`,
      method: 'post'
    })
  },
  //修改政策信息
  updatepolicyinfo(EpidemicPreventionPolicy) {
    return request({
      url: `${api_name}/updatepolicyinfo`,
      method: 'post',
      data: EpidemicPreventionPolicy
    })
  },
  //添加政策信息
  addpolicyinfo(EpidemicPreventionPolicy) {
    return request({
      url: `${api_name}/addpolicyinfo`,
      method: 'post',
      data: EpidemicPreventionPolicy
    })
  },
  //删除政策信息
  deletepolicyinfoById(id) {
    return request({
      url: `${api_name}/deletepolicyinfoById/${id}`,
      method: 'post'
    })
  }
}

