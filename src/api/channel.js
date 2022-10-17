import request from '@/utils/request'

export default {
  getAllCity(){
    return request({
      url:`/admin/common/getAllCity`,
      method: 'get'
    })
  },
  getAllArea(){
    return request({
      url:`/admin/common/getAllArea`,
      method:'get'
    })
  },
  //实验室设置列表
  getLabList(current, limit, searchObj) {
    return request({
      url: `/admin/lislab-user-info/showLisLab/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  //删除实验室设置
  deleteLab(id) {
    return request({
      url: `/admin/classes-lislab-plan/changeLaboratoryInfo/${id}`,
      method: 'post'
    })
  },
  //批量删除
  batchRemoveHospSet(idList) {
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  //更改实验室营业状态
  lockHospSet(id, status) {
    return request({
      url: `/admin/lislab-user-info/exchangeIsDelete/${id}/${status}`,
      method: 'post'
    })
  },
  //添加实验室设置
  saveHospSet(hospitalSet) {
    return request({
      url: `/admin/lislab-user-info/saveLab`,
      method: 'post',
      data: hospitalSet
    })
  },
  //id查询实验室
  getHospSet(id) {
    return request({
      url: `/admin/lislab-user-info/getLabById/${id}`,
      method: 'post',
    })
  },
  //修改实验室
  updateHospSet(hospitalSet) {
    return request({
      url: `/admin/lislab-user-info/updateLab`,
      method: 'post',
      data: hospitalSet
    })
  },
  getLabName(){
    return request({
      url: `/admin/lislab-user-info/findAllLabName`,
      method: 'get',
    })
  },
  getDutyname(){
    return request({
      url: `/admin/lislab-user-info/findAllDutyName`,
      method: 'get',
    })
  },
}
