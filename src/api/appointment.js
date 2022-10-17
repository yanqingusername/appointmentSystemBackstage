import request from '@/utils/request'

const api_name = '/admin/appointment'

export default {
  //预约信息列表
  getappointmentinfo(current, limit,searchObj) {
    return request({
      url: `${api_name}/getappointmentinfo/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //获取个人预约信息
  getappointinfobyid(id) {
    return request({
      url: `${api_name}/getappointinfobyid/${id}`,
      method: 'post',
    })
  },
  //修改评论信息
  updateappointbyid(id,AppointmentInfo) {
    return request({
      url: `${api_name}/updateappointbyid/${id}`,
      method: 'post',
      data: AppointmentInfo
    })
  },
  //获取个人样本信息
  getsampleinfobyid(id) {
    return request({
      url: `${api_name}/getsampleinfobyid/${id}`,
      method: 'get'
    })
  }
}

