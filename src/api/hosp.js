import request from '@/utils/request'

export default {
  //班次列表
  getHospList(page,limit,searchObj) {
    return request ({
      url: `/admin/classes-lab-classes-plan/showClassesPlan/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  saveClassesSet(scheduleSet){
    return request({
      url:`/admin/classes-lab-classes-plan/addLabClasses`,
      method:'post',
      data:scheduleSet
    })
  },
  updateClassesSet(scheduleSet){
    return request({
      url:`/admin/classes-lab-classes-plan/editLabClasses`,
      method:'post',
      data:scheduleSet
    })
  },
  getLab(name){
    return request({
      url:`/admin/common/getAllLab/${name}`,
      method:'get',
    })
  },
  getClassById(id){
    return request({
      url:`/admin/classes-lab-classes-plan/getClassById/${id}`,
      method:'post'
    })
  },
  getClassName(labLeader){
    return request({
      url: `/admin/classes-lab-classes-plan/getClassName/${labLeader}`,
      method: 'get',
    })
  },



  //根据dictcode查询所有子节点 （所有省）
  findByDictCode(dictCode) {
    return request ({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  //根据数据id查询子数据列表
  findChildId(id) {
    return request ({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
  //更新医院上线状态
  updateStatus(id,status) {
    return request ({
      url: `/admin/hosp/hospital/updateHospStatus//${id}/${status}`,
      method: 'get'
    })
  },
  //查看医院详情
  getHospById(id) {
    return request ({
      url: `/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  },
  //查看医院科室
  getDeptByHoscode(hoscode) {
    return request ({
      url: `/admin/hosp/department/getDeptList/${hoscode}`,
      method: 'get'
    })
  },
  //查询预约规则
  getScheduleRule(page,limit,hoscode,depcode) {
    return request ({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },
  //查询排班详情
  getScheduleDetail(hoscode,depcode,workDate) {
    return request ({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  }
    
}
